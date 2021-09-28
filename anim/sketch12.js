
class Pendule{
  
 constructor(l){
   this.l = l;
   this.g = 9.81;
   this.teta = PI/6;
   this.w = 0;
   this.dt = 0.1;
   this.proj=[];
   this.n = 0;

 }
  
 drawp(offsetx,offsety){
   var ct= this.teta;
   var wt= this.w;
   this.teta = ct+wt*this.dt;
   this.w = wt +(-1)*(this.g/this.l)*ct*this.dt;
   
   noStroke();
   for(var i= 0;i<10;i++){
     fill(255,0,200*i/10,10+100*i/10);
     var ex = offsetx + sin(this.teta)*(this.l)*i*0.20;
     var ey = offsety + cos(this.teta*0.1)*this.l;
     ellipse(ex,ey ,10,10+abs(sin(this.teta))*15);
   }
   var v = 100;
  
   this.n += 1;
   
 }
  
  
  
}
class Pan{
 constructor(h){
  this.a = [];
  for(var i=0;i<5;i++){
      this.a[i] = new Pendule(h);
      
  } 
 }
  drawp(){
    for(var i=0;i<this.a.length;i++){
      this.a[i].drawp(200,10 +10*i);
      
    }
  } 
}


class Sum{
 constructor(){
  this.a = [];
  for(var i=0;i<5;i++){
      this.a[i] = new Pan(50+50*i);
      
  } 
 }
  drawp(){
    for(var i=0;i<this.a.length;i++){
      this.a[i].drawp();
      
    }
  } 
}

var p;
function setup() {
  createCanvas(400, 400);
  p = new Sum();
}

function draw() {
  background(220);
  p.drawp();

}