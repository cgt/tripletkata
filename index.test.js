describe('Leap years', () => {
  test.each([
    [1, false],
    [4, true],
    [8, true],
    [12, true],
    [100, false],
    [200, false],
    [400, true],
    [1700, false],
    [2008, true],
    [2000, true]
  ])(
    'year %i is a leap year = %p',
    (year, isItALeapYear) => {
      expect(isLeapYear(year)).toBe(isItALeapYear)
    }
  )
})

function isLeapYear(year) {
  function isDivisibleBy(n) {
    return year % n === 0;
  }

  return isDivisibleBy(400) || (isDivisibleBy(4) && !isDivisibleBy(100))
}