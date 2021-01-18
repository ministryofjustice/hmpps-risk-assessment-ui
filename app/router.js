// Local dependencies
// const healthCheckFactory = require('../common/services/healthcheck')
//
// const {
//   apis: { offenderAssessments },
// } = require('../common/config')

// middleware
const async = require('async')
const { body } = require('express-validator')
const getOffenderDetails = require('../common/middleware/getOffenderDetails')

// pages
const { startController } = require('./start/get.controller')
const { displayAssessmentsList } = require('./assessmentsList/get.controller')
const { displayQuestionGroup } = require('./questionGroup/get.controller')
const { saveQuestionGroup, QuestionGroupValidationRules, showBody } = require('./questionGroup/post.controller')
const { psrFromCourt } = require('./psrFromCourt/get.controller')
const { startPsrFromCourt, startPsrFromForm } = require('./psrFromCourt/post.controller')

const { validate } = require('../common/middleware/validator')

// This function executes middleware in series
const dynamicMiddleware = (validators, req, res, next) => {
  async.eachSeries(
    validators,
    (middleware, doneMiddleware) => {
      middleware.bind(null, req, res, doneMiddleware)()
    },
    err => {
      if (err) {
        return res.status(500).json({ error: 'there was a problem with your middleware' })
      }

      return next(err)
    },
  )
}

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
  app.get(`/start`, startController)

  app.get(`/:assessmentId/assessments`, getOffenderDetails, displayAssessmentsList)

  app.get(`/:assessmentId/questiongroup/:groupId/:subgroup`, getOffenderDetails, displayQuestionGroup)
  app.post(
    `/:assessmentId/questiongroup/:groupId/:subgroup`,
    getOffenderDetails,
    showBody,
    (req, res, next) => {
      let validatorsToSend = []
      validatorsToSend = [
        body('id-11111111-1111-1111-1111-111111111202')
          .isLength({ min: 1 })
          .withMessage({ error: 'xxEnter the forename', errorSummary: 'xxYou must enter a forename' }),
        body('id-11111111-1111-1111-1111-111111111201')
          .isLength({ min: 1 })
          .withMessage({ error: 'Enter the aaasurname' }),
      ]
      dynamicMiddleware(validatorsToSend, req, res, next)
    },
    showBody,
    validate,
    showBody,
    saveQuestionGroup,
  )

  app.get('/psr-from-court', psrFromCourt)
  app.post('/psr-from-court', startPsrFromForm)
  app.post('/psr-from-court/:courtCode/case/:caseNumber', startPsrFromCourt)

  app.get('*', (req, res) => res.render('app/error', { error: '404, Page Not Found' }))
}
