


class Robot{
 
  constructor(initial,intitalteta){
    this.position = initial;
    this.angle = intitalteta;
    this.velocity = createVector(0,0);
    this.vnorm = 15;
    this.l = 2;
    this.lposition = [];
    this.stop = false;
  }
  displayvel(vl,vr){

   rectMode(CORNER);
   fill(255);
   rect(400,20,20,70);
   fill(255,0,0);
   var scaledvl = map(vl-13,0,3,0,70);
   var scaledvr = map(vr-13,0,3,0,70);
   rect(400,20+70-scaledvl,20,scaledvl);
   fill(255);
   rect(430,20,20,70);
   fill(0,0,255);
   rect(430,70+20-scaledvr,20,scaledvr);
   fill(255);

  }
  displaygvel(){
       stroke(0);
       fill('yellow');
       textSize(40);
       textAlign(RIGHT);
       textStyle(BOLD);
       text(this.vnorm, 350, 50);
       fill(255);

  }
  
  eupdate(dt,p){
   if(this.stop)return;
   if(this.getnear(p) == p.path[p.path.length-1]){
   	this.stop = true;
   	return;
   }
   
   var vold = this.velocity.copy();
   var vnew =this.velocity.copy();

   var a = (-1)*tan(this.angle);
   var b = 1;
   var c = (tan(this.angle) * this.position.x) - this.position.y;
 
   var look =50;
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
   noFill();
   stroke(255,0,200);
   arc(this.position.x+arcx, this.position.y+arcy,2*abs(1/curvature),2*abs(1/curvature), 0, 2*PI);
   stroke(0);
   this.vnorm = this.getnear(p).z;
   this.displaygvel();

   
   var vr = this.vnorm*(2-curvature*this.l)/2;
   var vl = this.vnorm*(2+curvature*this.l)/2;
   this.displayvel(vl,vr);
  

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
  getnear(p){
    var dis = p5.Vector.dist(p.path[0],this.position);
    var ind = 0;
    for(var i =0; i<p.path.length;i++){
      var distest = p5.Vector.dist(p.path[i],this.position);
      if(distest<dist){
        ind = i;
        dist = distest;
      }

    }
    return p.path[ind];
  }
  lookahead(p,lookdistance){
    var i = 0;
    var goodt=0 ;
    var goodi=0;
    while(i<(p.length-1)){
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
    this.maxvel = 15;
    this.k = 2;
    this.a = 3; // Max acceleration
  }
  addpoint(x,y){

    this.path.push(createVector(x,y));
  }
  addvect(v){

    this.path.push(v);
  }
  smooth(weight,weight_smooth,tolerance){
    var npath = this.path.copy();
    var change = tolerance;
   



  }
  calculate(){
    for(var i =0;i<this.path.length;i++){
      var newv ;
      var cpoint = this.path[i];
      var curvature =0;
      if(i==0 || i == this.path.length-1){
        newv = min(this.maxvel, this.k/curvature);

      }else{
        var ppoint = this.path[i-1];
        var npoint = this.path[i+1];
        if(cpoint.x == ppoint.x){
          cpoint.x += 0.001;
        }
        var k1= 0.5* (pow(cpoint.x,2)+pow(cpoint.y,2)-pow(ppoint.x,2)-pow(ppoint.y,2))/(cpoint.x-ppoint.x);
     
        var k2 = (cpoint.y-ppoint.y)/(cpoint.x-ppoint.x);
        var b = 0.5*(pow(ppoint.x,2)- (2*ppoint.x*k1) +pow(ppoint.y,2)-pow(npoint.x,2)+(2*npoint.x*k1)-pow(npoint.y,2))/(npoint.x*k2-npoint.y+ppoint.y-ppoint.x*k2);
        var a = k1-k2*b;
        var r = sqrt(pow(cpoint.x-a,2)+pow(cpoint.y-b,2));
        curvature = 1/r;
        if(Number.isNaN(curvature)){
          curvature =0;
        }
        newv = min(this.maxvel, this.k/curvature);
      }
      if(Number.isNaN(newv)){
        newv = 0;
      }
      cpoint.z = newv;
      
    }
    for(var i =0;i<this.path.length;i++){
      var newv ;
      var cpoint = this.path[i];
      if(i == this.path.length-1){
        newv =0;
      }else{
        var npoint = this.path[i+1];
        var dis =p5.Vector.dist(cpoint,npoint);
        newv = min(cpoint.z,sqrt(pow(npoint.z,2)+2*this.a*dis));
      }
      cpoint.z = newv;
     
    }



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






var n;
var m;
var p;
var m;

var lv = 650;
var xinit = 50;
var yinit = 50;


var corner1;
var corner2;

var cible;

var a = 1;
function setup() {
  createCanvas(500, 500);
  n = new Robot(createVector(xinit,yinit),PI/2);
  corner1 = createVector(100,100);
  corner2 = createVector(200,200);
  cible = createVector(450,450);


}

function draw() {
  if(a ==1){
    background(220);
    rect(corner1.x,corner1.y,corner2.x-corner1.x,corner2.y-corner1.y);
    m = new MapRRT(createVector(250,250),corner1,corner2,cible);
    var pp = m.gen(10,600);
    stroke('orange'); // Change the color
    strokeWeight(5); // Make the points 10 pixels in size
    for(var f =0;f<pp.length;f++){

      point(pp[f].x,pp[f].y);
    }
    a=0;
  }
  // p = new Path();
  // for(var i = 0;i<m.gpath.length;i++){
  // 	p.addvect(m.gpath[i]);
  // }
  // p.display();
  
  //n.eupdate(0.05,p);
  // rectMode(CENTER);
  // fill(255,100,100);
  // translate(n.position.x, n.position.y);
  // rotate(n.angle);
  // rect(0,0,15,15);
  // fill(255);

}


  
  
