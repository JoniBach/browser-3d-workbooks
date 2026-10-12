## Where 3D models come from

- Most models are made in a modelling tool: **Blender** is free and excellent
- They're exported as **glTF**, "the JPEG of 3D", from the Khronos Group (who also make WebGL)
- A **.glb** file is glTF in one binary file: shape, materials, skeleton, animations
- Three.js loads it in one line: `await new GLTFLoader().loadAsync('cat.glb')`

???

glTF 2.0 came out in 2017 and is now the standard for the web. Everything in one file means
one request and no missing textures.
