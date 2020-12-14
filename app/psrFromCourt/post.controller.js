// const { logger } = require('../../common/logging/logger')

const startPsrFromCourt = async ({ body, tokens }, res) => {
  const { courtCode, caseNumber } = body

  // const assessment = await createAssessment({ courtCode, caseNumber})

  res.render(`${__dirname}/index`)
}

module.exports = { startPsrFromCourt }
