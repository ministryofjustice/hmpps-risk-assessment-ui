/* eslint-disable no-param-reassign */
const { body } = require('express-validator')
const { logger } = require('../../common/logging/logger')
const { displayQuestionGroup } = require('./get.controller')
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
  const { body: reqBody } = req

  const { questionGroup } = res.locals
  const currentQuestions = questionGroup.contents

  const validatorsToSend = []

  currentQuestions.forEach(question => {
    let addThisValidation = true
    if (question.validation) {
      // check if this is a conditional question with a parent
      if (question.conditional) {
        let conditionalParentAnswer = ''
        const conditionalQuestionToFind = question.questionId
        const parentQuestion = currentQuestions.filter(thisQuestion => {
          let foundParent = false
          thisQuestion.answerSchemas.forEach(schema => {
            schema.conditionals?.forEach(childQuestion => {
              if (childQuestion.conditional === conditionalQuestionToFind) {
                foundParent = true
                conditionalParentAnswer = schema.value
              }
            })
          })
          return foundParent
        })

        if (parentQuestion[0]) {
          // if parent question answer submitted does not match the triggering answer, skip this validation
          const answerId = `id-${parentQuestion[0].questionId}`
          if (reqBody[answerId] !== conditionalParentAnswer) {
            addThisValidation = false
          }
        } else {
          logger.error(`No parent question found for conditional question ${question.questionId}`)
          addThisValidation = false
        }
      }

      if (addThisValidation) {
        const validation = JSON.parse(question.validation)
        if (validation) {
          Object.entries(validation).forEach(([validationType, feedback]) => {
            validatorsToSend.push(constructValidationRule(`id-${question.questionId}`, validationType, feedback))
          })
        }
      }
    }
  })

  await dynamicMiddleware(validatorsToSend, req, res, next)
}

const assembleDates = async (req, res, next) => {
  const { body: reqBody } = req

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

  return next()
}

const saveQuestionGroup = async (req, res) => {
  const {
    params: { assessmentId },
    body: reqBody,
    tokens,
    errors,
  } = req
  const { questionGroup } = res.locals

  if (errors) {
    return displayQuestionGroup(req, res)
  }

  try {
    const answers = extractAnswers(reqBody, questionGroup.contents)
    await postAnswers(assessmentId, 'current', answers, tokens)

    return res.redirect(`/${assessmentId}/questiongroup/${res.locals.navigation.next.url}`)
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

function extractAnswers(postBody, questions) {
  const shapedAnswers = Object.entries(postBody).reduce((answers, [key, value]) => {
    const trimmedKey = key.replace(/^id-/, '')
    return Object.assign(answers, { [trimmedKey]: value })
  }, {})

  return { answers: shapedAnswers }
}

module.exports = { saveQuestionGroup, assembleDates, questionGroupValidationRules: validationRules }
