const { assessmentSupervision, getCurrentEpisode } = require('../../common/data/hmppsAssessmentApi')
const { startAssessment } = require('./get.controller')

jest.mock('../../common/data/hmppsAssessmentApi', () => ({
  assessmentSupervision: jest.fn(),
  getCurrentEpisode: jest.fn(),
}))

describe('startAssessment', () => {
  const baseReq = {
    user: {
      id: 1,
      token: 'USER_TOKEN',
    },
    session: {},
  }
  const baseSession = {
    save: jest.fn(),
  }
  const res = {
    redirect: jest.fn(),
  }
  const next = jest.fn()

  beforeEach(() => {
    assessmentSupervision.mockReset()
    res.redirect.mockReset()
    next.mockReset()
    baseSession.save.mockReset()

    baseReq.session = { ...baseSession }
  })

  it('creates an assessment then redirects', async () => {
    const assessmentUuid = 'ASSESSMENT_UUID'
    const episodeUuid = 'EPISODE_UUID'
    assessmentSupervision.mockResolvedValue([true, { assessmentUuid }])
    getCurrentEpisode.mockResolvedValue({ episodeUuid })

    const req = {
      ...baseReq,
      query: {
        crn: '123456',
        eventId: 1,
        assessmentType: 'RSR',
      },
    }

    await startAssessment(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(`/${req.query.assessmentType}/start`)
  })

  it('stores assessment details in the session', async () => {
    const assessmentUuid = 'ASSESSMENT_UUID'
    const episodeUuid = 'EPISODE_UUID'
    const offenceCode = 'OFFENCE_CODE'
    const offenceSubCode = 'OFFENCE_SUB_CODE'
    const subject = {
      name: 'Test Offender',
      dateOfBirth: '01/01/1980',
      pnc: '1234567',
      crn: '1234567',
      subjectUuid: 'SUBJECT_UUID',
    }
    assessmentSupervision.mockResolvedValue([true, { assessmentUuid, subject }])
    getCurrentEpisode.mockResolvedValue({
      episodeUuid,
      offenceCode,
      offenceSubCode,
    })

    const req = {
      ...baseReq,
      query: {
        crn: '123456',
        eventId: 1,
        assessmentType: 'RSR',
      },
    }

    await startAssessment(req, res, next)

    expect(req.session).toEqual({
      ...baseSession,
      assessment: {
        uuid: assessmentUuid,
        episodeUuid,
        offence: {
          offence: offenceCode,
          subCode: offenceSubCode,
        },
        subject: {
          crn: subject.crn,
          dob: subject.dateOfBirth,
          name: subject.name,
          pnc: subject.pnc,
          subjectUuid: subject.subjectUuid,
        },
      },
    })
  })

  it('returns an error when passed an invalid CRN', async () => {
    const req = {
      ...baseReq,
      query: {
        eventId: 1,
        assessmentType: 'RSR',
      },
    }

    await startAssessment(req, res, next)

    expect(next).toHaveBeenCalledWith(new Error('CRN is mandatory'))
  })

  it('returns an error when passed an invalid assessment type', async () => {
    const req = {
      ...baseReq,
      query: {
        crn: '123456',
        eventId: 1,
        assessmentType: 'SOME_INVALID_TYPE',
      },
    }

    await startAssessment(req, res, next)

    expect(next).toHaveBeenCalledWith(new Error('Assessment type not valid'))
  })

  it('returns an error when unable to create an assessment', async () => {
    assessmentSupervision.mockResolvedValue([false, { reason: 'SOME_ERROR' }])

    const req = {
      ...baseReq,
      query: {
        crn: '123456',
        eventId: 1,
        assessmentType: 'RSR',
      },
    }

    await startAssessment(req, res, next)

    expect(next).toHaveBeenCalledWith(new Error('Something went wrong'))
  })
})
