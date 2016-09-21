# Velocity-JS
*A little javascript util for velocities*


## How does I do?
See the following example, so you can do (then go work on that grammar)
```
//Create the velocity object
var velocity= new Velocity();
//Set the origin (default is (0,0))
velocity.x=0; velocity.y=100;
//Assign velocity to it:
 //100px right, in linear mode, in 30 ticks
 //100px up, in ease-in mode, in 30 ticks.
velocity.setVel(100,30,0, -100,30,2);
function tick(){
   velocity.tick();
   /* Do stuff with velocity.x & velocity.y */
   if (vel.xRun||vel.yRun)setTimeout(tick,20);
}
tick();
```
## Static Fields
```
//All of the velocity modes
Velocity.LINEAR = 0
Velocity.EASE_OUT = 1
Velocity.EASE_IN = 2
Velocity.EASE = 3
//Shortened README
Velocity.README = "Read me if you forget the args for the methods"
```
## Instance Fields and Methods
```
velocity.setVel(distanceX, durationX, modeX, distanceY, durationY, modeY)
velocity.setVelX(distance, duration, mode)
velocity.setVelY(distance, duration, mode)

//No need to calculate the distance between two coordinates
velocity.toXY(x, durationX, modeX, y, durationY, modeY)
velocity.toX(x, duration, mode)
velocity.toY(y, duration, mode)

//Changes the coordinates by the determined rate
velocity.tick()

//Whether or not one of the axes is changing on each tick
Boolean velocity.xRun: default false
Boolean velocity.yRun: default false

//The coordinates for changing the origin prior to setting velocity, and for use after each tick
Int velocity.x: default 0
Int velocity.y: default 0

```
