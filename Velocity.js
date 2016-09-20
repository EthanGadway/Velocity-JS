var Velocity=(function(){
   function Velocity(x,y){
      var $=this,
         xTick=0, xDur=0, xOffset=0, xDist=0, xFactor=0, xMode=false
         yTick=0, yDur=0, yOffset=0, yDist=0, yFactor=0, yMode=false;
      $.xRun=$.yRun=false;
      $.x=$.y=0;
      $.setVelX= function(dist,dur,mode){
         xFactor= mode==0? dist/dur: (Math.PI/2)/dur;
         xTick=0; xMode= mode;
         xDur=dur; xDist=dist; xOffset= this.x;
         this.xRun=true;
         return this;
      };
      $.setVelY= function(dist,dur,mode){
         yFactor= mode==0? dist/dur: (Math.PI/2)/dur;
         yTick=0; yMode= mode;
         yDur=dur; yDist=dist; yOffset= this.y;
         this.yRun=true;
         return this;
      };
      $.setVel= function(distX,durX,modeX,distY,durY,modeY){
         return this.setVelX(distX,durX,modeX)
            .setVelY(distY,durY,modeY);
      };
      $.toX= function(x,duration,mode){
         return this.setVelX(x-this.x,duration,mode);
      };
      $.toY= function(x,duration,mode){
         return this.setVelY(y-this.y,duration,mode);
      };
      $.toPos= function(x,durX,modeX,y,durY,modeY){
         return this.toX(x,durX,modeX).toY(y,durY,modeY);
      };
      //$.chain
      $.tick= function(){
         var $=this;var v=$.v,s;
         if ($.xRun && xTick<=xDur){
            if (xMode==0){//linear
               this.x= xOffset+xTick*xFactor;
            } else if (xMode==1){//ease-out
               this.x= xOffset+Math.sin(xTick*xFactor)*xDist;
            } else if (xMode==2){//ease-in
               this.x= xOffset+(1-Math.sin((xDur-xTick)*xFactor))*xDist;
            } else if (xMode==3){//ease-in-out
               var d=xDist/2,t=xDur/2;
               if (xTick<=t){
                  this.x= xOffset+(1-Math.sin((xDur-xTick*2)*xFactor))*d;
               } else {
                  this.x= xOffset+d+Math.sin((xTick-t)*xFactor*2)*d;
               }
            }
            xTick++;
            if (xTick>xDur){ xTick=xDur=xDist=xFactor=0;xOffset=this.x; xReverse=$.xRun=false; }
         }
         if ($.yRun && yTick<=yDur){
            if (yMode==0){//linear
               this.y= yOffset+yTick*yFactor;
            } else if (yMode==1){//ease-out
               this.y= yOffset+Math.sin(yTick*yFactor)*yDist;
            } else if (yMode==2){//ease-in
               this.y= yOffset+(1-Math.sin((yDur-yTick)*yFactor))*yDist;
            } else if (yMode==3){//ease-in-out
               var d=yDist/2,t=yDur/2;
               if (yTick<=t){
                  this.y= yOffset+(1-Math.sin((yDur-yTick*2)*yFactor))*d;
               } else {
                  this.y= yOffset+d+Math.sin((yTick-t)*yFactor*2)*d;
               }
            }
            yTick++;
            if (yTick>yDur){ yTick=yDur=yDist=yFactor=0;yOffset=this.y; yReverse=$.yRun=false; }
         }
      };
      return $;
   }
   return Velocity;
})();
