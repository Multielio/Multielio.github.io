class Priority{
 constructor(){
   this.a = [];
 }
  insert(e,p){
    
    if(this.isempty()){
      this.a = [new Pe(e,p)];
    }else{
      
      if(!this.contains(e)){
      for(var k=0;k<this.a.length;k++){
    
        if(this.a[k].p >p){
          this.a.splice( k, 0, new Pe(e,p));
          return;
        }
      }
      this.a.push(new Pe(e,p));
      }else{
        var p2=0;
        for(var k=0;k<this.a.length;k++){
        if(this.a[k].e.equalP(e.i,e.j)){
          p2 = this.a[k].p
          this.a.splice( k, 1);
        }
        }
         p = max(p,p2);
        this.insert(e,p);
        // Pas opti
      }
    }
  }
  
  contains(e){
    for(var k=0;k<this.a.length;k++){
      if(this.a[k].e.i==e.i && this.a[k].e.j==e.j ){
       return true; 
      }
    }
    return false;
  }
  
  isempty(){
   return (this.a.length)==0; 
  }
  
  pop(){
    if(!this.isempty()){
      return this.a.shift();
    } 
  }
  
}
class Pe{
 constructor(e,p){
   this.e =e;
   this.p =p;
 }
}