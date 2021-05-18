const { stubFor } = require('./wiremock')
const userProfile = require('./responses/userProfile.json')

const stubGetUserProfile = () => {
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/user/USER_2/profile',
    },
    response: {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      status: 200,
      jsonBody: userProfile,
    },
  })
}

module.exports = {
  stubGetUserProfile,
}
