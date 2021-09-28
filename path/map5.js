class MapRRTStar{
  
  constructor(loc,c1,c2,cible){
      stroke('green'); 
      strokeWeight(10); 
      point(loc.x, loc.y);

      stroke('red');
      strokeWeight(10); 
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
    var qnear = this.g.root;
    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var distnew = p5.Vector.dist(el.value,qrand);
        if (distnew < dis){
          dis = distnew;
          qnear = el;
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

  /*nearest_cvertex(qrand){
    var pile = [this.g.root];
    var near =[];
    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var dis = p5.Vector.dist(el.value,qrand);
        //var searchradius =9;
        var searchradius =300*pow((log(this.size)/this.size),0.5);
        stroke('black');
        strokeWeight(1); 
        noFill();
        circle(qrand.x,qrand.y,searchradius);
        //console.log(dis);
        //console.log("sr");
        console.log(searchradius);
        if(dis>=searchradius)continue;
        near.push(el);
        pile.push.apply(pile, el.l);
      
    }
    return near;
  }*/
  nearest_cvertex(qnew,qnear){
    var pile = [this.g.root];
    var costtoqnew =10000;
    var qtoqnew = qnear;
    stroke('black');
    strokeWeight(1); 
    noFill();
    //var searchradius =300*pow((log(this.size)/this.size),0.5);
    var searchradius = 70;
    circle(qnew.x,qnew.y,searchradius);

    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var dis = p5.Vector.dist(el.value,qnew);
        
        //console.log(dis);
        //console.log("sr");
        if(dis>=searchradius)continue;
        //console.log(el.cost);
        var distnew = el.cost +dis;
        
        if (distnew < costtoqnew){
          costtoqnew = distnew;
          qtoqnew = el;
          console.log("here !!!");
        }
        pile.push.apply(pile, el.l);
      
    }
    return [qtoqnew,costtoqnew];

  }

  rewrite_nearest_cvertex(qnew,qnewcost){
    var pile = [this.g.root];
    //var searchradius =300*pow((log(this.size)/this.size),0.5);
    var searchradius = 70;
    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var dis = p5.Vector.dist(el.value,qnew[2]);
        //var searchradius =9;
     
        
        //console.log(dis);
        //console.log("sr");
  
        if(dis>=searchradius)continue;
        //console.log(el.cost);
        var distnew = qnewcost +dis;
        
        if (distnew < el.cost){
          var nodedetached = this.g.remove(el);
          this.g.add2(qnew,nodedetached);
          console.log("improved");
        }
        pile.push.apply(pile, el.l);
      
    }
  }
  
  gen(deltaq,K){

    for(var i=0;i<K;i++){

      var qrand = this.rand_conf(); // On prend un point random sur la carte
      var qnear = this.nearest_vertex(qrand); // qnear is Node
      stroke('green');
      point(qnear.value.x,qnear.value.y);
      var qnew = this.new_conf(qnear.value,qrand,deltaq);
      var toconnectqnew = this.nearest_cvertex(qnew,qnear); // Array node + cost of qnew
      
    
      while((this.c1.x<qnew.x && qnew.x<this.c2.x) && (this.c1.y<qnew.y && qnew.y< this.c2.y)){
         qrand = this.rand_conf(); // On prend un point random sur la carte
         qnear = this.nearest_vertex(qrand);
         qnew = this.new_conf(qnear.value,qrand,deltaq);
         toconnectqnew = this.nearest_cvertex(qnew,qnear);
         

      }

      var qnewnode = this.g.add(toconnectqnew[0].value,qnew);
      this.rewrite_nearest_cvertex(qnewnode,toconnectqnew[1]);
      this.size +=1;
      if(p5.Vector.dist(this.cb,qnew)< 50){
        return this.g.root.getp(qnew);
        break;
      }
      this.g.root.drawTree();
      
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
    this.pop;

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

      return [this.path,this.cost,this.value];
    }else{
      var flag = false;
      for(var i=0; i<this.l.length;i++){
        if(flag)continue;
        flag = this.l[i].doWork(parent,child);

      }
      return flag;
    }
  }
  doWorkRemove(child){
   print(child);
    for(var i=0; i<this.l.length;i++){

        if(this.l[i].value == child){
          var el = this.l[i]; 
          this.l = this.l.filter(function(el) { return el != child; });
          return [true,el];
        }else{
          
        }
    }
    var flag = false;
    var info;
    for(var i=0; i<this.l.length;i++){
      if(flag)continue;
       var u =this.l[i].doWorkRemove(child);
       flag = u[0];
       if(flag){
        info = u[1];
       }
    }
    return [flag,info];
    
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
  remap(parentpath,parentcost,parentvalue){
      var d = parentpath.slice();
      d.push(this.value);
      this.setPath(d);
      var dis = p5.Vector.dist(parentvalue,this.value);
      this.setCost(parentpath+dis);
      for(var i=0; i<this.l.length;i++){
        this.l[i].remap(this.path);
      }
  }

  drawTree(){
    for(var i=0; i<this.l.length;i++){
        stroke('blue');
        strokeWeight(2); 
        line(this.value.x, this.value.y,this.l[i].value.x, this.l[i].value.y);
        this.l[i].drawTree();
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
    var node = this.root.doWork(parent,c);
    this.size +=1;
    return node;
  }
  add2(parent, child){
    // ADD with two node objects
    this.root.doWork(parent.value,child);
    console.log(child);
    child.remap(parent[0],parent[1],parent[2]);
    this.size +=1;
  }
  remove(child){
    this.size -=1;
    // child value
    console.log('TEST');
    console.log(child);
    var u =this.root.doWorkRemove(child.value);
    console.log('TEST2');
    console.log(u[1]);
    return u[1];
    
  }
  
  
}

