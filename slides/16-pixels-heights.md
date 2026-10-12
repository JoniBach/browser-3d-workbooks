## Pixels that are heights

- **Terrarium** tiles (open data, on AWS): PNG images with no key and no account
- Their pixels hold **heights**, not colours:

```
height in metres = red × 256 + green + blue / 256 − 32768
```

- Read the pixels with a canvas, and tell the browser **not to colour-correct them**
- One step off in red is **256 metres**: spikes and pits everywhere

???

This is a lovely trick: an image format being used as a data format, because every browser and
CDN already knows how to deliver images fast.

The colour-correction gotcha is real: some browsers adjust colours for wide-gamut screens on the
way into a canvas. createImageBitmap with colorSpaceConversion: 'none' stops that.
