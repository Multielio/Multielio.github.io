class Case{
  
 constructor(i,j,w,ct){
   this.i=i;
   this.j=j;
   this.type= ct;
   this.w = w;
   this.ow = w;
   this.c=-1;
   this.pi =i;
   this.pj =j;
   
 }
  equalP(i,j){
    return i==this.i && j==this.j;
    
  }
 
  getNeighbors(nx,ny,matrix){


    var d = [];
    if(this.isOnMap(this.i+1,this.j,nx,ny,matrix)){
      d.push(matrix[this.i+1][this.j]);
    }
    if(this.isOnMap(this.i-1,this.j,nx,ny,matrix)){
      d.push(matrix[this.i-1][this.j]);
    }
    if(this.isOnMap(this.i,this.j+1,nx,ny,matrix)){
      d.push(matrix[this.i][this.j+1]);
    }
    if(this.isOnMap(this.i,this.j-1,nx,ny,matrix)){
      d.push(matrix[this.i][this.j-1]);
    }
    
    if(this.isOnMap(this.i+1,this.j+1,nx,ny,matrix)){
      matrix[this.i+1][this.j+1].w *= Math.sqrt(2); 
      d.push(matrix[this.i+1][this.j+1]);
    }
    if(this.isOnMap(this.i-1,this.j-1,nx,ny,matrix)){
      matrix[this.i-1][this.j-1].w*= Math.sqrt(2); 
      d.push(matrix[this.i-1][this.j-1]);
    }
    if(this.isOnMap(this.i-1,this.j+1,nx,ny,matrix)){
      matrix[this.i-1][this.j+1].w *= Math.sqrt(2); 
      d.push(matrix[this.i-1][this.j+1]);
    }
    if(this.isOnMap(this.i+1,this.j-1,nx,ny,matrix)){
      matrix[this.i+1][this.j-1].w*= Math.sqrt(2); 
      d.push(matrix[this.i+1][this.j-1]);
    }
    
    return d;
    
  }
  isOnMap(i,j,nx,ny,matrix){
   return (i>=0)&&(i<nx)&&(j>=0)&&(j<ny)&&(matrix[i][j].type != ctype.OBSTACLE); 
  }
    
}
