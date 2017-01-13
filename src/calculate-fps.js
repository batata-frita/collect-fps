export default (frames, visibilityEvents) =>
  1000 / (
    (
      (frames[frames.length - 1] - frames[0]) -
      getHiddenDelta(visibilityEvents)
    ) /
    (frames.length - 1)
  )

export const getHiddenDelta = (visibilityEvents) =>
  visibilityEvents
  .reduce((deltas, [visible, timestamp]) => {
    const last = deltas.slice(-1)[0]
    const remaining = deltas.slice(0, -1)
    if (visible && !last) { return deltas }

    if (!visible) {
      return [
        ...deltas,
        [timestamp]
      ]
    } else {
      return [
        ...remaining,
        [last[0], timestamp]
      ]
    }
  }, [])
  .reduce(
    (delta, [start, end]) =>
      end
        ? delta + (end - start)
        : delta
    , 0
  )
