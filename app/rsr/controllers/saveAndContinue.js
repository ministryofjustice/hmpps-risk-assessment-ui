const { Controller } = require('hmpo-form-wizard')
const { postAnswers } = require('../../../common/data/hmppsAssessmentApi')
const { formatValidationErrors, assembleDates } = require('../../../common/middleware/questionGroups/postHandlers')
const { logger } = require('../../../common/logging/logger')
const { range, dateIsAfter, yearsBetween } = require('../../../common/middleware/form-wizard-validators/validators')

const getErrorMessage = reason => {
  if (reason === 'OASYS_PERMISSION') {
    return 'You do not have permission to update this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }

  return 'Something went wrong'
}

const formatWizardValidationErrors = validationErrors => {
  const errors = {}
  const errorSummary = []
  if (validationErrors) {
    for (let i = 0; i < Object.entries(validationErrors).length; i += 1) {
      const { key, message, headerMessage } = Object.entries(validationErrors)[i][1]
      errors[`${key}`] = { text: message }
      errorSummary.push({
        text: headerMessage || message,
        href: `#${key}-error`,
      })
    }
  }
  return [errors, errorSummary]
}

class SaveAndContinue extends Controller {
  async configure(req, res, next) {
    await assembleDates(req, res, () => {})
    super.configure(req, res, next)
  }

  validateFields(req, res, next) {
    // at this point makes changes to sessionModel.options.fields to add in context specific validation information
    const offenderDob = '1987-03-14'
    const dateFirstSanction = '1997-03-14'
    const totalSanctions = 3
    req.sessionModel.options.fields.date_first_sanction.validate.push({
      fn: dateIsAfter,
      arguments: [offenderDob],
      message: 'Date must be later than the individual’s date of birth',
    })
    req.sessionModel.options.fields.date_first_sanction.validate.push({
      fn: yearsBetween,
      arguments: [offenderDob, 8],
      message: 'The individual must be aged 8 or older on the date of first sanction',
    })
    req.sessionModel.options.fields.total_violent_offences.validate.push({
      fn: range,
      arguments: [0, totalSanctions],
      message: 'Cannot be greater than the total number of sanctions for all offences',
    })
    req.sessionModel.options.fields.date_current_conviction.validate.push({
      fn: dateIsAfter,
      arguments: [offenderDob],
      message: 'Date must be later than the individual’s date of birth',
    })
    req.sessionModel.options.fields.date_current_conviction.validate.push({
      fn: dateIsAfter,
      arguments: [dateFirstSanction],
      message: 'Current conviction cannot be before the date of first conviction',
    })
    req.sessionModel.options.fields.most_recent_sexual_offence_date.validate.push({
      fn: dateIsAfter,
      arguments: [offenderDob],
      message: 'Date must be later than the individual’s date of birth',
    })
    req.sessionModel.options.fields.earliest_release_date.validate.push({
      fn: dateIsAfter,
      arguments: [offenderDob],
      message: 'Date must be later than the individual’s date of birth',
    })
    req.sessionModel.options.fields.earliest_release_date.validate.push({
      fn: yearsBetween,
      arguments: [offenderDob, 110],
      message: 'The individual must be aged 110 or younger on commencement',
    })

    super.validateFields(req, res, next)
  }

  validate(req, res, next) {
    super.validate(req, res, next)
  }

  locals(req, res, next) {
    res.locals.csrfToken = res.locals['csrf-token']
    delete res.locals['csrf-token']

    // format any errors that the validation steps created
    const [validationErrors, errorSummary] = formatWizardValidationErrors(res.locals.errors)
    res.locals.errors = validationErrors
    req.errors = validationErrors
    res.locals.errorSummary = errorSummary

    super.locals(req, res, next)
  }

  async saveValues(req, res, next) {
    const { user, body: answers } = req

    try {
      await assembleDates(req, res, () => {})
      const [ok, response] = await postAnswers(res.locals.assessmentId, 'current', { answers }, user?.token, user?.id)

      if (ok) {
        return super.saveValues(req, res, next)
      }
      // errors returned from OASys
      if (response.status === 422) {
        const [validationErrors, errorSummary] = formatValidationErrors(response.errors, response.pageErrors)
        req.errors = validationErrors
        req.errorSummary = errorSummary
        // todo: add OASys errors to page and redisplay
      }
      return res.render('app/error', { subHeading: getErrorMessage(response.reason) })
    } catch (error) {
      logger.error(`Could not save to assessment ${res.locals.assessmentId}, current episode, error: ${error}`)
      return res.render('app/error', { error })
    }
  }
}

module.exports = SaveAndContinue
