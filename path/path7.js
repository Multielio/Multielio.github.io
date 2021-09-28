


class Robot{
 
  constructor(initial,intitalteta){
    this.position = initial;
    this.angle = intitalteta;
    this.velocity = createVector(0,0);
    this.vnorm = 15;
    this.l = 2;
    this.lposition = [];
  }
  
  eupdate(dt,p){
   
   var vold = this.velocity.copy();
   var vnew =this.velocity.copy();

   var a = (-1)*tan(this.angle);
   var b = 1;
   var c = (tan(this.angle) * this.position.x) - this.position.y;
 
   var look =70;
   var plook = this.lookahead(p.path,look);
   fill(255);
   ellipse(plook.x,plook.y,5,5);
   var xl = abs(a*plook.x+b*plook.y +c)/(sqrt(a*a+b*b));
   var side = (sin(this.angle)*(plook.x-this.position.x)-cos(this.angle)*(plook.y-this.position.y)) < 0 ? -1:1;
    
   var curvature = (2*xl/(look*look))*side;
   //var arcx = side*abs(1/curvature)*cos(this.teta);
   //var arcy = -side*abs(1/curvature)*sin(this.teta);
   var arcx = side*abs(1/curvature)*sin(this.angle);
   var arcy =(-1)*side*abs(1/curvature)*cos(this.angle);
   var arcteta1 = curvature>0? 0:(50*curvature);
   var arcteta2 = curvature>0? 50*curvature:0;
    console.log(arcteta2);
   noFill();
   stroke(255,0,200);
   arc(this.position.x+arcx, this.position.y+arcy,2*abs(1/curvature),2*abs(1/curvature), 0, 2*PI);
   stroke(0);
   console.log(1/curvature);
   var vr = this.vnorm*(2-curvature*this.l)/2;
   var vl = this.vnorm*(2+curvature*this.l)/2;
   this.vnorm = (vl+vr)/2;
   vnew.x = this.vnorm*cos(this.angle);
   vnew.y = this.vnorm*sin(this.angle);
   this.velocity = vnew;
   vold.add(vnew);
   vold.mult(dt/2);
   this.position.add(vold);
   this.lposition.push(this.position.copy());
   var w = (vr-vl)/this.l;
   this.angle += w*dt;
   for(var i=0;i<this.lposition.length;i++){
    if(i%15==0){
      rectMode(CENTER);

      fill(255,100,100);
      var pos = this.lposition[i];
      ellipse(pos.x,pos.y,5,5);
      fill(255);
  
    }
   }
   
    
    
  }
  lookahead(p,lookdistance){
    var i = 0;
    var goodt=0 ;
    var goodi=0;
    while(i<p.length-1){
      var e = p[i];
      var l = p[i+1];
      var d = p5.Vector.sub(l,e);
      var f = p5.Vector.sub(e,this.position);
      var a = d.dot(d)
      var b = 2*f.dot(d)
      var c = f.dot(f) - lookdistance*lookdistance
      var discriminant = b*b - 4*a*c
      var t = 0;
      if (discriminant < 0) {
      }else{
      discriminant = sqrt(discriminant)
      var t1 = (-b - discriminant)/(2*a)
      var t2 = (-b + discriminant)/(2*a)
      if (t1 >= 0 && t1 <=1){
        t= t1;
        goodt=t;
        goodi=i;
      }
      if (t2 >= 0 && t2 <=1){
        t= t2 ;
        goodt=t;
        goodi=i;
      //otherwise, no intersection
      }
      }
      i++;
    }

    console.log(p[goodi]);
    console.log(p[goodi+1]);
    var ee = p[goodi];
    var ll = p[goodi+1];
    var dd = p5.Vector.sub(ll,ee);
    dd.mult(goodt);
  
    return p5.Vector.add(ee,dd);
  

  }
 
  
  
}



class Path {
 
  constructor() {
    this.radius = 10;
    this.path = [];
  }
  addpoint(x,y){

    this.path.push(createVector(x,y));
  }
 
  display() { 
    stroke(0);
    strokeWeight(5*2);
    stroke(0,100);
    noFill();
    beginShape();
    for (var i=0;i<this.path.length;i++) {
      vertex(this.path[i].x,this.path[i].y);
    }
    endShape();
    strokeWeight(1);
    stroke(0);
    beginShape();
    for (var i=0;i<this.path.length;i++) {
      vertex(this.path[i].x,this.path[i].y);
    }
    endShape();
  }
}



var n=[];
var p;
function setup() {
  createCanvas(800, 220);
  n.push(new Robot(createVector(100,75),PI/4));
  p = new Path();
  p.addpoint(0,0);
  p.addpoint(200,200);
  p.addpoint(350,50);
  p.addpoint(400,100);
  p.addpoint(450,20);
  p.addpoint(600,150);
  p.addpoint(800,200);
}

function draw() {
  background(220);
  p.display();
  for(var i=0;i<n.length;i++){
    n[i].eupdate(0.05,p);
    rectMode(CENTER);
    fill(255,100,100);
    translate(n[i].position.x, n[i].position.y);
    rotate(n[i].angle);
    rect(0,0,15,15);
    fill(255);
  }
  
  
}