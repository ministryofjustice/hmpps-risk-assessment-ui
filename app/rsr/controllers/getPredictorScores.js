const { Controller } = require('hmpo-form-wizard')
const { getDraftPredictorScore } = require('../../../common/data/hmppsAssessmentApi')
const logger = require('../../../common/logging/logger')
const { splitPredictorScores } = require('../../../common/utils/predictors')

class GetPredictorScores extends Controller {
  // eslint-disable-next-line consistent-return
  async locals(req, res, next) {
    const { user } = req
    const episodeId = 'fb6b7c33-07fc-4c4c-a009-8d60f66952c4' // todo: link to ID saved in req after ARN-562 has merged
    const [ok, predictors] = await getDraftPredictorScore(episodeId, user?.token, user?.id)
    if (!ok) return res.render('app/error', { error: new Error('Failed to get draft predictor scores') })

    logger.info(`Received ${predictors.length} predictor scores for episode: ${episodeId}`)

    res.locals.predictorScores = splitPredictorScores(predictors)
    res.locals.scoreType = predictors[0].scoreType

    res.locals.heading = `Scores for ${req.session.assessment?.subject?.name || ' the offender'}`
    super.locals(req, res, next)
  }
}

module.exports = GetPredictorScores
