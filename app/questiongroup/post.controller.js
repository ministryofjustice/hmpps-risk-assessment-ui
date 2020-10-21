const { logger } = require('../../common/logging/logger')
const { getQuestionGroup, postAnswers } = require('../../common/data/assessmentApi')

const assessmentId = 'e69a61ff-7395-4a12-b434-b1aa6478aded'
const episodeId = '4511a3f6-7f51-4b96-b603-4e75eac0c839'

const saveQuestionGroup = async ({ params: { groupId }, body, tokens }, res) => {
  try {
    const answers = extractAnswers(body)

    // save answers
    await postAnswers(assessmentId, episodeId, answers, tokens)

    // decide where to go next :)

    const questionGroup = await getQuestionGroup(groupId, tokens)

    return res.render(`${__dirname}/index`, {
      heading: questionGroup.contents[0].title,
      groupId,
      questions: questionGroup.contents[0].contents,
    })
  } catch (error) {
    logger.error(`Could not retrieve question group for ${groupId}, error: ${error}`)
    return res.render('app/error', { error })
  }
}

function extractAnswers(body) {
  const shapedAnswers = Object.entries(body).reduce((answers, [key, value]) => {
    const trimmedKey = key.replace(/^id-/, '')

    const answerValue = { freeTextAnswer: value, answers: {} }

    return Object.assign(answers, { [trimmedKey]: answerValue })
  }, {})

  return { answers: shapedAnswers }
}

module.exports = { saveQuestionGroup }
