## How a browser draws 3D

- Your graphics card (**GPU**) draws millions of **triangles** a second
- **WebGL** lets a web page talk to it: the browser's version of OpenGL ES
- WebGL 1 arrived in **2011**, WebGL 2 in **2017**; now in every browser
- **WebGPU** is the next generation, shipping since 2023
- Everything you'll see today is triangles, coloured by small GPU programs called **shaders**

???

The key idea: the GPU is a triangle machine. You give it a list of corners (vertices), it
joins them into triangles, and runs two tiny programs on them: a vertex shader (where does each
corner go on screen?) and a fragment shader (what colour is each pixel?).

WebGPU is the modern replacement, closer to Metal, Vulkan and DirectX 12. Three.js can use
both; today we use WebGL.
