# Collect FPS

[![Build Status](https://travis-ci.org/pirelenito/collect-fps.svg)](https://travis-ci.org/pirelenito/collect-fps)
[![npm version](https://badge.fury.io/js/collect-fps.svg)](https://badge.fury.io/js/collect-fps)

Small module that uses `requestAnimationFrame` to collect what is the current FPS.

## Usage

First install it:

```bash
npm install --save collect-fps
```

And simply call it with a callback:

```javascript
import collectFPS from 'collect-fps'

collectFPS((error, fps) => {
  console.log(fps)
})
```

By default, the library will collect 10 frames to calculate the current FPS, it is also possible to specify a custom number of frames by adding an extra argument:

```javascript
import collectFPS from 'collect-fps'

const sampleSize = 100

collectFPS(sampleSize, (error, fps) => {
  console.log(fps)
})
```
