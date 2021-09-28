
class Box{
  constructor(){
   this.x =random(400);
   this.y =random(400);
   this.z =random(100);
  }
  
  bdraw(){
    noStroke();
    rectMode(CENTER);
    fill(this.z*2.5,random(40),random(150),this.z*2.5);
    rect(this.x,this.y,5,30,2);
    this.y = (height-this.y)*0.001*this.z+0.1 +this.y;
    if(this.y>height){
    this.y = 0;
    }
  }
  
}
var a = [];

function setup() {
  createCanvas(400, 400);
  for(var i =0;i<200;i++){
   a[i] =new Box();
  }
}

function draw() {
  background(220);
  for(var i =0;i<200;i++){
    a[i].bdraw();
  }
}