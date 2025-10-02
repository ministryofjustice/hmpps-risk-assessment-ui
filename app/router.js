const passport = require('passport')
const { sanitise } = require('../common/middleware/sanitise')

const addUserToLocals = require('../common/middleware/add-user-information').default

const {
  checkUserIsAuthenticated,
  handleLoginCallback,
  handleLogout,
  checkForTokenRefresh,
  requestIsAuthenticated,
  apiErrorHandler,
  clientHasRole,
} = require('../common/middleware/auth').default

const upwWorkflow = require('./upw')

const logger = require('../common/logging/logger').default
const { verifyAssessment } = require('./startAssessment/get.controller').default
const { getCorrelationId } = require('../common/utils/util').default
const { downloadUpwPdf } = require('./upw/controllers/api').default
const { ForbiddenError } = require('../common/utils/errors').default

// Export
module.exports = (app) => {
  app.get('/health', (req, res, next) => {
    res.status(200).json({
      healthy: true,
    })
  })

  app.get('/ping', (req, res) => {
    res.status(200).send('pong')
  })

  app.use(
    '/api/upw/download/:episodeId',
    requestIsAuthenticated(),
    clientHasRole('ROLE_UPW_READ_ONLY'),
    downloadUpwPdf,
    apiErrorHandler,
  )

  app.get('/login', passport.authenticate('oauth2'))
  app.get('/login/callback', handleLoginCallback())
  app.get('/logout', handleLogout())
  app.use(['/login', '/logout'], (error, req, res, next) => {
    res.status(error.status || 500)
    res.render('app/error', {
      heading: 'Something went wrong',
      subHeading: 'We are unable to sign you in at this time',
      error,
    })
  })

  app.use(checkUserIsAuthenticated(), checkForTokenRefresh, addUserToLocals)

  app.use('*splat', sanitise())

  app.get(['/start-assessment', '/assessment-from-delius'], verifyAssessment)
  app.use('/upw', upwWorkflow)

  app.use((error, req, res, next) => {
    logger.info(`Unhandled exception received - ${error.message} ${error.stack}`)
    res.locals.correlationId = getCorrelationId()

    if (error instanceof ForbiddenError) {
      return res.render('app/error', {
        heading: 'We are unable to continue',
        subHeading: 'You do not have permission',
        error,
      })
    }

    return res.render('app/error', {
      subHeading: 'Something unexpected happened',
      error,
    })
  })

  app.get('*splat', (req, res) =>
    res.status(404).render('app/error', {
      subHeading: "We're unable to find the page you're looking for",
    }),
  )
}
