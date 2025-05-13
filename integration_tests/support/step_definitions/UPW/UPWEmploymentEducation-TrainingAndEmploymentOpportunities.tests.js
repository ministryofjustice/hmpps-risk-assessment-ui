const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const TrainingEmploymentOpps = require('../../../integration/pages/upwPages/employmentEducationAndSkills/trainingEmploymentOpportunitiesPage')
const Common = require('../../../integration/pages/upwPages/common/common')

When('I see that {string} is Default state on Training & employment page', () => {
  cy.get(TrainingEmploymentOpps.iWillComeBackLaterRBtn).should('have.attr', 'type', 'radio').should('be.checked')
})

Then('I see the following Training & employment Summary and Field error messages', (dataTable) => {
  cy.get(TrainingEmploymentOpps.educationTrainingNeedSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.educationTrainingNeedFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Messages'],
  )
})

Then('I see the following Training & employment Details Summary and Field error messages', (dataTable) => {
  cy.get(TrainingEmploymentOpps.educTrainingNeedDetailsSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.educTrainingNeedDetailsFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.individCommitmentSummError).should(
    'have.text',
    dataTable.hashes()[1]['Summary Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.individCommitmentFieldError).should(
    'contain.text',
    dataTable.hashes()[1]['Field Error Messages'],
  )
})

Then('I see the following Training & Individual Commitment Details Summary and Field error messages', (dataTable) => {
  cy.get(TrainingEmploymentOpps.educTrainingNeedDetailsSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.educTrainingNeedDetailsFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.individCommitmentDetailsSummError).should(
    'have.text',
    dataTable.hashes()[1]['Summary Error Messages'],
  )
  cy.get(TrainingEmploymentOpps.individCommitmentDetailsFieldError).should(
    'contain.text',
    dataTable.hashes()[1]['Field Error Messages'],
  )
})

When('I verify that the Training & employment related radio buttons are cleared', () => {
  cy.get(TrainingEmploymentOpps.educationTrainingNeedRBtnYes)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
  cy.get(TrainingEmploymentOpps.educationTrainingNeedRBtnNo)
    .should('have.attr', 'type', 'radio')
    .should('not.be.checked')
})

When('I verify that the Training & employment related radio buttons are still selected & unselected', (dataTable) => {
  if (dataTable.hashes()[0]['Select Option'] === 'Yes') {
    cy.get(TrainingEmploymentOpps.educationTrainingNeedRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
  } else if (dataTable.hashes()[0]['Select Option'] === 'No') {
    cy.get(TrainingEmploymentOpps.educationTrainingNeedRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})

When('I verify the Training & employment page for cloned assessment as follows', (dataTable) => {
  if (dataTable.hashes()[0]['Option to be verified'] === 'Yes') {
    cy.get(TrainingEmploymentOpps.educationTrainingNeedRBtnYes)
      .should('have.attr', 'type', 'radio')
      .should('be.checked')
    Common.getText(TrainingEmploymentOpps.educationTrainingNeedDetails).should(
      'contain',
      dataTable.hashes()[0]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(TrainingEmploymentOpps.educationTrainingNeedRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[1]['Option to be verified'] === 'No') {
    cy.get(TrainingEmploymentOpps.individCommitmentRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(TrainingEmploymentOpps.individCommitmentDetails).should(
      'contain',
      dataTable.hashes()[1]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(TrainingEmploymentOpps.individCommitmentRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  }
})
