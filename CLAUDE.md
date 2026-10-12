# Making your own 3D diorama with Claude Code

This repo teaches 3D in the browser with small workbooks (`00-hello-sphere/` to `04-keychain/`).
This file is for Claude Code: when someone gives you a **brief** ("a tiny island with a
lighthouse", "my desk at work", "a fox in a snowy forest"), turn it into **one standalone HTML
file** they can double-click to open. No installs, no build, no npm.

## The result

- **One `.html` file**, saved as `my-dioramas/<short-name>.html` unless the person says otherwise.
- **Opens with a double-click** (`file://`). three.js comes from the jsDelivr CDN, so it needs an
  internet connection and nothing else.
- **A diorama:** a small, finished world on a plinth that you look into and can turn round.
- **About 150 to 300 lines**, readable by someone new to JavaScript.

## How to work

1. **Read the brief and decide five things.** Make sensible choices yourself rather than asking;
   only ask if the brief could mean two very different worlds.
   - **The world**: what sits on the plinth (keep it inside a radius of about 3 units)
   - **The focus**: one character or object the eye goes to
   - **The motion**: one thing that moves (turns, walks, sweeps, bobs, orbits)
   - **The palette**: 4 to 7 colours, named in a `PALETTE` object
   - **The reveal**: the moment it comes to life, tied to a control (night falls, the light
     comes on, the character sets off)
2. **Copy `starter/diorama.html`** and keep its structure. Write the brief and the five
   decisions in the comment at the top of the file.
3. **Rewrite section 2 (THE THING) and section 3 (CONTROLS)** for the brief. Leave sections 1 and 4
   almost as they are: that sameness is the point of the framework.
4. **Check it** (see "Checking your work"), then tell the person the file's path and to
   double-click it. Mention what the controls do and what the reveal is.

## The four sections (every file has exactly these, in this order)

```js
// 1. SETUP       renderer, scene, camera, lights   (the same every time)
// 2. THE THING   the diorama itself                 (the only part that really changes)
// 3. CONTROLS    plain HTML inputs wired to the scene
// 4. LOOP        animate and render, every frame
```

Each section starts with the same banner comment as the starter:

```js
// ------------------------------------------------------------------
// 2. THE THING: an island with a lighthouse, on a plinth
// ------------------------------------------------------------------
```

## Rules

- **CDN only, pinned to one version.** Use this import map exactly:
  ```html
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/"
      }
    }
  </script>
  ```
  Addons then import as `three/addons/controls/OrbitControls.js`,
  `three/addons/loaders/GLTFLoader.js`, `three/addons/exporters/STLExporter.js`.
- **No local files.** A page opened from `file://` can't fetch files next to it. Make everything
  in code, draw pictures on a `<canvas>`, or load from an https URL that allows it (the ones
  listed below all do).
- **Plain HTML controls**, 1 to 5 of them, inside the `<details class="controls">` panel: range
  sliders, a checkbox, a text box, a button. Wire them with the starter's `onSlide(id, change)`.
- **Keep the starter's safety nets:** the on-screen error box, the phone layout (controls fold
  away), and the camera stepping back on narrow screens in `resize()`.
- **Low poly:** few segments (6 to 12 round a cone or cylinder) and `flatShading: true`. It's
  quicker to make and looks deliberate.
- **Plain comments for beginners:** say what each block is for, in everyday words. Don't comment
  every line. Many readers know Scala or Java but are new to JavaScript.
- **No frameworks and no build tools.** No React, no TypeScript, no bundler.

## Building blocks

All tested from a double-clicked file with three.js r186.

### Shapes

`solid(shape, colour)` in the starter makes a low-poly mesh. Useful shapes (sizes are in units;
the plinth is about 6 across):

| Shape | Good for |
|---|---|
| `new THREE.BoxGeometry(w, h, d)` | buildings, crates, tables, books |
| `new THREE.CylinderGeometry(top, bottom, h, sides)` | plinths, towers, trunks, islands (7 sides) |
| `new THREE.ConeGeometry(r, h, sides)` | trees, roofs, mountains |
| `new THREE.SphereGeometry(r, 16, 8)` | heads, bushes, planets, lamps |
| `new THREE.TorusGeometry(r, tube, 8, 64)` | rings, wheels, orbits |
| `new THREE.IcosahedronGeometry(r, 0)` | rocks, crystals |

Group things that move together with `new THREE.Group()`. Place things with
`mesh.position.set(x, y, z)` (y is up) and turn them with `mesh.rotation.y`.

### Scattering things (trees, rocks, stars)

Use a ring or a grid rather than `Math.random()`, so the scene is the same every time:

```js
for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2;
  const tree = solid(new THREE.ConeGeometry(0.15, 0.4, 6), PALETTE.tree);
  tree.position.set(Math.cos(angle) * 2, 0.3, Math.sin(angle) * 2);
  world.add(tree);
}
```

### Words and pictures (no font files)

Draw on a 2D canvas and use it as a texture (see `00-hello-sphere/`):

```js
const picture = document.createElement('canvas');
picture.width = 512; picture.height = 256;
const pen = picture.getContext('2d');
pen.fillStyle = '#1f2a44'; pen.fillRect(0, 0, 512, 256);
pen.fillStyle = 'white'; pen.font = 'bold 64px system-ui'; pen.textAlign = 'center';
pen.fillText('Hello', 256, 150);
const skin = new THREE.CanvasTexture(picture);
skin.colorSpace = THREE.SRGBColorSpace; // or the colours come out washed out
const sign = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.5), new THREE.MeshBasicMaterial({ map: skin }));
```

After redrawing the canvas, set `skin.needsUpdate = true`.

### Day and night

The starter's Time of day slider moves the sun, dims the lights, blends the sky colour and
turns on glowing things (`emissive` / `emissiveIntensity` on a `MeshStandardMaterial`). Reuse it
for any brief with a reveal at night.

### A character that walks (glTF models)

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
const character = gltf.scene;

// models come in any size: scale it to a height, in units
const size = new THREE.Box3().setFromObject(character).getSize(new THREE.Vector3());
character.scale.setScalar(0.8 / size.y);
world.add(character);

// play one of its animations
const mixer = new THREE.AnimationMixer(character);
mixer.clipAction(gltf.animations.find((clip) => clip.name === 'Walking')).play();
// and in the loop: mixer.update(seconds);
```

Models that load from a double-clicked file:

| Model | URL | Animations |
|---|---|---|
| Robot (CC0) | `https://cdn.jsdelivr.net/gh/mrdoob/three.js@r186/examples/models/gltf/RobotExpressive/RobotExpressive.glb` | Idle, Walking, Running, Dance, Wave, Jump, Sitting, Standing, ThumbsUp, Yes, No, Punch, WalkJump, Death |
| The workshop cat | `https://jonibach.github.io/browser-3d-workbooks/assets/models/cat.glb` (13 MB) | walk, trot, gallop, stand, sit, reach, and the moves between them |

The cat's material is set to full metal, which looks black: set `metalness = 0` on its materials
(see `02-cat-planet/`). To walk a character round in a circle, put it in a group, offset it from
the middle, and turn the group in the loop; or keep it still and turn the ground under it, as
workbook 2 does.

### Real land (elevation tiles)

Any place on Earth, from free Terrarium tiles (no key). See `03-diorama/` for the full version.

```js
// which tile? (Web Mercator)
const tiles = 2 ** 12;
const φ = THREE.MathUtils.degToRad(lat);
const x = Math.floor(((lon + 180) / 360) * tiles);
const y = Math.floor(((1 - Math.log(Math.tan(φ) + 1 / Math.cos(φ)) / Math.PI) / 2) * tiles);

// the tile's pixels are heights: red × 256 + green + blue / 256 − 32768 metres
const response = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/12/${x}/${y}.png`);
const image = await createImageBitmap(await response.blob(), { colorSpaceConversion: 'none' });
// draw it on a 256 × 256 canvas, getImageData, decode each pixel, and lift the vertices of a
// PlaneGeometry(size, size, 255, 255) (rotated flat) to those heights
```

`colorSpaceConversion: 'none'` matters: without it some browsers adjust the colours and the land
grows spikes. Use `heights.reduce(...)` for the lowest and highest point, not `Math.min(...heights)`.

### Shapes from code, to print (JSCAD)

```js
import { primitives, booleans, extrusions, transforms, geometries } from 'https://esm.sh/@jscad/modeling@2.13.0';
```

Build in millimetres with `union`, `subtract` and `intersect`, convert to a three.js mesh, and
export STL with `STLExporter`. `04-keychain/` has the conversion ("glue") and the download
button to copy.

### A globe or a tiny planet

Latitude and longitude to a point on a sphere of radius 1 (see `02-cat-planet/`):

```js
const φ = THREE.MathUtils.degToRad(lat), λ = THREE.MathUtils.degToRad(lon);
const point = new THREE.Vector3(Math.cos(φ) * Math.sin(λ), Math.sin(φ), Math.cos(φ) * Math.cos(λ));
```

Grid lines on a globe are rings: `TorusGeometry`, as in `01-atlas/`.

## Gotchas

- **Black model:** `metalness: 1` with nothing to reflect looks black. Use `metalness: 0`.
- **Washed-out canvas textures:** set `texture.colorSpace = THREE.SRGBColorSpace`.
- **Flickering where two surfaces meet:** lift one by a hair (`0.002`).
- **Everything black:** there's no light. Keep the ambient light and the sun.
- **Nothing on screen and no error:** the camera may be inside something, or looking away. Keep
  `orbit.target` on the middle of the world.
- **Transparent things (beams, glass, water):** `transparent: true, opacity: 0.4,
  depthWrite: false`.
- **Rebuilding a shape from a slider:** `mesh.geometry.dispose()` before replacing it.

## Checking your work

1. Read the file once, top to bottom, as a beginner would: are the four sections clear?
2. If you can run a browser (Playwright, or Claude in Chrome), open the file at its `file://`
   address and check that there's no red error box and no console error, then move each control
   and take a screenshot.
3. If you can't, say so, and ask the person to double-click the file and tell you what they see.

## The workbooks, for fuller examples

| Folder | Shows |
|---|---|
| `00-hello-sphere/` | The smallest scene, and words drawn on a canvas texture |
| `01-atlas/` | Vertex colours (a gradient), rings, sliders that rebuild a shape |
| `02-cat-planet/` | Loading a GLB, playing and blending animations, a tiny planet |
| `03-diorama/` | Real elevation data into terrain, a plinth with walls |
| `04-keychain/` | JSCAD booleans, and exporting an STL to print |

The workbooks load three.js from `vendor/` (so they work offline) and share `shared/style.css`.
Generated dioramas don't: they use the CDN and carry their own styles, so the file works on
its own anywhere.
