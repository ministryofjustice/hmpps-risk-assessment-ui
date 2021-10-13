const { Controller } = require('hmpo-form-wizard')

class StubSaveAndContinue extends Controller {
  locals(req, res, next) {
    res.locals.csrfToken = res.locals['csrf-token'] // TODO: move this to a BaseController class
    res.locals.assessment = req.session.assessment

    super.locals(req, res, next)
  }
}

module.exports = StubSaveAndContinue
