## Rigging: giving a model a skeleton

- **Mesh**: the skin, made of triangles (our cat: about 1,300 corners)
- **Skeleton**: bones inside it (our cat's rig has **972 bones**, made with Blender's Rigify)
- **Skinning**: each corner follows one or more bones, by weight
- **Animation clips**: keyframes saying where each bone is, over time
- Our cat has **17 clips**: stand, walk, trot, gallop, sit, and the moves between them

???

Most of those 972 bones are helpers: Rigify makes control bones, mechanism bones and deform
bones. Only the deform bones move the skin.

The cat was built as a study of gait, which is why it has transitions like walk_to_trot.

Aside: the file is 13 MB for a 1,300-corner cat, because 17 clips × 972 bones × many keyframes
adds up. Trimming to the one clip we use would make it tiny.
