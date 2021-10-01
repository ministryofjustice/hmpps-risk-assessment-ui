const SaveAndContinueController = require('./saveAndContinue')
const { postAnswers } = require('../../../common/data/hmppsAssessmentApi')

jest.mock('../../../common/data/hmppsAssessmentApi')

let req
const user = { token: 'mytoken', id: '1' }
const episodeUuid = '22222222-2222-2222-2222-222222222222'

const controller = new SaveAndContinueController({
  route: 'test-route',
})

describe('post answers', () => {
  const res = {
    redirect: jest.fn(),
    render: jest.fn(),
  }

  beforeEach(() => {
    req = {
      user,
      body: {},
      sessionModel: {
        set: () => {},
        unset: () => {},
      },
      session: {
        assessment: { uuid: 'test-assessment-id' },
      },
      form: {
        fields: { date_first_sanction: { type: 'date' } },
        values: {},
      },
    }

    res.render.mockReset()
  })

  describe('process', () => {
    it('should combine date fields', async () => {
      req.form = {
        values: {
          'date_first_sanction-day': '2',
          'date_first_sanction-month': '9',
          'date_first_sanction-year': '2018',
          age_first_conviction: '3',
          total_sanctions: '2',
        },
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: '2018-09-02',
        age_first_conviction: '3',
        total_sanctions: '2',
      })
    })

    it('should return null when the date has no day component', async () => {
      req.form = {
        values: {
          'date_first_sanction-month': '9',
          'date_first_sanction-year': '2018',
          age_first_conviction: '3',
          total_sanctions: '2',
        },
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: null,
        age_first_conviction: '3',
        total_sanctions: '2',
      })
    })

    it('should return null when the date has no month component', async () => {
      req.form = {
        values: {
          'date_first_sanction-day': '2',
          'date_first_sanction-year': '2018',
          age_first_conviction: '3',
          total_sanctions: '2',
        },
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: null,
        age_first_conviction: '3',
        total_sanctions: '2',
      })
    })

    it('should return null when the date has no year component', async () => {
      req.form = {
        values: {
          'date_first_sanction-day': '2',
          'date_first_sanction-month': '9',
          age_first_conviction: '3',
          total_sanctions: '2',
        },
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: null,
        age_first_conviction: '3',
        total_sanctions: '2',
      })
    })
  })

  describe('saveValues', () => {
    it('should save the answers', async () => {
      postAnswers.mockResolvedValue([true, { episodeUuid }])

      req.form = {
        values: {
          date_first_sanction: '2018-09-02',
          age_first_conviction: '3',
          total_sanctions: '2',
        },
      }

      await controller.saveValues(req, res, () => {})

      expect(postAnswers).toHaveBeenCalledWith(
        'test-assessment-id',
        'current',
        {
          answers: {
            date_first_sanction: '2018-09-02',
            age_first_conviction: '3',
            total_sanctions: '2',
          },
        },
        user.token,
        user.id,
      )
    })

    it('renders an error when there are OASys validation errors', async () => {
      postAnswers.mockResolvedValue([false, { status: 422, reason: 'OASYS_VALIDATION' }])

      await controller.saveValues(req, res, () => {})

      const theError = 'Something went wrong'

      expect(res.render).toHaveBeenCalledWith('app/error', { subHeading: theError })
    })

    it('renders an error when the user does not have permission to update the assessment', async () => {
      postAnswers.mockResolvedValue([false, { status: 403, reason: 'OASYS_PERMISSION' }])

      await controller.saveValues(req, res, () => {})

      const theError =
        'You do not have permission to update this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'

      expect(res.render).toHaveBeenCalledWith('app/error', { subHeading: theError })
    })

    it('should display an error if answer saving fails', async () => {
      const theError = new Error('Error message')
      postAnswers.mockRejectedValue(theError)

      await controller.saveValues(req, res, () => {})

      expect(res.render).toHaveBeenCalledWith(`app/error`, { error: theError })
    })
  })
})
