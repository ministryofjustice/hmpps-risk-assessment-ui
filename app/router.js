// Local dependencies
// const healthCheckFactory = require('../common/services/healthcheck')
//
// const {
//   apis: { offenderAssessments },
// } = require('../common/config')

// pages
const { startController } = require('./start/get.controller')
const { displayQuestionGroup } = require('./questiongroup/get.controller')

// Export
module.exports = app => {
  // app.get('/health', (req, res, next) => {
  //   const healthService = healthCheckFactory({ name: 'sentencePlanning', config: sentencePlanning })
  //   healthService((err, result) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     if (!result.healthy) {
  //       res.status(503)
  //     }
  //     res.json(result)
  //     return result
  //   })
  // })
  app.get(`/`, (req, res) => {
    res.redirect('/start')
  })
  app.get(`/start`, (req, res) => startController(req, res))

  app.get(`/questionGroup/:groupId`, displayQuestionGroup)

  app.get('*', (req, res) => res.render('app/error', { error: '404, Page Not Found' }))
}
