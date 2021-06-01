const page = require('../page')

const areaSelectionPage = () =>
  page('List of areas', {
    areas: () => cy.get('#area'),
    startAssessmentButton: () => cy.get('.govuk-button'),
  })

export default {
  verifyOnPage: areaSelectionPage,
  goTo: () => {
    cy.visit(`/area-selection`)
    return areaSelectionPage()
  },
}
