const { assessmentSupervision } = require('../../common/data/hmppsAssessmentApi')

const getErrorMessageFor = (reason, user) => {
  if (reason === 'OASYS_PERMISSION') {
    return 'You do not have permission to create this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }
  if (reason === 'DUPLICATE_OFFENDER_RECORD') {
    return `The offender is showing as a possible duplicate record under ${user.areaName}. Log into OASys to manage the duplication. If you need help, contact the OASys Application Support team`
  }

  return 'Something went wrong' // Unhandled exception
}

const startAssessment = async (crn, deliusEventId, assessmentSchemaCode, user, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const [ok, response] = await assessmentSupervision(
      { crn, deliusEventId, assessmentSchemaCode },
      user?.token,
      user?.id,
    )

    if (!ok) {
      return res.render('app/error', {
        subHeading: getErrorMessageFor(response.reason, user),
      })
    }

    return res.redirect(`/${response.assessmentUuid}/questionGroup/${assessmentSchemaCode}/summary`)
  } catch (error) {
    return res.render('app/error', { error })
  }
}

const startAssessmentFromCrn = ({ params: { crn, deliusEventId, assessmentSchemaCode }, user }, res) => {
  return startAssessment(crn, deliusEventId, assessmentSchemaCode, user, res)
}

const startAssessmentFromForm = ({ body, user }, res) => {
  const { crn, deliusEventId, assessmentSchemaCode } = body
  return startAssessment(crn, deliusEventId, assessmentSchemaCode, user, res)
}

module.exports = {
  startAssessmentFromCrn,
  startAssessmentFromForm,
}
