const BaseController = require('../../common/controllers/baseController')
const { getRegistrations, getRoshRiskSummary } = require('./common.utils')
const { getTaskList } = require('./taskList.utils')
const { getAnswers } = require('../../../common/data/hmppsAssessmentApi')
const { logger } = require('../../../common/logging/logger')
const { CACHE } = require('../../../common/utils/constants')

class TaskList extends BaseController {
  async locals(req, res, next) {
    res.locals.pageDescription =
      'Most of the questions in this assessment must be answered, but some are optional and are marked as such.'
    try {
      const journeyName = req.form?.options?.journeyName || ''
      const steps = req.form?.options?.steps || {}

      let persistedAnswers = req.sessionModel.get(CACHE.PERSISTED_ANSWERS)

      if (!persistedAnswers) {
        const { answers } = await getAnswers(
          req.session.assessment?.uuid,
          req.session.assessment?.episodeUuid,
          req.user?.token,
        )

        persistedAnswers = answers
      }

      const crn = req.session.assessment?.subject?.crn
      const { eventId } = req.session.assessment
      const deliusRegistrations = await getRegistrations(crn, eventId, req.user)
      const roshRiskSummary = await getRoshRiskSummary(crn, req.user)

      res.locals.taskList = getTaskList(`/${journeyName}`, steps, persistedAnswers, deliusRegistrations.flags || [])
      res.locals.saveAssessmentUrl = `/${journeyName}/assessment-saved`

      res.locals.widgetData = {
        ...deliusRegistrations,
        ...roshRiskSummary,
      }

      return super.locals(req, res, next)
    } catch (error) {
      logger.error(`Could not display task list for assessment ${req.session?.assessment?.uuid}, error: ${error}`)
      return res.render('app/error', { error })
    }
  }
}

module.exports = TaskList
