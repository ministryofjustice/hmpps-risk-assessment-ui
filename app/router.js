// Local dependencies
// const healthCheckFactory = require('../common/services/healthcheck')
//
// const {
//   apis: { offenderAssessments },
// } = require('../common/config')

const getOffenderDetails = require('../common/middleware/getOffenderDetails')
const getQuestionGroup = require('../common/middleware/getQuestionGroup')

// pages
const { startController } = require('./start/get.controller')
const { displayAssessmentsList } = require('./assessmentsList/get.controller')
const { displayQuestionGroup } = require('./questionGroup/get.controller')

const { displayOverview } = require('./summary/get.controller')
const { completeAssessment } = require('./summary/post.controller')
const { saveQuestionGroup, assembleDates, questionGroupValidationRules } = require('./questionGroup/post.controller')
const { fetchFilteredReferenceData } = require('./referenceData/post.controller')
const { psrFromCourt } = require('./psrFromCourt/get.controller')
const { startPsrFromCourt, startPsrFromForm } = require('./psrFromCourt/post.controller')

const { validate } = require('../common/middleware/validator')

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

  app.get('/health', (req, res, next) => {
    res.status(200).send({
      healthy: true,
    })
  })

  app.get('/ping', (req, res) => {
    res.status(200).send('pong')
  })

  app.get(`/`, (req, res) => {
    res.redirect('/start')
  })
  app.get(`/start`, startController)

  app.get(`/:assessmentId/assessments`, getOffenderDetails, displayAssessmentsList)

  app.get(`/:assessmentId/questiongroup/:groupId/summary`, getOffenderDetails, displayOverview)

  app.get(
    `/:assessmentId/questiongroup/:groupId/:subgroup/:page`,
    getOffenderDetails,
    getQuestionGroup,
    displayQuestionGroup,
  )
  app.post(
    `/:assessmentId/questiongroup/:groupId/:subgroup/:page`,
    getOffenderDetails,
    assembleDates,
    getQuestionGroup,
    questionGroupValidationRules,
    validate,
    saveQuestionGroup,
  )

  app.post(`/:assessmentId/episode/:episodeId/referencedata/filtered`, fetchFilteredReferenceData)

  app.post('/:assessmentId/questiongroup/:groupId/summary', getOffenderDetails, completeAssessment)

  app.get('/psr-from-court', psrFromCourt)
  app.post('/psr-from-court', startPsrFromForm)
  app.post('/psr-from-court/:courtCode/case/:caseNumber', startPsrFromCourt)

  app.get('*', (req, res) => res.status(404).render('app/error', { error: '404, Page Not Found' }))
}
