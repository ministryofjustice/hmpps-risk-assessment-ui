const StartUpwAssessment = require('./controllers/start')
const TaskList = require('./controllers/taskList')
const BaseSaveAndContinue = require('../common/controllers/saveAndContinue')
const SaveAndContinue = require('./controllers/saveAndContinue')

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
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: ['section-complete-individuals-details'],
  },
  '/cultural-and-religious-adjustments': {
    pageTitle: 'Cultural and religious adjustments',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/cultural-and-religious-adjustments.njk`,
    next: 'task-list',
    fields: [
      'upw_cultural_religious_adjustment',
      'upw_cultural_religious_adjustment_details',
      'section-complete-cultural-and-religious-adjustments',
    ],
  },
  '/placement-preferences': {
    pageTitle: 'Placement preferences',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/placement-preferences.njk`,
    next: 'task-list',
    fields: ['upw_placement_preference', 'upw_placement_preferences', 'section-complete-placement-preferences'],
  },
  '/options-gender-identity': {
    pageTitle: 'Discuss options based on gender identity',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/diversity-information/options-gender-identity.njk`,
    next: 'task-list',
    fields: ['upw_placement_preference_by_gender_details', 'section-complete-options-gender-identity'],
  },
  '/risk-of-harm-in-the-community': {
    pageTitle: 'Risk of harm in the community',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/risk-information/risk-of-harm-in-the-community.njk`,
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
      'section-complete-risk-of-harm-in-the-community',
    ],
  },
  '/managing-risk': {
    pageTitle: 'Managing risk',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/risk-information/managing-risk.njk`,
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
      'section-complete-managing-risk',
    ],
  },
  '/disabilities-and-mental-health': {
    pageTitle: 'Disabilities and mental health',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/disabilities-and-mental-health.njk`,
    next: 'task-list',
    fields: ['upw_disabilities', 'upw_disabilities_details', 'section-complete-disabilities-and-mental-health'],
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
      'section-complete-health-issues',
    ],
  },
  '/gp-details': {
    pageTitle: 'GP Details',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/gp-details.njk`,
    next: 'task-list',
    fields: ['section-complete-gp-details'],
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
      'section-complete-travel-information',
    ],
  },
  '/caring-commitments': {
    pageTitle: 'Caring commitments',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/placement-restrictions/caring-commitments.njk`,
    next: 'task-list',
    fields: ['upw_caring_commitments', 'upw_caring_commitments_details', 'section-complete-caring-commitments'],
  },
  '/employment-education-and-skills': {
    pageTitle: 'Employment, education and skills',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: ['section-complete-employment-education-and-skills'],
  },
  '/training-and-employment-opportunities': {
    pageTitle: 'Training and employment opportunities',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: ['section-complete-training-and-employment-opportunities'],
  },
  '/availability': {
    pageTitle: 'Availability',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: ['section-complete-availability'],
  },
  '/intensive-working': {
    pageTitle: 'Intensive working',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: ['section-complete-intensive-working'],
  },
  '/equipment': {
    pageTitle: 'Equipment',
    controller: SaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: ['section-complete-equipment'],
  },
  '/pdf-preview-and-declaration': {
    pageTitle: 'PDF preview and declaration',
    controller: BaseSaveAndContinue,
    template: `${__dirname}/templates/default`,
    fields: ['declaration'],
    next: 'task-list',
  },
}
