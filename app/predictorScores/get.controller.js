const { format, parseISO } = require('date-fns')
const { getPredictorScoresForEpisode } = require('../../common/data/predictorScores')

const formatDate = dateString => {
  const date = parseISO(dateString)
  const datePart = format(date, 'd MMM y')
  const timePart = format(date, 'H:mm')
  return `${datePart} at ${timePart}`
}

const formatPredictorScores = predictorScores => ({
  ...predictorScores,
  date: formatDate(predictorScores.date),
})

const splitPredictorScores = predictorScores => {
  const [currentScores, ...historicalScores] = predictorScores
  return {
    currentScores: formatPredictorScores(currentScores),
    historicalScores: historicalScores.map(formatPredictorScores),
  }
}

const displayPredictorScores = async ({ params: { episodeUuid } }, res) => {
  try {
    const predictorScores = await getPredictorScoresForEpisode(episodeUuid)
    return res.render(`${__dirname}/index`, {
      predictorScores: splitPredictorScores(predictorScores),
    })
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = { displayPredictorScores }
