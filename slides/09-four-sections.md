## Every workbook has four sections

```js
// 1. SETUP       renderer, scene, camera, lights   (the same every time)
// 2. THE THING   globe / cat / terrain / keychain   (the only part that changes)
// 3. CONTROLS    plain HTML sliders wired to the scene
// 4. LOOP        animate and render, every frame
```

Learn the shape once. After that, each workbook is about one new thing.

???

Point out that the renderer, camera, lights and resize code are copied identically into all
four files. Setup is boilerplate; the interesting part is always section 2.
