/* eslint-disable no-param-reassign */
const { body } = require('express-validator')
const { logger } = require('../../common/logging/logger')
const { displayQuestionGroup, grabQuestionGroup } = require('./get.controller')
const { postAnswers } = require('../../common/data/assessmentApi')
const { dynamicMiddleware } = require('../../common/utils/util')

const constructValidationRule = (questionId, validationType, validationSettings) => {
  switch (validationType) {
    case 'mandatory':
      return body(questionId)
        .isLength({ min: 1 })
        .withMessage({ error: validationSettings.errorMessage, errorSummary: validationSettings.errorSummary })
    default:
      return ''
  }
}

const validationRules = async (req, res, next) => {
  const {
    params: { groupId },
    tokens,
  } = req
  const questionGroup = await grabQuestionGroup(groupId, tokens)

  const validatorsToSend = []

  questionGroup.contents[0].contents.forEach(question => {
    if (question.validation) {
      const validation = JSON.parse(question.validation)
      if (validation) {
        Object.entries(validation).forEach(([validationType, feedback]) => {
          validatorsToSend.push(constructValidationRule(`id-${question.questionId}`, validationType, feedback))
        })
      }
    }
  })

  await dynamicMiddleware(validatorsToSend, req, res, next)
}

const saveQuestionGroup = async (req, res) => {
  const {
    params: { assessmentId, groupId, subgroup },
    body: reqBody,
    tokens,
    errors,
  } = req
  if (errors) {
    return displayQuestionGroup(req, res)
  }

  try {
    const dateKeys = findDateAnswerKeys(reqBody)

    dateKeys.forEach(key => {
      const dateKey = key.replace(/-day$/, '')
      let constructedDate = ''
      if (reqBody[`${dateKey}-year`] && reqBody[`${dateKey}-month`] && reqBody[`${dateKey}-day`]) {
        constructedDate = new Date(
          `${reqBody[`${dateKey}-year`]}-${reqBody[`${dateKey}-month`]}-${reqBody[`${dateKey}-day`]}`,
        ).toISOString()
      }

      reqBody[dateKey] = constructedDate
      delete reqBody[`${dateKey}-year`]
      delete reqBody[`${dateKey}-month`]
      delete reqBody[`${dateKey}-day`]
    })
    const answers = extractAnswers(reqBody)

    await postAnswers(assessmentId, 'current', answers, tokens)

    const subIndex = Number.parseInt(subgroup, 10)
    return res.redirect(`/${assessmentId}/questionGroup/${groupId}/${subIndex + 1}`)
  } catch (error) {
    logger.error(`Could not save to assessment ${assessmentId}, current episode, error: ${error}`)
    return res.render('app/error', { error })
  }
}

function findDateAnswerKeys(postBody) {
  // find keys of all the dates in the body
  const pattern = /-day$/
  return Object.keys(postBody).filter(key => {
    return pattern.test(key)
  })
}

function extractAnswers(postBody) {
  const shapedAnswers = Object.entries(postBody).reduce((answers, [key, value]) => {
    const trimmedKey = key.replace(/^id-/, '')

    const answerValue = { freeTextAnswer: value, answers: {} }

    return Object.assign(answers, { [trimmedKey]: answerValue })
  }, {})

  return { answers: shapedAnswers }
}

module.exports = { saveQuestionGroup, questionGroupValidationRules: validationRules }
