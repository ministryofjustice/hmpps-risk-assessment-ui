const page = require('../page')

const assessmentsPage = () =>
  page('Available assessments', {
    assessments: () => cy.get('.assessments'),
  })

export default {
  verifyOnPage: assessmentsPage,
  goTo: () => {
    cy.visit(`/e69a61ff-7395-4a12-b434-b1aa6478aded/assessments`)
    return assessmentsPage()
  },
}
