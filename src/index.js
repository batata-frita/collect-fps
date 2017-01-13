import calculateFPS from './calculate-fps'

export default function collectFPS (...args) {
  const customMaxFrames = typeof args[0] === 'number'

  const maxFrames = customMaxFrames ? args[0] : 10
  const cb = customMaxFrames ? args[1] : args[0]
  const frames = []

  if (!window.requestAnimationFrame) {
    cb(new Error('requestAnimationFrame is not available'))
    return
  }

  const visibilityEvents = []

  const onVisibilityChange = () =>
    visibilityEvents.push([!document.hidden, Date.now()])

  document.addEventListener('visibilitychange', onVisibilityChange)

  const update = () => {
    frames.push(Date.now())

    if (frames.length < maxFrames) {
      window.requestAnimationFrame(update)
    } else {
      document.removeEventListener('visibilitychange', onVisibilityChange)

      cb(null, calculateFPS(frames, visibilityEvents))
    }
  }

  window.requestAnimationFrame(update)
}
