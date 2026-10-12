## Making it walk

- A **mixer** plays animations on a model; an **action** is one clip, ready to play
- We use two: **stand** and **walk**, fading into each other in 0.3 s
- The cat never moves: **the planet turns underneath it**, like a treadmill
- The planet rolls along the shortest path: a **great circle**

???

The treadmill trick removes all the hard maths of walking along a path on a sphere.

The planet rolls along a great circle: the shortest path. Mercator's straight lines are
different: constant compass bearings (rhumb lines), longer but easier to steer.
