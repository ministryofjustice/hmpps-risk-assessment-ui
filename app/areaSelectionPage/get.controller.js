const { logger } = require('../../common/logging/logger')
const { getUserProfile } = require('../../common/data/hmppsAssessmentApi')

const areaSelectionController = async ({ tokens }, res) => {
  try {
    const { regions } = await getUserProfile('USER_2', tokens)
    return res.render(`${__dirname}/index`, { areas: regions.map(({ name, code }) => ({ text: name, value: code })) })
  } catch (error) {
    logger.error(`Could not retrieve areas, error: ${error}`)
    return res.render('app/error', { error })
  }
}

module.exports = { areaSelectionController }
