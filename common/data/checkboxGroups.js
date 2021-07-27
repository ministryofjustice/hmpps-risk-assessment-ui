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

module.exports = {
  flattenCheckboxGroups,
}
