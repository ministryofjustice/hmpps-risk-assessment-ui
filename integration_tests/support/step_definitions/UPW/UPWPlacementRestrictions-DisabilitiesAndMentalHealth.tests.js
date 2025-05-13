const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')

const DisabilitiesMentalHealth = require('../../../integration/pages/upwPages/placementRestrictions/disabilitiesAndMentalHealthPage')
const Common = require('../../../integration/pages/upwPages/common/common')

When('I see that {string} is Default state on Disabilities and mental health page', () => {
  cy.get(DisabilitiesMentalHealth.iWillComeBackLaterRBtn).should('have.attr', 'type', 'radio').should('be.checked')
})

Then('I verify that the Disabilities and mental health related radio buttons are cleared', () => {
  cy.get(DisabilitiesMentalHealth.addtlDisabilitiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  cy.get(DisabilitiesMentalHealth.disabilitiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
})

Then(
  'I verify that the Disabilities and mental health related radio buttons are still selected & unselected',
  (dataTable) => {
    if (dataTable.hashes()[0]['Select Option'] === 'Yes') {
      cy.get(DisabilitiesMentalHealth.addtlDisabilitiesRBtnYes)
        .should('have.attr', 'type', 'radio')
        .should('be.checked')
      cy.get(DisabilitiesMentalHealth.disabilitiesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    } else if (dataTable.hashes()[0]['Select Option'] === 'No') {
      cy.get(DisabilitiesMentalHealth.disabilitiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
    }
  },
)

When('I verify the Disabilities and mental health page for cloned assessment as follows', (dataTable) => {
  if (dataTable.hashes()[0]['Option to be verified'] === 'Yes') {
    cy.get(DisabilitiesMentalHealth.addtlDisabilitiesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(DisabilitiesMentalHealth.addtlDisabilityDetails).should(
      'contain',
      dataTable.hashes()[0]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(DisabilitiesMentalHealth.addtlDisabilitiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[1]['Option to be verified'] === 'Yes') {
    cy.get(DisabilitiesMentalHealth.disabilitiesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(DisabilitiesMentalHealth.disabilityDetails).should(
      'contain',
      dataTable.hashes()[1]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(DisabilitiesMentalHealth.disabilitiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})
