const { body } = require('express-validator')
const { dynamicMiddleware } = require('../../utils/util')
const { logger } = require('../../logging/logger')
const { extractCheckboxGroupAnswers } = require('./checkboxGroups')

function findDateAnswerKeys(postBody) {
  // find keys of all the dates in the body
  const pattern = /-day$/
  return Object.keys(postBody).filter(key => {
    return pattern.test(key)
  })
}

const assembleDates = async (req, res, next) => {
  const { body: reqBody } = req

  const dateKeys = findDateAnswerKeys(reqBody)

  dateKeys.forEach(key => {
    const dateKey = key.replace(/-day$/, '')
    let constructedDate = ''
    try {
      reqBody[`${dateKey}-month`] = reqBody[`${dateKey}-month`].toString().padStart(2, '0')
      reqBody[`${dateKey}-day`] = reqBody[`${dateKey}-day`].toString().padStart(2, '0')

      if (reqBody[`${dateKey}-year`] && reqBody[`${dateKey}-month`] && reqBody[`${dateKey}-day`]) {
        constructedDate = `${reqBody[`${dateKey}-year`]}-${reqBody[`${dateKey}-month`]}-${reqBody[`${dateKey}-day`]}`
      }
    } catch {
      constructedDate = null
    }

    reqBody[dateKey] = constructedDate
    delete reqBody[`${dateKey}-year`]
    delete reqBody[`${dateKey}-month`]
    delete reqBody[`${dateKey}-day`]
  })

  return next()
}

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

const questionGroupValidationRules = async (req, res, next) => {
  const {
    body: reqBody,
    params: { tableName },
  } = req

  const { questionGroup } = res.locals
  let currentQuestions = questionGroup.contents

  if (tableName) {
    currentQuestions = currentQuestions.find(element => element.tableCode === tableName).contents
  }

  const validatorsToSend = []

  currentQuestions.forEach(question => {
    let addThisValidation = true
    if (question.validation && question.readOnly !== true) {
      // check if this is a conditional question with a parent
      if (question.conditional) {
        let conditionalParentAnswer = ''
        const conditionalQuestionToFind = question.questionCode
        const parentQuestion = currentQuestions.filter(thisQuestion => {
          let foundParent = false
          thisQuestion.answerSchemas?.forEach(schema => {
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
          const answerKey = `${parentQuestion[0].questionCode}`
          if (reqBody[answerKey] !== conditionalParentAnswer) {
            addThisValidation = false
          }
        } else {
          logger.error(`No parent question found for conditional question ${question.questionCode}`)
          addThisValidation = false
        }
      }

      if (addThisValidation) {
        const validation = JSON.parse(question.validation)
        if (validation) {
          Object.entries(validation).forEach(([validationType, feedback]) => {
            validatorsToSend.push(constructValidationRule(`${question.questionCode}`, validationType, feedback))
          })
        }
      }
    }
  })

  await dynamicMiddleware(validatorsToSend, req, res, next)
}

function formatValidationErrors(serverErrors, pageErrors) {
  const errors = {}
  const errorSummary = []
  if (serverErrors) {
    for (let i = 0; i < Object.entries(serverErrors).length; i += 1) {
      const [questionCode, msg] = Object.entries(serverErrors)[i]
      errors[`${questionCode}`] = { text: msg[0] }
      errorSummary.push({
        text: msg[msg.length === 2 ? 1 : 0],
        href: `#${questionCode}-error`,
      })
    }
  }
  if (pageErrors) {
    for (let i = 0; i < pageErrors.length; i += 1) {
      errorSummary.push({
        text: pageErrors[i],
        href: '#',
      })
    }
  }
  return [errors, errorSummary]
}

function extractAnswers(req, res, next) {
  const { body: reqBody } = req
  const { questionGroup } = res.locals
  const currentQuestions = questionGroup.contents

  const shapedAnswers = Object.entries(reqBody).reduce((answers, [key, value]) => {
    return Object.assign(answers, { [key]: value })
  }, {})

  const answers = extractCheckboxGroupAnswers(currentQuestions, shapedAnswers)

  req.body = answers
  next()
}

module.exports = { questionGroupValidationRules, assembleDates, formatValidationErrors, extractAnswers }
