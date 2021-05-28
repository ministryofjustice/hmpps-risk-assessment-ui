const superagent = require('superagent')
const logger = require('../logging/logger')
const { getCorrelationId } = require('../utils/util')
const {
  apis: {
    hmppsAssessments: { timeout, url },
  },
} = require('../config')

const assessmentSupervision = (assessmentDto, authorisationToken) => {
  const path = `${url}/assessments`
  return postData(path, authorisationToken, assessmentDto)
}

const getOffenderData = (uuid, authorisationToken) => {
  const path = `${url}/assessments/${uuid}/subject`
  return getData(path, authorisationToken)
}

const getQuestionGroup = (groupId, authorisationToken) => {
  const path = `${url}/questions/${groupId}`
  return getData(path, authorisationToken)
}

const getQuestionGroupSummary = (groupId, authorisationToken) => {
  const path = `${url}/questions/${groupId}/summary`
  return getData(path, authorisationToken)
}

const getAnswers = (assessmentId, episodeId, authorisationToken) => {
  const path = `${url}/assessments/${assessmentId}/episodes/${episodeId}`
  return getData(path, authorisationToken)
}

const getAssessmentsList = authorisationToken => {
  const path = `${url}/questions/list`
  return getData(path, authorisationToken)
}

const postCompleteAssessment = (assessmentId, authorisationToken) => {
  const path = `${url}/assessments/${assessmentId}/complete`
  return postData(path, authorisationToken)
}

const postAnswers = (assessmentId, episodeId, answers, authorisationToken) => {
  const path = `${url}/assessments/${assessmentId}/episodes/${episodeId}`
  return postData(path, authorisationToken, answers)
}

const postTableRow = (assessmentId, episodeId, tableName, answers, authorisationToken) => {
  const path = `${url}/assessments/${assessmentId}/episodes/${episodeId}/${tableName}`
  return postData(path, authorisationToken, answers)
}

const deleteTableRow = (assessmentId, episodeId, tableName, tableRow, authorisationToken) => {
  const path = `${url}/assessments/${assessmentId}/episodes/${episodeId}/${tableName}/${tableRow}`
  return deleteData(path, authorisationToken)
}

const getFilteredReferenceData = (assessmentId, episodeId, questionUuid, parentList, authorisationToken) => {
  const path = `${url}/referencedata/filtered`
  const requestBody = {
    assessmentUuid: assessmentId,
    episodeUuid: episodeId,
    fieldName: questionUuid,
    parentList,
  }
  return postData(path, authorisationToken, requestBody)
}

const getData = (path, authorisationToken) => {
  logger.info(`Calling hmppsAssessments API with GET: ${path}`)

  return action(superagent.get(path), authorisationToken).then(([_, body]) => {
    return body
  })
}

const postData = (path, authorisationToken, data) => {
  logger.info(`Calling hmppsAssessments API with POST: ${path}`)

  return action(superagent.post(path).send(data), authorisationToken)
}

const deleteData = (path, authorisationToken) => {
  logger.info(`Calling hmppsAssessments API with DELETE: ${path}`)

  return action(superagent.delete(path), authorisationToken)
}

const action = async (agent, authorisationToken) => {
  if (authorisationToken === undefined) {
    throw new Error('No authorisation token found when calling hmppsAssessments API')
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
  logger.warn('Error calling hmppsAssessments API')
  logger.warn({
    status: error.status,
    method: error.response?.req?.method,
    url: error.response?.req?.url,
    text: error.response?.text,
  })
  throw error
}

module.exports = {
  assessmentSupervision,
  getOffenderData,
  getQuestionGroup,
  getAnswers,
  getAssessmentsList,
  postAnswers,
  getQuestionGroupSummary,
  postCompleteAssessment,
  getFilteredReferenceData,
  postTableRow,
  deleteTableRow,
}
