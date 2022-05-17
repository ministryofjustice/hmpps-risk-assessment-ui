const mapExistingAnswersForMultipleEntries = answers => {
  const gpDetails = answers.gp_details || []
  const updatedGpDetails = gpDetails.map(mapExistingAnswersToNewFields)
  return {
    ...answers,
    gp_details: updatedGpDetails,
  }
}

const mapExistingAnswersToNewFields = answers => ({
  ...answers,
  gp_name: `${answers.gp_first_name} ${answers.gp_family_name}`,
})

const unsetDeprecatedAnswers = answers => ({
  ...answers,
  gp_first_name: '',
  gp_family_name: '',
})

const updateAnswersWith = (session, fn) => {
  const answers = session.get('answers')
  const rawAnswers = session.get('rawAnswers')

  session.set('answers', fn(answers))
  session.set('rawAnswers', fn(rawAnswers))
}

module.exports = {
  mapExistingAnswersToNewFields,
  unsetDeprecatedAnswers,
  mapExistingAnswersForMultipleEntries,
  updateAnswersWith,
}
