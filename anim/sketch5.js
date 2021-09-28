
class Box{
  constructor(offset){
   this.x =offset+random(25);
   this.y =random(400);
   this.z =random(100);
   this.teta = 0;
  }
  
  bdraw(){
    noStroke();
    rectMode(CENTER);
    fill(this.z*2.5,random(40)*0.1*(height-this.y)*sin(exp(this.teta)),random(150),this.z*2.5);
    rect(this.x,this.y,5,30,2);
    this.teta +=0.01;
    this.x = (width-this.x)*0.0+this.x;
    this.y = (height-this.y)*1.2*sin(exp(this.teta))*0.001*this.z+0.1 +this.y;
    if(this.y>height){
    this.y = 0;
    }
    if(this.teta>2){
      this.teta =0;
    }
  }
  
}


class Beam{
  constructor(nbr,offset){
    this.nbr= nbr;
    this.a = [];
     for(var i =0;i<this.nbr;i++){
       this.a[i] =new Box(offset);
      }
  }
  upda(){
      for(var i =0;i<this.nbr;i++){
        this.a[i].bdraw();
      }
    }
    
 }
  
  
  
  

var a=[];

function setup() {
  createCanvas(400, 400);
  for(var i =0;i<3;i++){
       this.a[i] =new Beam(100+i*50,80*i+100);
    }
}

function draw() {
  background(220);
  for(var i =0;i<3;i++){
       this.a[i].upda();
    }
}