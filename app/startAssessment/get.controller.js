const { assessmentSupervision, getCurrentEpisode } = require('../../common/data/hmppsAssessmentApi')
const logger = require('../../common/logging/logger')

const getErrorMessageFor = (user, reason) => {
  if (reason === 'OASYS_PERMISSION') {
    return 'You do not have permission to create this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }
  if (reason === 'DUPLICATE_OFFENDER_RECORD') {
    return `The offender is showing as a possible duplicate record under ${user.areaName}. Log into OASys to manage the duplication. If you need help, contact the OASys Application Support team`
  }

  return 'Something went wrong' // Unhandled exception
}

const validAssessmentTypes = ['RSR']

const validateAssessmentType = assessmentType => {
  if (!validAssessmentTypes.includes(assessmentType)) {
    throw new Error('Assessment type not valid')
  }
}

const validateCRN = crn => {
  if (!crn) {
    throw new Error('CRN is mandatory')
  }
}

const createAssessment = async (user, crn, deliusEventId = '0', assessmentSchemaCode = 'RSR') => {
  logger.info(`Creating ${assessmentSchemaCode} assessment for CRN: ${crn}`)

  const [ok, response] = await assessmentSupervision(
    { crn, deliusEventId, assessmentSchemaCode },
    user?.token,
    user?.id,
  )

  if (!ok) {
    throw new Error(getErrorMessageFor(user, response.reason))
  }

  return response
}

const getOffenceDetailsFor = episode => ({
  offence: episode?.offenceCode,
  subCode: episode?.offenceSubCode,
})

const getSubjectDetailsFor = assessment => ({
  name: assessment?.subject?.name,
  dob: assessment?.subject?.dateOfBirth,
  pnc: assessment?.subject?.pnc,
  crn: assessment?.subject?.crn,
  subjectUuid: assessment?.subject?.subjectUuid,
})

const startAssessment = async (req, res, next) => {
  const { crn, eventId = 1, assessmentType } = req.query

  try {
    validateCRN(crn)
    validateAssessmentType(assessmentType)

    const assessment = await createAssessment(req.user, crn, eventId, assessmentType)
    const currentEpisode = await getCurrentEpisode(assessment.assessmentUuid, req.user?.token, req.user?.id)

    req.session.assessment = {
      uuid: assessment?.assessmentUuid,
      episodeUuid: currentEpisode?.episodeUuid,
      offence: getOffenceDetailsFor(currentEpisode),
      subject: getSubjectDetailsFor(assessment),
    }

    req.session.save()

    res.redirect(`/${assessmentType}/start`)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  startAssessment,
}
