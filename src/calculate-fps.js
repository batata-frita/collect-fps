// @flow
const {max} = Math

type Frame = number
type VisibilityEvent = [boolean, number]

export default (frames: Array<Frame>, visibilityEvents: Array<VisibilityEvent>) => {
  const totalTime = frames[frames.length - 1] - frames[0]
  const visibleTime = totalTime - getTotalHiddenTime(visibilityEvents)
  const amountOfFrames = max(frames.length - 1, 1)
  const averageFrameDuration = visibleTime / amountOfFrames
  const framesPerSecond = 1000 / averageFrameDuration

  return framesPerSecond
}

export const getTotalHiddenTime = (visibilityEvents: Array<VisibilityEvent>) =>
  visibilityEvents
    .reduce(toHiddenRanges, [])
    .filter(withEnd)
    .map(toDuration)
    .reduce(sumTotalTime, 0)

const toHiddenRanges = (ranges, [visible, timestamp]) => {
  // We only care about periods when the window was hidden, so
  // if the first event is making the window visible, we ignore it
  if (visible && ranges.length === 0) {
    return ranges
  }

  const last = ranges[ranges.length - 1]
  const remaining = ranges.slice(0, -1)

  return !visible
    // When it becomes hidden we start a new range
    ? [...ranges, [timestamp]]

    // When it becomes visible we complete the previous range
    : [...remaining, [last[0], timestamp]]
}

const withEnd = ([start, end]) => end != null

const toDuration = ([start, end]) => end - start

const sumTotalTime = (totalHiddenTime, delta) => totalHiddenTime + delta
