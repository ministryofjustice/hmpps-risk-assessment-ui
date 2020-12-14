// const { logger } = require('../../common/logging/logger')
const { assessmentSupervision } = require('../../common/data/assessmentApi')

const startPsrFromCourt = async ({ body, tokens }, res) => {
  const { courtCode, caseNumber } = body

  const assessment = await assessmentSupervision({ courtCode, caseNumber }, tokens)

  res.redirect(`${assessment.assessmentUuid}/assessments`)
}

module.exports = { startPsrFromCourt }
