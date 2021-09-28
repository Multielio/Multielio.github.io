
class Box{
  constructor(){
   this.x =random(400);
   this.y =random(400);
   this.z =0;
  }
  
  bdraw(){
    noStroke();
    rectMode(CENTER);
    fill(this.z*255,random(40),random(150),this.z*200);
    ellipse(this.x*(-this.z+1),this.y,8*sin(this.z+1),this.z*700,2);
    this.y = (1.1-(height-this.y)/height)*1.+this.y;
    this.z = 1-(height-this.y)/height;
    if(this.y>height){
    this.y = 0;
    this.z = 0;
    }
  }
  
}
var a = [];

function setup() {
  createCanvas(400, 400);
  for(var i =0;i<300;i++){
   a[i] =new Box();
  }
}

function draw() {
  background(220);
  for(var i =0;i<300;i++){
    a[i].bdraw();
  }
}