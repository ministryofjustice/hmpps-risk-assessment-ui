/* eslint-disable no-param-reassign */
const { body } = require('express-validator')
const { logger } = require('../../common/logging/logger')
const { displayQuestionGroup, grabQuestionGroup } = require('./get.controller')
const { postAnswers } = require('../../common/data/assessmentApi')

const validationRulesOld = req => {
  console.log('hello')
  console.log(req)
  const validationString = [
    body('id-11111111-1111-1111-1111-111111111202')
      .isLength({ min: 1 })
      .withMessage({ error: 'Enter the forename', errorSummary: 'You must enter a forename' }),
    body('id-11111111-1111-1111-1111-111111111201')
      .isLength({ min: 1 })
      .withMessage({ error: 'Enter the surname' }),
  ]
  console.log(validationString)
  return validationString
}

const showBody = (req, res, next) => {
  // console.log('=================')
  // console.log(req['express-validator#contexts'])
  return next()
}

const validationRules = async (req, res, next) => {
  const {
    params: { groupId },
    tokens,
  } = req
  // get questionGroup again
  console.log('in validation rules')
  // console.log(req)

  const questionGroup = await grabQuestionGroup(groupId, tokens)

  console.log("I've found this question group")
  console.log(questionGroup)

  body('id-11111111-1111-1111-1111-111111111202')
    .isLength({ min: 1 })
    .withMessage({ error: 'Enter the forename', errorSummary: 'You must enter a forename' })
  body('id-11111111-1111-1111-1111-111111111201')
    .isLength({ min: 1 })
    .withMessage({ error: 'Enter the surname' })

  return next()
  return () => {
    body('id-11111111-1111-1111-1111-111111111202')
      .isLength({ min: 1 })
      .withMessage({ error: 'Enter the forename', errorSummary: 'You must enter a forename' })
    body('id-11111111-1111-1111-1111-111111111201')
      .isLength({ min: 1 })
      .withMessage({ error: 'Enter the surname' })
    next()
  }
}

const saveQuestionGroup = async (req, res) => {
  const {
    params: { assessmentId, groupId, subgroup },
    body: reqBody,
    tokens,
    errors,
  } = req
  console.log(errors)
  if (errors) {
    return displayQuestionGroup(req, res)
  }

  console.log('in savequestiongroup')

  try {
    const dateKeys = findDateAnswerKeys(reqBody)

    dateKeys.forEach(key => {
      const dateKey = key.replace(/-day$/, '')
      let constructedDate = ''
      if (body[`${dateKey}-year`] && body[`${dateKey}-month`] && body[`${dateKey}-day`]) {
        constructedDate = new Date(
          `${body[`${dateKey}-year`]}-${body[`${dateKey}-month`]}-${body[`${dateKey}-day`]}`,
        ).toISOString()
      }

      body[dateKey] = constructedDate
      delete body[`${dateKey}-year`]
      delete body[`${dateKey}-month`]
      delete body[`${dateKey}-day`]
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

module.exports = { saveQuestionGroup, QuestionGroupValidationRules: validationRules, showBody }
