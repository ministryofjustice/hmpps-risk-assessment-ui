/* eslint-disable no-param-reassign */
const { body } = require('express-validator')
const { isDate, isFuture, isEqual, parseISO, isAfter, intervalToDuration } = require('date-fns')
const { logger } = require('../../common/logging/logger')
const { displayQuestionGroup } = require('./get.controller')
const { postAnswers } = require('../../common/data/hmppsAssessmentApi')
const { formatValidationErrors, extractAnswers } = require('../../common/question-groups/post-question-groups')
const { dynamicMiddleware } = require('../../common/utils/util')

const getFieldId = id => {
  const fields = {
    dateFirstSanction: 'id-53daee33-2c52-48af-99cc-178c483bcf09',
    totalSanctions: 'id-496587b9-81f3-47ad-a41e-77900fdca573',
    violentOffences: 'id-74fd30c7-8f4d-4525-aa17-52dfb6c43814',
    currentConvictionDate: 'id-f5d1dd7c-1774-4c76-89c2-a47240ad98ba',
  }

  if (fields[id]) {
    return fields[id]
  }
  return false
}

// todo: put this in it's own file
// question validation rules hardcoded in the UI, not driven by the Assessments API responses.
// eslint-disable-next-line consistent-return
const localValidationRules = async (req, res, next) => {
  const {
    body: reqBody,
    params: { groupId: assessmentType },
  } = req

  const {
    locals: {
      offenderDetails: { dob: offenderDateOfBirth },
    },
  } = res
  const validations = []

  if (assessmentType === 'ROSH') {
    /// ///////////////////////////////////////////////////
    // Date of first sanction:
    validations.push(
      body(getFieldId('dateFirstSanction'))
        .custom(value => {
          return value && isDate(parseISO(value))
        })
        .withMessage({ error: 'Enter a valid date' })
        .bail()
        .custom(value => {
          return !isFuture(parseISO(value))
        })
        .withMessage({ error: 'Date cannot be in the future' })
        .bail()
        .custom(value => {
          return isAfter(parseISO(value), parseISO(offenderDateOfBirth))
        })
        .withMessage({ error: 'Date must be later than the individual’s date of birth' })
        .bail()
        .custom(value => {
          const duration = intervalToDuration({
            start: parseISO(offenderDateOfBirth),
            end: parseISO(value),
          })
          return duration.years >= 8
        })
        .withMessage({ error: 'The individual must be aged 8 or older on the date of first sanction' }),
    )
    /// ///////////////////////////////////////////////////
    // total sanctions:
    validations.push(
      body(getFieldId('totalSanctions'))
        .isInt({ min: 1, max: 999 })
        .withMessage({ error: 'Enter a number between 1 and 999' }),
    )
    /// ///////////////////////////////////////////////////
    // violent offences:
    const totalSanctions = parseInt(reqBody[getFieldId('totalSanctions')], 10)
    validations.push(
      body(getFieldId('violentOffences'))
        .isInt({ min: 0, max: totalSanctions })
        .withMessage({ error: 'Cannot be greater than the total number of sanctions for all offences' }),
    )
    /// ///////////////////////////////////////////////////
    // date of current conviction:
    validations.push(
      body(getFieldId('currentConvictionDate'))
        .custom(value => {
          return value && isDate(parseISO(value))
        })
        .withMessage({ error: 'Enter a valid date' })
        .bail()
        .custom(value => {
          return !isFuture(parseISO(value))
        })
        .withMessage({ error: 'Date cannot be in the future' })
        .bail()
        .custom(value => {
          return isAfter(parseISO(value), parseISO(offenderDateOfBirth))
        })
        .withMessage({ error: 'Date must be later than the individual’s date of birth' }),
    )

    // offender’s age at Date of Current Conviction CANNOT BE LESS than the offender’s age at first conviction
    // i.e. current conviction date cannot be less than first conviction date
    if (reqBody[getFieldId('dateFirstSanction')] && isDate(parseISO(reqBody[getFieldId('dateFirstSanction')]))) {
      validations.push(
        body(getFieldId('currentConvictionDate'))
          .custom(value => {
            return (
              isEqual(parseISO(value), parseISO(reqBody[getFieldId('dateFirstSanction')])) ||
              isAfter(parseISO(value), parseISO(reqBody[getFieldId('dateFirstSanction')]))
            )
          })
          .withMessage({ error: 'XXX Current conviction cannot be before first conviction' }),
      )
    }

    await dynamicMiddleware(validations, req, res, next)
  } else return next()
}

const getErrorMessage = reason => {
  if (reason === 'OASYS_PERMISSION') {
    return 'You do not have permission to update this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }

  return 'Something went wrong'
}

const saveQuestionGroup = async (req, res) => {
  const {
    params: { assessmentId },
    body: reqBody,
    user,
    errors,
  } = req
  if (errors) {
    return displayQuestionGroup(req, res)
  }

  try {
    const answers = extractAnswers(reqBody)
    const [ok, response] = await postAnswers(assessmentId, 'current', answers, user?.token, user?.id)

    if (!ok) {
      if (response.status === 422) {
        const [validationErrors, errorSummary] = formatValidationErrors(response.errors, response.pageErrors)
        req.errors = validationErrors
        req.errorSummary = errorSummary
        return displayQuestionGroup(req, res)
      }
      return res.render('app/error', { subHeading: getErrorMessage(response.reason) })
    }

    return res.redirect(`/${assessmentId}/questiongroup/${res.locals.navigation.next.url}`)
  } catch (error) {
    logger.error(`Could not save to assessment ${assessmentId}, current episode, error: ${error}`)
    return res.render('app/error', { error })
  }
}

module.exports = { saveQuestionGroup, localValidationRules }
