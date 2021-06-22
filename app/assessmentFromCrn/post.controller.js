// const { logger } = require('../../common/logging/logger')
const { assessmentSupervision } = require('../../common/data/hmppsAssessmentApi')

const getErrorMessageFor = (status, offenderDetails, user) => {
  // We should use an error enum here, status codes may be a bit ambiguous
  if (status === 401) {
    return 'You do not have permission to complete this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }
  if (status === 400) {
    return `${offenderDetails.name} is showing as a possible duplicate record under ${user.areaName} PNC ${offenderDetails.pnc} Log into OASys to manage the duplication. If you need help, contact the OASys Application Support team`
  }

  return 'Something went wrong' // Unhandled exception
}

const startAssessment = async (crn, deliusEventId, assessmentType, user, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const [ok, response] = await assessmentSupervision({ crn, deliusEventId, assessmentType }, user?.token, user?.id)

    if (!ok) {
      // get offender details?
      return res.render('app/error', { error: new Error(getErrorMessageFor(response.status, {}, user)) })
    }

    return res.redirect(`/${response.assessmentUuid}/questionGroup/pre_sentence_assessment/summary`)
  } catch (error) {
    return res.render('app/error', { error })
  }
}

const createStartAssessmentFromCrnMiddleware = (start = startAssessment) => {
  return function startAssessmentFromCrn({ params: { crn, deliusEventId, assessmentType }, user }, res) {
    return start(crn, deliusEventId, assessmentType, user, res)
  }
}

const createStartAssessmentFromFormMiddleware = (start = startAssessment) => {
  return function startAssessmentFromForm({ body, user }, res) {
    const { crn, deliusEventId, assessmentType } = body
    return start(crn, deliusEventId, assessmentType, user, res)
  }
}

module.exports = {
  startAssessmentFromCrn: createStartAssessmentFromCrnMiddleware,
  startAssessmentFromForm: createStartAssessmentFromFormMiddleware,
}
