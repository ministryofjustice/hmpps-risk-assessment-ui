const { range, noSpace, onePresent } = require('../../common/middleware/form-wizard-validators/validators')

// const customValidationsEditEmergencyContact = (fields, emergencyContactPhoneNumber, emergencyContactMobileNumber) => {
//   fields.emergency_contact_phone_number?.validate.push({
//     fn: onePresent,
//     arguments: [emergencyContactMobileNumber],
//     message: 'A phone number is required',
//   })
//   fields.emergency_contact_mobile_phone_number?.validate.push({
//     fn: onePresent,
//     arguments: [emergencyContactPhoneNumber],
//     message: 'A phone number is required',
//   })
//
//   return fields
// }

// const customValidationsEditGpDetails = (fields, emergencyContactPhoneNumber, emergencyContactMobileNumber) => {
//   fields.emergency_contact_phone_number?.validate.push({
//     fn: onePresent,
//     arguments: [emergencyContactMobileNumber],
//     message: 'A phone number is required',
//   })
//   fields.emergency_contact_mobile_phone_number?.validate.push({
//     fn: onePresent,
//     arguments: [emergencyContactPhoneNumber],
//     message: 'A phone number is required',
//   })
//
//   return fields
// }

const customValidationsEditContactDetails = (
  fields,
  contactPhoneNumber,
  contactMobileNumber,
  contactAddressBuildingName,
  contactAddressHouseNumber,
) => {
  fields.contact_phone_number?.validate.push({
    fn: onePresent,
    arguments: [contactMobileNumber],
    message: 'You must provide details for Mobile or Phone number',
  })
  fields.contact_mobile_phone_number?.validate.push({
    fn: onePresent,
    arguments: [contactPhoneNumber],
    message: 'You must provide details for Mobile or Phone number',
  })
  fields.contact_address_building_name?.validate.push({
    fn: onePresent,
    arguments: [contactAddressHouseNumber],
    message: 'You must provide details for Building name or House number',
  })
  fields.contact_address_house_number?.validate.push({
    fn: onePresent,
    arguments: [contactAddressBuildingName],
    message: 'You must provide details for Building name or House number',
  })

  return fields
}

const requireSelectOption = {
  validate: [
    {
      type: 'required',
      message: 'Select an option',
    },
  ],
}

const requireYesOrNo = {
  validate: [
    {
      type: 'required',
      message: 'Select yes or no',
    },
  ],
}

const requireEnterDetails = {
  validate: [
    {
      fn: noSpace,
      message: 'Enter details',
    },
    {
      type: 'required',
      message: 'Enter details',
    },
  ],
}

const readOnly = { readOnly: true }

const fields = {
  declaration: {
    questionText: '[PLACEHOLDER]',
    questionCode: 'declaration',
    answerType: 'checkbox',
    answerSchemas: [{ text: 'Complete', value: 'COMPLETE' }],
  },
  first_name_aliases: {
    answerType: 'textarea',
  },
  family_name_aliases: {
    answerType: 'textarea',
  },
  gender_identity: {
    validate: [{ type: 'required', message: 'Select a Gender Identity option' }],
  },
  sex_change: requireYesOrNo,
  sex_change_details: {
    dependent: { field: 'sex_change', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of gender identity and relevant placement options discussed with the individual.',
        },
      ],
    },
  },
  intersex_or_dsd: {
    validate: [
      {
        type: 'required',
        message:
          'Is the individual intersex or do they have a Difference in Sexual Development (DSD)? Select Yes or No',
      },
    ],
  },
  transgender: {
    validate: [
      {
        type: 'required',
        message: 'Do they consider themselves to be transgender or have a transgender history? Select Yes or No',
      },
    ],
  },
  contact_address_building_name: {},
  contact_address_house_number: {},
  contact_address_street_name: {
    validate: [{ type: 'required', message: 'Street name is required' }],
  },
  contact_address_district: {},
  contact_address_town_or_city: {
    validate: [{ type: 'required', message: 'Town/City is required' }],
  },
  contact_address_county: {},
  contact_address_postcode: {
    validate: [{ type: 'required', message: 'Postcode is required' }],
  },
  contact_phone_number: {},
  contact_mobile_phone_number: {},
  contact_email_addresses: {
    validate: [{ type: 'required', message: 'Email address is required' }],
  },
  emergency_contact_first_name: {
    validate: [{ type: 'required', message: 'First name is required' }],
  },
  emergency_contact_family_name: {
    validate: [{ type: 'required', message: 'Family name is required' }],
  },
  emergency_contact_relationship: {
    validate: [{ type: 'required', message: 'Emergency contact relationship is required' }],
  },
  emergency_contact_phone_number: {
    validate: [{ type: 'required', message: 'Phone number is required' }],
  },
  emergency_contact_mobile_phone_number: {
    validate: [{ type: 'required', message: 'Mobile phone number is required' }],
  },
  cultural_religious_adjustment: {
    validate: [
      { type: 'required', message: 'Are adjustments required for cultural or religious reasons? Select Yes or No' },
    ],
  },
  cultural_religious_adjustment_details: {
    dependent: { field: 'cultural_religious_adjustment', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the adjustments required for cultural or religious reasons',
        },
      ],
    },
  },
  placement_preference: requireYesOrNo,
  placement_preferences: {
    dependent: { field: 'placement_preference', value: 'YES' },
    ...requireSelectOption,
  },
  placement_preference_by_gender_details: {
    ...requireEnterDetails,
  },
  history_sexual_offending: {
    validate: [
      {
        type: 'required',
        message: 'Is there a history of sexual offending? Select Yes or No',
      },
    ],
  },
  history_sexual_offending_details: {
    dependent: { field: 'history_sexual_offending', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the sexual offending',
        },
      ],
    },
  },
  poses_risk_to_children: {
    validate: [
      {
        type: 'required',
        message: 'Does the individual pose a risk to children? Select Yes or No',
      },
    ],
  },
  poses_risk_to_children_details: {
    dependent: { field: 'poses_risk_to_children', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the risk posed to children',
        },
      ],
    },
  },
  violent_offences: {
    validate: [
      {
        type: 'required',
        message: 'Is there a history of violent offences? Select Yes or No',
      },
    ],
  },
  violent_offences_details: {
    dependent: { field: 'violent_offences', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the violent offences',
        },
      ],
    },
  },
  acquisitive_offending: {
    validate: [
      {
        type: 'required',
        message: 'Is there a history of acquisitive offending? Select Yes or No',
      },
    ],
  },
  acquisitive_offending_details: {
    dependent: { field: 'acquisitive_offending', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the acquisitive offending',
        },
      ],
    },
  },
  sgo_identifier: {
    validate: [
      {
        type: 'required',
        message: 'Has the individual been involved in serious group offending? Select Yes or No',
      },
    ],
  },
  sgo_identifier_details: {
    dependent: { field: 'sgo_identifier', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the serious group offending (SGO)',
        },
      ],
    },
  },
  control_issues: {
    validate: [
      {
        type: 'required',
        message: 'Has the individual had control issues or disruptive behaviour? Select Yes or No',
      },
    ],
  },
  control_issues_details: {
    dependent: { field: 'control_issues', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the control issues or disruptive behaviour',
        },
      ],
    },
  },
  history_of_hate_based_behaviour: {
    validate: [
      {
        type: 'required',
        message: 'Does the individual have a history of hate-based attitudes or behaviours? Select Yes or No',
      },
    ],
  },
  history_of_hate_based_behaviour_details: {
    dependent: { field: 'history_of_hate_based_behaviour', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter details of the hate-based attitudes or behaviours',
        },
      ],
    },
  },
  high_profile_person: {
    validate: [
      {
        type: 'required',
        message: 'Is the individual vulnerable because they are a high-profile person? Select Yes or No',
      },
    ],
  },
  high_profile_person_details: {
    dependent: { field: 'high_profile_person', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: "Enter details of the individual's vulnerabilities",
        },
      ],
    },
  },
  additional_rosh_info: {
    validate: [
      {
        type: 'required',
        message: 'Is there additional risk assessment information relevant to Community Payback? Select Yes or No',
      },
    ],
  },
  additional_rosh_info_details: {
    dependent: { field: 'additional_rosh_info', value: 'YES' },
    ...{
      validate: [
        {
          type: 'required',
          message: 'Enter additional risk assessment information',
        },
      ],
    },
  },
  location_exclusion_criteria: requireYesOrNo,
  location_exclusion_criteria_details: {
    dependent: { field: 'location_exclusion_criteria', value: 'YES' },
    ...requireEnterDetails,
  },
  restricted_placement: requireYesOrNo,
  restricted_placement_details: {
    dependent: { field: 'restricted_placement', value: 'YES' },
    ...requireEnterDetails,
  },
  no_female_supervisor: requireYesOrNo,
  no_female_supervisor_details: {
    dependent: { field: 'no_female_supervisor', value: 'YES' },
    ...requireEnterDetails,
  },
  no_male_supervisor: requireYesOrNo,
  no_male_supervisor_details: {
    dependent: { field: 'no_male_supervisor', value: 'YES' },
    ...requireEnterDetails,
  },
  restrictive_orders: requireYesOrNo,
  restrictive_orders_details: {
    dependent: { field: 'restrictive_orders', value: 'YES' },
    ...requireEnterDetails,
  },
  risk_management_issues_individual: requireYesOrNo,
  risk_management_issues_individual_details: {
    dependent: { field: 'risk_management_issues_individual', value: 'YES' },
    ...requireEnterDetails,
  },
  risk_management_issues_supervised_group: requireYesOrNo,
  risk_management_issues_supervised_group_details: {
    dependent: { field: 'risk_management_issues_supervised_group', value: 'YES' },
    ...requireEnterDetails,
  },
  alcohol_drug_issues: requireYesOrNo,
  alcohol_drug_issues_details: {
    dependent: { field: 'alcohol_drug_issues', value: 'YES' },
    ...requireEnterDetails,
  },
  physical_disability: readOnly,
  physical_disability_details: readOnly,
  learning_disability: readOnly,
  learning_disability_details: readOnly,
  learning_difficulty: readOnly,
  learning_difficulty_details: readOnly,
  mental_health_condition: readOnly,
  mental_health_condition_details: readOnly,
  disabilities: requireYesOrNo,
  disabilities_details: {
    dependent: { field: 'disabilities', value: 'YES' },
  },
  allergies: requireYesOrNo,
  allergies_details: {
    dependent: { field: 'allergies', value: 'YES' },
    ...requireEnterDetails,
  },
  loss_consciousness: requireYesOrNo,
  loss_consciousness_details: {
    dependent: { field: 'loss_consciousness', value: 'YES' },
    ...requireEnterDetails,
  },
  epilepsy: requireYesOrNo,
  epilepsy_details: {
    dependent: { field: 'epilepsy', value: 'YES' },
    ...requireEnterDetails,
  },
  pregnancy: requireYesOrNo,
  pregnancy_pregnant_details: {
    dependent: { field: 'pregnancy', value: 'PREGNANT' },
    ...requireEnterDetails,
  },
  pregnancy_recently_given_birth_details: {
    dependent: { field: 'pregnancy', value: 'RECENTLY_GIVEN_BIRTH' },
    ...requireEnterDetails,
  },
  other_health_issues: requireYesOrNo,
  other_health_issues_details: {
    dependent: { field: 'other_health_issues', value: 'YES' },
    ...requireEnterDetails,
  },
  gp_first_name: {
    validate: [{ type: 'required', message: 'First name is required' }],
  },
  gp_family_name: {
    validate: [{ type: 'required', message: 'Family name is required' }],
  },
  gp_address_building_name: {},
  gp_address_house_number: {},
  gp_address_street_name: {
    validate: [{ type: 'required', message: 'Street name is required' }],
  },
  gp_address_district: {
    validate: [{ type: 'required', message: 'District is required' }],
  },
  gp_address_town_or_city: {
    validate: [{ type: 'required', message: 'Town/City is required' }],
  },
  gp_address_county: {
    validate: [{ type: 'required', message: 'County is required' }],
  },
  gp_address_postcode: {
    validate: [{ type: 'required', message: 'Postcode is required' }],
  },
  gp_phone_number: {
    validate: [{ type: 'required', message: 'Phone number is required' }],
  },
  travel_information: requireYesOrNo,
  travel_information_details: {
    dependent: { field: 'travel_information', value: 'YES' },
    ...requireEnterDetails,
  },
  driving_licence: {
    dependent: { field: 'travel_information', value: 'YES' },
    ...requireYesOrNo,
  },
  vehicle: {
    dependent: { field: 'travel_information', value: 'YES' },
    ...requireYesOrNo,
  },
  public_transport: {
    dependent: { field: 'travel_information', value: 'YES' },
    ...requireYesOrNo,
  },
  caring_commitments: requireYesOrNo,
  caring_commitments_details: {
    dependent: { field: 'caring_commitments', value: 'YES' },
    ...requireEnterDetails,
  },
  employment_education: {
    validate: [
      {
        type: 'required',
        message: 'Select an option',
      },
    ],
  },
  employment_education_details_fulltime: {
    dependent: { field: 'employment_education', value: 'FULLTIME_EDUCATION_EMPLOYMENT' },
    ...requireEnterDetails,
  },
  employment_education_details_parttime: {
    dependent: { field: 'employment_education', value: 'PARTTIME_EDUCATION_EMPLOYMENT' },
    ...requireEnterDetails,
  },
  reading_writing_difficulties: requireYesOrNo,
  reading_writing_difficulties_details: {
    dependent: { field: 'reading_writing_difficulties', value: 'YES' },
    ...requireEnterDetails,
  },
  work_skills: requireYesOrNo,
  work_skills_details: {
    dependent: { field: 'work_skills', value: 'YES' },
    ...requireEnterDetails,
  },
  future_work_plans: requireYesOrNo,
  future_work_plans_details: {
    dependent: { field: 'future_work_plans', value: 'YES' },
    ...requireEnterDetails,
  },
  education_training_need: requireYesOrNo,
  education_training_need_details: {
    dependent: { field: 'education_training_need', value: 'YES' },
    ...requireEnterDetails,
  },
  individual_commitment: {
    dependent: { field: 'education_training_need', value: 'YES' },
    ...requireYesOrNo,
  },
  individual_commitment_details: {
    dependent: { field: 'individual_commitment', value: 'YES' },
    ...requireEnterDetails,
  },
  eligibility_intensive_working: requireYesOrNo,
  eligibility_intensive_working_details: {
    dependent: { field: 'eligibility_intensive_working', value: 'NO' },
    ...requireEnterDetails,
  },
  recommended_hours_start_order: {
    dependent: { field: 'eligibility_intensive_working', value: 'YES' },
    validate: [
      {
        type: 'required',
        message: 'Enter a number between 0 and 21',
      },
      {
        fn: noSpace,
        message: 'Enter a number between 0 and 21',
      },
      {
        fn: range,
        arguments: [0, 21],
        message: 'Enter a number between 0 and 21',
      },
    ],
  },
  recommended_hours_midpoint_order: {
    dependent: { field: 'eligibility_intensive_working', value: 'YES' },
    validate: [
      {
        type: 'required',
        message: 'Enter a number between 0 and 21',
      },
      {
        fn: noSpace,
        message: 'Enter a number between 0 and 21',
      },
      {
        fn: range,
        arguments: [0, 21],
        message: 'Enter a number between 0 and 21',
      },
    ],
  },
  twenty_eight_hours_working_week_details: {
    dependent: { field: 'eligibility_intensive_working', value: 'YES' },
    ...requireEnterDetails,
  },
  individual_availability: requireSelectOption,
  individual_availability_details: {},
  male_female_clothing: requireSelectOption,
  waterproof_clothing: requireSelectOption,
  footwear_size: requireSelectOption,
  individual_details_complete: requireSelectOption,
  cultural_religious_adjustment_complete: {
    validate: [
      {
        type: 'required',
        message: 'Select Yes I have completed this section or No I have not completed and will come back later',
      },
    ],
  },
  placement_preference_complete: requireSelectOption,
  placement_preference_by_gender_complete: {
    validate: [
      {
        type: 'required',
        message: 'Select Yes I have completed this section or No I have not completed and will come back later',
      },
    ],
  },
  rosh_community_complete: {
    validate: [
      {
        type: 'required',
        message: 'Select Yes I have completed this section or No I have not completed and will come back later',
      },
    ],
  },
  managing_risk_complete: requireSelectOption,
  disabilities_complete: requireSelectOption,
  health_issues_complete: requireSelectOption,
  gp_details_complete: requireSelectOption,
  travel_information_complete: requireSelectOption,
  caring_commitments_complete: requireSelectOption,
  employment_education_skills_complete: requireSelectOption,
  employment_training_complete: requireSelectOption,
  eligibility_intensive_working_complete: requireSelectOption,
  individual_availability_complete: requireSelectOption,
  equipment_complete: requireSelectOption,
  declaration_confirmation: {},
}

// const customValidations = (fields, answers) => {
//   return fields
// }

module.exports = {
  fields,
  // customValidationsEditEmergencyContact,
  // customValidationsEditGpDetails,
  customValidationsEditContactDetails,
}
