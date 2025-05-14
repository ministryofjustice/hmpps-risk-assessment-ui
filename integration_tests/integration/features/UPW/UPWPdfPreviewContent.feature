Feature: Verify the content on the Pdf Preview page matches the values entered/selected in all the Sections
  As a Probation Practitioner,
  I complete all sections to be actioned and verify that answers on the Pdf Preview page matches the values entered/selected in all the Sections
  So that that I know all the information in the Pdf Preview page sections is correct

  Scenario: Verify the End2End application flow of UPW and verify the content on the pdf preview page
    Given I login and navigate to UPW Task list page with full dataDriven CRN
    And I see the UPW "task-list" page
    And I check "task-list" for visual regression
    #  Action/Enter Offender's "Individual details"
    When I click on the "Individual's details" link
    And I see UPW "Individual's details" page
    And I check that "No, I’ll come back later" is selected for "Mark individual’s details section as complete?"
    And I click "Change" link for changing Contact details
    And I see UPW "Contact details" page
    And I check "contact-details" for visual regression
    # Then I enter the details on the "Contact details" page as follows
    And I answer the questions on the page
      | Question      | Type | Answer                 |
      | Building name | Text | New Offender Building  |
      | House number  | Text |                      1 |
      | Street name   | Text | MAIN Offender's Street |
      | District      | Text | Sheffield              |
      | Town or city  | Text | Sheffield              |
      | County        | Text | South Yorkshire        |
      | Postcode      | Text | S3 1HY                 |
      | Phone number  | Text |            02142785462 |
      | Mobile number | Text |            07123456789 |
      | Email         | Text | test@test.com          |
    And I click on the "Save" button
    And I see UPW "Individual's details" page
    And I verify the details on the "Individuals details" page as follows
      | Field Name    | Text to be Verified    |
      | Building name | New Offender Building  |
      | House number  |                      1 |
      | Street name   | MAIN Offender's Street |
      | District      | Sheffield              |
      | Town/City     | Sheffield              |
      | County        | South Yorkshire        |
      | Postcode      | S3 1HY                 |
      | Mobile number |            07123456789 |
      | Phone number  |            02142785462 |
      | Email         | test@test.com          |
    And I click "Add contact" button for Emergency contact details
    And I see UPW "Emergency contact" page
    And I check "emergency-contact" for visual regression
    And I answer the questions on the page
      | Question                       | Type | Answer       |
      | Name                           | Text | Charles      |
      | Surname                        | Text | Europe       |
      | Relationship to the individual | Text | Friend       |
      | Mobile                         | Text | 020123456789 |
      | Phone number                   | Text |  02142785462 |
    And I click on the "Save" button
    And I see UPW "Individual's details" page
    And I verify the "Emergency contact 2" in "Emergency contact details" Section as follows
      | Question name to be verified   | Details to be verified |
      | Name                           | Charles                |
      | Surname                        | Europe                 |
      | Relationship to the individual | Friend                 |
      | Mobile number                  |           020123456789 |
      | Phone number                   |            02142785462 |
    And I check "individuals-details" for visual regression
    And I click on "Remove" link against the "Emergency Contact 1" on the Individual details
    And I select "Yes" for the question "Mark individual’s details section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    And I see the "Individual's details" link is marked as "Completed"
    #  Action/Enter Offender's "Gender information"
    When I click on the "Gender information" link
    And I see UPW "Gender information" page
    And I check "gender-information" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark gender information section as complete?"
    And I answer the questions on the page
      | Question                                                                                                                                                        | Type  | Answer | Details                             |
      | Gender identity                                                                                                                                                 | Radio | Female |                                     |
      | Has the individual gone through any part of a process to change the sex they were assigned at birth to the gender they now identify with, or do they intend to? | Radio | Yes    | Entering Text related to sex change |
      | Is the individual intersex or do they have a Difference in Sexual Development (DSD)?                                                                            | Radio | Yes    |                                     |
      | Do they consider themselves to be transgender or have a transgender history?                                                                                    | Radio | Yes    |                                     |
    And I select "Yes" for the question "Mark gender information section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Gender information" link is marked as "Completed"
    And I see that "Placement preferences" link is available
    #  Action/Enter Offender's "Cultural and religious adjustments"
    When I click on the "Cultural and religious adjustments" link
    And I see UPW "Are adjustments required for cultural or religious reasons?" page
    And I check "cultural-religious-adjustments" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark cultural or religious adjustments section as complete?"
    And I answer the questions on the page
      | Question                                                    | Type  | Answer | Details              |
      | Are adjustments required for cultural or religious reasons? | Radio | Yes    | Test Culture details |
    And I select "Yes" for the question "Mark cultural or religious adjustments section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Cultural and religious adjustments" link is marked as "Completed"
    #  Action/Enter Offender's "Other adjustments"
    When I click on the "Other adjustments" link
    And I check "other-adjustments" for visual regression
    And I answer the questions on the page
      | Question            | Type      | Answer                      |
      | Trauma              | Text Area | Trauma details              |
      | Gender              | Text Area | Gender details              |
      | Neurodiversity      | Text Area | Neurodiversity details      |
      | Transport/Mobility  | Text Area | Transport/Mobility details  |
      | Maturity Assessment | Text Area | Maturity Assessment details |
      | Maturity            | Text Area | Maturity details            |
    And I select "Yes" for the question "Mark the other adjustments section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Other adjustments" link is marked as "Completed"
    #  Action/Enter Offender's "Placement preferences"
    When I click on the "Placement preferences" link
    And I see UPW "Does the individual have any placement preferences?" page
    And I check "placement-preferences" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark placement preferences as complete?"
    And I select "Yes" for the question "Does the individual have any placement preferences?"
    And I say my placement preference is "Individual"
    And I select "Yes" for the question "Mark placement preferences as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Placement preferences" link is marked as "Completed"
    #  Action/Enter Offender's "Risk of harm in the community" information
    When I click on the "Risk of harm in the community" link
    And I see UPW "Risk of harm in the community" page
    And I check "risk-of-harm-in-the-community" for visual regression
    And I see "Risk of harm in the community" in page title
    And I check that "No, I’ll come back later" is selected for "Mark risk of harm in the community section as complete?"
    And I answer the questions on the page
      | Question                                                              | Type  | Answer | Details                                          |
      | History of sexual offending?                                          | Radio | Yes    | Entering Text related to sexual offending        |
      | Individual poses a risk to children?                                  | Radio | Yes    | Entering Text related to risk to children        |
      | Violent offences?                                                     | Radio | Yes    | Entering Text related to Violent offences        |
      | History of acquisitive offending?                                     | Radio | Yes    | Entering Text related to acquisitive offending   |
      | Has the individual been involved in serious group offending (SGO)?    | Radio | Yes    | Entering Text related to serious group offending |
      | Control issues or disruptive behaviour?                               | Radio | Yes    | Entering Text related to disruptive behaviour    |
      | History of hate-based attitudes or behaviours?                        | Radio | Yes    | Entering Text related to hate-based attitudes    |
      | History of offending against vulnerable adults?                       | Radio | Yes    | Entering Text related to vulnerable adult        |
      | Is the individual vulnerable because they are a high-profile person?  | Radio | Yes    | Entering Text related to high-profile person     |
      | Additional risk assessment information relevant to Community Payback? | Radio | Yes    | Entering Text related to Additional information  |
    And I select "Yes" for the question "Mark risk of harm in the community section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Risk of harm in the community" link is marked as "Completed"
    #  Action/Enter Offender's "Managing risk" details
    When I click on the "Managing risk" link
    And I see UPW "Managing risk" page
    And I check "managing-risk" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark managing risk section as complete?"
    And I answer the questions on the page
      | Question                                                               | Type  | Answer | Details                                            |
      | Location restricted by victim exclusion criteria?                      | Radio | Yes    | Entering Text related to victim exclusion criteria |
      | Close supervision or restricted placement recommended?                 | Radio | Yes    | Entering Text related to restricted placement      |
      | Recommend not to place with female supervisor?                         | Radio | Yes    | Entering Text related to female supervisor         |
      | Recommend not to place with male supervisor?                           | Radio | Yes    | Entering Text related to male supervisor           |
      | Restrictive orders? (non-molestation, injunction etc.)                 | Radio | Yes    | Entering Text related to Restrictive orders        |
      | Are there any risk management issues for an individual placement?      | Radio | Yes    | Entering Text related to individual placement      |
      | Are there any risk management issues if working in a supervised group? | Radio | Yes    | Entering Text related to supervised group          |
      | Alcohol or drug issues with health and safety impact?                  | Radio | Yes    | Entering Text related to health and safety impact  |
    And I select "Yes" for the question "Mark managing risk section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Managing risk" link is marked as "Completed"
    #  Action/Enter Offender's "Disabilities and mental health" details
    When I click on the "Disabilities and mental health" link
    And I see UPW "Disabilities and mental health" page
    And I check "disabilities-and-mental-health" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark disabilities and mental health section as complete?"
    And I answer the questions on the page
      | Question                                                                                                            | Type  | Answer | Details                                            |
      | Any additional disabilities or health issues that affect the individual’s ability to engage with Community Payback? | Radio | Yes    | Entering Text related to the Additional disability |
      | Do any of the above affect the individual’s ability to engage with Community Payback?                               | Radio | No     |                                                    |
    And I select "Yes" for the question "Mark disabilities and mental health section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Disabilities and mental health" link is marked as "Completed"
    #  Action/Enter Offender's existing "Health issues"
    When I click on the "Health issues" link
    And I see UPW "Are there any other health issues that may affect ability to work?" page
    And I check "other-health-issues" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark health issues section as complete?"
    And I answer the questions on the page
      | Question                                                     | Type  | Answer   | Details                                               |
      | Does the individual have any known allergies?                | Radio | Yes      | Entering Text related to Allergies                    |
      | Has the individual experienced sudden loss of consciousness? | Radio | Yes      | Entering Text related to Sudden loss of consciousness |
      | Does the individual have epilepsy?                           | Radio | Yes      | Entering Text related to Epilepsy                     |
      | Is the individual pregnant or recently given birth?          | Radio | Pregnant | Entering Text related to Pregnancy                    |
      | Any other health issues?                                     | Radio | Yes      | Entering Text related to Health issues                |
    And I select "Yes" for the question "Mark health issues section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Health issues" link is marked as "Completed"
    #  Action/Enter Offender's "GP Details"
    And I see the UPW "task-list" page
    And I click on the "GP Details" link
    When I see UPW "GP Details" page
    And I check that "No, I’ll come back later" is selected for "Mark GP details section as complete?"
    And I click on the "Add GP" button
    And I see UPW "Details of GP" page
    And I check "details-of-gp" for visual regression
    And I answer the questions on the page
      | Question         | Type | Answer                     |
      | Name (Optional)  | Text | Charles Doctor             |
      | GP practice name | Text | Sheffield Medical practice |
      | Building name    | Text | New Offender Building      |
      | House number     | Text |                          1 |
      | Street name      | Text | MAIN Offender's Street     |
      | District         | Text | Sheffield                  |
      | Town or city     | Text | Sheffield                  |
      | County           | Text | South Yorkshire            |
      | Postcode         | Text | S3 1HY                     |
      | Phone number     | Text |                02142785462 |
    And I click on the "Save" button
    And I see UPW "GP Details" page
    And I verify the GP contact details "3" on the GP details page as follows
      | Field Name    | Text to be Verified        |
      | Name          | Charles Doctor             |
      | Practice name | Sheffield Medical practice |
      | Address       | New Offender Building      |
      | Address       |   1 MAIN Offender's Street |
      | Address       | Sheffield                  |
      | Address       | Sheffield                  |
      | Address       | South Yorkshire            |
      | Address       | S3 1HY                     |
      | Phone number  |                02142785462 |
    And I check "gp-details" for visual regression
    And I select "Yes" for the question "Mark GP details section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "GP Details" link is marked as "Completed"
    #  Action/Enter Offender's "Travel" information
    When I click on the "Travel" link
    And I see UPW "Travel information" page
    And I check "travel-information" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark travel information section as complete?"
    And I answer the questions on the page
      | Question                                                                     | Type  | Answer | Details                                    |
      | Does the individual have any travel issues that will affect their placement? | Radio | Yes    | Entering Text related to the Travel Issues |
      | Does the individual have a valid driving licence?                            | Radio | Yes    |                                            |
      | Do they have access to a vehicle?                                            | Radio | Yes    |                                            |
      | Is public transport available and accessible to the individual?              | Radio | Yes    |                                            |
    And I select "Yes" for the question "Mark travel information section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Travel" link is marked as "Completed"
    #  Action/Enter Offender's "Caring commitments" details
    When I click on the "Caring commitments" link
    And I see UPW "Are there carer commitments?" page
    And I check "carer-commitments" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark caring commitments section as complete?"
    And I enter Additional information as "Additional caring commitments" for Caring commitments
    And I select "Yes" for the question "Mark caring commitments section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Caring commitments" link is marked as "Completed"
    #  Action/Enter Offender's "Employment, education and skills" information
    And I click on the "Employment, education and skills" link
    When I see UPW "Employment, education and skills" page
    And I check "employment-education-and-skills" for visual regression
    And I see "Employment, education and skills" in page title
    And I check that "No, I’ll come back later" is selected for "Mark employment, education and skills section as complete?"
    And I answer the questions on the page
      | Question                                                                                                        | Type  | Answer                            | Details                                       |
      | Is the individual in employment or education?                                                                   | Radio | Full-time education or employment | Entering Text related to Full-time education  |
      | Does the individual have any difficulties with reading, writing or numbers?                                     | Radio | Yes                               | Entering Text related to writing difficulties |
      | Does the individual have any work skills or experience that could be used while carrying out Community Payback? | Radio | Yes                               | Entering Text related to work skills          |
      | Does the individual have future work plans that could be supported through a Community Payback placement?       | Radio | Yes                               | Entering Text related to future work plans    |
    And I select "Yes" for the question "Mark employment, education and skills section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Employment, education and skills" link is marked as "Completed"
    #  Action/Enter Offender's "Training & employment opportunities" information
    And I click on the "Training & employment opportunities" link
    When I see UPW "Training & employment opportunities" page
    And I check "training-and-employment-opportunities" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark training and employment section as complete?"
    And I answer the questions on the page
      | Question                                                                                                                                             | Type  | Answer | Details                                                                      |
      | Does the individual have an education, training or employment-related need? What types of courses would be applicable?                               | Radio | Yes    | Entering Text related to the training needs                                  |
      | Is there any reason that would prevent the individual from completing the 3 mandatory Community Campus Courses online? Or any other online learning? | Radio | Yes    | Entering Text related to the training needs                                  |
      | Does the individual agree to use the maximum entitlement of their hours on this activity?                                                            | Radio | No     | Entering Text related to maximum entitlement of their hours on this activity |
    And I select "Yes" for the question "Mark training and employment section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Training & employment opportunities" link is marked as "Completed"
    #  Action/Enter Offender's "Intensive working" details
    When I click on the "Intensive working" link
    And I see UPW "Intensive working" page
    And I check "intensive-working" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark intensive working section as complete?"
    And I select "Yes" for the question "Is the individual eligible for intensive working?"
    And I answer the questions on the page
      | Question                                                                                  | Type | Answer                                        |
      | Recommended hours per week in addition to statutory minimum, at the start of the order    | Text |                                            21 |
      | Recommended hours per week in addition to statutory minimum, at the midpoint of the order | Text |                                             0 |
      | At what point should the individual be expected to reach a 28-hour working week?          | Text | Entering Text related to 28-hour working week |
    And I select "Yes" for the question "Mark intensive working section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Intensive working" link is marked as "Completed"
    #  Action/Enter Offender's "Availability" for Community Payback work
    When I click on the "Availability" link
    And I see UPW "Availability for Community Payback work" page
    And I check "availability-for-community-payback-work" for visual regression
    And I check that "No, I’ll come back later" is selected for "Mark availability for community payback work section as complete?"
    And I select the Availability CheckBoxes as follows
      | Availability | Monday      | Tuesday       | Wednesday   | Thursday      | Friday      | Saturday      | Sunday      |
      | Morning      | Morning-Yes |               |             |               | Morning-Yes |               |             |
      | Afternoon    |             | Afternoon-Yes |             | Afternoon-Yes |             | Afternoon-Yes |             |
      | Evening      |             |               | Evening-Yes |               |             |               | Evening-Yes |
    And I enter "Available early mornings and late nights" for the question "Additional availability information [Optional]"
    And I answer the questions on the page
      | Question                                                                                                            | Type  | Answer | Details          |
      | If the person on probation is unemployed, are they available to work intensively? (Up to a maximum 28 Hours a week) | Radio | No     | Entering details |
      | If the person on probation is unemployed, are they available to work Mon-Fri?                                       | Radio | No     | Entering details |
      | If the person on probation is employed, do they want to be considered for intensive working?                        | Radio | Yes    | Entering details |
    And I select "Yes" for the question "Mark availability for community payback work section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Availability" link is marked as "Completed"
    #  Action/Enter Offender's "Equipment" requirements
    When I click on the "Choose equipment sizes" link
    And I see UPW "Choose equipment sizes" page
    And I check "choose-equipment-sizes" for visual regression
    And I see "Choose equipment sizes" in page title
    And I check that "No, I’ll come back later" is selected for "Mark equipment sizes section as complete?"
    And I answer the questions on the page
      | Question                          | Type     | Answer  |
      | Male or female clothing required? | Radio    | Male    |
      | Waterproof clothing               | Radio    | Large   |
      | Footwear                          | Dropdown | Size 10 |
    And I select "Yes" for the question "Mark equipment sizes section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Choose equipment sizes" link is marked as "Completed"
    #   PDF preview, confirm declaration & generate output pdf
    And I check "task-list-complete" for visual regression
    And I click on the "Completed assessment" link
    And I see output "pdf-preview" Page
    And I verify the "Offence details" table is as follows
      | Question      | Answer           |
      | Offence       |      056 - Arson |
      | Subcode       |       00 - Arson |
      | Sentence date | 7th January 2021 |
    And I verify the "Personal details" table is as follows
      | Question      | Answer             |
      | Family name   | Whitfield          |
      | First name    | Sam                |
      | Date of birth | 2nd September 1949 |
    And I verify the "Gender information" table is as follows
      | Question                                                                                                                                                        | Answer                              |
      | Gender identity                                                                                                                                                 | Female                              |
      | Has the individual gone through any part of a process to change the sex they were assigned at birth to the gender they now identify with, or do they intend to? | Yes                                 |
      | Give details and discuss placement options with the individual, based on their gender identity.                                                                 | Entering Text related to sex change |
      | Is the individual intersex or do they have a Difference in Sexual Development (DSD)?                                                                            | Yes                                 |
      | Do they consider themselves to be transgender or have a transgender history?                                                                                    | Yes                                 |
    And I verify the "Contact details" Section for contact info on the pdf-preview page as follows
      | Question name to be verified | Details to be verified   |
      | Address                      | New Offender Building    |
      |                              | 1 MAIN Offender's Street |
      |                              | Sheffield                |
      |                              | Sheffield                |
      |                              | South Yorkshire          |
      |                              | S3 1HY                   |
      | Mobile                       |              07123456789 |
      | Phone number                 |              02142785462 |
      | Email                        | test@test.com            |
    And I verify the "Emergency contact 1" in "Emergency contact details" Section as follows on the PDF Preview page
      | Question name to be verified | Details to be verified |
      | Name                         | Charles                |
      | Surname                      | Europe                 |
      | Relationship to individual   | Friend                 |
      | Mobile                       |           020123456789 |
      | Phone number                 |            02142785462 |
    And I verify the section "Risk of harm in the community" is as follows
      | Question                                                             | Answer | Details                                          |
      | History of sexual offending?                                         | Yes    | Entering Text related to sexual offending        |
      | Individual poses a risk to children?                                 | Yes    | Entering Text related to risk to children        |
      | Violent offences?                                                    | Yes    | Entering Text related to Violent offences        |
      | History of acquisitive offending?                                    | Yes    | Entering Text related to acquisitive offending   |
      | Has the individual been involved in serious group offending (SGO)?   | Yes    | Entering Text related to serious group offending |
      | Control issues or disruptive behaviour?                              | Yes    | Entering Text related to disruptive behaviour    |
      | History of hate-based attitudes or behaviours?                       | Yes    | Entering Text related to hate-based attitudes    |
      | Is the individual vulnerable because they are a high-profile person? | Yes    | Entering Text related to high-profile person     |
      | Additional risk assessment information?                              | Yes    | Entering Text related to Additional information  |
    And I verify the section "Management of risk" is as follows
      | Question                                                               | Answer | Details                                            |
      | MAPPA nominal?                                                         | No     |                                                    |
      | Location restricted by victim exclusion criteria?                      | Yes    | Entering Text related to victim exclusion criteria |
      | Close supervision or restricted placement recommended?                 | Yes    | Entering Text related to restricted placement      |
      | Recommend not to place with female supervisor?                         | Yes    | Entering Text related to female supervisor         |
      | Recommend not to place with male supervisor?                           | Yes    | Entering Text related to male supervisor           |
      | Restrictive orders?                                                    | Yes    | Entering Text related to Restrictive orders        |
      | Are there any risk management issues for an individual placement?      | Yes    | Entering Text related to individual placement      |
      | Are there any risk management issues if working in a supervised group? | Yes    | Entering Text related to supervised group          |
      | Alcohol or drug issues with health and safety impact?                  | Yes    | Entering Text related to health and safety impact  |
    And I verify the section "Diversity information" is as follows
      | Question                                                    | Answer     | Details              |
      | Interpreter required?                                       | No         |                      |
      | Are adjustments required for cultural or religious reasons? | Yes        | Test Culture details |
      | Does the individual have any placement preferences?         | Individual |                      |
# TODO:    And I verify the "Placement restrictions due to health and other needs" disabilities Section for "Disabilities and mental health"
#      | Question name to be verified             | Comments to be verified                                                                                                                              | Adjustments                           |
#      | Disabilities, conditions and adjustments |                                                                                                                                                      |                                       |
#      | Reduced mobility                         | Comment added by Probation User on 19/07/2022 at 13:23 Reduced Mobility addition - Regression Test Automation Suite - ARN-1057 & ARN-1042            | None                                  |
#      | Disfigurement                            | Comment added by Probation User on 19/07/2022 at 13:20 Severe Disfigurement addition - Regression Test Automation Suite - ARN-1057 & ARN-1042        | Other                                 |
#      | Speech condition                         | Comment added by Probation User on 19/07/2022 at 13:26 Speech Impairment addition - Regression Test Automation Suite - ARN-1057 & ARN-1042           | Sign language interpreter/Lip speaker |
#      | Reduced physical ability                 | Comment added by Probation User on 19/07/2022 at 13:25 Reduced Physical Capability addition - Regression Test Automation Suite - ARN-1057 & ARN-1042 | Modified Equipment                    |
#      | Mental health condition                  | Comment added by Probation User on 19/07/2022 at 13:23 Mental illness addition - Regression Test Automation Suite - ARN-1057 & ARN-1042              | Behavioural responses/Body language   |
#      | Apathy                                   | Comment added by Probation User on 19/07/2022 at 13:22 Terminal Apathy addition - Regression Test Automation Suite - ARN-1057 & ARN-1042             | None                                  |
    And I verify the "Placement restrictions due to health and other needs" disabilities Section for "Questions"
      | Question name to be verified                                                                                        | Option to be verified | Text to be verified                                |
      | Any additional disabilities or health issues that affect the individual's ability to engage with Community Payback? | Yes                   | Entering Text related to the Additional disability |
      | Do any of the above affect the individual's ability to engage with Community Payback?                               | No                    |                                                    |
      | Suggest adjustments, if known                                                                                       |                       |                                                    |
    And I verify the "Are there any other health issues that may affect ability to work?" table is as follows
      | Question                                                     | Answer   | Details                                               |
      | Does the individual have any known allergies?                | Yes      | Entering Text related to Allergies                    |
      | Has the individual experienced sudden loss of consciousness? | Yes      | Entering Text related to Sudden loss of consciousness |
      | Does the individual have epilepsy?                           | Yes      | Entering Text related to Epilepsy                     |
      | Is the individual pregnant or recently given birth?          | Pregnant | Entering Text related to Pregnancy                    |
      | Any other health issues?                                     | Yes      | Entering Text related to Health issues                |
    And I verify the GP contact "1" in GP Contact Section as follows
      | Question name to be verified | Details to be verified |
      | Name                         | Marie CurieContactOne  |
      | GP practice name             |                        |
      | Address                      |     1 Address 1 street |
      | Address                      | Sheffield              |
      | Address                      | South Yorkshire        |
      | Address                      | S3 1HY                 |
      | Phone number                 |           111111111111 |
    And I verify the GP contact "2" in GP Contact Section as follows
      | Question name to be verified | Details to be verified |
      | Name                         | Viktor JonesContactTwo |
      | GP practice name             |                        |
      | Address                      |     1 Address 2 street |
      | Address                      | Sheffield              |
      | Address                      | South Yorkshire        |
      | Address                      | S3 1HY                 |
      | Phone number                 |         22222222222222 |
    And I verify the GP contact "3" in GP Contact Section as follows
      | Question name to be verified | Details to be verified     |
      | Name                         | Charles Doctor             |
      | GP practice name             | Sheffield Medical practice |
      | Address                      | New Offender Building      |
      | Address                      |   1 MAIN Offender's Street |
      | Address                      | Sheffield                  |
      | Address                      | Sheffield                  |
      | Address                      | South Yorkshire            |
      | Address                      | S3 1HY                     |
      | Phone number                 |                02142785462 |
    And I verify the "Travel information" table is as follows
      | Question                                                                     | Answer | Details                                    |
      | Does the individual have any travel issues that will affect their placement? | Yes    | Entering Text related to the Travel Issues |
      | Does the individual have a valid driving licence?                            | Yes    |                                            |
      | Do they have access to a vehicle?                                            | Yes    |                                            |
      | Is public transport available and accessible to the individual?              | Yes    |                                            |
    And I verify the "Are there carer commitments?" table is as follows
      | Question               | Answer                        |
      | Carer commitments      | Has Dependents                |
      | Additional information | Additional caring commitments |
    And I verify the section "Employment, Education, and skills" is as follows
      | Question                                                                                                        | Answer                                       | Details                                       |
      | Is the individual in employment or education?                                                                   | Full-time education or employment            |                                               |
      | Employment or education details (working days, hours etc)                                                       | Entering Text related to Full-time education |                                               |
      | Does the individual have any difficulties with reading or writing?                                              | Yes                                          | Entering Text related to writing difficulties |
      | Does the individual have any work skills or experience that could be used while carrying out Community Payback? | Yes                                          | Entering Text related to work skills          |
      | Does the individual have future work plans that could be supported through a Community Payback placement?       | Yes                                          | Entering Text related to future work plans    |
    And I verify the "Training & Employment Opportunities" table is as follows
      | Question                                                                                                                                             | Answer | Details                                                                      |
      | Does the individual have an education, training or employment-related need?                                                                          | Yes    | Entering Text related to the training needs                                  |
      | Is there any reason that would prevent the individual from completing the 3 mandatory Community Campus Courses online? Or any other online learning? | Yes    | Entering Text related to the training needs                                  |
      | Does the individual agree to use the maximum entitlement of their hours on this activity?                                                            | No     | Entering Text related to maximum entitlement of their hours on this activity |
    And I verify the "Availability for Community Payback/ Intensive Working Assessment" availability Section
      | Availability | Monday      | Tuesday       | Wednesday   | Thursday      | Friday      | Saturday      | Sunday      |
      | Morning      | Morning-Yes |               |             |               | Morning-Yes |               |             |
      | Afternoon    |             | Afternoon-Yes |             | Afternoon-Yes |             | Afternoon-Yes |             |
      | Evening      |             |               | Evening-Yes |               |             |               | Evening-Yes |
    And I verify the Additional availability information Section
      | Question name to be verified        | Answer to be verified                    |
      | Additional availability information | Available early mornings and late nights |
    And I verify the "Equipment" table is as follows
      | Question                          | Answer  |
      | Male or female clothing required? | Male    |
      | Waterproof clothing size          | Large   |
      | Footwear size (UK)                | Size 10 |
    And I check "pdf-preview" for visual regression
    And I click on back link
    And I click on Submit Button
    And I see the "You have completed the Community Payback assessment" page
    And I check "assessment-complete" for visual regression
    And I view the generated PDF
#    TODO: fix this, if you can. Started failing after switching to GitHub Actions. Suspect runner resource issue
#    And I check "pdf" for visual regression
#  Scenario: Verify the values are correctly cloned for a cloned assessment
    Given I login and navigate to UPW Task list page for cloned assessment
    And I see the UPW "task-list" page
    When I click on the "Individual's details" link
    And I see UPW "Individual's details" page
    And I check that "No, I’ll come back later" is selected for "Mark individual’s details section as complete?"
    And I verify the "Contact details" Section for contact info as follows
      | Question name to be verified | Details to be verified |
      | Address                      |         99 Oxford Road |
      |                              | Epsom                  |
      |                              | Surrey                 |
      |                              | SW16 1AF               |
      | Mobile                       |            07123456789 |
      | Phone number                 |            02142785462 |
      | Email                        | test@test.com          |
    And I verify the "Emergency contact 1" in "Emergency contact details" Section as follows
      | Question name to be verified | Details to be verified |
      | Name                         | JackFutureEndDate      |
      | Surname                      | JonesFutureEndDate     |
      | Relationship to individual   | Father                 |
      | Mobile                       |          0776 666 6666 |
      | Phone number                 |                        |
    And I select "Yes" for the question "Mark individual’s details section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    And I see the "Individual's details" link is marked as "Completed"
    When I click on the "Gender information" link
    And I see UPW "Gender information" page
    And I check that "No, I’ll come back later" is selected for "Mark gender information section as complete?"
    And I select "Male" for the question "Gender identity"
    And I select "No, I’ll come back later" for the question "Mark gender information section as complete?"
    And I click on the "Save" button
    When I click on the "Gender information" link
    And I see UPW "Gender information" page
    And I check the answers on the page are as follows
      | Question                                                                                                                                                        | Type  | Answer | Details                             |
      | Gender identity                                                                                                                                                 | Radio | Male   |                                     |
      | Has the individual gone through any part of a process to change the sex they were assigned at birth to the gender they now identify with, or do they intend to? | Radio | Yes    | Entering Text related to sex change |
      | Is the individual intersex or do they have a Difference in Sexual Development (DSD)?                                                                            | Radio | Yes    |                                     |
      | Do they consider themselves to be transgender or have a transgender history?                                                                                    | Radio | Yes    |                                     |
    And I select "Female" for the question "Gender identity"
    And I select "Yes" for the question "Mark gender information section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Gender information" link is marked as "Completed"
    And I see that "Placement preferences" link is available
    When I click on the "Cultural and religious adjustments" link
    And I see UPW "Are adjustments required for cultural or religious reasons?" page
    #  And I check that "No, I’ll come back later" is selected for "Mark cultural or religious adjustments section as complete?"
    And I answer the questions on the page
      | Question                                                    | Type  | Answer | Details              |
      | Are adjustments required for cultural or religious reasons? | Radio | Yes    | Test Culture details |
    And I check the answers on the page are as follows
      | Question                                                    | Type  | Answer | Details              |
      | Are adjustments required for cultural or religious reasons? | Radio | Yes    | Test Culture details |
    And I select "Yes" for the question "Mark cultural or religious adjustments section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Cultural and religious adjustments" link is marked as "Completed"
    #  Action/Enter Offender's "Other adjustments"
    When I click on the "Other adjustments" link
    And I check "other-adjustments" for visual regression
    And I check the answers on the page are as follows
      | Question            | Type      | Answer                      |
      | Trauma              | Text Area | Trauma details              |
      | Gender              | Text Area | Gender details              |
      | Neurodiversity      | Text Area | Neurodiversity details      |
      | Transport/Mobility  | Text Area | Transport/Mobility details  |
      | Maturity Assessment | Text Area | Maturity Assessment details |
      | Maturity            | Text Area | Maturity details            |
    And I select "Yes" for the question "Mark the other adjustments section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Other adjustments" link is marked as "Completed"
    #  Action/Enter Offender's "Placement preferences"
    When I click on the "Placement preferences" link
    And I see UPW "Does the individual have any placement preferences?" page
#    And I check that "No, I’ll come back later" is selected for "Mark placement preferences as complete?"
    And I verify the Placement preferences page for cloned assessment as follows
      | Question Name                                       | Option to be verified              |
      | Does the individual have any placement preferences? | Both Yes&No should not be selected |
    And I select "Yes" for the question "Does the individual have any placement preferences?"
    And I say my placement preference is "Individual"
    And I select "Yes" for the question "Mark placement preferences as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Placement preferences" link is marked as "Completed"
    #  Action/Enter Offender's "Risk of harm in the community" information
    When I click on the "Risk of harm in the community" link
    And I see UPW "Risk of harm in the community" page
    And I see "Risk of harm in the community" in page title
    And I check that "No, I’ll come back later" is selected for "Mark risk of harm in the community section as complete?"
    And I check the answers on the page are as follows
      | Question                                                              | Type  | Answer | Details                                          |
      | History of sexual offending?                                          | Radio | Yes    | Entering Text related to sexual offending        |
      | Individual poses a risk to children?                                  | Radio | Yes    | Entering Text related to risk to children        |
      | Violent offences?                                                     | Radio | Yes    | Entering Text related to Violent offences        |
      | History of acquisitive offending?                                     | Radio | Yes    | Entering Text related to acquisitive offending   |
      | Has the individual been involved in serious group offending (SGO)?    | Radio | Yes    | Entering Text related to serious group offending |
      | Control issues or disruptive behaviour?                               | Radio | Yes    | Entering Text related to disruptive behaviour    |
      | History of hate-based attitudes or behaviours?                        | Radio | Yes    | Entering Text related to hate-based attitudes    |
      | Is the individual vulnerable because they are a high-profile person?  | Radio | Yes    | Entering Text related to high-profile person     |
      | Additional risk assessment information relevant to Community Payback? | Radio | Yes    | Entering Text related to Additional information  |
    And I select "Yes" for the question "Mark risk of harm in the community section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Risk of harm in the community" link is marked as "Completed"
#      Action/Enter Offender's "Managing risk" details
    When I click on the "Managing risk" link
    And I see UPW "Managing risk" page
    And I check that "No, I’ll come back later" is selected for "Mark managing risk section as complete?"
    And I check the answers on the page are as follows
      | Question                                                               | Type  | Answer | Details                                            |
      | Location restricted by victim exclusion criteria?                      | Radio | Yes    | Entering Text related to victim exclusion criteria |
      | Close supervision or restricted placement recommended?                 | Radio | Yes    | Entering Text related to restricted placement      |
      | Recommend not to place with female supervisor?                         | Radio | Yes    | Entering Text related to female supervisor         |
      | Recommend not to place with male supervisor?                           | Radio | Yes    | Entering Text related to male supervisor           |
      | Restrictive orders? (non-molestation, injunction etc.)                 | Radio | Yes    | Entering Text related to Restrictive orders        |
      | Are there any risk management issues for an individual placement?      | Radio | Yes    | Entering Text related to individual placement      |
      | Are there any risk management issues if working in a supervised group? | Radio | Yes    | Entering Text related to supervised group          |
      | Alcohol or drug issues with health and safety impact?                  | Radio | Yes    | Entering Text related to health and safety impact  |
    And I select "Yes" for the question "Mark managing risk section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Managing risk" link is marked as "Completed"
    #  Action/Enter Offender's "Disabilities and mental health" details
    When I click on the "Disabilities and mental health" link
    And I see UPW "Disabilities and mental health" page
    And I check that "No, I’ll come back later" is selected for "Mark disabilities and mental health section as complete?"
    And I check the answers on the page are as follows
      | Question                                                                                                            | Type  | Answer | Details                                            |
      | Any additional disabilities or health issues that affect the individual’s ability to engage with Community Payback? | Radio | Yes    | Entering Text related to the Additional disability |
      | Do any of the above affect the individual’s ability to engage with Community Payback?                               | Radio | No     |                                                    |
    And I select "Yes" for the question "Mark disabilities and mental health section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Disabilities and mental health" link is marked as "Completed"
    #  Action/Enter Offender's existing "Health issues"
    When I click on the "Health issues" link
    And I see UPW "Are there any other health issues that may affect ability to work?" page
    And I check that "No, I’ll come back later" is selected for "Mark health issues section as complete?"
    And I check the answers on the page are as follows
      | Question                                                     | Type  | Answer | Details                                               |
      | Does the individual have any known allergies?                | Radio | Yes    | Entering Text related to Allergies                    |
      | Has the individual experienced sudden loss of consciousness? | Radio | Yes    | Entering Text related to Sudden loss of consciousness |
      | Does the individual have epilepsy?                           | Radio | Yes    | Entering Text related to Epilepsy                     |
      | Is the individual pregnant or recently given birth?          | Radio | No     |                                                       |
      | Any other health issues?                                     | Radio | Yes    | Entering Text related to Health issues                |
    And I select "Yes" for the question "Mark health issues section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Health issues" link is marked as "Completed"
    #  Action/Enter Offender's "GP Details"
    And I see the UPW "task-list" page
    And I click on the "GP Details" link
    When I see UPW "GP Details" page
    And I check that "No, I’ll come back later" is selected for "Mark GP details section as complete?"
    And I verify the GP contact details "1" on the GP details page as follows
      | Field Name    | Text to be Verified   |
      | Name          | Marie CurieContactOne |
      | Practice name |                       |
      | Address       |    1 Address 1 street |
      | Address       | Sheffield             |
      | Address       | South Yorkshire       |
      | Address       | S3 1HY                |
      | Phone number  |          111111111111 |
    And I verify the GP contact details "2" on the GP details page as follows
      | Field Name    | Text to be Verified    |
      | Name          | Viktor JonesContactTwo |
      | Practice name |                        |
      | Address       |     1 Address 2 street |
      | Address       | Sheffield              |
      | Address       | South Yorkshire        |
      | Address       | S3 1HY                 |
      | Phone number  |         22222222222222 |
    And I select "Yes" for the question "Mark GP details section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "GP Details" link is marked as "Completed"
    #  Action/Enter Offender's "Travel" information
    When I click on the "Travel" link
    And I see UPW "Travel information" page
    And I check the answers on the page are as follows
      | Question                                                                     | Type  | Answer | Details                                    |
      | Does the individual have any travel issues that will affect their placement? | Radio | Yes    | Entering Text related to the Travel Issues |
      | Does the individual have a valid driving licence?                            | Radio | Yes    |                                            |
      | Do they have access to a vehicle?                                            | Radio | Yes    |                                            |
      | Is public transport available and accessible to the individual?              | Radio | Yes    |                                            |
    And I select "Yes" for the question "Mark travel information section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Travel" link is marked as "Completed"
    #  Action/Enter Offender's "Caring commitments" details
    When I click on the "Caring commitments" link
    And I see UPW "Are there carer commitments?" page
    And I check that "No, I’ll come back later" is selected for "Mark caring commitments section as complete?"
    And I check the answers on the page are as follows
      | Question                          | Type      | Answer                        |
      | Additional information (Optional) | Text Area | Additional caring commitments |
    And I select "Yes" for the question "Mark caring commitments section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Caring commitments" link is marked as "Completed"
    #  Action/Enter Offender's "Employment, education and skills" information
    And I click on the "Employment, education and skills" link
    When I see UPW "Employment, education and skills" page
    And I see "Employment, education and skills" in page title
#    And I check that "No, I’ll come back later" is selected for "Mark employment, education and skills section as complete?"
    And I check the answers on the page are as follows
      | Question                                                                                                        | Type  | Answer                            | Details                                                |
      | Is the individual in employment or education?                                                                   | Radio | Full-time education or employment | Entering Text related to Full-time education           |
      | Does the individual have any difficulties with reading, writing or numbers?                                     | Radio | Yes                               | Comment added by Probation User on 01/09/2022 at 14:03 |
      | Does the individual have any work skills or experience that could be used while carrying out Community Payback? | Radio | Yes                               | Entering Text related to work skills                   |
      | Does the individual have future work plans that could be supported through a Community Payback placement?       | Radio | Yes                               | Entering Text related to future work plans             |
    And I select "Yes" for the question "Mark employment, education and skills section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Employment, education and skills" link is marked as "Completed"
    #  Action/Enter Offender's "Training & employment opportunities" information
    And I click on the "Training & employment opportunities" link
    When I see UPW "Training & employment opportunities" page
    # And I check that "No, I’ll come back later" is selected for "Mark training and employment section as complete?"
    And I check the answers on the page are as follows
      | Question                                                                                                                                             | Type  | Answer | Details                                                                      |
      | Does the individual have an education, training or employment-related need? What types of courses would be applicable?                               | Radio | Yes    | Entering Text related to the training needs                                  |
      | Does the individual agree to use the maximum entitlement of their hours on this activity?                                                            | Radio | No     | Entering Text related to maximum entitlement of their hours on this activity |
      | Is there any reason that would prevent the individual from completing the 3 mandatory Community Campus Courses online? Or any other online learning? | Radio | Yes    | Entering Text related to the training needs                                  |
    And I select "Yes" for the question "Mark training and employment section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Training & employment opportunities" link is marked as "Completed"
    #  Action/Enter Offender's "Intensive working" details
    When I click on the "Intensive working" link
    And I see UPW "Intensive working" page
    And I check that "No, I’ll come back later" is selected for "Mark intensive working section as complete?"
    And I select "Yes" for the question "Is the individual eligible for intensive working?"
    And I check the answers on the page are as follows
      | Question                                                                                  | Type      | Answer                                        | Detail |
      | Recommended hours per week in addition to statutory minimum, at the start of the order    | Text      |                                            21 |        |
      | Recommended hours per week in addition to statutory minimum, at the midpoint of the order | Text      |                                             0 |        |
      | At what point should the individual be expected to reach a 28-hour working week?          | Text Area | Entering Text related to 28-hour working week |        |
      | Is the individual eligible for intensive working?                                         | Radio     | Yes                                           |        |
    And I select "Yes" for the question "Mark intensive working section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Intensive working" link is marked as "Completed"
    #  Action/Enter Offender's "Availability" for Community Payback work
    When I click on the "Availability" link
    And I see UPW "Availability for Community Payback work" page
#    #  I check that "No, I’ll come back later" is selected for "Mark availability for community payback work section as complete?"
    And I verify the Availability Section as follows
      | Availability | Monday      | Tuesday       | Wednesday   | Thursday      | Friday      | Saturday      | Sunday      |
      | Morning      | Morning-Yes |               |             |               | Morning-Yes |               |             |
      | Afternoon    |             | Afternoon-Yes |             | Afternoon-Yes |             | Afternoon-Yes |             |
      | Evening      |             |               | Evening-Yes |               |             |               | Evening-Yes |
    And I check that "Available early mornings and late nights" has been entered for "Additional availability information [Optional]"
    And I select "Yes" for the question "Mark availability for community payback work section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Availability" link is marked as "Completed"
    #  Action/Enter Offender's "Equipment" requirements
    When I click on the "Choose equipment sizes" link
    And I see UPW "Choose equipment sizes" page
    And I see "Choose equipment sizes" in page title
    And I check that "No, I’ll come back later" is selected for "Mark equipment sizes section as complete?"
    And I check the answers on the page are as follows
      | Question                          | Type     | Answer  |
      | Male or female clothing required? | Radio    | Male    |
      | Waterproof clothing               | Radio    | Large   |
      | Footwear                          | Dropdown | Size 10 |
    And I select "Yes" for the question "Mark equipment sizes section as complete?"
    And I click on the "Save" button
    And I see the UPW "task-list" page
    Then I see the "Choose equipment sizes" link is marked as "Completed"
    And I click on the "Completed assessment" link
    And I click on back link
    And I click on Submit Button
    And I see the "You have completed the Community Payback assessment" page
