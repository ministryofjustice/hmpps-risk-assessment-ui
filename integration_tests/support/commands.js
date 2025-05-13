// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getQuestion', (questionTitle) => {
  return cy.get(`form`).find('fieldset > legend, .govuk-form-group > label').contains(questionTitle).parent()
})

Cypress.Commands.add('selectOption', (option, questionTitle) => {
  cy.getQuestion(questionTitle)
    .find('> .govuk-radios > .govuk-radios__item:visible > label')
    .contains(new RegExp(`^\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`))
    .click()
})

Cypress.Commands.add('enterDetailsForOption', (option, details, questionTitle) => {
  cy.getQuestion(questionTitle)
    .find('> .govuk-radios > .govuk-radios__item:visible > label')
    .contains(new RegExp(`^\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`))
    .parent()
    .next('.govuk-radios__conditional')
    .find('textarea')
    .first()
    .as('target')

  cy.get('@target').clear()
  cy.get('@target').type(details)
})

Cypress.Commands.add('answerQuestion', (answer, questionTitle) => {
  cy.getQuestion(questionTitle).find('textarea, input').first().as('target')

  cy.get('@target').clear()
  cy.get('@target').type(answer)
})

Cypress.Commands.add('selectDropdown', (answer, questionTitle) => {
  cy.getQuestion(questionTitle).find('select').select(answer)
})

Cypress.Commands.add('checkQuestionHasAnswer', (answer, questionTitle) => {
  cy.getQuestion(questionTitle).find('textarea').first().as('target')

  cy.get('@target').clear()
  cy.get('@target').type(answer)
})

Cypress.Commands.add('checkMultipleChoiceQuestionHasAnswer', (option, details, questionTitle) => {
  cy.getQuestion(questionTitle)
    .find('> .govuk-radios > .govuk-radios__item:visible > label')
    .contains(new RegExp(`^\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`))
    .parent()
    .as('radio')

  cy.get('@radio').find('input').should('be.checked')

  if (details) cy.get('@radio').next('.govuk-radios__conditional').contains('textarea', details)
})
