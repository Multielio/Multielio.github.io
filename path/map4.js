class MapRRTStar{
  
  constructor(loc,c1,c2,cible){
  stroke('green'); // Change the color
  strokeWeight(10); // Make the points 10 pixels in size
  point(loc.x, loc.y);


  stroke('red'); // Change the color
  strokeWeight(10); // Make the points 10 pixels in size
  point(cible.x, cible.y);

  this.gpath = [];
  this.g = new Tree(loc);
  this.c1 = c1;
  this.c2 = c2;
  this.cb = cible;
  this.size = 1;
  }

  rand_conf(){
    var x = random(width);
    var y = random(height);
   

    return createVector(x,y);
  }

  nearest_vertex(qrand){
    var pile = [this.g.root];
    var dis = p5.Vector.dist(this.g.root.value,qrand);
    var qnear = this.g.root.value;
    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var distnew = p5.Vector.dist(el.value,qrand);
        
        if (distnew < dis){
          dis = distnew;
          qnear = el.value;
        }
        pile.push.apply(pile, el.l);
      
    }
    return qnear;

  }

  nearest_cvertex(qsuggested,qnearold,cost){
    var pile = [this.g.root];
    var cost = 1000000000;
    var qnear = qnearold;
    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var dis = p5.Vector.dist(el.value,qsuggested);
        //var searchradius =9;
        var searchradius =300*(log(this.size)/this.size)+20;
        stroke('black');
        strokeWeight(1); 
        noFill();
        circle(qsuggested.x,qsuggested.y,searchradius);
        //console.log(dis);
        //console.log("sr");
        console.log(searchradius);
        if(dis>=searchradius)continue;
        //console.log(el.cost);
        var distnew = el.cost +dis;
        
        if (distnew < cost){
          cost = distnew;
          qnear = el.value;
          console.log("here !!!");
        }
        pile.push.apply(pile, el.l);
      
    }
    return qnear;

  }

  new_conf(near,qrand,deltaq){
    var subd = p5.Vector.sub(qrand,near);
    subd.normalize();
    subd.setMag(deltaq);
    return p5.Vector.add(near,subd);

  }

  

  gen(deltaq,K){

    for(var i=0;i<K;i++){

      var qrand = this.rand_conf();
      var qnear = this.nearest_vertex(qrand);
      var qnew = this.new_conf(qnear,qrand,deltaq);
      stroke('orange'); // Change the color
      strokeWeight(5); // Make the points 10 pixels in size
      point(qnew.x, qnew.y);
      stroke('green');
      strokeWeight(2);
      line(qnew.x, qnew.y,qnear.x, qnear.y)
      if(i!=0){
      qnear = this.nearest_cvertex(qnew,qnear);
      qnew = this.new_conf(qnear,qnew,deltaq);
       }
      while((this.c1.x<qnew.x && qnew.x<this.c2.x) && (this.c1.y<qnew.y && qnew.y< this.c2.y)){
         qrand = this.rand_conf();
         qnear = this.nearest_vertex(qrand);
         qnew = this.new_conf(qnear,qrand,deltaq);
         stroke('orange'); // Change the color
         strokeWeight(5); // Make the points 10 pixels in size
         point(qnew.x, qnew.y);
         stroke('green');
         strokeWeight(2);
         line(qnew.x, qnew.y,qnear.x, qnear.y)
         qnear = this.nearest_cvertex(qnew,qnear);
         qnew = this.new_conf(qnear,qnew,deltaq);
      }

      stroke('purple'); // Change the color
      strokeWeight(5); // Make the points 10 pixels in size
      point(qnew.x, qnew.y);
   /*   stroke('red'); // Change the color
      strokeWeight(4); // Make the points 10 pixels in size
      point(qrand.x, qrand.y);*/
      
      stroke('blue'); // Change the color
      strokeWeight(4); // Make the points 10 pixels in size
      line(qnew.x, qnew.y,qnear.x, qnear.y)
      this.g.add(qnear,qnew);
      this.size +=1;
      if(p5.Vector.dist(this.cb,qnew)< 50){
        return this.g.root.getp(qnew);
        break;
      }
      

    }

  }
 
  pathc(v1,v2){
  

  }
 
}


class Node {

  constructor(v){
    this.l = [];
    this.value = v;
    this.cost = 0;
    this.path = [];

  }
  setPath(d){
    this.path =d;
  }
  setCost(n){
    this.cost = n;
  }

  addN(v){
    this.l.push(v);
  }
  doWork(parent,child){
    if(this.value == parent){
      var d = this.path.slice();
      d.push(child.value);
      child.setPath(d);
      var distance = p5.Vector.dist(this.value,child.value);
      child.setCost(this.cost+distance);
      this.addN(child);

      return true;
    }else{
      var flag = false;
      for(var i=0; i<this.l.length;i++){
        if(flag)continue;
        flag = this.l[i].doWork(parent,child);

      }
      return flag;
    }
  }

getp(child){
    if(this.value == child){
      return this.path;
    }else{
      var flag = false;
      for(var i=0; i<this.l.length;i++){
        if(flag)continue;
        flag = this.l[i].getp(child);

      }
      return flag;
    }
  }


}

class Tree {

  constructor(v){
    this.root = new Node(v);
    this.size = 1;

  }
  add(parent, child){
    var c = new Node(child);
    this.root.doWork(parent,c);
    this.size +=1;
  }
  
}

