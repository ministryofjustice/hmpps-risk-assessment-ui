const SaveAndContinueController = require('./saveAndContinue')
const { postAnswers } = require('../../../common/data/hmppsAssessmentApi')
const { customValidations } = require('../fields')

jest.mock('../../../common/data/hmppsAssessmentApi')
jest.mock('../fields', () => ({
  customValidations: jest.fn(),
}))

let req
const user = { token: 'mytoken', id: '1' }
const episodeUuid = '22222222-2222-2222-2222-222222222222'

const controller = new SaveAndContinueController({
  route: 'test-route',
})

describe('SaveAndContinueController', () => {
  const res = {
    redirect: jest.fn(),
    render: jest.fn(),
  }

  beforeEach(() => {
    req = {
      user,
      body: {},
      sessionModel: {
        set: jest.fn(),
        get: jest.fn(),
      },
      session: {
        assessment: {
          uuid: 'test-assessment-id',
          subject: { dob: '1980-01-01' },
        },
      },
      form: {
        options: {
          fields: {
            age_first_conviction: { type: 'numeric' },
            total_sanctions: { type: 'numeric' },
            date_first_sanction: { type: 'date' },
          },
        },
        values: {},
      },
    }

    res.render.mockReset()
    req.sessionModel.get.mockReset()
    req.sessionModel.set.mockReset()
    postAnswers.mockReset()
    customValidations.mockReset()
  })

  describe('process', () => {
    it('combines date fields', async () => {
      req.body = {
        'date_first_sanction-day': '2',
        'date_first_sanction-month': '9',
        'date_first_sanction-year': '2018',
        age_first_conviction: '3',
        total_sanctions: '2',
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: '2018-09-02',
        age_first_conviction: '3',
        total_sanctions: '2',
      })
    })

    it('returns empty when the date has no day component', async () => {
      req.body = {
        'date_first_sanction-day': '',
        'date_first_sanction-month': '9',
        'date_first_sanction-year': '2018',
        age_first_conviction: '3',
        total_sanctions: '2',
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: '',
        age_first_conviction: '3',
        total_sanctions: '2',
      })

      expect(req.sessionModel.set).toHaveBeenCalledWith('answers', req.form.values)
    })

    it('returns empty when the date has no month component', async () => {
      req.body = {
        'date_first_sanction-day': '2',
        'date_first_sanction-month': '',
        'date_first_sanction-year': '2018',
        age_first_conviction: '3',
        total_sanctions: '2',
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: '',
        age_first_conviction: '3',
        total_sanctions: '2',
      })

      expect(req.sessionModel.set).toHaveBeenCalledWith('answers', req.form.values)
    })

    it('returns empty when the date has no year component', async () => {
      req.body = {
        'date_first_sanction-day': '2',
        'date_first_sanction-month': '9',
        'date_first_sanction-year': '',
        age_first_conviction: '3',
        total_sanctions: '2',
      }

      await controller.process(req, res, () => {})

      expect(req.form.values).toEqual({
        date_first_sanction: '',
        age_first_conviction: '3',
        total_sanctions: '2',
      })

      expect(req.sessionModel.set).toHaveBeenCalledWith('answers', req.form.values)
    })
  })

  describe('validateFields', () => {
    it('applies customValidations', async () => {
      const answers = {
        date_first_sanction: '2018-09-02',
        age_first_conviction: '3',
        total_sanctions: '2',
      }
      const modifiedFields = {
        age_first_conviction: { type: 'numeric', validation: 'test' },
        total_sanctions: { type: 'numeric', validation: 'test' },
        date_first_sanction: { type: 'date', validation: 'test' },
      }

      req.sessionModel.get.mockReturnValue(answers)
      customValidations.mockReturnValue(modifiedFields)

      const originalFieldConfiguration = JSON.parse(JSON.stringify(req.form.options.fields))

      await controller.validateFields(req, res, () => {})

      expect(req.sessionModel.get).toHaveBeenCalledWith('answers')
      expect(customValidations).toHaveBeenCalledWith(
        originalFieldConfiguration,
        req.session.assessment.subject.dob,
        answers.date_first_sanction,
        answers.total_sanctions,
      )
      expect(req.form.options.fields).toEqual(modifiedFields)
    })
  })

  describe('saveValues', () => {
    it('saves the answers', async () => {
      postAnswers.mockResolvedValue([true, { episodeUuid }])
      req.sessionModel.get.mockReturnValue({
        date_first_sanction: '2018-09-02',
        age_first_conviction: '3',
        total_sanctions: '2',
        some_selection_field: ['test'],
      })

      await controller.saveValues(req, res, () => {})

      expect(req.sessionModel.get).toHaveBeenCalledWith('answers')
      expect(postAnswers).toHaveBeenCalledWith(
        'test-assessment-id',
        'current',
        {
          answers: {
            date_first_sanction: ['2018-09-02'],
            age_first_conviction: ['3'],
            total_sanctions: ['2'],
            some_selection_field: ['test'],
          },
        },
        user.token,
        user.id,
      )
    })

    it('renders an error when there are OASys validation errors', async () => {
      postAnswers.mockResolvedValue([
        false,
        {
          status: 422,
          reason: 'OASYS_VALIDATION',
          errors: [{ message: 'field error', key: 'some_field' }],
          pageErrors: ['server error'],
        },
      ])
      req.sessionModel.get.mockReturnValue({})

      await controller.saveValues(req, res, () => {})

      const theError = 'Something went wrong'

      expect(req.sessionModel.get).toHaveBeenCalledWith('answers')
      expect(postAnswers).toHaveBeenCalledWith(
        req.session.assessment.uuid,
        'current',
        { answers: {} },
        user.token,
        user.id,
      )
      expect(res.render).toHaveBeenCalledWith('app/error', { subHeading: theError })
    })

    it('renders an error when the user does not have permission to update the assessment', async () => {
      postAnswers.mockResolvedValue([false, { status: 403, reason: 'OASYS_PERMISSION' }])
      req.sessionModel.get.mockReturnValue({})

      await controller.saveValues(req, res, () => {})

      const theError =
        'You do not have permission to update this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'

      expect(req.sessionModel.get).toHaveBeenCalledWith('answers')
      expect(res.render).toHaveBeenCalledWith('app/error', { subHeading: theError })
    })

    it('displays an error if answer saving fails', async () => {
      const theError = new Error('Error message')
      postAnswers.mockRejectedValue(theError)
      req.sessionModel.get.mockReturnValue({})

      await controller.saveValues(req, res, () => {})

      expect(res.render).toHaveBeenCalledWith(`app/error`, { error: theError })
    })
  })
})
