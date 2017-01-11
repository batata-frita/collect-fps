import collectFPS from '.'

describe('collect-fps', function () {
  it('should work with custom frames', function (done) {
    collectFPS(100, (error, fps) => {
      if (error) { return done.fail(error) }

      expect(fps).toBeGreaterThan(0)
      expect(fps).toBeLessThan(120)
      done()
    })
  })

  it('should work with just a callback', function (done) {
    collectFPS((error, fps) => {
      if (error) { return done.fail(error) }

      expect(fps).toBeGreaterThan(0)
      expect(fps).toBeLessThan(120)
      done()
    })
  })
})
