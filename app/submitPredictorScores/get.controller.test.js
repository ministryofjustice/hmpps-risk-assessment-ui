const { submitPredictorScores } = require('./get.controller')
const { createFinalPredictorScores, postCompleteAssessment } = require('../../common/data/hmppsAssessmentApi')

jest.mock('../../common/data/hmppsAssessmentApi', () => ({
  createFinalPredictorScores: jest.fn(),
  postCompleteAssessment: jest.fn(),
}))

describe('display predictor scores', () => {
  const req = {
    params: {
      assessmentUuid: '22222222-2222-2222-2222-222222222222',
      episodeUuid: '22222222-2222-2222-2222-222222222222',
      assessmentType: 'RSR',
    },
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
    createFinalPredictorScores.mockReset()
    postCompleteAssessment.mockReset()
    res.render.mockReset()
  })

  it('displays a message on submission', async () => {
    createFinalPredictorScores.mockResolvedValue([true])
    postCompleteAssessment.mockResolvedValue([true])

    await submitPredictorScores(req, res)

    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, {
      panelText: 'Your answers and scores for Bob Ross have been uploaded to OASys',
      navigation: {
        next: {
          url: '/',
        },
      },
    })
  })

  it('displays the error page when unable to submit predictor scores', async () => {
    createFinalPredictorScores.mockResolvedValue([false])

    await submitPredictorScores(req, res)

    expect(res.render).toHaveBeenCalledWith('app/error', {
      error: new Error('Failed to publish scores to OASys'),
    })
  })

  it('displays the error page when unable to complete the assessment', async () => {
    createFinalPredictorScores.mockResolvedValue([true])
    postCompleteAssessment.mockResolvedValue([false])

    await submitPredictorScores(req, res)

    expect(res.render).toHaveBeenCalledWith('app/error', {
      error: new Error('Failed to complete the assessment'),
    })
  })

  it('catches exceptions and renders the error page', async () => {
    const theError = new Error('💥')
    createFinalPredictorScores.mockRejectedValue(theError)

    await submitPredictorScores(req, res)

    expect(createFinalPredictorScores).toHaveBeenCalled()
    expect(res.render).toHaveBeenCalledWith(`app/error`, { error: theError })
  })
})
