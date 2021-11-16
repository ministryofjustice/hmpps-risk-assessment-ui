const nock = require('nock')
const { Controller } = require('hmpo-form-wizard')
const nunjucks = require('nunjucks')

const ConfirmationController = require('./confirmation')

jest.mock('nunjucks')
jest.mock('../../../common/utils/util', () => ({
  getCorrelationId: jest.fn(() => 'mocked-correlation-id'),
}))
jest.mock('../../../common/data/userDetailsCache', () => ({
  getCachedUserDetails: jest.fn(() => ({
    isActive: true,
    oasysUserCode: 'SUPPORT1',
    username: 'Ray Arnold',
    email: 'foo@bar.baz',
    areaCode: 'HFS',
    areaName: 'Hertfordshire',
  })),
}))

const createTestFile = () => Buffer.from('Test Buffer')

describe('ConfirmationController', () => {
  describe('Render', () => {
    const superMethod = jest.spyOn(Controller.prototype, 'render')
    const controller = new ConfirmationController({
      route: 'test-route',
    })

    let req
    const user = { token: 'mytoken', id: '1' }
    const assessmentUuid = '22222222-2222-2222-2222-222222222221'
    const episodeUuid = '22222222-2222-2222-2222-222222222222'

    const res = {
      redirect: jest.fn(),
      render: jest.fn(),
      send: jest.fn(),
      set: jest.fn(),
      locals: {
        'csrf-token': 'CSRF_TOKEN',
        rawAnswers: {
          first_name: 'Robert',
          last_name: 'Robertson',
          crn: 'X123456',
        },
      },
    }

    const next = jest.fn()

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
            uuid: assessmentUuid,
            episodeUuid,
            subject: { dob: '1980-01-01' },
          },
        },
        form: {
          options: {
            allFields: {},
            fields: {},
            journeyName: 'UPW',
          },
          values: {},
        },
      }

      res.render.mockReset()
      res.send.mockReset()
      res.set.mockReset()
      req.sessionModel.get.mockReset()
      req.sessionModel.set.mockReset()
      req.form.options.fields = {}
      req.form.options.allFields = {}
      next.mockReset()
      nunjucks.render.mockReturnValue('RENDERED_TEMPLATE')
    })

    it('calls the PDF convert and passes the response to the backend API', async () => {
      const file = createTestFile()

      nock(/localhost/gi)
        .post('/forms/chromium/convert/html')
        .reply(200, file)

      nock(/localhost/gi)
        .post(`/assessments/${assessmentUuid}/episode/${episodeUuid}/document`)
        .reply(200)

      await controller.render(req, res, next)

      expect(superMethod).toHaveBeenCalled()
    })

    it('passes an error to the error handler when PDF conversion fails', async () => {
      nock(/localhost/gi)
        .post('/forms/chromium/convert/html')
        .reply(500)

      await controller.render(req, res, next)

      expect(next).toHaveBeenCalledWith(new Error('Failed to convert template to PDF'))
    })

    it('redirects to the "Delius is down" page when uploading the PDF returns a 500', async () => {
      const file = createTestFile()

      nock(/localhost/gi)
        .post('/forms/chromium/convert/html')
        .reply(200, file)

      nock(/localhost/gi)
        .post(`/assessments/${assessmentUuid}/episode/${episodeUuid}/document`)
        .reply(500)

      await controller.render(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith('/UPW/delius-error')
    })

    it('redirects to the "Delius is down" page when uploading the PDF returns a 502', async () => {
      const file = createTestFile()

      nock(/localhost/gi)
        .post('/forms/chromium/convert/html')
        .reply(200, file)

      nock(/localhost/gi)
        .post(`/assessments/${assessmentUuid}/episode/${episodeUuid}/document`)
        .reply(502)

      await controller.render(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith('/UPW/delius-error')
    })

    it('redirects to the "Delius is down" page when uploading the PDF returns a 503', async () => {
      const file = createTestFile()

      nock(/localhost/gi)
        .post('/forms/chromium/convert/html')
        .reply(200, file)

      nock(/localhost/gi)
        .post(`/assessments/${assessmentUuid}/episode/${episodeUuid}/document`)
        .reply(503)

      await controller.render(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith('/UPW/delius-error')
    })

    it('passes an error to the error handler when uploading the PDF returns a 400', async () => {
      const file = createTestFile()

      nock(/localhost/gi)
        .post('/forms/chromium/convert/html')
        .reply(200, file)

      nock(/localhost/gi)
        .post(`/assessments/${assessmentUuid}/episode/${episodeUuid}/document`)
        .reply(400)

      await controller.render(req, res, next)

      expect(next).toHaveBeenCalledWith(new Error('Failed to upload the PDF'))
    })
  })
})
