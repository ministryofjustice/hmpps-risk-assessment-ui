const { getFlatAssessmentQuestions } = require('../data/hmppsAssessmentApi')
const { processReplacements } = require('../utils/util')
const logger = require('../logging/logger')

module.exports = async ({ params: { assessmentCode = 'RSR', assessmentVersion = 1 }, user }, res, next) => {
  try {
    let questions = await getFlatAssessmentQuestions(assessmentCode, assessmentVersion, user?.token, user?.id)

    // thisQuestionGroup.contents?.forEach(q => readOnlyToAttribute(q))
    // thisQuestionGroup.contents = thisQuestionGroup.contents?.map(questionSchema => {
    //   const attributes = {
    //     ...questionSchema.attributes,
    //     'data-question-code': questionSchema.questionCode,
    //     'data-question-type': questionSchema.answerType,
    //   }
    //
    //   return {
    //     ...questionSchema,
    //     attributes,
    //   }
    // })

    questions = processReplacements(questions, res.locals.offenderDetails)

    const questionLookup = {}
    questions.forEach(q => {
      questionLookup[q.questionCode] = q
    })
    res.locals.questions = questionLookup

    return next()
  } catch (error) {
    logger.error(
      `Could not retrieve questions for assessment ${assessmentCode} version ${assessmentVersion}, error: ${error}`,
    )
    return res.render('app/error', { error })
  }
}
