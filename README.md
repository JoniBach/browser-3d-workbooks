# 3D in the browser: four workbooks

Companion code for a talk on how to make 3D experiences in the browser, themed on the
Mercator Digital logo: a globe drawn with the grid lines of a map.

The aim is to make 3D feel achievable, not impressive. As they say in adventure
motorcycling: lower the seat height so everyone's feet touch the ground. Every workbook is
one plain HTML file of vanilla JavaScript, with no framework and no build step.

**Try them live: [jonibach.github.io/mercator-3d-workbooks](https://jonibach.github.io/mercator-3d-workbooks/)**
(nothing to install; the code is one *View source* away).

## The story: zooming in

Web maps measure detail in zoom levels: zoom 0 is the whole world in one tile, and each level
splits every tile into four. The talk zooms in, one workbook at a time, until the world is
something you can hold.

| # | Zoom | Workbook | What you see | The one new idea |
|---|---|---|---|---|
| 1 | z0: the world | [The spinning atlas](01-atlas/) | The logo comes to life as a globe | Scene basics: renderer, camera, lights, loop, sliders |
| 2 | The journey | [The cat on a tiny planet](02-cat-planet/) | Type a place and the cat walks there | Loading a model (GLB) and playing its walk animation |
| 3 | z12: the place | [The diorama](03-diorama/) | The ground where the cat stopped, in 3D | Turning data into geometry |
| 4 | 1:1: in your hand | [The logo keychain](04-keychain/) | The logo, built in code, ready to print | Code becomes geometry (JSCAD), then an STL file |

The thread through all four is Gerardus Mercator: he coined the word "atlas", drew the
projection sailors steered by, and that same projection still cuts every web map into tiles.
Workbook 3 fetches its heights with his maths.

Coordinates connect the workbooks: workbook 2 hands the cat's destination to workbook 3 in the
URL (`03-diorama/?lat=51.06&lon=0.16`). Each still works on its own, with Crowborough as the
default place.

## Every workbook has the same four sections

```
1. SETUP       renderer, scene, camera, lights   (the same every time)
2. THE THING   globe / cat / terrain / keychain   (the only part that changes)
3. CONTROLS    plain HTML inputs wired to the scene
4. LOOP        animate and render, every frame
```

Learn the shape once; after that, each workbook is about one new thing.

## Running it

The pages use ES modules, which browsers won't load from `file://`, so serve the folder:

```sh
npx serve .            # or: python3 -m http.server 8000
```

Then open the address it prints. Everything the workbooks need is in this repo, so they run
offline (handy on conference wifi). Workbook 3 fetches live elevation tiles when it can and falls
back to the one in `assets/tiles/`.

## The slides

The talk's slides are in [`slides/`](slides/): one Markdown file per slide, shown by a small
viewer (`slides/index.html`). `slides/order.txt` sets the order. Anything after a line of `???`
in a slide is speaker notes. Demo slides embed a live workbook with an `<iframe>`.

Keys: ← → (or swipe) to move, **N** for notes, **F** for full screen. The address keeps your
place (`slides/#12`).

## What's in the repo

```
index.html             the list of workbooks
01-atlas/ … 04-keychain/   one index.html each (placeholders for now)
slides/                the talk: one .md per slide, order.txt, and the viewer
shared/style.css       the Mercator look: navy, and the logo's cyan-blue-purple gradient
assets/
  models/cat.glb       the walking cat (from cat-walk), 17 gait clips; we use "walk"
  brand/               the logo and mark, low-res PNGs from mercatordigital.com (reference only)
  tiles/               a Terrarium elevation tile for Crowborough (z12/2049/1370), the offline fallback
vendor/                three.js r186, JSCAD modeling 2.13 and marked 18, local copies (see vendor/README.md)
```

## Status

- [x] Repo, theme, placeholders and assets
- [x] 1. The spinning atlas
- [x] 2. The cat on a tiny planet
- [x] 3. The diorama
- [x] 4. The logo keychain

To do along the way:

- Get the logo as SVG, with the brand colours, from the brand guidelines. The colours in
  `shared/style.css` are estimated from the PNG.
- Slim the cat: it is 13 MB for about 1,345 vertices, almost all of it animation keyframes for
  17 clips. Keep only `walk` (and maybe `stand`) and resample the keys.

## Going further

The full versions these workbooks are cut down from:

- **geo-globe**: any place on Earth as a terrain diorama, with imagery, OpenStreetMap, sun, moon
  and weather (<https://geo-globe-seven.vercel.app>)
- **cat-walk**: the cat as a study in rigging gait, with all 17 clips and crossfades
- **mirror-cad**: parametric JSCAD designs, shown on a smart mirror and printed
