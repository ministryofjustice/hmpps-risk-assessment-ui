const { createFinalPredictorScores, postCompleteAssessment } = require('../../common/data/hmppsAssessmentApi')
const { logger } = require('../../common/logging/logger')

const submitPredictorScores = async (req, res) => {
  try {
    const {
      params: { episodeUuid, assessmentUuid, assessmentType },
      user,
    } = req

    const offenderName = res.locals.offenderDetails?.name || 'the offender'

    logger.info(`Creating final predictor scores for episode: ${episodeUuid} of type: ${assessmentType}`)

    const [createdPredictorScore] = await createFinalPredictorScores(episodeUuid, user?.token, user?.id)
    if (!createdPredictorScore)
      return res.render('app/error', { error: new Error('Failed to publish scores to OASys') })

    const [completedAssessment] = await postCompleteAssessment(assessmentUuid, user?.token, user?.id)
    if (!completedAssessment) return res.render('app/error', { error: new Error('Failed to complete the assessment') })

    return res.render(`${__dirname}/index`, {
      panelText: `Your answers and scores for ${offenderName} have been uploaded to OASys`,
      navigation: {
        next: { url: '/' },
      },
    })
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = { submitPredictorScores }
