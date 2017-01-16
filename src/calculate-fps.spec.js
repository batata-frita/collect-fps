// @flow
import calculateFPS, { getTotalHiddenTime } from './calculate-fps'
import {equal} from 'assert'

const BECAME_VISIBLE = true
const BECAME_HIDDEN = false

describe('calculate-fps', () => {
  describe('calculateFPS', () => {
    it('should calculate the fps', () => {
      const frames = [200, 400, 600, 800, 1000]

      equal(calculateFPS(frames, []), 5)
    })

    it('should calculate the fps taking into account the hidden delta', () => {
      const frames = [200, 400, 600, 800, 1000]
      const visibilityEvents = [[BECAME_HIDDEN, 0], [BECAME_VISIBLE, 300]]

      equal(calculateFPS(frames, visibilityEvents), 8)
    })
  })

  describe('getTotalHiddenTime', () => {
    it('should calculate the amount of time that it spent hidden', () => {
      const visibilityEvents = [
        [BECAME_HIDDEN, 1000],
        [BECAME_VISIBLE, 1010],
        [BECAME_HIDDEN, 1100],
        [BECAME_VISIBLE, 1200]
      ]

      equal(getTotalHiddenTime(visibilityEvents), 110)
    })

    it('should ignore a visible event without a starting hidden event', () => {
      const visibilityEvents = [
        [BECAME_VISIBLE, 100],
        [BECAME_HIDDEN, 1000],
        [BECAME_VISIBLE, 1010]
      ]

      equal(getTotalHiddenTime(visibilityEvents), 10)
    })

    it('should ignore a hidden event without a closing visible event', () => {
      const visibilityEvents = [
        [BECAME_HIDDEN, 1000],
        [BECAME_VISIBLE, 1010],
        [BECAME_HIDDEN, 1100]
      ]

      equal(getTotalHiddenTime(visibilityEvents), 10)
    })
  })
})
