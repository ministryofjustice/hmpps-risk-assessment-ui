// const { logger } = require('../../common/logging/logger')

const devAssessmentId = 'e69a61ff-7395-4a12-b434-b1aa6478aded'

const startController = (req, res) => {
  res.render(`${__dirname}/index`, { assessmentId: devAssessmentId })
}

module.exports = { startController }
