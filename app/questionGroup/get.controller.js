// @ts-check
const {
  annotateWithAnswers,
  compileInlineConditionalQuestions,
  grabAnswers,
} = require('../../common/question-groups/get-question-groups')
const questionResponse = require('../../wiremock/responses/questionResponse')

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

const displayQuestionGroup = async (
  { params: { assessmentId, groupId, subgroup }, body, errors = {}, errorSummary = null, user },
  res,
) => {
  try {
    const { questionGroup } = res.locals
    const subIndex = Number.parseInt(subgroup, 10)

    const { answers, episodeUuid } = await grabAnswers(assessmentId, 'current', user?.token, user?.id)

    res.locals.assessmentUuid = assessmentId
    res.locals.episodeUuid = episodeUuid

    let questions = annotateWithAnswers(questionGroup.contents, answers, body)
    questions = flattenCheckboxGroups(questions)
    questions = compileInlineConditionalQuestions(questions, errors)

    return res.render(`${__dirname}/index`, {
      bodyAnswers: { ...body },
      assessmentId,
      heading: questionGroup.title,
      subheading: questionGroup.contents[subIndex]?.title,
      groupId,
      questions,
      errors,
      errorSummary,
    })
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = { displayQuestionGroup, flattenCheckboxGroups }
