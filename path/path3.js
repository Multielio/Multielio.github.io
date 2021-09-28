

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
    for(var k=i;k<ip;k++){
       for(var v=j;v<jp;v++){
        this.matrix[k][v] = new Case(k,v,500,ctype.OBSTACLE);
       } 
    }
  }
  addBigObstacleDiff(i,j,ip,jp,p){
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
          this.matrix[ip][jp].type = ctype.PATH;
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
  



function con(arr,i,j){
  for(var k=0; k<arr.length;k++){
   if(arr[k].equalP(i,j)){
     return true;
   }
  }
  return false;
  
}

function cget(arr,i,j){
  for(var k=0; k<arr.length;k++){
   if(arr[k].equalP(i,j)){
     return arr[k];
   }
  }
  return false;
  
}
  

var m;
var lv=75;
function setup() {
  createCanvas(400, 400);
  m = new Map(30,lv);
  m.cmatrix();

  m.addBigObstacleDiffc(150,150,250,250,1);
  m.addBigObstacleDiffc(350,0,400,100,1);
  m.pathc(20,20,350,350);
  
  
 
  
}

function draw() {
  var p = min(floor(map(mouseX, 0, 400, 75, 150)),150);
  if(p<75){
    p = 75;
  }
  if(lv != p){
    lv = p;
    setup();
   
  }
  background(220);
  m.dis();
  m.pathitc();
  m.pathitc();
}