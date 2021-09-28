
class Pendule{
  
 constructor(){
   this.l = 300;
   this.g = 9.81;
   this.teta = PI/6;
   this.w = 0;
   this.dt = 0.1;
   this.proj=[];

 }
  
 drawp(){
   var ct= this.teta;
   var wt= this.w;
   this.teta = ct+wt*this.dt;
   this.w = wt +(-1)*(this.g/this.l)*ct*this.dt;
   line(200,10,200+sin(this.teta)*this.l, 10+cos(this.teta)*this.l);
   var v = 100;
   this.proj.push(new Proj(200,200,v*cos(this.teta),v*sin(this.teta)));
   for(var i=0; i<this.proj.length;i++){
    this.proj[i].drawp();
     
   }
   
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
 }
  drawp(){
    this.x = (this.vx*this.t)+this.ix;
    this.y = ((-1)*9.81*(pow((this.t),2))/2) +this.vy*this.t + this.iy;
    fill(255,0,0);
    rect(this.y,this.x,10,10);
    this.t += 0.01;
  }
  
  
  
}
var p;
function setup() {
  createCanvas(400, 400);
  p = new Pendule();
}

function draw() {
  background(255);
  p.drawp();

}