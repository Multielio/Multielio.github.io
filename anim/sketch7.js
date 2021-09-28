
class Box{
  constructor(offset){
   this.x =offset+random(25);
   this.y =random(400);
   this.z =random(100);
   this.teta = 0;
  }
  
  bdraw(d){
    noStroke();
    rectMode(CENTER);
    fill(this.z*2.5,random(50)*0.1*(height-this.y)*sin(exp(this.teta)),d*random(150),this.z*2.5);
    ellipse(this.x,this.y,30,10,2);
    this.teta +=0.01;
    this.y = (height-this.y)*0.0+this.y;
    this.x = (width-this.x)*1.2*sin(this.teta^2+this.teta^3)*0.001*this.z+0.1 +this.x;
    if(this.x>width){
    this.x = 0;
    }
    if(this.teta>3){
      this.teta =0;
    }
  }
  
}


class Beam{
  constructor(nbr,offset){
    this.nbr= nbr;
    this.offset = offset
    this.a = [];
     for(var i =0;i<this.nbr;i++){
       this.a[i] =new Box(offset);
      }
  }
  upda(){
      for(var i =0;i<this.nbr;i++){
        this.a[i].bdraw(this.offset);
      }
    }
    
 }
  
  
  
  

var a=[];

function setup() {
  createCanvas(400, 400);
  for(var i =0;i<5;i++){
       this.a[i] =new Beam(90+i*25,45*i+80);
    }
}

function draw() {
  background(220);
  for(var i =0;i<5;i++){
       this.a[i].upda();
    }
}