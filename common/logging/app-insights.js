const { logs } = require('@opentelemetry/api-logs')

const trackEvent = (eventName, req = {}, customProperties = {}) => {
  const assessmentInfo = req.session?.assessment

  if (eventName) {
    const eventProperties = {
      ...customProperties,
      assessmentUUID: assessmentInfo?.uuid,
      episodeUUID: assessmentInfo?.episodeUuid,
      crn: assessmentInfo?.subject?.crn,
      author: req.user?.username,
    }
    logs.getLogger('hmpps-risk-assessment-ui').emit({
      body: eventName,
      attributes: { 'microsoft.custom_event.name': eventName, ...eventProperties },
    })
  }
}

module.exports = { trackEvent }
