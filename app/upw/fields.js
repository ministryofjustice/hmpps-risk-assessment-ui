const { addSectionCompleteField } = require('./utils')

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
      type: 'required',
      message: 'Enter details',
    },
  ],
}

let fields = {
  declaration: {
    questionText: '[PLACEHOLDER]',
    questionCode: 'declaration',
    answerType: 'checkbox',
    answerSchemas: [{ text: 'Complete', value: 'COMPLETE' }],
  },
  upw_cultural_religious_adjustment: requireYesOrNo,
  upw_cultural_religious_adjustment_details: {
    dependent: { field: 'upw_cultural_religious_adjustment', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_placement_preference: requireYesOrNo,
  upw_placement_preferences: {
    dependent: { field: 'upw_placement_preference', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_placement_preference_by_gender_details: {
    ...requireEnterDetails,
  },
  upw_history_sexual_offending: requireYesOrNo,
  upw_history_sexual_offending_details: {
    dependent: { field: 'upw_history_sexual_offending', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_poses_risk_to_children: requireYesOrNo,
  upw_poses_risk_to_children_details: {
    dependent: { field: 'upw_poses_risk_to_children', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_violent_offences: requireYesOrNo,
  upw_violent_offences_details: {
    dependent: { field: 'upw_violent_offences', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_acquisitive_offending: requireYesOrNo,
  upw_acquisitive_offending_details: {
    dependent: { field: 'upw_acquisitive_offending', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_sgo_identifier: requireYesOrNo,
  upw_sgo_identifier_details: {
    dependent: { field: 'upw_sgo_identifier', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_control_issues: requireYesOrNo,
  upw_control_issues_details: {
    dependent: { field: 'upw_control_issues', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_hate_based_behaviour: requireYesOrNo,
  upw_hate_based_behaviour_details: {
    dependent: { field: 'upw_hate_based_behaviour', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_high_profile_person: requireYesOrNo,
  upw_high_profile_person_details: {
    dependent: { field: 'upw_high_profile_person', value: 'YES' },
    ...requireEnterDetails,
  },
  upw_additional_rosh_info: requireYesOrNo,
  upw_additional_rosh_info_details: {
    dependent: { field: 'upw_additional_rosh_info', value: 'YES' },
    ...requireEnterDetails,
  },
}

Array.from([
  'individuals-details',
  'cultural-and-religious-adjustments',
  'placement-preferences',
  'options-gender-identity',
  'risk-of-harm-in-the-community',
  'managing-risk',
  'disabilities-and-mental-health',
  'health-issues',
  'travel',
  'caring-commitments',
  'employment-education-and-skills',
  'training-and-employment-opportunities',
  'availability',
  'intensive-working',
  'equipment',
]).forEach(sectionName => {
  fields = addSectionCompleteField(fields, sectionName)
})

// const customValidations = (fields, answers) => {
//   return fields
// }

module.exports = {
  fields,
}
