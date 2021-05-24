const superagent = require('superagent')
const logger = require('../logging/logger')
const { getCorrelationId } = require('../utils/util')
const {
  apis: {
    offenderAssessments: { timeout, url },
  },
} = require('../config')

const getReferenceDataListByCategory = (category, authorisationToken) => {
  const path = `${url}/referencedata/${category}`
  return getData(path, authorisationToken)
}

const getData = (path, authorisationToken) => {
  logger.info(`Calling offenderAssessments API with GET: ${path}`)

  return action(superagent.get(path), authorisationToken).then(([_, body]) => body)
}

const action = async (agent, authorisationToken) => {
  if (authorisationToken === undefined) {
    return logger.warn('No authorisation token found when calling offenderAssessments API')
  }

  try {
    return await agent
      .auth(authorisationToken, { type: 'bearer' })
      .set('x-correlation-id', getCorrelationId())
      .timeout(timeout)
      .then(response => {
        return [true, response.body]
      })
  } catch (error) {
    const { status, response } = error
    if (status === 422) {
      // unprocessable entity
      return [false, response.body]
    }

    return logError(error)
  }
}

const logError = error => {
  logger.warn('Error calling offenderAssessments API')
  logger.warn({
    status: error.status,
    method: error.response?.req?.method,
    url: error.response?.req?.url,
    text: error.response?.text,
  })
  throw error
}

module.exports = {
  getReferenceDataListByCategory,
}
