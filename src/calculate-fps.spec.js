// @flow
import calculateFPS, { getTotalHiddenTime } from './calculate-fps'
import {equal} from 'assert'

describe('calculate-fps', () => {
  describe('calculateFPS', () => {
    it('should calculate the fps', () => {
      const frames = [200, 400, 600, 800, 1000]

      equal(calculateFPS(frames, []), 5)
    })

    it('should calculate the fps taking into account the hidden delta', () => {
      const frames = [200, 400, 600, 800, 1000]
      const visibilityEvents = [[false, 0], [true, 300]]

      equal(calculateFPS(frames, visibilityEvents), 8)
    })
  })

  describe('getTotalHiddenTime', () => {
    it('should calculate the amount of time that it spent hidden', () => {
      const visibilityEvents = [
        [false, 1000],
        [true, 1010],
        [false, 1100],
        [true, 1200]
      ]

      equal(getTotalHiddenTime(visibilityEvents), 110)
    })

    it('should ignore unfinished hidden sequences', () => {
      const visibilityEvents = [
        [true, 100],
        [false, 1000],
        [true, 1010],
        [false, 1100]
      ]

      equal(getTotalHiddenTime(visibilityEvents), 10)
    })
  })
})
