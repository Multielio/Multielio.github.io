


class Entity{
 
  constructor(){
    this.position = createVector(50,50);
    this.mass = 10;
    this.velocity = createVector(20,20);
    this.acc = createVector(0,0);
  }
  
  eupdate(dt,p){
   
   var vold = this.velocity.copy();
   var vnew =this.velocity.copy();
   var mul = this.acc.copy();
   mul.mult(dt);
   vnew.add(mul);
   this.velocity = vnew;
   vold.add(vnew);
   vold.mult(dt/2);
   this.position.add(vold);
   this.follow(p);
    
    
  }
  follow(p) {
 
    this.acc.mult(0);
    var predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    var predictLoc = p5.Vector.add(this.position, predict);
    fill(200,0,0);
    ellipse(predictLoc.x,predictLoc.y,5,5);
    fill(255);
    var a = p.start;
    var b = p.end;
    var normalPoint = this.getNormalPoint(predictLoc, a, b);
 

    var dir = p5.Vector.sub(b, a);
    dir.normalize();
    dir.mult(10);
    var target = p5.Vector.add(normalPoint, dir);

    var distance =p5.Vector.dist(normalPoint, predictLoc);
    if (distance > p.radius) {
      this.goto(target,15,2);
    }
  }
  getNormalPoint(p, a, b) {

    var ap = p5.Vector.sub(p, a);
    var ab = p5.Vector.sub(b, a);
    ab.normalize();
    ab.mult(ap.dot(ab));
    var normalPoint = p5.Vector.add(a, ab);
 
    return normalPoint;
  }

  goto(target,maxspeed,maxforce){
    fill(200,0,100);
    ellipse(target.x,target.y,5,5);
    fill(255);
    var desired = p5.Vector.sub(target,this.position);
    desired.normalize();
    desired.mult(maxspeed);
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(maxforce);
    this.acc.add(steer);


  }
 
  
  
}

class Newbie extends Entity {
 
  constructor(){
    super();
  }
  update(p){
    
   this.eupdate(0.1,p); 
  }
  
}

class Path {
 
  constructor(v1,v2) {
    this.radius = 10;
    this.start = v1;
    this.end = v2;
  }
 
  display() { 
    strokeWeight(this.radius*2);
    stroke(0,100);
    line(this.start.x,this.start.y,this.end.x,this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x,this.start.y,this.end.x,this.end.y);
  }
}



var n;
var p;
function setup() {
  createCanvas(800, 220);
  n= new Newbie();
  n.acc = createVector(1,9.81);
  p = new Path(createVector(0,0),createVector(800,200));
}

function draw() {
  background(220);
  p.display();
  n.update(p);
  
  rectMode(CENTER);
  rect(n.position.x,n.position.y,10,10);
  
}