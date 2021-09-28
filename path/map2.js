class MapRRT{
  
  constructor(loc){
  
  this.gpath = [];
  this.g = new Tree(loc);
  }

  rand_conf(){
    var v = createVector(random(width),random(height));

    return v;
  }

  nearest_vertex(qrand){
    var pile = [this.g.root];
    var dist = p5.Vector.dist(this.g.root.value,qrand);
    var qnear = this.g.root.value;
    while(pile.length >0){
        var el = pile.pop();
        if(el ==undefined)continue;
        var distnew = p5.Vector.dist(el.value,qrand);
        if (distnew < dist){
          dist = distnew;
          qnear = el.value;
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
      stroke('purple'); // Change the color
      strokeWeight(3); // Make the points 10 pixels in size
      point(qnew.x, qnew.y);
      stroke('blue'); // Change the color
      strokeWeight(1); // Make the points 10 pixels in size
      line(qnew.x, qnew.y,qnear.x, qnear.y)
      this.g.add(qnear,qnew);

    }

  }
 
  pathc(v1,v2){
  

  }
 
}


class Node {

  constructor(v){
    this.l = [];
    this.value = v;

  }
  addN(v){
    this.l.push(v);
  }
  doWork(parent,child){
    if(this.value = parent){
      this.addN(child);
      return true;
    }else{
      var flag = false;
      for(var i=0; i<this.l.lenght;i++){
        if(flag)continue;
        flag = l[i].doWork(parent,child);

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

