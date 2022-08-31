// Local dependencies
// const healthCheckFactory = require('../common/services/healthcheck')
//
// const {
//   apis: { offenderAssessments },
// } = require('../common/config')

const passport = require('passport')
const xss = require('xss-clean')

const getOffenderDetails = require('../common/middleware/getOffenderDetails')
const getQuestionGroup = require('../common/middleware/questionGroups/getQuestionGroup')
const addUserToLocals = require('../common/middleware/add-user-information')

// pages
const { startController } = require('./start/get.controller')
const { areaSelectionController } = require('./areaSelectionPage/get.controller')
const { redirectToAssessmentList } = require('./areaSelectionPage/post.controller')
const { displayAssessmentsList } = require('./assessmentsList/get.controller')
const { displayQuestionGroup } = require('./questionGroup/get.controller')

const { displayOverview } = require('./summary/get.controller')
const { completeAssessment } = require('./summary/post.controller')
const { saveQuestionGroup } = require('./questionGroup/post.controller')
const { assembleDates, extractAnswers } = require('../common/middleware/questionGroups/postHandlers')
const { fetchFilteredReferenceData } = require('./referenceData/post.controller')

const { validate, localValidationRules } = require('../common/middleware/validator')

const {
  checkUserIsAuthenticated,
  handleLoginCallback,
  handleLogout,
  checkForTokenRefresh,
} = require('../common/middleware/auth')

const { checkUserHasAreaSelected, checkAssessmentType } = require('../common/middleware/area-selection')

const {
  dev: { devAssessmentId },
} = require('../common/config')
const { displayPredictorScores } = require('./predictorScores/get.controller')
const { submitPredictorScores } = require('./submitPredictorScores/get.controller')

const rsrWorkflow = require('./rsr')
const upwWorkflow = require('./upw')

const logger = require('../common/logging/logger')
const { verifyAssessment } = require('./startAssessment/get.controller')
const { getCorrelationId } = require('../common/utils/util')

const assessmentUrl = `/${devAssessmentId}/questiongroup/ROSH/summary`

// Export
module.exports = (app) => {
  app.get('/health', (req, res, next) => {
    res.status(200).send({
      healthy: true,
    })
  })

  app.get('/ping', (req, res) => {
    res.status(200).send('pong')
  })

  app.get('/login', passport.authenticate('oauth2'))
  app.get('/login/callback', handleLoginCallback())
  app.get('/logout', handleLogout())
  app.use(['/login', '/logout'], (error, req, res, next) => {
    req.logout((_err) => {
      //  We're  already in the error handler, so we just ignore the error here
      req.session.destroy(() => {
        res.status(error.status || 500)
        res.render('app/error', {
          heading: 'Something went wrong',
          subHeading: 'We are unable to sign you in at this time',
          error,
        })
      })
    })
  })

  app.use(checkAssessmentType(), checkUserIsAuthenticated(), checkForTokenRefresh, addUserToLocals)

  app.get(`/`, (req, res) => {
    res.redirect('/start')
  })
  app.get(`/start`, checkAssessmentType(), checkUserHasAreaSelected(assessmentUrl), startController)

  app.get(`/area-selection`, areaSelectionController)
  app.post('/area-selection', redirectToAssessmentList)

  app.get('*', checkAssessmentType(), checkUserHasAreaSelected())
  app.post('*', xss())
  app.get(`/:assessmentId/assessments`, getOffenderDetails, displayAssessmentsList)

  app.get(`/:assessmentId/questiongroup/:assessmentSchemaCode/summary`, getOffenderDetails, displayOverview)

  app.get(
    `/:assessmentId/questiongroup/:groupId/:subgroup/:page`,
    getOffenderDetails,
    getQuestionGroup,
    displayQuestionGroup,
  )
  app.post(
    `/:assessmentId/questiongroup/:groupId/:subgroup/:page`,
    getOffenderDetails,
    getQuestionGroup,
    assembleDates,
    localValidationRules,
    validate,
    extractAnswers,
    saveQuestionGroup,
  )

  app.post(`/:assessmentId/episode/:episodeId/referencedata/filtered`, fetchFilteredReferenceData)

  app.post('/:assessmentId/questiongroup/:groupId/summary', getOffenderDetails, completeAssessment)

  app.get('/:assessmentId/episode/:episodeId/:assessmentType/scores', getOffenderDetails, displayPredictorScores)
  app.get(
    '/:assessmentId/episode/:episodeId/:assessmentType/scores/complete',
    getOffenderDetails,
    submitPredictorScores,
  )

  app.get(['/start-assessment', '/assessment-from-delius'], verifyAssessment)
  app.use('/rsr', rsrWorkflow)
  app.use('/upw', upwWorkflow)

  app.use((error, req, res, next) => {
    logger.info(`Unhandled exception received - ${error.message} ${error.stack}`)
    res.locals.correlationId = getCorrelationId()
    res.render('app/error', {
      subHeading: 'Something unexpected happened',
      error,
    })
  })

  app.get('*', (req, res) =>
    res.status(404).render('app/error', {
      subHeading: "We're unable to find the page you're looking for",
    }),
  )
}
