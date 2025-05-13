const { Then } = require('@badeball/cypress-cucumber-preprocessor')
const Common = require('../../../integration/pages/upwPages/common/common')

Then('I enter {string} for the question {string}', (answer, questionTitle) => {
  return cy
    .get(`form`)
    .find('fieldset > legend, .govuk-form-group > label')
    .contains(questionTitle)
    .parent()
    .find('textarea')
    .type(answer)
})

Then('I select {string} for the question {string}', (option, questionTitle) => {
  return cy
    .get(`form`)
    .find('fieldset > legend, .govuk-form-group > label')
    .contains(questionTitle)
    .parent()
    .find('> .govuk-radios > .govuk-radios__item:visible > label')
    .contains(new RegExp(`^\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`))
    .click()
})

Then('I click on the {string} button', () => {
  Common.clickSaveBtn()
})

Then('I answer the multiple choice questions on the page', (dataTable) => {
  const questions = dataTable.hashes()
  questions.forEach((row) => {
    const question = row['Question Name']
    const option = row['Select Option']
    const detailsText = row['Text to be entered in Give Details']

    cy.selectOption(option, question)
    cy.enterDetailsForOption(option, detailsText, question)
  })
})

Then('I answer the questions on the page', (dataTable) => {
  dataTable.hashes().forEach(row => {
    const question = row['Question']
    const questionType = row['Type']
    const answer = row['Answer']
    const details = row['Details']

    if (questionType === 'Radio' || questionType === 'Checkbox') {
      cy.selectOption(answer, question)
      if (details) cy.enterDetailsForOption(answer, details, question)
    } else if (questionType === 'Dropdown') {
      cy.selectDropdown(answer, question)
    } else {
      cy.answerQuestion(answer, question)
    }
  })
})

Then('I check the answers on the page are as follows', (dataTable) => {
  dataTable.hashes().forEach(row => {
    const question = row['Question']
    const questionType = row['Type']
    const answer = row['Answer']
    const details = row['Details']

    if (questionType === 'Radio' || questionType === 'Checkbox') {
      cy.checkMultipleChoiceQuestionHasAnswer(answer, details, question)
    } else {
      cy.checkQuestionHasAnswer(answer, question)
    }
  })
})
