const upwSaveAndContinue = require('./saveAndContinue')
const {
  answerDtoFrom,
  pageValidationErrorsFrom,
  getErrorMessage,
} = require('../../common/controllers/saveAndContinue.utils')
const { postAnswers } = require('../../../common/data/hmppsAssessmentApi')
const { logger } = require('../../../common/logging/mdc-aware-logger')

class SaveAndContinue extends upwSaveAndContinue {
  async locals(req, res, next) {
    const itemToDelete = req.params[0]
    const multipleGroupName = 'gp_details'

    const { user } = req
    const answers = answerDtoFrom(req.sessionModel.get('answers') || req.sessionModel.get('rawAnswers'))
    const rawAnswers = req.sessionModel.get('rawAnswers')

    // delete the appropriate entry
    const existingMultiple = answers[multipleGroupName] || {}
    existingMultiple.splice(itemToDelete, 1)
    answers[multipleGroupName] = existingMultiple
    rawAnswers[multipleGroupName] = existingMultiple
    req.sessionModel.set('rawAnswers', rawAnswers)
    req.sessionModel.set('answers', answers)

    try {
      const [ok, response] = await postAnswers(
        req.session?.assessment?.uuid,
        req.session?.assessment?.episodeUuid,
        { answers },
        user?.token,
        user?.id,
      )

      if (ok) {
        return super.successHandler(req, res, next)
      }
      // Errors returned from OASys
      if (response.status === 422) {
        const { validationErrors, errorSummary } = pageValidationErrorsFrom(response.errors, response.pageErrors)
        req.errors = validationErrors
        req.errorSummary = errorSummary
        // TODO: add OASys errors to page and redisplay
      }
      return res.render('app/error', { subHeading: getErrorMessage(response.reason) })
    } catch (error) {
      logger.error(
        `Could not delete item ${itemToDelete} from ${multipleGroupName} ${req.session?.assessment?.uuid}, current episode, error: ${error}`,
      )
      return res.render('app/error', { error })
    }
  }
}

module.exports = SaveAndContinue
