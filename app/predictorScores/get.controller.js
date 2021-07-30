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
  const groupedScores = predictorScores
    .flatMap(predictor =>
      predictor.scores.map(predictorScore => ({
        ...predictorScore,
        type: predictor.type,
      })),
    )
    .reduce((result, { level, score, type, date }) => {
      const groups = { ...result }
      groups[date] = {
        date,
        scores: [...(result[date]?.scores || []), { level, score, type }],
      }
      return groups
    }, {})

  const sortedScores = Object.values(groupedScores).sort((a, b) => (a.date > b.date ? -1 : 1))

  const [currentScores, ...historicalScores] = sortedScores

  const formattedScore = currentScores ? formatPredictorScores(currentScores) : null
  const formattedHistoricalScores = historicalScores.map(formatPredictorScores)
  return {
    currentScores: formattedScore,
    historicalScores: formattedHistoricalScores,
  }
}

const displayPredictorScores = async (req, res) => {
  try {
    const {
      params: { episodeUuid },
    } = req
    const predictorScores = await getPredictorScoresForEpisode(episodeUuid)

    const { previousPage } = req.session.navigation

    const offenderName = res.locals.offenderDetails?.name || 'Offender'
    const assessmentType = 'PLACEHOLDER - Assessment Type'

    return res.render(`${__dirname}/index`, {
      predictorScores: splitPredictorScores(predictorScores),
      heading: `${offenderName}'s scores`,
      assessmentType,
      navigation: {
        previous: previousPage,
      },
    })
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = { displayPredictorScores }
