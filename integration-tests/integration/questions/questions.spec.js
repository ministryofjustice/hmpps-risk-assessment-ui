const QuestionsPage = require('../../pages/questions/questionsPage')
const AssessmentsPage = require('../../pages/assessments/assessmentsPage')

context('Basic questions display', () => {
  before(() => {
    cy.task('stubAssessmentApi')
  })

  it('Displays questions, answer a couple, save and see assessments list', () => {
    const questionsPage = QuestionsPage.goTo()

    questionsPage
      .questions()
      .eq(0)
      .should('include.text', 'Forename')
      .find('input')
      .type('Grant')

    questionsPage
      .questions()
      .eq(1)
      .should('include.text', 'Surname')
      .find('input')
      .type('Hart')

    questionsPage.save().click()

    AssessmentsPage.verifyOnPage()
  })
})
