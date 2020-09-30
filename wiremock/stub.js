const { stubFor, resetStubs } = require('./wiremock')

async function stub() {
  await resetStubs()

  console.log('hello')
  stubFor({
    request: {
      method: 'GET',
      url: '/ping',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/text;charset=UTF-8',
      },
      body: 'ping',
    },
  })
}

stub()
