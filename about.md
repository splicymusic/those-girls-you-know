# SPLICY - Those Girls You Know

Hey.  Really cool that you're checking out the code.  I threw this together in two weeks, so I apologize when things are rough around the edges or difficult to follow.

## Your own images
The easiest way to customize is to drop in your own images.  You will need to put new folders in the "girls" folder using the file naming convention you see in the other folders and then update the 'names' array in the Loader.js class.

## Clock
The clock class is the glue between space and time.  The animation progresses so that the perspective advances 1 unit for every whole note in the song.  Initializing the clock to start at a time ahead of 0 advances the song to that point.  This is very valuable for working on different sections of the song.

Basing animations on the clock also helps so that when FPS fluctuates, the animation does not slow down.  Where you are in the environment and where you are in the song remain synchronized.

## Actors
Actor classes are groups of objects that behave in the same way.  The tunnel of rotating pictures is an actor, but it has thousands of components.  Those components though all act together, so putting them in one class made a nice way way to keep the code compartmentalized. 

The Template class isn't used, but you can use it to quickly paste in what you need to extend Actor.


## Misc
Alba font:
https://www.dafont.com/alba.font