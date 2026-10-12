<!-- class: demo -->

## 0. Hello, sphere

<iframe class="demo" src="../00-hello-sphere/"></iframe>

???

The smallest scene there is: a renderer, a scene, a camera, two lights and one mesh. About 50
lines of code, with comments for anyone new to JavaScript (const is like val, arrow functions
are like Scala lambdas).

Things to show:
- a mesh is a shape (geometry) plus a look (material)
- the words are drawn on a flat 2D canvas, then wrapped round the sphere as its skin (a texture)
- type in the box: the picture is repainted and the sphere updates straight away
- the loop: turn a little, draw, about 60 times a second

Then: the same four sections, with something more interesting in section 2.
