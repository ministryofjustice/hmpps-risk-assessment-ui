const { stubFor } = require('./wiremock')
const questionGroups = require('./responses/questionGroups.json')

const stubQuestionGroup = groupId => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: `/questions/${groupId}`,
    },
    response: {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      status: 200,
      jsonBody: questionGroups[groupId],
    },
  })
}
module.exports = {
  stubQuestions: () => {
    stubQuestionGroup(1234)
  },
}
