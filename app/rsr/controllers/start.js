const { Controller } = require('hmpo-form-wizard')

class StartRsr extends Controller {
  async getValues(req, res, next) {
    super.getValues(req, res, next)
  }

  locals(req, res, next) {
    res.locals.csrfToken = res.locals['csrf-token'] // TODO: move this to a BaseController class
    res.locals.assessment = req.session.assessment

    super.locals(req, res, next)
  }
}

module.exports = StartRsr
