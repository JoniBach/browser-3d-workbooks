## Walking without sliding

- A **mixer** plays animations on a model; an **action** is one clip, ready to play
- We use two: **stand** and **walk**, fading into each other in 0.3 s
- The cat never moves: **the planet turns underneath it**, like a treadmill
- The catch: if the ground moves at the wrong speed, the paws **slide**
- So we measured the walk: a paw on the ground moves back at **0.165 units a second**

???

The treadmill trick removes all the hard maths of walking along a path on a sphere.

To find the paw speed, we played the walk clip frame by frame and tracked the toe bones while
they touched the ground. The planet turns at exactly that surface speed, and the speed slider
scales both the animation and the planet together.

The planet rolls along a great circle: the shortest path. Mercator's straight lines are
different: constant compass bearings (rhumb lines), longer but easier to steer.
