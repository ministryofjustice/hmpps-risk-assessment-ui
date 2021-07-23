const { displayPredictorScores } = require('./get.controller')
const { getPredictorScoresForEpisode } = require('../../common/data/predictorScores')

jest.mock('../../common/data/predictorScores', () => ({
  getPredictorScoresForEpisode: jest.fn(),
}))

const episodeUuid = '22222222-2222-2222-2222-222222222222'

const currentPredictorScore = {
  date: '2021/07/23',
  scores: [{ type: 'RSR', score: 'LOW' }],
}

const historicalPredictorScores = [
  {
    date: '2021/07/22',
    scores: [{ type: 'RSR', score: 'MEDIUM' }],
  },
  {
    date: '2021/07/21',
    scores: [{ type: 'RSR', score: 'HIGH' }],
  },
]

describe('display predictor scores', () => {
  const req = {
    params: {
      episodeUuid: '22222222-2222-2222-2222-222222222222',
    },
  }
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
  }

  beforeEach(() => {
    getPredictorScoresForEpisode.mockReset()
  })

  it('displays predictor scores', async () => {
    getPredictorScoresForEpisode.mockResolvedValue([currentPredictorScore, ...historicalPredictorScores])

    await displayPredictorScores(req, res)

    expect(getPredictorScoresForEpisode).toHaveBeenCalledWith(episodeUuid)
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, {
      predictorScores: {
        currentScores: currentPredictorScore,
        historicalScores: historicalPredictorScores,
      },
    })
  })

  it('catches exceptions and renders the error page', async () => {
    const theError = new Error('💥')
    getPredictorScoresForEpisode.mockRejectedValue(theError)

    await displayPredictorScores(req, res)

    expect(getPredictorScoresForEpisode).toHaveBeenCalled()
    expect(res.render).toHaveBeenCalledWith(`app/error`, { error: theError })
  })
})
