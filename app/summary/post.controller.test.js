// Initialise nunjucks environment
const { completeAssessment } = require('./post.controller')
const { postCompleteAssessment } = require('../../common/data/hmppsAssessmentApi')
const assessmentEpisodesJson = require('../../wiremock/responses/assessmentEpisodes.json')

jest.mock('../../common/data/hmppsAssessmentApi')

const tokens = { authorisationToken: 'mytoken' }
let assessmentEpisodes

describe('display complete assessment page', () => {
  const req = {
    body: {},
    tokens,
    params: {
      assessmentId: 'test-assessment-id',
    },
  }
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    locals: {
      offenderDetails: {
        name: 'Fred Smith',
      },
    },
  }

  before(() => {
    assessmentEpisodes = JSON.parse(JSON.stringify(assessmentEpisodesJson))
    postCompleteAssessment.mockReset()
  })

  it('should render the page with the correct structure', async () => {
    postCompleteAssessment.mockResolvedValue([true, assessmentEpisodes])

    await completeAssessment(req, res)

    expect(res.render).toHaveBeenCalledWith(`${__dirname}/rhekehkrjhkr`, { offenderName: ' Smith' })
  })
})
