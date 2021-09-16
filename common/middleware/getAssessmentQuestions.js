const { getFlatAssessmentQuestions, getAnswers } = require('../data/hmppsAssessmentApi')
const { processReplacements } = require('../utils/util')
const logger = require('../logging/logger')
const { compileInlineConditionalQuestions, annotateWithAnswers } = require('./questionGroups/getHandlers')

module.exports = async (req, res, next) => {
  const {
    params: { assessmentCode = 'RSR', assessmentVersion = 1 },
    user,
    errors = {},
    sessionModel,
  } = req
  try {
    let questions = await getFlatAssessmentQuestions(assessmentCode, assessmentVersion, user?.token, user?.id)
    const userAnswers = sessionModel.get('answers')

    const answers = await getAnswers(assessmentCode, 'current', user?.token, user?.id)
    questions = annotateWithAnswers(questions, answers, userAnswers)
    questions = compileInlineConditionalQuestions(questions, errors)
    questions = processReplacements(questions, res.locals.offenderDetails)

    const questionLookup = {}
    questions.forEach(q => {
      questionLookup[q.questionCode] = q
    })
    res.locals.questions = questionLookup

    return questionLookup
  } catch (error) {
    logger.error(
      `Could not retrieve questions for assessment ${assessmentCode} version ${assessmentVersion}, error: ${error}`,
    )
    return res.render('app/error', { error })
  }
}
