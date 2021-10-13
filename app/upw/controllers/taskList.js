const { Controller } = require('hmpo-form-wizard')
const { getTaskList } = require('./taskList.utils')

class TaskList extends Controller {
  locals(req, res, next) {
    res.locals.csrfToken = res.locals['csrf-token'] // TODO: move this to a BaseController class
    res.locals.assessment = req.session.assessment

    res.locals.pageDescription = 'Most of the questions in this assessment must be answered, but some are optional and are marked as such.'

    const journeyName = req.form?.options?.journeyName || ''
    const steps = req.form?.options?.steps || {}
    const answers = req.form?.values || {}

    res.locals.taskListItems = getTaskList(`/${journeyName}`, steps, answers)

    super.locals(req, res, next)
  }
}

module.exports = TaskList
