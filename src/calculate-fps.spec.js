import calculateFPS, { getHiddenDelta } from './calculate-fps'

describe('calculate-fps', () => {
  describe('calculateFPS', () => {
    it('should calculate the fps', () => {
      const frames = [200, 400, 600, 800, 1000]

      expect(calculateFPS(frames, [])).toBe(5)
    })

    it('should calculate the fps taking into account the hidden delta', () => {
      const frames = [200, 400, 600, 800, 1000]
      const visibilityEvents = [[false, 0], [true, 300]]

      expect(calculateFPS(frames, visibilityEvents)).toBe(8)
    })
  })

  describe('getHiddenDelta', () => {
    it('should calculate the amount of time that it spent hidden', () => {
      const visibilityEvents = [
        [false, 1000],
        [true, 1010],
        [false, 1100],
        [true, 1200]
      ]

      expect(getHiddenDelta(visibilityEvents)).toBe(110)
    })

    it('should ignore unfinished hidden sequences', () => {
      const visibilityEvents = [
        [true, 100],
        [false, 1000],
        [true, 1010],
        [false, 1100]
      ]

      expect(getHiddenDelta(visibilityEvents)).toBe(10)
    })
  })
})
