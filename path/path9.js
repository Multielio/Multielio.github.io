


class Robot{
 
  constructor(initial,intitalteta,lookd){
    this.position = initial;
    this.angle = intitalteta;
    this.velocity = createVector(0,0);
    this.vnorm = 15;
    this.l = 2;
    this.lposition = [];
    this.stop = false;
    this.look = lookd;
  }
  
  eupdate(dt,p){
   if(this.stop)return;
   if(p.path.length<2){
    this.stop = true;
    return;
   }
   var vold = this.velocity.copy();
   var vnew =this.velocity.copy();

   var a = (-1)*tan(this.angle);
   var b = 1;
   var c = (tan(this.angle) * this.position.x) - this.position.y;
 
   var look =this.look;
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
  }
  addpoint(x,y){

    this.path.push(createVector(x,y));
  }
  addvect(v){

    this.path.push(v);
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


class Map{
  
  constructor(n,g){
  this.n = n;
  this.cx = width/this.n;
  this.cy = height/this.n;
  this.matrix;
  this.f = false;
  this.i;
  this.j;
  this.ip;
  this.jp;
  this.b = false;
  this.g = g;
  this.gpath = [];
    
  }
  cmatrix(){
    this.matrix = [];
    for(var u=0; u<this.n; u++) {
      this.matrix[u] = [];
      for(var v=0; v<this.n; v++) {
         this.matrix[u].push(new Case(u,v,1,ctype.NONE));
      }
    } 
  }
  dis(){
    for(var i=0;i<this.n;i++){
      for(var j=0;j<this.n;j++){
  
        
        if(this.matrix[i][j].type ==ctype.TRAIL){
          fill(200-10*this.matrix[i][j].c,0,250-8*this.matrix[i][j].c,100+this.matrix[i][j].c);
        }else if(this.matrix[i][j].type ==ctype.START){
          fill(ctype.START);
        }else if(this.matrix[i][j].type ==ctype.PATH){
          fill(ctype.PATH);
        }else if(this.matrix[i][j].type ==ctype.END){
          fill(ctype.END);
        }else if(this.matrix[i][j].type ==ctype.OBSTACLE){
          fill(0,0,0);
        }else{
          fill(255,255,255);
        }
        noStroke();
        rect(i*this.cx , j*this.cy,this.cx,this.cy);
        
      }  
    }
   }
  addObstacle(i,j){
    this.matrix[i][j] = new Case(i,j,500,ctype.OBSTACLE);
  }
  addBigObstacle(i,j,ip,jp){
  	if(i>0 && j>0 && ip>0 && jp>0 && i<this.n && j<this.n && ip<this.n && jp<this.n){
	    for(var k=i;k<ip;k++){
	       for(var v=j;v<jp;v++){
	        this.matrix[k][v] = new Case(k,v,500,ctype.OBSTACLE);
	       } 
	    }
	}
  }
  addBigObstacleDiff(i,j,ip,jp){
    this.addBigObstacle(i,j,ip,jp)
    var im = (i+ip)/2;
    var jm = (j+jp)/2;
    for(var k=0;k<this.n;k++){
       for(var v=0;v<this.n;v++){
        this.matrix[k][v].w = this.matrix[k][v].w+exp(this.g)*(1/exp(1.25*(pow((k-im),2)+pow((v-jm),2))));

       } 
    }
    
  }
  addBigObstaclec(x1,y1,x2,y2){
    this.addBigObstacle(floor(x1/this.cx),floor(y1/this.cy),floor(x2/this.cx),floor(y2/this.cy))
  }
  addBigObstacleDiffc(x1,y1,x2,y2,p){
    this.addBigObstacleDiff(floor(x1/this.cx),floor(y1/this.cy),floor(x2/this.cx),floor(y2/this.cy),p)
  }
  pathc(x1,y1,x2,y2){
    this.path(floor(x1/this.cx),floor(y1/this.cy),floor(x2/this.cx),floor(y2/this.cy));
    
  }
  pathitc(){
    this.pathit();
    
  }
  path(i,j,ip,jp){
    this.i =i;
    this.j =j;
    this.ip =ip;
    this.jp =jp;

    this.pq = new Priority();
    this.pq.insert(new Case(i,j,ctype.START),10);
    this.matrix[i][j].c =0;
    this.matrix[i][j].type =ctype.START;
    this.matrix[ip][jp].type =ctype.END;
    while(this.f==false){
    	this.pathit();
    }
    this.pathit();
    this.gpath.reverse();
    
  }
  pathit(){
     
      if(this.f){
        if(!this.b){
        var ip= this.ip;
        var jp = this.jp;
        while((!(this.i==ip && this.j==jp))){
          var cell = this.matrix[ip][jp];
          var ip = cell.pi;
          var jp = cell.pj;
          if(!(this.i==ip && this.j==jp)){
          this.gpath.push(createVector((ip+0.5)*this.cx,(jp+0.5)*this.cy));
          }

         
        }
        this.b = true;
        }
        return;
      }
      var c = this.pq.pop().e;
      if(c.type ==ctype.END){
        this.f = true;
        return;
      }
      
      var neigh =c.getNeighbors(this.n,this.n,this.matrix);
      for(var h=0; h<neigh.length;h++){
        var e = neigh[h];
        var newcost = c.c + e.w;
        var currentcost = e.c;
        if((currentcost  ==-1) || (newcost < currentcost )  ){
            this.matrix[e.i][e.j].c = newcost;
            this.pq.insert(e,newcost);
            this.matrix[e.i][e.j].pi = c.i;
            this.matrix[e.i][e.j].pj = c.j;
            this.matrix[e.i][e.j].w = e.ow;
            if(this.matrix[e.i][e.j].type != ctype.END && e.type != ctype.OBSTACLE && this.matrix[e.i][e.j].type != ctype.START){
            this.matrix[e.i][e.j].type= ctype.TRAIL;
            }
        }
      }
      
      
    }
  }



var n;
var p;
var m;
var mous =40;
var lv = 250;
var xinit = 50;
var yinit = 50;

var x1o1 = 300;
var y1o1 = 300;
var x2o1 = 400;
var y2o1 = 400;

var x1o2 = 350;
var y1o2 = 100;
var x2o2 = 400;
var y2o2 = 200;

var xend = 450;
var yend = 450;

var u=0;
function setup() {
  createCanvas(500, 500);
  lv = 250;
  xinit = 50;
  yinit = 50;

  x1o1 = 300;
  y1o1 = 300;
  x2o1 = 400;
  y2o1 = 400;

  x1o2 = 350;
  y1o2 = 100;
  x2o2 = 400;
  y2o2 = 200;

  xend = 450;
  yend = 450;
  n = new Robot(createVector(xinit,yinit),PI/2,mous);

}

function draw() {
  var mouss = min(floor(map(mouseX, 0, 500, 30, 100)),100);
  if(mouss<30){
    mouss = 30;
  }
  if(mouss != mous){
    mous = mouss;
    setup();
   
  }
  background(220);
  rect(x1o1-100*sin(u),y1o1,x2o1-x1o1,y2o1-y1o1);
  rect(x1o2,y1o2,x2o2-x1o2,y2o2-y1o2);
  m = new Map(50,lv);
  m.cmatrix();
  m.addBigObstacleDiffc(x1o1-100*sin(u),y1o1,x2o1-100*sin(u),y2o1);
  m.addBigObstacleDiffc(x1o2,y1o2,x2o2,y2o2);
  m.pathc(xinit,yinit,xend,yend);
  p = new Path();
  for(var i = 0;i<m.gpath.length;i++){
    p.addvect(m.gpath[i]);
  }
  p.display();

n.eupdate(0.05,p);
rectMode(CENTER);
fill(255,100,100);
translate(n.position.x, n.position.y);
rotate(n.angle);
rect(0,0,15,15);
fill(255);
if(n.position.x<width && n.position.y<height){
xinit = n.position.x;
yinit = n.position.y;
}
u= u+0.03;  
  
  
}