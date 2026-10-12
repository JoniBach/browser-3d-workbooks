## Three.js

- Started by **Ricardo Cabello** ("Mr.doob"), first released on GitHub in **2010**
- The most widely used 3D library on the web, free and open source (MIT)
- Gives you the things you'd expect: scenes, cameras, lights, materials, loaders
- Hides WebGL, but lets you reach it when you need to
- Today: one local file, `three.module.js`, loaded with a plain `import`

???

Three.js is the jQuery of 3D, in the best sense: it made something hard feel ordinary.

We keep a local copy in the repo (vendor/) so the workbooks work without wifi. No npm, no
bundler: an import map tells the browser that "three" means that file.
