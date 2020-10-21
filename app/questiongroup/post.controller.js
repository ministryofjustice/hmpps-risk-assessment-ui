const { logger } = require('../../common/logging/logger')
const { getQuestionGroup } = require('../../common/data/assessmentApi')

const assessmentId = 'e69a61ff-7395-4a12-b434-b1aa6478aded'
const episodeId = 'e69a61ff-7395-4a12-b434-b1aa6478aded'

const saveQuestionGroup = async ({ params: { groupId }, body, tokens }, res) => {
  try {
    const answers = extractAnswers(body)

    // save answers
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
  return Object.entries(body).reduce((answers, [key, value]) => {
    const trimmedKey = key.replace(/^id-/, '')
    return Object.assign(answers, { [trimmedKey]: value })
  }, {})
}

module.exports = { saveQuestionGroup }
