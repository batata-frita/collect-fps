import collectFPS from '.'

describe('collect-fps', function () {
  it('should collect until it’s ended', function (done) {
    const endFPSCollection = collectFPS()

    setTimeout(() => {
      const fps = endFPSCollection()

      expect(fps).toBeGreaterThan(0)
      expect(fps).toBeLessThan(120)
      done()
    }, 100)
  })

  describe('when window.requestAnimationFrame is not available', () => {
    it('should fail', () => {
      const window = {}

      try {
        collectFPS(window)
      } catch (e) {
        expect(e.message).toBe('requestAnimationFrame is not available')
      }
    })
  })
})
