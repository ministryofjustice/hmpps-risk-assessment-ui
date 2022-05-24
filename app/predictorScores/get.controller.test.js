const { displayPredictorScores } = require('./get.controller')
const { getDraftPredictorScore } = require('../../common/data/hmppsAssessmentApi')

jest.mock('../../common/data/hmppsAssessmentApi', () => ({
  getDraftPredictorScore: jest.fn(),
}))

const assessmentUuid = '22222222-2222-2222-2222-222222222221'
const episodeUuid = '22222222-2222-2222-2222-222222222222'
const user = {
  id: 'USER_ID',
  token: 'USER_TOKEN',
}

const predictorScores = [
  {
    type: 'RSR',
    scores: {
      RSR: { level: 'HIGH', score: 11.34, isValid: true, date: '2021-08-13 08:26:21.000000' },
      OSPC: { level: 'MEDIUM', score: 8.76, isValid: true, date: '2021-08-13 08:26:21.000000' },
      OSPI: { level: 'LOW', score: 3.45, isValid: true, date: '2021-08-13 08:26:21.000000' },
    },
  },
]

const formattedCurrentPredictorScore = {
  date: '13 Aug 2021 at 09:26:21',
  scores: {
    RSR: { type: 'RSR', level: 'HIGH', score: 11.34 },
    OSPC: { type: 'OSP/C', level: 'MEDIUM', score: 8.76 },
    OSPI: { type: 'OSP/I', level: 'LOW', score: 3.45 },
  },
}

const formattedHistoricalPredictorScores = []

describe('display predictor scores', () => {
  const req = {
    params: {
      episodeId: episodeUuid,
      assessmentId: assessmentUuid,
      assessmentType: 'RSR',
    },
    session: {
      navigation: {
        previousPage: {
          url: '/foo/bar',
          name: 'previous page',
        },
      },
    },
    user,
  }
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    locals: {
      offenderDetails: {
        name: 'Bob Ross',
      },
    },
  }

  beforeEach(() => {
    getDraftPredictorScore.mockReset()
  })

  it('displays predictor scores', async () => {
    getDraftPredictorScore.mockResolvedValue([true, predictorScores])

    await displayPredictorScores(req, res)

    expect(getDraftPredictorScore).toHaveBeenCalledWith(episodeUuid, user.token, user.id)
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, {
      subheading: 'Risk of Serious Recidivism (RSR) assessment',
      heading: "Bob Ross's scores",
      navigation: {
        previous: {
          name: 'previous page',
          url: '/foo/bar',
        },
        complete: {
          url: '/22222222-2222-2222-2222-222222222221/episode/22222222-2222-2222-2222-222222222222/RSR/scores/complete',
        },
      },
      predictorScores: {
        current: formattedCurrentPredictorScore,
        historical: formattedHistoricalPredictorScores,
      },
    })
  })

  it('catches exceptions and renders the error page', async () => {
    const theError = new Error('💥')
    getDraftPredictorScore.mockRejectedValue(theError)

    await displayPredictorScores(req, res)

    expect(getDraftPredictorScore).toHaveBeenCalled()
    expect(res.render).toHaveBeenCalledWith(`app/error`, { error: theError })
  })
})
