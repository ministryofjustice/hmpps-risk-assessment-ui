const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const RiskOfHarmCommunityPage = require('../../../integration/pages/upwPages/riskInformation/riskOfHarmCommunityPage')
const Common = require('../../../integration/pages/upwPages/common/common')

When('I verify that {string} is Default state on Risk of harm in the community page', () => {
  cy.get(RiskOfHarmCommunityPage.iWillComeBackLaterRBtn).should('have.attr', 'type', 'radio').should('be.checked')
})

Then('I see the following Summary and Field error messages for {string}', (errMsgType, dataTable) => {
  if (errMsgType === 'Questions') {
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingSummError).should(
      'have.text',
      dataTable.hashes()[0]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingFieldError).should(
      'contain.text',
      dataTable.hashes()[0]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.riskToChildrenSummError).should(
      'have.text',
      dataTable.hashes()[1]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.riskToChildrenFieldError).should(
      'contain.text',
      dataTable.hashes()[1]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.violentOffencesSummError).should(
      'have.text',
      dataTable.hashes()[2]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.violentOffencesFieldError).should(
      'contain.text',
      dataTable.hashes()[2]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingSummError).should(
      'have.text',
      dataTable.hashes()[3]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingFieldError).should(
      'contain.text',
      dataTable.hashes()[3]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingSummError).should(
      'have.text',
      dataTable.hashes()[4]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingFieldError).should(
      'contain.text',
      dataTable.hashes()[4]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.controlIssuesSummError).should(
      'have.text',
      dataTable.hashes()[5]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.controlIssuesFieldError).should(
      'contain.text',
      dataTable.hashes()[5]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.hateBehaviourSummError).should(
      'have.text',
      dataTable.hashes()[6]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.hateBehaviourFieldError).should(
      'contain.text',
      dataTable.hashes()[6]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.highProfilePersonSummError).should(
      'have.text',
      dataTable.hashes()[7]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.highProfilePersonFieldError).should(
      'contain.text',
      dataTable.hashes()[7]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoSummError).should(
      'have.text',
      dataTable.hashes()[8]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoFieldError).should(
      'contain.text',
      dataTable.hashes()[8]['Field Error Messages'],
    )
  }
  if (errMsgType === 'Give Details') {
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingDetailsSummError).should(
      'have.text',
      dataTable.hashes()[0]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[0]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.riskToChildrenDetailsSummError).should(
      'have.text',
      dataTable.hashes()[1]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.riskToChildrenDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[1]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.violentOffencesDetailsSummError).should(
      'have.text',
      dataTable.hashes()[2]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.violentOffencesDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[2]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingDetailsSummError).should(
      'have.text',
      dataTable.hashes()[3]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[3]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingDetailsSummError).should(
      'have.text',
      dataTable.hashes()[4]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[4]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.controlIssuesDetailsSummError).should(
      'have.text',
      dataTable.hashes()[5]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.controlIssuesDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[5]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.hateBehaviourDetailsSummError).should(
      'have.text',
      dataTable.hashes()[6]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.hateBehaviourDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[6]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.highProfilePersonDetailsSummError).should(
      'have.text',
      dataTable.hashes()[7]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.highProfilePersonDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[7]['Field Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoDetailsSummError).should(
      'have.text',
      dataTable.hashes()[8]['Summary Error Messages'],
    )
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoDetailsFieldError).should(
      'contain.text',
      dataTable.hashes()[8]['Field Error Messages'],
    )
  }
})

When('I verify that the Risk of harm related radio buttons are cleared', () => {
  cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingRBtnYes)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingRBtnNo)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.riskToChildrenRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.riskToChildrenRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.violentOffencesRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.violentOffencesRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingRBtnYes)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingRBtnNo)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingRBtnYes)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingRBtnNo)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.controlIssuesRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.controlIssuesRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.hateBehaviourRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.hateBehaviourRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.highProfilePersonRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.highProfilePersonRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.additionalRoshInfoRBtnYes)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(RiskOfHarmCommunityPage.additionalRoshInfoRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
})

When('I verify that the Risk of harm related related radio buttons are still selected & unselected', (dataTable) => {
  if (dataTable.hashes()[0]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  } else if (dataTable.hashes()[0]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingRBtnNo)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  }
  if (dataTable.hashes()[1]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.riskToChildrenRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[1]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.riskToChildrenRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[2]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.violentOffencesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[2]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.violentOffencesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[3]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  } else if (dataTable.hashes()[3]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[4]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  } else if (dataTable.hashes()[4]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingRBtnNo)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  }
  if (dataTable.hashes()[5]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.controlIssuesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[5]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.controlIssuesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[6]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.hateBehaviourRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[6]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.hateBehaviourRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[7]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.highProfilePersonRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[7]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.highProfilePersonRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
  if (dataTable.hashes()[8]['Select Option'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[8]['Select Option'] === 'No') {
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})

When('I verify the Risk of harm in the community page for cloned assessment as follows', (dataTable) => {
  if (dataTable.hashes()[0]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.historyOfSexOffendingDetails).should(
      'contain',
      dataTable.hashes()[0]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.historyOfSexOffendingRBtnNo)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  }

  if (dataTable.hashes()[1]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.riskToChildrenRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.riskToChildrenDetails).should(
      'contain',
      dataTable.hashes()[1]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.riskToChildrenRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[2]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.violentOffencesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.violentOffencesDetails).should(
      'contain',
      dataTable.hashes()[2]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.violentOffencesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[3]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.acquisitiveOffendingDetails).should(
      'contain',
      dataTable.hashes()[3]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.acquisitiveOffendingRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[4]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.seriousGroupOffendingDetails).should(
      'contain',
      dataTable.hashes()[4]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.seriousGroupOffendingRBtnNo)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  }

  if (dataTable.hashes()[5]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.controlIssuesRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.controlIssuesDetails).should(
      'contain',
      dataTable.hashes()[5]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.controlIssuesRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[6]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.hateBehaviourRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.hateBehaviourDetails).should(
      'contain',
      dataTable.hashes()[6]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.hateBehaviourRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[7]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.highProfilePersonRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.highProfilePersonDetails).should(
      'contain',
      dataTable.hashes()[7]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.highProfilePersonRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[8]['Option to be verified'] === 'Yes') {
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(RiskOfHarmCommunityPage.additionalRoshInfoDetails).should(
      'contain',
      dataTable.hashes()[8]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(RiskOfHarmCommunityPage.additionalRoshInfoRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})
