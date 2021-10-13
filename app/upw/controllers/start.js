const { Controller } = require('hmpo-form-wizard')

class StartRsr extends Controller {
  locals(req, res, next) {
    res.locals.csrfToken = res.locals['csrf-token'] // TODO: move this to a BaseController class
    res.locals.assessment = req.session.assessment

    res.locals.pageDescription = 'Your answers will be combined with OASys and nDelius information. A full PDF version will then be created.'

    super.locals(req, res, next)
  }
}

module.exports = StartRsr
