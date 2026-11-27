const { trace } = require('@opentelemetry/api')

// Adds the signed-in user's identifiers to the active request span, so they appear
// as custom dimensions on the App Insights requests table. Must run after passport.session().
module.exports = (req, res, next) => {
  const span = trace.getActiveSpan()
  const attributes = {
    userId: req.user?.id,
    userUuid: req.user?.userUuid,
  }

  if (span) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        span.setAttribute(key, value)
      }
    })
  }

  next()
}
