const { Given, Then, When } = require('@badeball/cypress-cucumber-preprocessor')
const querystring = require('querystring')
const ArnHomePage = require('../../../integration/pages/homePage/ARNHomePage')
const urls = require('../../../fixtures/urls.json')

Given('I am signed in', () => {
  ArnHomePage.signIn(crypto.randomUUID())
})

When('I start an assessment for the CRN {string}', (crn) => {
  const params = querystring.encode({
    crn,
    assessmentType: 'UPW',
    eventId: 1,
  })
  cy.visit(`${urls.startAssessment}?${params}`)
})

Then('I am presented with the subheading {string}', (errorMessage) => {
  cy.contains('h2', errorMessage)
})
