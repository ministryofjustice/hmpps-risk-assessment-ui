const QuestionsPage = require('../../pages/questions/questionsPage')
const AssessmentsPage = require('../../pages/assessments/assessmentsPage')

context('Basic questions display', () => {
  before(() => {
    cy.task('stubAssessmentApi')
  })

  it('Displays questions', () => {
    const questionsPage = QuestionsPage.goTo()

    questionsPage
      .questions()
      .eq(0)
      .should('include.text', 'Forename')

    questionsPage
      .questions()
      .eq(1)
      .should('include.text', 'Surname')
  })

  it('Answer a couple of questions, save and see assessments list', () => {
    const questionsPage = QuestionsPage.goTo()

    questionsPage
      .questions()
      .eq(0)
      .find('input')
      .type('Grant')

    questionsPage
      .questions()
      .eq(1)
      .find('input')
      .type('Hart')

    questionsPage.save().click()

    AssessmentsPage.verifyOnPage()
  })

  it('Post and see error summary and question error', () => {
    const questionsPage = QuestionsPage.goTo()

    questionsPage
      .questions()
      .eq(0)
      .find('input')
      .type('Grant')

    questionsPage.save().click()

    // see errors triggered by mandatory field validation
    questionsPage.errorSummary().contains('You must enter a surname')
    questionsPage
      .questions()
      .eq(1)
      .find('.govuk-error-message')
      .contains('Enter the surname')

    cy.pa11y({
      hideElements: 'input[aria-expanded]',
    })

    questionsPage
      .questions()
      .eq(1)
      .find('input')
      .type('Hart')

    questionsPage.save().click()
    AssessmentsPage.verifyOnPage()
  })
})
