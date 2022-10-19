const StartUpwAssessment = require('./controllers/start')
const TaskList = require('./controllers/taskList')
const SaveAndContinue = require('./controllers/saveAndContinue')
const individualsDetailsSaveAndContinue = require('./controllers/individualsDetailsSaveAndContinue')
const editEmergencyContactsSaveAndContinue = require('./controllers/editEmergencyContactsSaveAndContinue')
const removeEmergencyContactsSaveAndContinue = require('./controllers/removeEmergencyContactsSaveAndContinue')
const gpDetailsSaveAndContinue = require('./controllers/gpDetailsSaveAndContinue')
const editGpDetailsSaveAndContinue = require('./controllers/editGpDetailsSaveAndContinue')
const removeGpDetailsSaveAndContinue = require('./controllers/removeGpDetailsSaveAndContinue')
const ConvertPdf = require('./controllers/convertPdf')
const Confirmation = require('./controllers/confirmation')
const CloseAssessment = require('./controllers/closeAssessment')
const editContactDetailsSaveAndContinue = require('./controllers/editContactDetailsSaveAndContinue')
const PreviewPdf = require('./controllers/previewPdf')
const CaringCommitmentsController = require('./controllers/carerCommitment')
const { ModernDaySlaveryPerpetrator } = require('./controllers/modernDaySlaveryPerpetrator')
const { ModernDaySlaveryVictim } = require('./controllers/modernDaySlaveryVictim')

module.exports = {
  '/start': {
    pageTitle: 'Complete and download the Community payback assessment',
    controller: StartUpwAssessment,
    reset: true,
    entryPoint: true,
    template: `${__dirname}/templates/start`,
    next: 'task-list',
  },
  '/task-list': {
    pageTitle: 'Community payback assessment',
    controller: TaskList,
    template: `${__dirname}/templates/taskList`,
    next: 'confirmation',
  },
  '/individuals-details': {
    pageTitle: "Individual's details",
    id: 'individuals-details',
    controller: individualsDetailsSaveAndContinue,
    template: `${__dirname}/templates/individuals-details/individuals-details.njk`,
    next: 'task-list#individuals-details',
    fields: ['individual_details_complete', 'emergency_contact_declined'],
  },
  '/edit-personal-details': {
    pageTitle: 'Personal details',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/individuals-details/edit-personal-details.njk`,
    next: 'individuals-details',
    fields: ['first_name_aliases', 'family_name_aliases'],
  },
  '/edit-contact-details': {
    pageTitle: 'Contact details',
    controller: editContactDetailsSaveAndContinue,
    template: `${__dirname}/templates/individuals-details/edit-contact-details.njk`,
    next: 'individuals-details',
    fields: [
      'contact_address_building_name',
      'contact_address_house_number',
      'contact_address_street_name',
      'contact_address_district',
      'contact_address_town_or_city',
      'contact_address_county',
      'contact_address_postcode',
      'contact_phone_number',
      'contact_mobile_phone_number',
      'contact_email_addresses',
    ],
  },
  '/edit-emergency-contact/*': {
    pageTitle: 'Emergency contact details',
    controller: editEmergencyContactsSaveAndContinue,
    template: `${__dirname}/templates/individuals-details/edit-emergency-contact-details.njk`,
    next: 'individuals-details',
    fields: [
      'emergency_contact_first_name',
      'emergency_contact_family_name',
      'emergency_contact_relationship',
      'emergency_contact_phone_number',
      'emergency_contact_mobile_phone_number',
    ],
  },
  '/remove-emergency-contact/*': {
    pageTitle: 'Remove emergency contact',
    controller: removeEmergencyContactsSaveAndContinue,
    next: 'individuals-details',
  },
  '/cultural-and-religious-adjustments': {
    pageTitle: 'Cultural and religious adjustments',
    id: 'cultual-religious-adjustments',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/cultural-and-religious-adjustments`,
    next: 'task-list#cultual-religious-adjustments',
    fields: [
      'cultural_religious_adjustment',
      'cultural_religious_adjustment_details',
      'cultural_religious_adjustment_complete',
    ],
  },
  '/placement-preferences': {
    pageTitle: 'Placement preferences',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/placement-preferences`,
    next: 'task-list',
    fields: ['placement_preference', 'placement_preferences', 'placement_preference_complete'],
  },
  '/gender-information': {
    pageTitle: 'Gender information',
    id: 'gender-information',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/gender-information`,
    next: 'task-list#gender-information',
    fields: [
      'gender_identity',
      'sex_change',
      'sex_change_details',
      'intersex_or_dsd',
      'transgender',
      'placement_preference_by_gender_complete',
    ],
  },
  '/risk-of-harm-in-the-community': {
    pageTitle: 'Risk of harm in the community',
    id: 'risk-of-harm-in-the-community',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/risk-information/risk-of-harm-in-the-community`,
    next: 'task-list#risk-of-harm-in-the-community',
    fields: [
      'history_sexual_offending',
      'history_sexual_offending_details',
      'poses_risk_to_children',
      'poses_risk_to_children_details',
      'violent_offences',
      'violent_offences_details',
      'acquisitive_offending',
      'acquisitive_offending_details',
      'sgo_identifier',
      'sgo_identifier_details',
      'control_issues',
      'control_issues_details',
      'history_of_hate_based_behaviour',
      'history_of_hate_based_behaviour_details',
      'high_profile_person',
      'high_profile_person_details',
      'additional_rosh_info',
      'additional_rosh_info_details',
      'rosh_community_complete',
    ],
  },
  '/managing-risk': {
    pageTitle: 'Managing risk',
    id: 'managing-risk',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/risk-information/managing-risk`,
    next: 'task-list#managing-risk',
    fields: [
      'location_exclusion_criteria',
      'location_exclusion_criteria_details',
      'restricted_placement',
      'restricted_placement_details',
      'no_female_supervisor',
      'no_female_supervisor_details',
      'no_male_supervisor',
      'no_male_supervisor_details',
      'restrictive_orders',
      'restrictive_orders_details',
      'risk_management_issues_individual',
      'risk_management_issues_individual_details',
      'risk_management_issues_supervised_group',
      'risk_management_issues_supervised_group_details',
      'alcohol_drug_issues',
      'alcohol_drug_issues_details',
      'managing_risk_complete',
    ],
  },
  '/modern-day-slavery-perpetrator': {
    pageTitle: 'Modern day slavery - perpetrator',
    id: 'modern-day-slavery-perpetrator',
    controller: ModernDaySlaveryPerpetrator,
    template: `${__dirname}/templates/risk-information/modern-day-slavery-perpetrator.njk`,
    next: 'task-list#modern-day-slavery-perpetrator',
    fields: [
      'modern_day_slavery_risks_perpetrator',
      'modern_day_slavery_risks_details_perpetrator',
      'modern_day_slavery_orders_perpetrator',
      'modern_day_slavery_orders_details_perpetrator',
      'modern_day_slavery_safeguarding_perpetrator',
      'modern_day_slavery_safeguarding_details_perpetrator',
      'modern_day_slavery_complete_perpetrator',
    ],
  },
  '/modern-day-slavery-victim': {
    pageTitle: 'Modern day slavery - victim',
    id: 'modern-day-slavery-victim',
    controller: ModernDaySlaveryVictim,
    template: `${__dirname}/templates/risk-information/modern-day-slavery-victim.njk`,
    next: 'task-list#modern-day-slavery-victim',
    fields: [
      'modern_day_slavery_risks_victim',
      'modern_day_slavery_risks_details_victim',
      'modern_day_slavery_safeguarding_victim',
      'modern_day_slavery_safeguarding_details_victim',
      'modern_day_slavery_complete_victim',
    ],
  },
  '/disabilities-and-mental-health': {
    pageTitle: 'Disabilities and mental health',
    id: 'disabilities-mental-health',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/disabilities-and-mental-health.njk`,
    next: 'task-list#disabilities-mental-health',
    fields: [
      'additional_disabilities',
      'additional_disabilities_details',
      'disabilities',
      'disabilities_details',
      'disabilities_complete',
    ],
  },
  '/health-issues': {
    pageTitle: 'Health issues',
    id: 'health-issues',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/health-issues.njk`,
    next: 'task-list#health-issues',
    fields: [
      'allergies',
      'allergies_details',
      'loss_consciousness',
      'loss_consciousness_details',
      'epilepsy',
      'epilepsy_details',
      'pregnancy',
      'pregnancy_pregnant_details',
      'pregnancy_recently_given_birth_details',
      'other_health_issues',
      'other_health_issues_details',
      'health_issues_complete',
    ],
  },
  '/gp-details': {
    pageTitle: 'GP Details',
    id: 'gp-details',
    controller: gpDetailsSaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/gp-details.njk`,
    next: 'task-list#gp-details',
    fields: ['gp_details_complete', 'gp_details_declined'],
  },
  '/edit-gp-details/*': {
    pageTitle: 'Details of GP',
    controller: editGpDetailsSaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/edit-gp-details.njk`,
    next: 'gp-details',
    fields: [
      'gp_first_name', // Deprecated: use gp_name instead
      'gp_family_name', // Deprecated: use gp_name instead
      'gp_name',
      'gp_practice_name',
      'gp_address_building_name',
      'gp_address_house_number',
      'gp_address_street_name',
      'gp_address_district',
      'gp_address_town_or_city',
      'gp_address_county',
      'gp_address_postcode',
      'gp_phone_number',
    ],
  },
  '/remove-gp-details/*': {
    pageTitle: 'Remove GP details',
    controller: removeGpDetailsSaveAndContinue,
    next: 'gp-details',
  },
  '/travel-information': {
    pageTitle: 'Travel',
    id: 'travel',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/travel-information.njk`,
    next: 'task-list#travel',
    fields: [
      'travel_information',
      'travel_information_details',
      'driving_licence',
      'vehicle',
      'public_transport',
      'travel_information_complete',
    ],
  },
  '/caring-commitments': {
    pageTitle: 'Caring commitments',
    id: 'caring-commitments',
    controller: CaringCommitmentsController,
    template: `${__dirname}/templates/placement-restrictions/caring-commitments.njk`,
    next: 'task-list#caring-commitments',
    fields: [
      'caring_commitments',
      'caring_commitments_details',
      'caring_commitments_complete',
      'active_carer_commitments_details',
    ],
  },
  '/employment-education-and-skills': {
    pageTitle: 'Employment, education and skills',
    id: 'employment-education-skills',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/employment-education-skills/employment-education-skills`,
    next: 'task-list#employment-education-skills',
    fields: [
      'employment_education',
      'employment_education_details_fulltime',
      'employment_education_details_parttime',
      'reading_writing_difficulties',
      'reading_writing_difficulties_details',
      'work_skills',
      'work_skills_details',
      'future_work_plans',
      'future_work_plans_details',
      'employment_education_skills_complete',
    ],
  },
  '/training-and-employment-opportunities': {
    pageTitle: 'Training & employment opportunities',
    id: 'training-employment-opportunities',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/employment-education-skills/training-employment-opportunities`,
    next: 'task-list#training-employment-opportunities',
    fields: [
      'education_training_need',
      'education_training_need_details',
      'individual_commitment',
      'individual_commitment_details',
      'employment_training_complete',
    ],
  },
  '/intensive-working': {
    pageTitle: 'Intensive working',
    id: 'intensive-working',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-details/intensive-working`,
    next: 'task-list#intensive-working',
    fields: [
      'eligibility_intensive_working',
      'eligibility_intensive_working_details',
      'recommended_hours_start_order',
      'recommended_hours_midpoint_order',
      'twenty_eight_hours_working_week_details',
      'eligibility_intensive_working_complete',
    ],
  },
  '/availability': {
    pageTitle: 'Availability',
    id: 'availability',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-details/availability`,
    next: 'task-list#availability',
    fields: ['individual_availability', 'individual_availability_details', 'individual_availability_complete'],
  },
  '/equipment': {
    pageTitle: 'Choose equipment sizes',
    id: 'equipment',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-details/equipment`,
    next: 'task-list#equipment',
    fields: ['male_female_clothing', 'waterproof_clothing', 'footwear_size', 'equipment_complete'],
  },
  '/pdf-preview': {
    pageTitle: 'Completed assessment',
    id: 'pdf-preview',
    controller: PreviewPdf,
    template: `${__dirname}/templates/pdf-preview-and-declaration/pdf-preview.njk`,
    fields: [],
    next: 'task-list#pdf-preview',
  },
  '/pdf-download': {
    pageTitle: 'PDF preview',
    controller: ConvertPdf,
    noPost: true,
    template: `${__dirname}/templates/default.njk`,
    next: 'confirmation',
  },
  '/confirmation': {
    pageTitle: 'Confirmation',
    controller: Confirmation,
    noPost: true,
    template: `${__dirname}/templates/confirmation.njk`,
  },
  '/delius-error': {
    pageTitle: 'There is a problem with the service',
    noPost: true,
    template: `${__dirname}/templates/delius-error.njk`,
  },
  '/assessment-saved': {
    pageTitle: 'Your assessment has been saved',
    noPost: true,
    template: `${__dirname}/templates/assessment-saved.njk`,
  },
  '/privacy': {
    pageTitle: 'Privacy notice',
    noPost: true,
    template: `${__dirname}/templates/privacy.njk`,
  },
  '/close-assessment': {
    pageTitle: 'Assessment closed',
    controller: CloseAssessment,
    noPost: true,
    template: `${__dirname}/templates/close-assessment.njk`,
  },
  '/cookies': {
    pageTitle: 'Cookies',
    noPost: true,
    template: `${__dirname}/templates/cookies.njk`,
  },
  '/accessibility-statement': {
    pageTitle: 'Accessibility statement for the Community Payback Assessment',
    noPost: true,
    template: `${__dirname}/templates/accessibility-statement.njk`,
  },
  '/assessment-help': {
    pageTitle: 'Community Payback assessment help',
    noPost: true,
    template: `${__dirname}/templates/assessment-help.njk`,
  },
  '/additional-info': {
    pageTitle: 'Additional information',
    noPost: true,
    template: `${__dirname}/templates/additional-info.njk`,
  },
}
