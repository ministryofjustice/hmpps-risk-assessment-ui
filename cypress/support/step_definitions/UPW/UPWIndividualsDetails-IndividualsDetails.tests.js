const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const IndividualsDetailsPage = require('../../../integration/pages/upwPages/individualsDetails/individualsDetailsPage')
const EditContactDetailsPage = require('../../../integration/pages/upwPages/individualsDetails/EditContactDetailsPage')
const EditEmergencyContactDetailsPage = require('../../../integration/pages/upwPages/individualsDetails/EditEmergencyContactDetailsPage')
const Common = require('../../../integration/pages/upwPages/common/common')

When('I verify that {string} is Default state on Individuals details page', () => {
  cy.get(IndividualsDetailsPage.iWillComeBackLaterRBtn).should('have.attr', 'type', 'radio').should('be.checked')
})

When('I select {string} for Mark this section as complete? for Individuals details', (option) => {
  IndividualsDetailsPage.selectIndvdlDetailsSectionComplete(option)
})

Then('I click on {string} link against the {string} on the Individual details', (option, emergencyContact) => {
  if (option === 'Remove') {
    IndividualsDetailsPage.clickRemoveEmergncyContact(emergencyContact)
  } else if (option === 'Change') {
    IndividualsDetailsPage.clickChangeEmergncyContact(emergencyContact)
  }
})

Then('I see the following Summary and Field error messages on Individual details page', (dataTable) => {
  cy.get(IndividualsDetailsPage.emrgncyContactDeclndSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Message'],
  )
  cy.get(IndividualsDetailsPage.emrgncyContactDeclndFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Message'],
  )
})

When('I click {string} link for changing Contact details', () => {
  IndividualsDetailsPage.clickChangeContactDetails()
})

When('I see {string} sub heading', (emrgncyContact) => {
  cy.get('.upw-read-only__header').should('contain.text', emrgncyContact)
})

When('I see that {string} sub heading is not available', (emrgncyContact) => {
  cy.get('.upw-read-only__header').should('not.contain.text', emrgncyContact)
})

When('I click {string} button for Emergency contact details', () => {
  IndividualsDetailsPage.clickAddEmergncyContactDetails()
})

When('I say Individual declined to give an emergency contact', () => {
  IndividualsDetailsPage.clickEmergncyContactDecline()
})

When('I enter the details on the "Contact details" page as follows', (dataTable) => {
  EditContactDetailsPage.enterContactAddrBldngName(dataTable.hashes()[0]['Text to be entered'])
  EditContactDetailsPage.enterContactAddrHouseNr(dataTable.hashes()[1]['Text to be entered'])
  EditContactDetailsPage.enterContactAddrStreet(dataTable.hashes()[2]['Text to be entered'])
  EditContactDetailsPage.enterContactAddrDistrict(dataTable.hashes()[3]['Text to be entered'])
  EditContactDetailsPage.enterContactAddrTownCity(dataTable.hashes()[4]['Text to be entered'])
  EditContactDetailsPage.enterContactAddrCounty(dataTable.hashes()[5]['Text to be entered'])
  EditContactDetailsPage.enterContactAddrPostCode(dataTable.hashes()[6]['Text to be entered'])
  EditContactDetailsPage.enterContactPhoneNumber(dataTable.hashes()[7]['Text to be entered'])
  EditContactDetailsPage.enterContactMobileNumber(dataTable.hashes()[8]['Text to be entered'])
  EditContactDetailsPage.enterContactEmailAddress(dataTable.hashes()[9]['Text to be entered'])
})

When('I verify the details on the "Individuals details" page as follows', (dataTable) => {
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[0]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[1]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[2]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[3]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[4]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[5]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain.text',
    dataTable.hashes()[6]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsMobileNr).should('contain', dataTable.hashes()[7]['Text to be Verified'])
  cy.get(IndividualsDetailsPage.contactDetailsPhoneNr).should(
    'contain.text',
    dataTable.hashes()[8]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.contactDetailsEmail).should(
    'contain.text',
    dataTable.hashes()[9]['Text to be Verified'],
  )
})

Then('I see the following Summary and Field error messages for Contact details', (dataTable) => {
  cy.get(EditContactDetailsPage.contactAddrBldngNameSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrBldngNameFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrHouseNrSummError).should(
    'have.text',
    dataTable.hashes()[1]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrHouseNrFieldError).should(
    'contain.text',
    dataTable.hashes()[1]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrStreetSummError).should(
    'have.text',
    dataTable.hashes()[2]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrStreetFieldError).should(
    'contain.text',
    dataTable.hashes()[2]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrTownCitySummError).should(
    'have.text',
    dataTable.hashes()[3]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrTownCityFieldError).should(
    'contain.text',
    dataTable.hashes()[3]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrPostCodeSummError).should(
    'have.text',
    dataTable.hashes()[4]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactAddrPostCodeFieldError).should(
    'contain.text',
    dataTable.hashes()[4]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactPhoneNumberSummError).should(
    'have.text',
    dataTable.hashes()[5]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactPhoneNumberFieldError).should(
    'contain.text',
    dataTable.hashes()[5]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactMobileNumberSummError).should(
    'have.text',
    dataTable.hashes()[6]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactMobileNumberFieldError).should(
    'contain.text',
    dataTable.hashes()[6]['Field Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactEmailSummError).should(
    'have.text',
    dataTable.hashes()[7]['Summary Error Messages'],
  )
  cy.get(EditContactDetailsPage.contactEmailFieldError).should(
    'contain.text',
    dataTable.hashes()[7]['Field Error Messages'],
  )
})

When('I enter the details on the "Emergency contact details" page as follows', (dataTable) => {
  EditEmergencyContactDetailsPage.enterEmergencyContactFirstName(dataTable.hashes()[0]['Text to be entered'])
  EditEmergencyContactDetailsPage.enterEmergencyContactFamilyName(dataTable.hashes()[1]['Text to be entered'])
  EditEmergencyContactDetailsPage.enterEmergencyContactRelationship(dataTable.hashes()[2]['Text to be entered'])
  EditEmergencyContactDetailsPage.enterEmergencyContactPhone(dataTable.hashes()[3]['Text to be entered'])
  EditEmergencyContactDetailsPage.enterEmergencyContactMobile(dataTable.hashes()[4]['Text to be entered'])
})

When('I verify the Emergency details on the "Individuals details" page as follows', (dataTable) => {
  cy.get(IndividualsDetailsPage.emergencyContactDetailsName).should(
    'contain.text',
    dataTable.hashes()[0]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.emergencyContactDetailsSurname).should(
    'contain.text',
    dataTable.hashes()[1]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.emergencyContactDetailsRelationship).should(
    'contain.text',
    dataTable.hashes()[2]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.emergencyContactDetailsMobile).should(
    'contain.text',
    dataTable.hashes()[3]['Text to be Verified'],
  )
  cy.get(IndividualsDetailsPage.emergencyContactDetailsPhoneNr).should(
    'contain.text',
    dataTable.hashes()[4]['Text to be Verified'],
  )
})

Then('I click the {string} button on Contact details', () => {
  EditContactDetailsPage.clickSaveContactDetails()
})

Then('I see the following Summary and Field error messages for Emergency contact details', (dataTable) => {
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactFirstNameSummError).should(
    'have.text',
    dataTable.hashes()[0]['Summary Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactFirstNameFieldError).should(
    'contain.text',
    dataTable.hashes()[0]['Field Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactFamilyNameSummError).should(
    'have.text',
    dataTable.hashes()[1]['Summary Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactFamilyNameFieldError).should(
    'contain.text',
    dataTable.hashes()[1]['Field Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactRelationshipSummError).should(
    'have.text',
    dataTable.hashes()[2]['Summary Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactRelationshipFieldError).should(
    'contain.text',
    dataTable.hashes()[2]['Field Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactPhoneSummError).should(
    'have.text',
    dataTable.hashes()[3]['Summary Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactPhoneFieldError).should(
    'contain.text',
    dataTable.hashes()[3]['Field Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactMobileSummError).should(
    'have.text',
    dataTable.hashes()[4]['Summary Error Messages'],
  )
  cy.get(EditEmergencyContactDetailsPage.emrgncyContactMobileFieldError).should(
    'contain.text',
    dataTable.hashes()[4]['Field Error Messages'],
  )
})

When('I change the Contact details & Emergency contact details and Save', () => {
  IndividualsDetailsPage.clickChangeContactDetails()
  cy.get(Common.pageHeader).should('contain.text', 'Contact details')
  EditContactDetailsPage.enterContactAddrBldngName('New Offender Building')
  EditContactDetailsPage.enterContactAddrHouseNr('1')
  EditContactDetailsPage.enterContactAddrStreet("MAIN Offender's Street")
  EditContactDetailsPage.enterContactAddrDistrict('Sheffield')
  EditContactDetailsPage.enterContactAddrTownCity('Sheffield')
  EditContactDetailsPage.enterContactAddrCounty('South Yorkshire')
  EditContactDetailsPage.enterContactAddrPostCode('S3 1HY')
  EditContactDetailsPage.enterContactPhoneNumber('02142785462')
  EditContactDetailsPage.enterContactMobileNumber('07123456789')
  EditContactDetailsPage.enterContactEmailAddress('test@test.com')
  EditContactDetailsPage.clickSaveContactDetails()
  cy.get(Common.pageHeader).should('contain.text', "Individual's details")
  IndividualsDetailsPage.clickAddEmergncyContactDetails()
  cy.get(Common.pageHeader).should('contain.text', 'Emergency contact')
  EditEmergencyContactDetailsPage.enterEmergencyContactFirstName('Charles')
  EditEmergencyContactDetailsPage.enterEmergencyContactFamilyName('Europe')
  EditEmergencyContactDetailsPage.enterEmergencyContactRelationship('Friend')
  EditEmergencyContactDetailsPage.enterEmergencyContactPhone('02142785462')
  EditEmergencyContactDetailsPage.enterEmergencyContactMobile('020123456789')
  EditContactDetailsPage.clickSaveContactDetails()
  IndividualsDetailsPage.selectIndvdlDetailsSectionComplete('Yes')
  Common.clickSaveBtn()
})

When('I verify the {string} Section for contact info as follows', (sectionName, dataTable) => {
  Common.getText(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain',
    dataTable.hashes()[0]['Details to be verified'],
  )
  Common.getText(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain',
    dataTable.hashes()[1]['Details to be verified'],
  )
  Common.getText(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain',
    dataTable.hashes()[2]['Details to be verified'],
  )
  Common.getText(IndividualsDetailsPage.contactDetailsAddress).should(
    'contain',
    dataTable.hashes()[3]['Details to be verified'],
  )
  Common.getText(IndividualsDetailsPage.contactDetailsMobileNr).should(
    'contain',
    dataTable.hashes()[4]['Details to be verified'],
  )
  Common.getText(IndividualsDetailsPage.contactDetailsPhoneNr).should(
    'contain',
    dataTable.hashes()[5]['Question name to be verified'],
  )
  Common.getText(IndividualsDetailsPage.contactDetailsEmail).should(
    'contain',
    dataTable.hashes()[6]['Details to be verified'],
  )
})

When('I verify the {string} in {string} Section as follows', (subSection, sectionName, dataTable) => {
  if (subSection === 'Emergency contact 1' && sectionName === 'Emergency contact details') {
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsName).should(
      'contain',
      dataTable.hashes()[0]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsSurname).should(
      'contain',
      dataTable.hashes()[1]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsRelationship).should(
      'contain',
      dataTable.hashes()[2]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsMobile).should(
      'contain',
      dataTable.hashes()[3]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsPhoneNr).should(
      'contain',
      dataTable.hashes()[4]['Details to be verified'],
    )
  } else if (subSection === 'Emergency contact 2' && sectionName === 'Emergency contact details') {
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsTwoName).should(
      'equal',
      dataTable.hashes()[0]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsTwoSurname).should(
      'equal',
      dataTable.hashes()[1]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsTwoRelationship).should(
      'equal',
      dataTable.hashes()[2]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsTwoMobile).should(
      'equal',
      dataTable.hashes()[3]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsTwoPhoneNr).should(
      'equal',
      dataTable.hashes()[4]['Details to be verified'],
    )
  } else if (subSection === 'Emergency contact 3' && sectionName === 'Emergency contact details') {
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsThreeName).should(
      'equal',
      dataTable.hashes()[0]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsThreeSurname).should(
      'equal',
      dataTable.hashes()[1]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsThreeRelationship).should(
      'equal',
      dataTable.hashes()[2]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsThreeMobile).should(
      'equal',
      dataTable.hashes()[3]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsThreePhoneNr).should(
      'equal',
      dataTable.hashes()[4]['Details to be verified'],
    )
  } else if (subSection === 'Emergency contact 4' && sectionName === 'Emergency contact details') {
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsFourName).should(
      'equal',
      dataTable.hashes()[0]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsFourSurname).should(
      'equal',
      dataTable.hashes()[1]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsFourRelationship).should(
      'equal',
      dataTable.hashes()[2]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsFourMobile).should(
      'equal',
      dataTable.hashes()[3]['Details to be verified'],
    )
    Common.getText(IndividualsDetailsPage.emergencyContactDetailsFourPhoneNr).should(
      'equal',
      dataTable.hashes()[4]['Details to be verified'],
    )
  }
})
