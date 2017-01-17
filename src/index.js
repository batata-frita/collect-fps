import calculateFPS from './calculate-fps'

export default function collectFPS (theWindow = window) {
  if (!theWindow.requestAnimationFrame) {
    throw new Error('requestAnimationFrame is not available')
  }

  // Collect visibility change events
  const visibilityEvents = []

  const onVisibilityChange = () =>
    visibilityEvents.push([!document.hidden, Date.now()])

  document.addEventListener('visibilitychange', onVisibilityChange)

  // Collect frames from requestAnimationFrame
  let collecting = true
  const frames = []

  const update = () => {
    if (collecting) {
      frames.push(Date.now())
      window.requestAnimationFrame(update)
    }
  }

  window.requestAnimationFrame(update)

  // Return a function to end collection and retrieve FPS
  return () => {
    collecting = false
    document.removeEventListener('visibilitychange', onVisibilityChange)

    return calculateFPS(frames, visibilityEvents)
  }
}
