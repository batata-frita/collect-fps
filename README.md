# Collect FPS

[![Build Status](https://travis-ci.org/pirelenito/collect-fps.svg)](https://travis-ci.org/pirelenito/collect-fps)

Small module that uses `requestAnimationFrame` to collect what is the current FPS.

## Usage

First install it:

```bash
npm install --save collect-fps
```

And simply call it with a callback:

```js
import collectFPS from 'collect-fps'

collectFPS((error, fps) => {
  console.log(fps)
})
```

By default, the library will collect 10 frames to calculate the current FPS, it is also possible to specify a custom number of frames by adding an extra argument:

```js
import collectFPS from 'collect-fps'

collectFPS(100, (error, fps) => {
  console.log(fps)
})
```
