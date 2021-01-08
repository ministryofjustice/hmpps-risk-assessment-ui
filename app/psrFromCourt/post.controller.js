// const { logger } = require('../../common/logging/logger')
const { assessmentSupervision } = require('../../common/data/assessmentApi')

const startPsrFromCourt = ({ params: { courtCode, caseNumber }, tokens }, res) => {
  return startPsr(courtCode, caseNumber, tokens, res)
}

const startPsrFromForm = ({ body, tokens }, res) => {
  const { courtCode, caseNumber } = body

  return startPsr(courtCode, caseNumber, tokens, res)
}

const startPsr = async (courtCode, caseNumber, tokens, res) => {
  try {
    const assessment = await assessmentSupervision({ courtCode, caseNumber }, tokens)

    return res.redirect(`/${assessment.assessmentUuid}/questionGroup/pre_sentence_report/0`)
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = {
  startPsrFromCourt,
  startPsrFromForm,
}
