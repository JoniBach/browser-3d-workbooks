## Why not write WebGL by hand?

- Drawing **one triangle** in raw WebGL is around 100 lines
- You write shaders in a separate language (**GLSL**)
- You manage buffers, matrices, lights and the camera yourself
- Powerful, but a lot to hold in your head before anything appears

```js
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(corners), gl.STATIC_DRAW);
gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

???

This is the tall seat. We don't need it today. A library handles all of this for us.
