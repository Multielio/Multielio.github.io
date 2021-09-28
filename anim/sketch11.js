
class Pendule{
  
 constructor(){
   this.l = 300;
   this.g = 9.81;
   this.teta = PI/6;
   this.w = 0;
   this.dt = 0.1;
   this.proj=[];
   this.n = 0;

 }
  
 drawp(){
   var ct= this.teta;
   var wt= this.w;
   this.teta = ct+wt*this.dt;
   this.w = wt +(-1)*(this.g/this.l)*ct*this.dt;
   line(200,10,200+sin(this.teta)*this.l, 10+cos(this.teta)*this.l);
   var v = 100;
   if(this.n%4 ==0){
   this.proj.push(new Proj(10,200,v*cos(this.teta),v*sin(this.teta)));
   }
   for(var i=0; i<this.proj.length;i++){
    this.proj[i].drawp();
     
   }
   this.n += 1;
   
 }
  
  
  
}
class Proj{
 constructor(x,y,vx,vy){
  this.ix=x;
  this.iy=y;
  this.x=x;
  this.y=y;
  this.vx=vx;
  this.vy=vy;
  this.t = 0;
  this.r = 175+random(75);
  this.b = random(100);
  this.a = 150+random(50);
 }
  drawp(){
    this.x = (this.vx*this.t)+this.ix;
    this.y = ((-1)*9.81*(pow((this.t),2))/2) +this.vy*this.t + this.iy;
    noStroke();
    fill(this.r,20,this.b,this.a);
    ellipse(this.y,this.x,7,100);
    stroke(0);
    this.t += 0.01;
  }
  
  
  
}
var p;
function setup() {
  createCanvas(400, 400);
  p = new Pendule();
}

function draw() {
  background(220);
  p.drawp();

}