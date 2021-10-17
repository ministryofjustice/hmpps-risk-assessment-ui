const { addSectionCompleteField } = require('./utils')
const { validDate, notInFuture } = require('../../common/middleware/form-wizard-validators/validators')

let fields = {
  declaration: {
    questionText: '[PLACEHOLDER]',
    questionCode: 'declaration',
    answerType: 'checkbox',
    answerSchemas: [{ text: 'Complete', value: 'COMPLETE' }],
  },
}

Array.from([
  'individuals-details',
  'cultural-and-religious-adjustments',
  'placement-preferences',
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
  upw_cultural_religious_adjustment: {
    validate: [
      {
        type: 'required',
        message: 'Select yes or no',
      },
    ],
  },
  upw_cultural_religious_adjustment_details: {
    dependent: { field: 'upw_cultural_religious_adjustment', value: 'YES' },
    validate: [
      {
        type: 'required',
        message: 'Select yes or no',
      },
    ],
  },
  // customValidations,
}
