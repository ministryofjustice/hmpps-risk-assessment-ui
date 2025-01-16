const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const TravelInformation = require('../../../integration/pages/upwPages/placementRestrictions/travelPage')
const IndividualsDetailsPage = require('../../../integration/pages/upwPages/individualsDetails/individualsDetailsPage')
const Common = require('../../../integration/pages/upwPages/common/common')

When('I see that {string} is Default state on Travel information page', () => {
  cy.get(TravelInformation.iWillComeBackLaterRBtn).should('have.attr', 'type', 'radio').should('be.checked')
})

When('I select {string} for Mark this section as complete? for Travel information', (option) => {
  TravelInformation.selectTravelInfoSectionComplete(option)
})

When('I select {string} for {string} Travel question', (option) => {
  TravelInformation.selectTravelInfoStatus(option)
})

Then('I select the Options and enter the details on the "Travel information" page as follows', (dataTable) => {
  TravelInformation.selectTravelInfoStatus(dataTable.hashes()[0]['Select Option'])
  if (dataTable.hashes()[0]['Select Option'] === 'Yes') {
    cy.get(TravelInformation.travelInfoDetails).should('be.visible')
    TravelInformation.enterTravelInfoDetails(dataTable.hashes()[0]['Text to be entered in Give Details'])
  } else {
    cy.get(TravelInformation.travelInfoDetails).should('not.be.visible')
  }
  TravelInformation.selectDrivingLicenceStatus(dataTable.hashes()[1]['Select Option'])
  TravelInformation.selectVehicleStatus(dataTable.hashes()[2]['Select Option'])
  TravelInformation.selectPublicTransportStatus(dataTable.hashes()[3]['Select Option'])
})

Then('I see the following Travel information Summary and Field error messages', (dataTable) => {
  cy.get(TravelInformation.travelInfoSummError).should('have.text', dataTable.hashes()[0]['Summary Error Messages'])
  cy.get(TravelInformation.travelInfoFieldError).should('contain.text', dataTable.hashes()[0]['Field Error Messages'])
})

Then('I see the following Travel information Details Summary and Field error messages', (dataTable) => {
  cy.get(TravelInformation.travelInfoDetailsSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Messages'],
  )
  cy.get(TravelInformation.travelInfoDetailsFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Messages'],
  )
  cy.get(TravelInformation.drivingLicenceSummError).should('have.text', dataTable.hashes()[1]['Summary Error Messages'])
  cy.get(TravelInformation.drivingLicenceFieldError).should(
    'contain.text',
    dataTable.hashes()[1]['Field Error Messages'],
  )
  cy.get(TravelInformation.vehicleSummError).should('have.text', dataTable.hashes()[2]['Summary Error Messages'])
  cy.get(TravelInformation.vehicleFieldError).should('contain.text', dataTable.hashes()[2]['Field Error Messages'])
  cy.get(TravelInformation.publicTransportSummError).should(
    'have.text',
    dataTable.hashes()[3]['Summary Error Messages'],
  )
  cy.get(TravelInformation.publicTransportFieldError).should(
    'contain.text',
    dataTable.hashes()[3]['Field Error Messages'],
  )
})

When('I verify that the Travel information related radio buttons are cleared', () => {
  cy.get(TravelInformation.travelInfoRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.travelInfoRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.drivingLicenceRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.drivingLicenceRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.vehicleRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.vehicleRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.publicTransportRBtnYes).should('have.attr', 'type', 'radio').should('not.be.checked')
  cy.get(TravelInformation.publicTransportRBtnNo).should('have.attr', 'type', 'radio').should('not.be.checked')
})

When('I verify that the Travel information related radio buttons are still selected & unselected', (dataTable) => {
  if (dataTable.hashes()[0]['Select Option'] === 'Yes') {
    cy.get(TravelInformation.travelInfoRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[0]['Select Option'] === 'No') {
    cy.get(TravelInformation.travelInfoRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[1]['Select Option'] === 'Yes') {
    cy.get(TravelInformation.drivingLicenceRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[1]['Select Option'] === 'No') {
    cy.get(TravelInformation.drivingLicenceRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[2]['Select Option'] === 'Yes') {
    cy.get(TravelInformation.vehicleRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[2]['Select Option'] === 'No') {
    cy.get(TravelInformation.vehicleRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[3]['Select Option'] === 'Yes') {
    cy.get(TravelInformation.publicTransportRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else if (dataTable.hashes()[3]['Select Option'] === 'No') {
    cy.get(TravelInformation.publicTransportRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})

When('I select the Options and enter the details on the "Travel information" page and Save', () => {
  cy.get(Common.pageHeader).should('contain.text', 'Travel information')
  TravelInformation.selectTravelInfoStatus('Yes')
  TravelInformation.enterTravelInfoDetails('Entering Text related to the Travel Issues')
  TravelInformation.selectDrivingLicenceStatus('Yes')
  TravelInformation.selectVehicleStatus('Yes')
  TravelInformation.selectPublicTransportStatus('Yes')
  TravelInformation.selectTravelInfoSectionComplete('Yes')
  IndividualsDetailsPage.clickSaveButton()
})

When('I verify the Travel information page for cloned assessment as follows', (dataTable) => {
  if (dataTable.hashes()[0]['Option to be verified'] === 'Yes') {
    cy.get(TravelInformation.travelInfoRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
    Common.getText(TravelInformation.travelInfoDetails).should(
      'contain',
      dataTable.hashes()[0]['Text to be verified in Give Details'],
    )
  } else {
    cy.get(TravelInformation.travelInfoRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[1]['Option to be verified'] === 'Yes') {
    cy.get(TravelInformation.drivingLicenceRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else {
    cy.get(TravelInformation.drivingLicenceRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[2]['Option to be verified'] === 'Yes') {
    cy.get(TravelInformation.vehicleRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else {
    cy.get(TravelInformation.vehicleRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }

  if (dataTable.hashes()[3]['Option to be verified'] === 'Yes') {
    cy.get(TravelInformation.publicTransportRBtnYes).should('have.attr', 'type', 'radio').should('be.checked')
  } else {
    cy.get(TravelInformation.publicTransportRBtnNo).should('have.attr', 'type', 'radio').should('be.checked')
  }
})
