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
    dateFirstSanction: 'id-5ca86a06-5472-4861-bd6a-a011780db49a',
    totalSanctions: 'id-8e83a0ad-2fcf-4afb-a0af-09d1e23d3c33',
    violentOffences: 'id-496587b9-81f3-47ad-a41e-77900fdca573',
    currentConvictionDate: 'id-f5d1dd7c-1774-4c76-89c2-a47240ad98ba',
    haveTheyCommittedASexualOffence: 'id-58d3efd1-65a1-439b-952f-b2826ffa5e7',
    dateOfMostRecentSexualOffence: 'id-a00223d0-1c20-43b5-8076-8a292ca2577',
    dateOfCommencement: 'id-5cd344d4-acf3-45a9-9493-5dda5aa9dfa8',
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

  // todo: update assessmentType
  if (assessmentType === 'RSR') {
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
          .withMessage({ error: 'PLACEHOLDER: Current conviction cannot be before the date at first sanction' }),
      )
    }

    /// ///////////////////////////////////////////////////
    // Date of most recent sanction involving a sexual or sexually motivated offence:
    if (reqBody[getFieldId('haveTheyCommittedASexualOffence')] === 'YES') {
      validations.push(
        body(getFieldId('dateOfMostRecentSexualOffence'))
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
          .bail(),
      )
    }

    validations.push(
      body(getFieldId('dateOfCommencement'))
        .custom(value => {
          return value && isDate(parseISO(value))
        })
        .withMessage({ error: 'Enter a valid date' })
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
          return duration.years <= 110
        })
        .withMessage({ error: 'PLACEHOLDER: The individual must be aged 110 or younger on commencement' }),
    )

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
