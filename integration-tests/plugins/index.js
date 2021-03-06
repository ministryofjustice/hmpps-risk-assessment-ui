// eslint-disable-next-line import/no-extraneous-dependencies
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit')
const { resetStubs } = require('../../wiremock/wiremock')
const {
  stubForms,
  stubQuestions,
  stubAnswers,
  stubEpisodes,
  stubOffenderDetails,
  stubQuestionSummaries,
  stubGetAssessments,
  stubGetQuestionGroup,
  stubAssessmentComplete,
  stubAssessmentTypeSummaries,
  stubErrors,
} = require('../../wiremock/assessmentApi')
const { stubReferenceData } = require('../../wiremock/referenceData')
const { stubAuth, getLoginUrl } = require('../../wiremock/auth')
const { stubOasysUser, stubGetUserProfileWithSingleArea, stubGetUserProfile } = require('../../wiremock/oasysUser')
const { stubGetToken } = require('../../wiremock/oauth')

module.exports = on => {
  // eslint-disable-next-line no-unused-vars
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })

  on('task', {
    lighthouse: lighthouse(),
    pa11y: pa11y(), // calling the function is important
    reset: resetStubs,
    stubAssessmentApi: () =>
      Promise.all([
        stubQuestions(),
        stubForms(),
        stubAnswers(),
        stubEpisodes(),
        stubOffenderDetails(),
        stubQuestionSummaries(),
        stubAssessmentTypeSummaries(),
        stubReferenceData(),
        stubGetAssessments(),
        stubGetQuestionGroup(),
        stubAssessmentComplete(),
        stubOasysUser(),
      ]),
    stubGetUserProfileWithSingleArea: () => Promise.all([stubGetUserProfileWithSingleArea()]),
    stubGetUserProfileWithMultipleAreas: () => Promise.all([stubGetUserProfile()]),
    stubAuth: () => Promise.all([stubGetToken(), stubAuth()]),
    stubErrors: () => Promise.all([stubErrors()]),
    getLoginUrl,
  })
}
