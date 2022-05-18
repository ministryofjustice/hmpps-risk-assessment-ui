const mapExistingAnswersForMultipleEntries = answers => {
  const gpDetails = answers.gp_details || []
  const updatedGpDetails = gpDetails.map(mapExistingAnswersToNewFields)
  return {
    ...answers,
    gp_details: updatedGpDetails,
  }
}

const formatFullName = (firstName = '', familyName = '') => `${firstName} ${familyName}`.trim()

const mapExistingAnswersToNewFields = answers => ({
  ...answers,
  gp_name: [formatFullName(answers.gp_first_name, answers.gp_family_name)],
})

const unsetDeprecatedAnswers = answers => {
  return {
    ...answers,
    gp_details: (answers.gp_details || []).map(e => ({
      ...e,
      gp_first_name: [],
      gp_family_name: [],
    })),
    gp_first_name: [],
    gp_family_name: [],
  }
}

module.exports = {
  mapExistingAnswersToNewFields,
  unsetDeprecatedAnswers,
  mapExistingAnswersForMultipleEntries,
}
