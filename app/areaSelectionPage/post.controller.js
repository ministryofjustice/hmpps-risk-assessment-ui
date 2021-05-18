const logger = require('../../common/logging/logger')

const {
  dev: { devAssessmentId },
} = require('../../common/config')

const redirectToAssessmentList = (req, res) => {
  logger.info(`Area Code: ${JSON.stringify(req.body)}`)
  try {
    return res.redirect(`/${devAssessmentId}/assessments`)
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = {
  redirectToAssessmentList,
}
