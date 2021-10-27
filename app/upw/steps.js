const StartUpwAssessment = require('./controllers/start')
const TaskList = require('./controllers/taskList')
const BaseSaveAndContinue = require('../common/controllers/saveAndContinue')
const SaveAndContinue = require('./controllers/saveAndContinue')
const ConvertPdf = require('./controllers/convertPdf')

module.exports = {
  '/start': {
    pageTitle: 'Community payback assessment start',
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
  },
  '/individuals-details': {
    pageTitle: "Individual's details",
    controller: SaveAndContinue,
    template: `${__dirname}/templates/individuals-details/individuals-details.njk`,
    next: 'task-list',
    fields: ['upw_individual_details_complete'],
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
    controller: SaveAndContinue,
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
  '/edit-emergency-contact-details': {
    pageTitle: 'Emergency contact details',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/individuals-details/edit-emergency-contact-details.njk`,
    next: 'individuals-details',
    fields: [
      'emergency_contact_name',
      'emergency_contact_relationship',
      'emergency_contact_address_building_name',
      'emergency_contact_address_house_number',
      'emergency_contact_address_street_name',
      'emergency_contact_address_district',
      'emergency_contact_address_town_or_city',
      'emergency_contact_address_county',
      'emergency_contact_address_postcode',
      'emergency_contact_phone_number',
      'emergency_contact_mobile_phone_number',
    ],
  },
  '/cultural-and-religious-adjustments': {
    pageTitle: 'Cultural and religious adjustments',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/cultural-and-religious-adjustments`,
    next: 'task-list',
    fields: [
      'upw_cultural_religious_adjustment',
      'upw_cultural_religious_adjustment_details',
      'upw_cultural_religious_adjustment_complete',
    ],
  },
  '/placement-preferences': {
    pageTitle: 'Placement preferences',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/placement-preferences`,
    next: 'task-list',
    fields: ['upw_placement_preference', 'upw_placement_preferences', 'upw_placement_preference_complete'],
  },
  '/options-gender-identity': {
    pageTitle: 'Discuss options based on gender identity',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/options-gender-identity`,
    next: 'task-list',
    fields: ['upw_placement_preference_by_gender_details', 'upw_placement_preference_by_gender_complete'],
  },
  '/risk-of-harm-in-the-community': {
    pageTitle: 'Risk of harm in the community',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/risk-information/risk-of-harm-in-the-community`,
    next: 'task-list',
    fields: [
      'upw_history_sexual_offending',
      'upw_history_sexual_offending_details',
      'upw_poses_risk_to_children',
      'upw_poses_risk_to_children_details',
      'upw_violent_offences',
      'upw_violent_offences_details',
      'upw_acquisitive_offending',
      'upw_acquisitive_offending_details',
      'upw_sgo_identifier',
      'upw_sgo_identifier_details',
      'upw_control_issues',
      'upw_control_issues_details',
      'upw_hate_based_behaviour',
      'upw_hate_based_behaviour_details',
      'upw_high_profile_person',
      'upw_high_profile_person_details',
      'upw_additional_rosh_info',
      'upw_additional_rosh_info_details,',
      'upw_rosh_community_complete',
    ],
  },
  '/managing-risk': {
    pageTitle: 'Managing risk',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/risk-information/managing-risk`,
    next: 'task-list',
    fields: [
      'upw_location_exclusion_criteria',
      'upw_location_exclusion_criteria_details',
      'upw_restricted_placement',
      'upw_restricted_placement_details',
      'upw_no_female_supervisor',
      'upw_no_female_supervisor_details',
      'upw_no_male_supervisor',
      'upw_no_male_supervisor_details',
      'upw_restrictive_orders',
      'upw_restrictive_orders_details',
      'upw_risk_management_issues_individual',
      'upw_risk_management_issues_individual_details',
      'upw_risk_management_issues_supervised_group',
      'upw_risk_management_issues_supervised_group_details',
      'upw_alcohol_drug_issues',
      'upw_alcohol_drug_issues_details',
      'upw_managing_risk_complete',
    ],
  },
  '/disabilities-and-mental-health': {
    pageTitle: 'Disabilities and mental health',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/disabilities-and-mental-health.njk`,
    next: 'task-list',
    fields: ['upw_disabilities', 'upw_disabilities_details', 'upw_disabilities_complete'],
  },
  '/health-issues': {
    pageTitle: 'Are there any other health issues that may affect ability to work?',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/health-issues.njk`,
    next: 'task-list',
    fields: [
      'upw_allergies',
      'upw_allergies_details',
      'upw_loss_consciousness',
      'upw_loss_consciousness_details',
      'upw_epilepsy',
      'upw_epilepsy_details',
      'upw_other_health_issues',
      'upw_other_health_issues_details',
      'upw_pregnancy',
      'upw_pregnancy_details',
      'upw_health_issues_complete',
    ],
  },
  '/gp-details': {
    pageTitle: 'GP Details',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/gp-details.njk`,
    next: 'task-list',
    fields: ['upw_gp_details_complete'],
  },
  '/edit-gp-details': {
    pageTitle: 'Details of GP',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/edit-gp-details.njk`,
    next: 'gp-details',
    fields: [
      'upw_gp_name',
      'upw_gp_address_building_name',
      'upw_gp_address_house_number',
      'upw_gp_address_street_name',
      'upw_gp_address_district',
      'upw_gp_address_town_or_city',
      'upw_gp_address_county',
      'upw_gp_address_postcode',
      'upw_gp_phone_number',
    ],
  },
  '/travel-information': {
    pageTitle: 'Travel information',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/travel-information.njk`,
    next: 'task-list',
    fields: [
      'upw_travel_information',
      'upw_travel_information_details',
      'upw_driving_licence',
      'upw_vehicle',
      'upw_public_transport',
      'upw_travel_information_complete',
    ],
  },
  '/caring-commitments': {
    pageTitle: 'Caring commitments',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/caring-commitments.njk`,
    next: 'task-list',
    fields: ['upw_caring_commitments', 'upw_caring_commitments_details', 'upw_caring_commitments_complete'],
  },
  '/employment-education-and-skills': {
    pageTitle: 'Employment, education and skills',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/employment-education-skills/employment-education-skills`,
    next: 'task-list',
    fields: [
      'upw_employment_education',
      'upw_employment_education_details_fulltime',
      'upw_employment_education_details_parttime',
      'upw_reading_writing_difficulties',
      'upw_reading_writing_difficulties_details',
      'upw_work_skills',
      'upw_work_skills_details',
      'upw_future_work_plans',
      'upw_future_work_plans_details',
      'upw_employment_education_skills_complete',
    ],
  },
  '/training-and-employment-opportunities': {
    pageTitle: 'Training & employment opportunities',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/employment-education-skills/training-employment-opportunities`,
    next: 'task-list',
    fields: [
      'upw_education_training_need',
      'upw_education_training_need_details',
      'upw_individual_commitment',
      'upw_individual_commitment_details',
      'upw_employment_training_complete',
    ],
  },
  '/intensive-working': {
    pageTitle: 'Intensive working',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-details/intensive-working`,
    next: 'task-list',
    fields: [
      'upw_eligibility_intensive_working',
      'upw_eligibility_intensive_working_details',
      'upw_recommended_hours_start_order',
      'upw_recommended_hours_midpoint_order',
      'upw_twenty_eight_hours_working_week_details',
      'upw_eligibility_intensive_working_complete',
    ],
  },
  '/availability': {
    pageTitle: 'Availability for Community Payback work',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-details/availability`,
    next: 'task-list',
    fields: [
      'upw_individual_availability',
      'upw_individual_availability_details',
      'upw_individual_availability_complete',
    ],
  },
  '/equipment': {
    pageTitle: 'Equipment',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-details/equipment`,
    next: 'task-list',
    fields: ['upw_male_female_clothing', 'upw_waterproof_clothing', 'upw_footwear_size', 'upw_equipment_complete'],
  },
  '/pdf-preview-and-declaration': {
    pageTitle: 'PDF preview and declaration',
    controller: BaseSaveAndContinue,
    template: `${__dirname}/templates/default`,
    fields: ['declaration'],
    next: 'task-list',
  },
  '/pdf-preview': {
    pageTitle: 'PDF preview',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/pdf-preview-and-declaration/pdf-preview.njk`,
    fields: [],
    next: 'pdf-preview-and-declaration',
  },
  '/pdf-download': {
    pageTitle: 'PDF preview',
    controller: ConvertPdf,
    noPost: true,
    template: `${__dirname}/templates/default.njk`,
    next: 'pdf-preview-and-declaration',
  },
}
