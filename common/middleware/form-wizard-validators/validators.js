const { isDate, isFuture, parseISO, isAfter, intervalToDuration } = require('date-fns')

const range = function range(value, arg1, arg2) {
  return value >= arg1 && value <= arg2
}

const notInFuture = function inFuture(value) {
  return !isFuture(parseISO(value))
}

const validDate = function validDate(value) {
  return value && parseISO(value).toString() !== 'Invalid Date' && isDate(parseISO(value))
}

const dateIsAfter = function dateIsAfter(value, arg1) {
  return isAfter(parseISO(value), parseISO(arg1))
}

const yearsBetween = function yearsBetween(value, arg1, arg2) {
  const duration = intervalToDuration({
    start: parseISO(arg1),
    end: parseISO(value),
  })
  return Math.abs(duration.years) >= arg2
}

module.exports = { range, notInFuture, validDate, dateIsAfter, yearsBetween }
