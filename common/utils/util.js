const async = require('async')
const { getNamespace } = require('cls-hooked')
const { startOfDay, differenceInYears, isValid, parseISO } = require('date-fns')
const { formatInTimeZone, utcToZonedTime } = require('date-fns-tz')
const { logger } = require('../logging/logger')
const { clsNamespace } = require('../config')

const isEmptyObject = obj => {
  if (obj === undefined || obj === null) return true
  return !Object.keys(obj).length
}

const countWords = str => {
  return str
    .replace(/-/gi, ' ')
    .trim()
    .split(/\s+/).length
}

const removeUrlLevels = (url, levels) => {
  return !levels || !url
    ? url
    : url
        .split('/')
        .slice(0, -levels)
        .join('/')
}

const sortObject = (key, order = 'asc') => {
  return function innerSort(a, b) {
    // eslint-disable-next-line no-prototype-builtins
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

const groupBy = (list, keyGetter) => {
  const sortedObject = {}
  list.forEach(item => {
    const key = keyGetter(item)
    const collection = sortedObject[key]
    if (!collection) {
      sortedObject[key] = [item]
    } else {
      collection.push(item)
    }
  })
  return sortedObject
}

const catchAndReThrowError = (msg, error) => {
  const newError = new Error(`${msg} ${error}`)
  logger.error(newError)
  throw newError
}

const isValidDate = (day, month, year) => {
  try {
    const date = new Date()
    date.setFullYear(year, month - 1, day)

    return (
      date.getFullYear() === parseInt(year, 10) &&
      date.getMonth() === parseInt(month, 10) - 1 &&
      date.getDate() === parseInt(day, 10)
    )
  } catch (error) {
    logger.error(`Valid date check error for day:${day}, month:${month}, year:${year}, error: ${error}`)
    return false
  }
}

const getCorrelationId = () => getNamespace(clsNamespace).get('MDC').correlationId || ''

const updateMDC = (mdcDataKey, mdc) => getNamespace(clsNamespace).set(mdcDataKey, mdc)

const encodeHTML = str => {
  if (!str) {
    return ''
  }
  return str
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// used in nunjucks templates which doesn't support directly setting json values
const updateJsonValue = (jsonObj, key, value, createNewObject = false) => {
  if (!jsonObj && createNewObject) {
    // eslint-disable-next-line no-param-reassign
    jsonObj = {}
  }
  if (!jsonObj) {
    return {}
  }
  if (!key) {
    return jsonObj
  }
  // eslint-disable-next-line no-param-reassign
  jsonObj[key] = value
  return jsonObj
}

const doReplace = (input, target, replacement) => {
  return input.split(target).join(replacement)
}

// This function executes middleware in series
const dynamicMiddleware = async (validators, req, res, next) => {
  async.eachSeries(
    validators,
    (middleware, doneMiddleware) => {
      middleware.bind(null, req, res, doneMiddleware)()
    },
    error => {
      if (error) {
        logger.error('Problem executing dynamic middleware')
        throw error
      }
      return next(error)
    },
  )
}

const processReplacements = (input, replacementDetails) => {
  let newInput = JSON.stringify(input)

  // replace name
  if (replacementDetails?.name) {
    newInput = newInput.split('[Name of person]').join(replacementDetails.name)
  }

  return JSON.parse(newInput)
}

const formatDateWith = pattern => isoString => {
  const parsedDate = parseISO(isoString)
  return isValid(parsedDate) ? formatInTimeZone(parsedDate, 'Europe/London', pattern) : null
}

const prettyDate = formatDateWith('do MMMM y')
const prettyDateAndTime = formatDateWith('eeee do MMMM y H:mm')

const ageFrom = (dateOfBirth, now = new Date()) => {
  const today = startOfDay(utcToZonedTime(now, 'Europe/London'))
  const parsedDate = startOfDay(utcToZonedTime(dateOfBirth, 'Europe/London'))
  return isValid(parsedDate) ? Math.abs(differenceInYears(today, parsedDate)) : null
}

const clearAnswers = questions => {
  const pageQuestions = Object.keys(questions)
  pageQuestions.forEach(question => {
    // eslint-disable-next-line no-param-reassign
    questions[question].answer = ''
  })
  return questions
}

const getErrorMessageFor = (user, reason) => {
  if (reason === 'OASYS_PERMISSION') {
    return 'You do not have permission to create this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }
  if (reason === 'DUPLICATE_OFFENDER_RECORD') {
    return `The offender is showing as a possible duplicate record under ${user.areaName}. Log into OASys to manage the duplication. If you need help, contact the OASys Application Support team`
  }

  if (reason === 'LAO_PERMISSION') {
    return 'You do not have the permissions needed to access this record'
  }

  return 'Something went wrong' // Unhandled exception
}

module.exports = {
  isEmptyObject,
  countWords,
  removeUrlLevels,
  sortObject,
  groupBy,
  isValidDate,
  catchAndReThrowError,
  getCorrelationId,
  updateMDC,
  encodeHTML,
  dynamicMiddleware,
  processReplacements,
  doReplace,
  updateJsonValue,
  prettyDate,
  prettyDateAndTime,
  ageFrom,
  clearAnswers,
  getErrorMessageFor,
}
