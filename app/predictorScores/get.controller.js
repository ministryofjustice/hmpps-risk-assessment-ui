const { getPredictorScoresForEpisode } = require('../../common/data/predictorScores')

const formatPredictorScores = predictorScores => {
  const [currentScores, ...historicalScores] = predictorScores
  return {
    currentScores,
    historicalScores,
  }
}

const displayPredictorScores = async ({ params: { episodeUuid } }, res) => {
  try {
    const predictorScores = await getPredictorScoresForEpisode(episodeUuid)
    return res.render(`${__dirname}/index`, {
      predictorScores: formatPredictorScores(predictorScores),
    })
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = { displayPredictorScores }
