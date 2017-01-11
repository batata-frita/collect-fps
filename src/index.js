export default function collectFPS (...args) {
  const customMaxFrames = typeof args[0] === 'number'

  const maxFrames = customMaxFrames ? args[0] : 10
  const cb = customMaxFrames ? args[1] : args[0]
  const frames = []

  if (!window.requestAnimationFrame) {
    cb(new Error('requestAnimationFrame is not available'))
    return
  }

  const update = () => {
    frames.push(Date.now())

    if (frames.length < maxFrames) {
      window.requestAnimationFrame(update)
    } else {
      const timePerFrame = (frames[frames.length - 1] - frames[0]) / frames.length
      const fps = 1000 / timePerFrame
      cb(null, fps)
    }
  }

  window.requestAnimationFrame(update)
}
