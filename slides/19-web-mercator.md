## From globe to tiles

- Web maps use **Web Mercator** (Google Maps, 2005): Mercator's projection, cut to a square
- Zoom 0: the world is **1 tile**. Each zoom level splits every tile into **4**
- Zoom 12: 4,096 × 4,096 tiles, each a few km across
- The square stops at about **85° north and south**: the poles would be infinitely tall

```js
const x = ((lon + 180) / 360) * tiles;
const y = ((1 - Math.log(Math.tan(φ) + 1 / Math.cos(φ)) / Math.PI) / 2) * tiles;
```

???

Those two lines are the Mercator projection, and they're in workbook 3. The whole number is
the tile; the fraction is where in the tile your place is.
