const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const HealthIssues = require('../../../integration/pages/upwPages/placementRestrictions/healthIssuesPage')
const Common = require('../../../integration/pages/upwPages/common/common')

When('I see that {string} is Default state on Health issues page', () => {
  cy.get(HealthIssues.iWillComeBackLaterRButtonNo).should('have.attr', 'type', 'radio').should('be.checked')
})

Then('I see the following Health issues Summary and Field error messages for {string}', (errMsgType, dataTable) => {
  if (errMsgType === 'Questions') {
    cy.get(HealthIssues.allergiesSummError).should('have.text', dataTable.hashes()[0]['Summary Error Messages'])
    cy.get(HealthIssues.allergiesFieldError).should('contain.text', dataTable.hashes()[0]['Field Error Messages'])
    cy.get(HealthIssues.lossOfConsciousnessSummError).should(
      'have.text',
      dataTable.hashes()[1]['Summary Error Messages'],
    )
    cy.get(HealthIssues.lossOfConsciousnessFieldError).should(
      'contain.text',
      dataTable.hashes()[1]['Field Error Messages'],
    )
    cy.get(HealthIssues.epilepsySummError).should('have.text', dataTable.hashes()[2]['Summary Error Messages'])
    cy.get(HealthIssues.epilepsyFieldError).should('contain.text', dataTable.hashes()[2]['Field Error Messages'])
    cy.get(HealthIssues.otherHealthIssuesSummError).should('have.text', dataTable.hashes()[3]['Summary Error Messages'])
    cy.get(HealthIssues.otherHealthIssuesFieldError).should(
      'contain.text',
      dataTable.hashes()[3]['Field Error Messages'],
    )
  }
  if (errMsgType === 'Give Details') {
    cy.get(HealthIssues.allergiesDetailsSummError).should('have.text', dataTable.hashes()[0]['Summary Error Messages'])
    cy.get(HealthIssues.allergiesDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[0]['Field Error Messages'],
    )
    cy.get(HealthIssues.lossOfConsciousnessDetailsSummError).should(
      'have.text',
      dataTable.hashes()[1]['Summary Error Messages'],
    )
    cy.get(HealthIssues.lossOfConsciousnessDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[1]['Field Error Messages'],
    )
    cy.get(HealthIssues.epilepsyDetailsSummError).should('have.text', dataTable.hashes()[2]['Summary Error Messages'])
    cy.get(HealthIssues.epilepsyDetailsFieldError).should('contain.text', dataTable.hashes()[2]['Field Error Messages'])
    cy.get(HealthIssues.pregnancyDetailsSummError).should('have.text', dataTable.hashes()[3]['Summary Error Messages'])
    cy.get(HealthIssues.pregnancyDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[3]['Field Error Messages'],
    )
    cy.get(HealthIssues.otherHealthIssuesDetailsSummError).should(
      'have.text',
      dataTable.hashes()[4]['Summary Error Messages'],
    )
    cy.get(HealthIssues.otherHealthIssuesDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[4]['Field Error Messages'],
    )
  }
})

When('I verify that the Health issues related radio buttons are cleared', () => {
  cy.get(HealthIssues.allergiesRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.allergiesRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.lossOfConsciousnessRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.lossOfConsciousnessRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.epilepsyRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.epilepsyRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.pregnancyRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.recentlyGivenBirthBtn).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.pregnancyRecentBirthRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  cy.get(HealthIssues.otherHealthIssuesRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(HealthIssues.otherHealthIssuesRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
})

When('I verify that the Health issues related radio buttons are still selected & unselected', (dataTable) => {
  if (dataTable.hashes()[0]['Select Option'] === 'Yes') {
    cy.get(HealthIssues.allergiesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[0]['Select Option'] === 'No') {
    cy.get(HealthIssues.allergiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[1]['Select Option'] === 'Yes') {
    cy.get(HealthIssues.lossOfConsciousnessRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[1]['Select Option'] === 'No') {
    cy.get(HealthIssues.lossOfConsciousnessRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[2]['Select Option'] === 'Yes') {
    cy.get(HealthIssues.epilepsyRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[2]['Select Option'] === 'No') {
    cy.get(HealthIssues.epilepsyRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[3]['Select Option'] === 'Pregnant') {
    cy.get(HealthIssues.pregnancyRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[3]['Select Option'] === 'Recently given birth') {
    cy.get(HealthIssues.recentlyGivenBirthBtn).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[3]['Select Option'] === 'No') {
    cy.get(HealthIssues.pregnancyRecentBirthRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[4]['Select Option'] === 'Yes') {
    cy.get(HealthIssues.otherHealthIssuesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[4]['Select Option'] === 'No') {
    cy.get(HealthIssues.otherHealthIssuesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})

When('I verify the Health issues page for cloned assessment as follows', (dataTable) => {
  if (dataTable.hashes()[0]['Option to be verified'] === 'Yes') {
    cy.get(HealthIssues.allergiesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(HealthIssues.allergiesDetails).should(
      'contain',
      dataTable.hashes()[0]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(HealthIssues.allergiesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[1]['Option to be verified'] === 'Yes') {
    cy.get(HealthIssues.lossOfConsciousnessRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(HealthIssues.lossOfConsciousnessDetails).should(
      'contain',
      dataTable.hashes()[1]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(HealthIssues.lossOfConsciousnessRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[2]['Option to be verified'] === 'Yes') {
    cy.get(HealthIssues.epilepsyRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(HealthIssues.epilepsyDetails).should(
      'contain',
      dataTable.hashes()[2]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(HealthIssues.epilepsyRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[3]['Option to be verified'] === 'Pregnant') {
    cy.get(HealthIssues.pregnancyRecentBirthRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(HealthIssues.pregnancyDetails).should(
      'contain',
      dataTable.hashes()[3]['Text to be verified in Give Details'],
    )
  } else if (dataTable.hashes()[3]['Option to be verified'] === 'Recently given birth') {
    cy.get(HealthIssues.recentlyGivenBirthBtn).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(HealthIssues.recentlyGivenBirthDetails).should(
      'contain',
      dataTable.hashes()[3]['Text to be verified in Give Details'],
    )
  } else if (dataTable.hashes()[3]['Option to be verified'] === 'No') {
    cy.get(HealthIssues.pregnancyRecentBirthRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[4]['Option to be verified'] === 'Yes') {
    cy.get(HealthIssues.otherHealthIssuesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(HealthIssues.otherHealthIssuesDetails).should(
      'contain',
      dataTable.hashes()[4]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(HealthIssues.otherHealthIssuesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})
