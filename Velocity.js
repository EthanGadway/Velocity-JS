var Velocity=(function(){
   var $,sin=Math.sin,PI=Math.PI;
   function Velocity(x,y){
      ($=this).xTick=$.xDur=$.xOffset=$.xDist=$.xFactor=$.xMode=
              $.yTick=$.yDur=$.yOffset=$.yDist=$.yFactor=$.yMode= 0;
      $.xRun=$.yRun=false; $.x= x||0; $.y= y||0;
   }
   ($=Velocity.prototype).setVelX= function(dist,dur,mode){
      if (isNaN(dist))throw new Error("Invalid distance; Accepting -Infinity to Infinity.")
      dur=parseInt(dur);mode=parseInt(mode);
      if(!dur>=1)throw new Error("Invalid duration; Accepting 1 to Infinity.");
      if (mode!=0&&mode!=1&&mode!=2&&mode!=3)throw new Error("Invalid mode; Accepting 0 to 3.")
      $=this;$.xFactor= mode==0? dist/dur: (PI/2)/dur;
      // console.log((mode==0? dist/dur: (PI/2)/dur)==$.xFactor);
      $.xTick=0; $.xMode= mode;
      $.xDur=dur; $.xDist=dist; $.xOffset= $.x;
      $.xRun=true;
      return $;
   };
   $.setVelY= function(dist,dur,mode){
      if (isNaN(dist))throw new Error("Invalid distance; Accepting -Infinity to Infinity.")
      dur=parseInt(dur);mode=parseInt(mode);
      if(!dur>=1)throw new Error("Invalid duration; Accepting 1 to Infinity.");
      if (mode!=0&&mode!=1&&mode!=2&&mode!=3)throw new Error("Invalid mode; Accepting 0 to 3.")
      $=this;$.yFactor= mode==0? dist/dur: (PI/2)/dur;
      $.yTick=0; $.yMode= mode;
      $.yDur=dur; $.yDist=dist; $.yOffset= $.y;
      $.yRun=true;
      return $;
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
   $.tickX= function(ticks){
      $=this;var xT=$.xTick,xD=$.xDur,xDs=$.xDist,xM=$.xMode,xO=$.xOffset,xF=$.xFactor;
      if ($.xRun && xT<=xD){
         $.xTick= xT+=ticks!=null?(ticks+xT)>xD?xD-xT:ticks:1;
         if (xM==0) $.x= xO+xT*xF;                        //linear
         else if (xM==1)$.x= xO+sin(xT*xF)*xDs;          //ease-out
         else if (xM==2)$.x= xO+(1-sin((xD-xT)*xF))*xDs; //ease-in
         else if (xM==3){                                 //ease-in-out
            var d=xDs/2,t=xD/2;
            if (xT<=t)$.x= xO+(1-sin((xD-xT*2)*xF))*d;
            else $.x= xO+d+sin((xT-t)*xF*2)*d;
         }
         if (xT>=xD){ $.xTick=$.xDur=$.xDist=$.xFactor=0;$.xOffset=$.x; $.xRun=false; }
      }
      return $;
   };
   $.tickY= function(ticks){
      $=this;yT=$.yTick,yD=$.yDur,yDs=$.yDist,yM=$.yMode,yO=$.yOffset,yF=$.yFactor;
      if ($.yRun && yT<yD){
         $.yTick= yT+=ticks!=null?(ticks+yT)>yD?yD-yT:ticks:1;
         if (yM==0) $.y= yO+yT*yF;                       //linear
         else if (yM==1)$.y= yO+sin(yT*yF)*yDs;          //ease-out
         else if (yM==2)$.y= yO+(1-sin((yD-yT)*yF))*yDs; //ease-in
         else if (yM==3){                                //ease-in-out
            var d=yDs/2,t=yD/2;
            if (yT<=t)$.y= yO+(1-sin((yD-yT*2)*yF))*d;
            else $.y= yO+d+sin((yT)*yF*2)*d;
         }
         if (yT>=yD){ $.yTick=$.yDur=$.yDist=$.yFactor=0;$.yOffset=$.y; $.yRun=false; }
      }
      return $;
   };
   $.tick= function(xTicks,yTicks){
      return this.tickX(xTicks).tickY(yTicks);
   };
   var LINEAR=0,EASE_OUT=1,EASE_IN=2,EASE=3,
      README=
"See https://github.com/EthanGadway/Velocity-JS/blob/master/README.md for a more detailed README.\n\
\n\
Constructor new Velocity(initial x, initial y)\n\
\n\
velocity.setVelX(distance, duration, mode): this\n\
velocity.setVelY(distance, duration, mode): this\n\
velocity.setVel(distanceX, durationX, modeX, distanceY, durationY, modeY): this\n\
velocity.toX(x, duration, mode): this\n\
velocity.toY(y, duration, mode): this\n\
velocity.toXY(x, durationX, modeX, y, durationY, modeY): this\n\
velocity.tick()\n\
\n\
Boolean velocity.xRun: default false\n\
Boolean velocity.yRun: default false\n\
Int velocity.x: default 0\n\
Int velocity.y: default 0\n\
";
   ($=Velocity).LINEAR=null; Velocity.__defineGetter__("LINEAR",function(){return LINEAR;});
   $.EASE_OUT=null; Velocity.__defineGetter__("EASE_OUT",function(){return EASE_OUT;});
   $.EASE_IN=null; Velocity.__defineGetter__("EASE_IN",function(){return EASE_IN;});
   $.EASE=null; Velocity.__defineGetter__("EASE",function(){return EASE;});
   $.README=null; Velocity.__defineGetter__("README",function(){return README;});

   return $;
})();
