const { differenceInYears, format } = require('date-fns')
const { getCurrentEpisodeForCrn, getOffenderAndOffenceDetails } = require('../../common/data/hmppsAssessmentApi')
const logger = require('../../common/logging/logger')
const getErrorMessageFor = require('../../common/utils/util')

const validateAssessmentType = assessmentType => {
  if (!assessmentType) {
    throw new Error('Assessment type is mandatory')
  }
}

const validateCRN = crn => {
  if (!crn) {
    throw new Error('CRN is mandatory')
  }
}

const getOffenceDetailsFor = episode => {
  const sentenceDate = episode?.offence?.sentenceDate

  return {
    offence: episode?.offence?.offenceCode,
    offenceDescription: episode?.offence?.codeDescription,
    subCode: episode?.offence?.offenceSubCode,
    subCodeDescription: episode?.offence?.subCodeDescription,
    sentenceDate: sentenceDate && format(new Date(sentenceDate), 'do MMMM y'),
  }
}

const getSubjectDetailsFor = (offender, today = new Date()) => ({
  name: `${offender?.firstName} ${offender?.surname}`,
  dob: offender?.dateOfBirth,
  pnc: offender?.pncNumber,
  crn: offender?.crn,
  subjectUuid: offender?.offenderId,
  age: differenceInYears(today, new Date(offender?.dateOfBirth)),
})

const verifyAssessment = async (req, res, next) => {
  const { crn, eventId = 1, assessmentType } = req.query

  try {
    validateCRN(crn)
    validateAssessmentType(assessmentType)

    const assessmentCode = assessmentType === 'UNPAID_WORK' ? 'UPW' : assessmentType
    const deliusEventType = assessmentType === 'UNPAID_WORK' ? 'EVENT_ID' : null

    const offenderDetailsRetrieved = await getOffenderAndOffenceDetails(
      crn,
      eventId,
      assessmentCode,
      deliusEventType,
      req.user?.token,
      req.user?.id,
    )

    if (!offenderDetailsRetrieved) {
      logger.error(`Could not get offender and offence details for CRN ${crn}, assessment type ${assessmentType}`)
      return res.render('app/error', { subHeading: getErrorMessageFor(req.user, offenderDetailsRetrieved.reason) })
    }

    const currentEpisode = await getCurrentEpisodeForCrn(crn, req.user?.token, req.user?.id)

    req.session.assessment = {
      lastEditedBy: currentEpisode?.userFullName,
      lastEditedDate: currentEpisode?.lastEditedDate,
      offence: getOffenceDetailsFor(offenderDetailsRetrieved),
      subject: getSubjectDetailsFor(offenderDetailsRetrieved),
      eventId,
      deliusEventType,
      assessmentCode,
    }

    req.session.save()

    return res.redirect(`/${assessmentCode}/start`)
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  verifyAssessment,
}
