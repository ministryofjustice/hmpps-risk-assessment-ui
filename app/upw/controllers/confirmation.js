/* eslint-disable class-methods-use-this */
const nunjucks = require('nunjucks')
const SaveAndContinue = require('./saveAndContinue')
const logger = require('../../../common/logging/logger')
const { uploadPdfDocumentToDelius, postCompleteAssessment } = require('../../../common/data/hmppsAssessmentApi')
const { convertHtmlToPdf } = require('../../../common/data/pdf')

const createFileNameFrom = (type, ...parts) => {
  const fileName = parts
    .filter(s => s !== '')
    .join('-')
    .toLowerCase()
  return `${fileName}.${type}`
}

class Confirmation extends SaveAndContinue {
  async render(req, res, next) {
    try {
      const renderedHtml = nunjucks.render('app/upw/templates/pdf-preview-and-declaration/pdf.njk', {
        ...res.locals,
        css_path: 'application.min.css',
      })

      const firstName = res.locals.rawAnswers.first_name || ''
      const familyName = res.locals.rawAnswers.family_name || ''
      const crn = res.locals.rawAnswers.crn || ''

      const assessmentId = req.session?.assessment?.uuid
      const episodeId = req.session?.assessment?.episodeUuid

      const fileName = createFileNameFrom('pdf', firstName, familyName, crn)

      const pdfConvertResponse = await convertHtmlToPdf(renderedHtml)

      if (!pdfConvertResponse.ok) {
        logger.error(`Failed to convert template to PDF, status=${pdfConvertResponse.status}`)
        throw new Error('Failed to convert template to PDF')
      }

      const deliusUploadResponse = await uploadPdfDocumentToDelius(
        assessmentId,
        episodeId,
        { document: pdfConvertResponse.response, fileName },
        req.user,
      )

      if (!deliusUploadResponse.ok) {
        logger.error(`Failed to upload the PDF, status=${deliusUploadResponse.status}`)
        if (deliusUploadResponse.status >= 400) {
          return res.redirect('/UPW/delius-error')
        }

        throw new Error('Failed to upload the PDF')
      } else {
        logger.info(`PDF uploaded for CRN ${crn}, episode ${episodeId}`)
      }

      const [assessmentCompleted] = await postCompleteAssessment(assessmentId, episodeId, req.user?.token, req.user?.id)

      if (!assessmentCompleted) {
        logger.error(`Could not close assessment: ${assessmentId} for CRN: ${crn}`)
        throw new Error('Failed to complete the assessment')
      }

      return super.render(req, res, next)
    } catch (e) {
      return next(e)
    }
  }
}

module.exports = Confirmation
