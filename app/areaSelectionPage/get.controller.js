const { logger } = require('../../common/logging/logger')

const areaSelectionController = async (req, res) => {
  try {
    const [flashRegions] = req.flash('regions')
    const regions = typeof flashRegions === 'string' ? JSON.parse(flashRegions) : []
    return res.render(`${__dirname}/index`, {
      areas: regions.map(({ name, code }) => ({
        text: name,
        value: JSON.stringify({ areaName: name, areaCode: code }),
      })),
    })
  } catch (error) {
    logger.error(`Area selection, error: ${error}`)
    return res.render('app/error', { error })
  }
}

module.exports = { areaSelectionController }
