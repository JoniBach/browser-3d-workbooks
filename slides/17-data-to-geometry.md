## Data into geometry

- A flat sheet with one corner per pixel: **256 × 256**
- Lift each corner to its height, at true scale
- Pin the edge row down to the base: that makes the **walls**
- Colour by height, in our logo's gradient
- Stretch it upwards with one line: `terrain.scale.y = 2`

???

Real land is flatter than you think: at true scale, the Weald around Crowborough barely
ripples. That's why there's an Exaggerate slider. Mountains like Snowdon need much less.

In New York you can see Manhattan's street grid: this data includes buildings at this zoom.
