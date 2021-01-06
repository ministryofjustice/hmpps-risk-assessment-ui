const nunjucks = require('nunjucks')
const { logger } = require('../../common/logging/logger')
const { getQuestionGroup, getAnswers } = require('../../common/data/assessmentApi')

const displayQuestionGroup = async ({ params: { assessmentId, groupId, subgroup }, tokens }, res) => {
  try {
    const questionGroup = await grabQuestionGroup(groupId, tokens)
    const subIndex = Number.parseInt(subgroup, 10)

    if (subIndex >= questionGroup.contents.length) {
      return res.redirect(`/${assessmentId}/assessments`)
    }
    if (questionGroup.groupId !== groupId) {
      return res.redirect(`/${assessmentId}/questionGroup/${questionGroup.groupId}/${subIndex}`)
    }

    const { answers } = await grabAnswers(assessmentId, 'current', tokens)
    const questions = annotateWithAnswers(questionGroup.contents[subIndex].contents, answers)

    return res.render(`${__dirname}/index`, {
      assessmentId,
      heading: questionGroup.title,
      subheading: questionGroup.contents[subIndex].title,
      groupId,
      questions,
      last: subIndex + 1 === questionGroup.contents.length,
    })
  } catch (error) {
    return res.render('app/error', { error })
  }
}

const grabQuestionGroup = (groupId, tokens) => {
  try {
    return getQuestionGroup(groupId, tokens)
  } catch (error) {
    logger.error(`Could not retrieve question group for ${groupId}, error: ${error}`)
    throw error
  }
}

const grabAnswers = (assessmentId, episodeId, tokens) => {
  try {
    return getAnswers(assessmentId, episodeId, tokens)
  } catch (error) {
    logger.error(`Could not retrieve answers for assessment ${assessmentId} episode ${episodeId}, error: ${error}`)
    throw error
  }
}

const annotateWithAnswers = (questions, answers) => {
  return questions.map(q => {
    const answer = answers[q.questionId]
    const answerValue = answer ? answer.freeTextAnswer : null
    return Object.assign(q, {
      answer: answerValue,
      answerSchemas: annotateAnswerSchemas(q.answerSchemas, answerValue),
    })
  })
}

const annotateAnswerSchemaConditionals = answerSchemas => {
  return answerSchemas.map(schema => {
    if (schema.conditional) {
      const condQuestion = {
        type: 'question',
        questionId: 'conditional-question-id-1111111',
        questionCode: 'Further information',
        answerType: 'textarea',
        questionText: 'Further information',
        displayOrder: '1',
        mandatory: 'no',
        conditional: 'yes',
        answerSchemas: [],
        answer: null,
      }

      let conditionalQuestionString =
        '{% from "./common/templates/components/question/macro.njk" import renderQuestion %} \n'
      conditionalQuestionString += `{{ renderQuestion(${JSON.stringify(condQuestion)}) }}`

      console.log(conditionalQuestionString)

      const updatedSchema = schema
      updatedSchema.conditional = { html: nunjucks.renderString(conditionalQuestionString) }
      return updatedSchema
    }
    return schema
  })
}

const annotateAnswerSchemas = (answerSchemas, answerValue) => {
  const answerSchemaConditionals = annotateAnswerSchemaConditionals(answerSchemas)

  if (answerValue === null) {
    return answerSchemaConditionals
  }

  return answerSchemaConditionals.map(as =>
    Object.assign(as, {
      checked: as.value === answerValue,
      selected: as.value === answerValue,
    }),
  )
}

module.exports = { displayQuestionGroup }
