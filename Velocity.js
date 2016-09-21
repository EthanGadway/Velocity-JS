var Velocity=(function(){
   function Velocity(x,y){
      var $=this,
         xTick=0, xDur=0, xOffset=0, xDist=0, xFactor=0, xMode=0
         yTick=0, yDur=0, yOffset=0, yDist=0, yFactor=0, yMode=0;
      $.xRun=$.yRun=false;
      $.x=$.y=0;
      $.setVelX= function(dist,dur,mode){
         if (isNaN(dist))throw new Error("Invalid distance; Accepting -Infinity to Infinity.")
         dur=parseInt(dur);mode=parseInt(mode);
         if(!dur>=1)throw new Error("Invalid duration; Accepting 1 to Infinity.");
         if (mode!=0&&mode!=1&&mode!=2&&mode!=3)throw new Error("Invalid mode; Accepting 0 to 3.")
         xFactor= mode==0? dist/dur: (Math.PI/2)/dur;
         xTick=0; xMode= mode;
         xDur=dur; xDist=dist; xOffset= this.x;
         this.xRun=true;
         return this;
      };
      $.setVelY= function(dist,dur,mode){
         if (isNaN(dist))throw new Error("Invalid distance; Accepting -Infinity to Infinity.")
      dur=parseInt(dur);mode=parseInt(mode);
      if(!dur>=1)throw new Error("Invalid duration; Accepting 1 to Infinity.");
      if (mode!=0&&mode!=1&&mode!=2&&mode!=3)throw new Error("Invalid mode; Accepting 0 to 3.")
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
      $.toY= function(y,duration,mode){
         return this.setVelY(y-this.y,duration,mode);
      };
      $.toXY= function(x,durX,modeX,y,durY,modeY){
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
   var LINEAR=0,EASE_OUT=1,EASE_IN=2,EASE=3,
      README=
"See https://github.com/EthanGadway/Velocity-JS/README.md for a more detailed README.\n\
\n\
velocity.setVel(distanceX, durationX, modeX, distanceY, durationY, modeY)\n\
velocity.setVelX(distance, duration, mode)\n\
velocity.setVelY(distance, duration, mode)\n\
velocity.toXY(x, durationX, modeX, y, durationY, modeY)\n\
velocity.toX(x, duration, mode)\n\
velocity.toY(y, duration, mode)\n\
velocity.tick()\n\
\n\
Boolean velocity.xRun: default false\n\
Boolean velocity.yRun: default false\n\
Int velocity.x: default 0\n\
Int velocity.y: default 0\n\
";
   Velocity["LINEAR"]=null; Velocity.__defineGetter__("LINEAR",function(){return LINEAR;});
   Velocity["EASE_OUT"]=null; Velocity.__defineGetter__("EASE-OUT",function(){return EASE_OUT;});
   Velocity["EASE_IN"]=null; Velocity.__defineGetter__("EASE-IN",function(){return EASE_IN;});
   Velocity["EASE"]=null; Velocity.__defineGetter__("EASE",function(){return EASE;});
   Velocity["README"]=null; Velocity.__defineGetter__("README",function(){return README;});
   return Velocity;
})();
