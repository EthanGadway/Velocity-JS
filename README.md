# Velocity-JS
*A little javascript util for velocities*

## How does I do?
See the following example, so you can do (then go work on that grammar)
```javascript
//Create the velocity object; origin x=0, origin y=100
var velocity= new Velocity(0,100);
//Assign velocity to it; 100 right, linear, and in 30 ticks, 100 up, ease-in, and in 30 ticks
velocity.setVel(100,30,0, -100,30,2);
function tick(velocity, f, delay){
   velocity.tick(); f(velocity);
   if (velocity.xRun||velocity.yRun)setTimeout(function(){tick(velocity,f,delay);},delay);
}
tick(velocity,/*do stuff with the vel*/,20);
```
## Static Fields
```javascript
//All of the velocity modes
Velocity.LINEAR = 0
Velocity.EASE_OUT = 1
Velocity.EASE_IN = 2
Velocity.EASE = 3
//Shortened README
Velocity.README = "..." //Read me if you forget the args for the methods
```
## Instance Fields and Methods
```javascript
velocity.setVel(distanceX, durationX, modeX, distanceY, durationY, modeY)
velocity.setVelX(distance, duration, mode)
velocity.setVelY(distance, duration, mode)

//setVel with the distance between points calculated
velocity.toXY(x, durationX, modeX, y, durationY, modeY)
velocity.toX(x, duration, mode)
velocity.toY(y, duration, mode)

//Tick the the x- and y-translations
velocity.tick()

//Whether or not one of the axes is changing on each tick
Boolean velocity.xRun: default false
Boolean velocity.yRun: default false

//The coordinates for changing the origin prior to setting velocity, and for use after each tick
Int velocity.x: default 0
Int velocity.y: default 0

//Vars that you probably shouldn't mess with, but you do you
//$= x||y (i.e. $Tick becomes both xTick & yTick)
Int velocity.$Tick: The number of times the $-translation has been ticked
Int velocity.$Dur: The duration the $-translation is in ticks
Int velocity.$Offset: The $-position at the start of the translation
Int velocity.$Dist: The end distance from the $Offset
Int velocity.$Factor: A variable in determining the $-slope between ticks
Int velocity.$Mode: The type of $-translation
```

#### *If there was something missing in this, feel free to submit an [issue](https://github.com/EthanGadway/Velocity-JS/issues/new?title=Readme issue&body=Le sir, the readme is missing X)*
