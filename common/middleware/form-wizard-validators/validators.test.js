const { range } = require('./validators')

describe('checks numbers are in range', () => {
  it('is in the range', () => {
    expect(range(5, 1, 10)).toEqual(true)
  })
  it('is higher than the range', () => {
    expect(range(11, 1, 10)).toEqual(false)
  })
  it('is lower than the range', () => {
    expect(range(0, 1, 10)).toEqual(false)
  })
  it('is at the bottom of the range', () => {
    expect(range(1, 1, 10)).toEqual(true)
  })
  it('is at the top of the range', () => {
    expect(range(10, 1, 10)).toEqual(true)
  })
})
