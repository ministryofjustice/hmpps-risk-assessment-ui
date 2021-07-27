const flattenCheckboxGroups = questions => {
  return questions.map(question => {
    if (question.type === 'checkboxGroup') {
      return {
        type: 'question',
        questionId: question.checkboxGroupId,
        questionCode: question.checkboxGroupCode,
        answerType: 'checkbox',
        questionText: question.title,
        displayOrder: question.displayOrder,
        mandatory: question.mandatory || true,
        readOnly: question.readOnly || false,
        conditional: question.conditional || false,
        answerSchemas: question.contents.map(({ questionId, questionText }) => ({
          value: questionId,
          text: questionText,
        })),
      }
    }

    return question
  })
}

const extractCheckboxGroupAnswers = (questions, answers) => {
  const checkboxGroups = questions.filter(question => question.type === 'checkboxGroup')

  const extractedAnswers = checkboxGroups.reduce(
    (previousAnswers, checkboxGroup) => {
      const updatedAnswers = { ...previousAnswers }
      const checkboxGroupQuestions = checkboxGroup.contents
      checkboxGroupQuestions.forEach(({ questionId, answerSchemas = [] }) => {
        const answersForThisGroup = updatedAnswers[checkboxGroup.checkboxGroupId] || []
        const [firstAnswer, secondAnswer] = answerSchemas
        updatedAnswers[questionId] = answersForThisGroup.includes(questionId) ? firstAnswer?.value : secondAnswer?.value
      })
      return updatedAnswers
    },
    { ...answers },
  )

  // Tidy up the answers and remove the checkBox group answers
  checkboxGroups.forEach(({ checkboxGroupId }) => delete extractedAnswers[checkboxGroupId])

  return extractedAnswers
}

module.exports = {
  flattenCheckboxGroups,
  extractCheckboxGroupAnswers,
}
