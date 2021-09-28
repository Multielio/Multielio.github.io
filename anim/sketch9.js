
class Box{
  constructor(offset){
   this.x =random(25);
   this.y =offset +random(25);
   this.z =random(100);
   this.teta = 0;
   this.direc = 1;
   this.f = 0;
    this.offset = offset;
  }
  
  bdraw(d){
    noStroke();
    rectMode(CENTER);
    noFill();
    fill(random(50)*this.direc*d +74,random(50)*0.1*(height-this.y)*sin(exp(this.teta)),this.z*2.5,this.direc*125*this.teta +125);
    rotate(this.teta*PI/3);
    rect(this.x,this.y,20,20);
    this.teta +=this.direc*0.0001;
    this.y = (height-this.y)*0.01+this.y;
    this.x = (width-this.x)*1.2*sin(this.teta^2+this.teta^3)*0.001*this.z+0.1 +this.x;
    this.f += 0.01;
    if(this.f >2.5){
      this.teta = 0;
      this.direc = 1;
      this.x =random(25);
      this.y =d +random(25);
      this.z =random(100);
      this.f = 0;
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
  for(var i =0;i<2;i++){
       this.a[i] =new Beam(50,80*i+20);
    }
}

function draw() {
  background(220);
  for(var i =0;i<2;i++){
       this.a[i].upda();
    }
}