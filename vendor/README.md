# Vendored libraries

Local copies, so the workbooks run without a build step or a network connection.

| Library | Version | Licence | Files |
|---|---|---|---|
| [three.js](https://threejs.org) | r186 (npm `three@0.186.1`) | MIT (`three/LICENSE`) | `build/three.module.js`, `build/three.core.js`, and only the addons we use: `GLTFLoader`, `OrbitControls`, `STLExporter`, plus the `BufferGeometryUtils` and `SkeletonUtils` they import |
| [marked](https://marked.js.org) | 18.1.0 | MIT (`marked/LICENSE`) | `marked.esm.js`: turns the slides' Markdown into HTML |
| [JSCAD modeling](https://openjscad.xyz) | 2.13.0 (npm `@jscad/modeling`) | MIT (`jscad/LICENSE`) | `jscad-modeling.es.js`: the package bundled as one ES module with esbuild |

The JSCAD package only ships CommonJS and a UMD build, so it was bundled like this:

```sh
npm i @jscad/modeling
# entry.js re-exports the top-level namespaces by name:
#   import m from '@jscad/modeling'
#   export const { colors, curves, geometries, maths, measurements, primitives, text, utils,
#                  booleans, expansions, extrusions, hulls, minkowski, modifiers, transforms } = m
npx esbuild entry.js --bundle --format=esm --minify --outfile=jscad/jscad-modeling.es.js
```

To add another three.js addon, copy it from `node_modules/three/examples/jsm/` into
`three/addons/` at the same path, along with anything it imports.
