/* eslint-disable class-methods-use-this */
const fs = require('fs')
const nunjucks = require('nunjucks')
const superagent = require('superagent')
const SaveAndContinue = require('./saveAndContinue')
const { apis } = require('../../../common/config')
const { trackEvent } = require('../../../common/logging/app-insights')
const { EVENTS } = require('../../../common/utils/constants')

const {
  headerHtml,
  footerHtml,
  pdfOptions: { marginTop, marginRight, marginBottom, marginLeft },
} = require('../templates/pdf-preview-and-declaration/components/print-pdf-header-footer')

class ConvertPdf extends SaveAndContinue {
  async render(req, res, next) {
    try {
      trackEvent(EVENTS.ARN_PDF_DOWNLOAD, req)

      const rendered = nunjucks.render('app/upw/templates/pdf-preview-and-declaration/pdf.njk', {
        ...res.locals,
        css_path: 'application.min.css',
      })

      const firstName = res.locals.persistedAnswers.first_name || ''
      const familyName = res.locals.persistedAnswers.family_name || ''
      const crn = res.locals.persistedAnswers.crn || ''

      const fileName = [firstName, familyName, crn]
        .filter((s) => s !== '')
        .join('-')
        .toLowerCase()

      res.set('Content-Type', 'application/pdf')
      res.set('Content-Disposition', `attachment; filename="upw-${fileName}.pdf"`)

      return superagent
        .post(apis?.pdfConverter?.url)
        .accept('application/json')
        .attach('files', Buffer.from(rendered), 'index.html')
        .attach('files', Buffer.from(headerHtml), 'header.html')
        .attach('files', Buffer.from(footerHtml), 'footer.html')
        .field('marginTop', marginTop)
        .field('marginBottom', marginBottom)
        .field('marginLeft', marginLeft)
        .field('marginRight', marginRight)
        .attach('files', fs.readFileSync('public/stylesheets/application.min.css'), 'application.min.css')
        .attach('files', fs.readFileSync('public/images/community-payback-logo.jpg'), 'community-payback-logo.jpg')
        .attach('files', fs.readFileSync('public/images/MOJ_logo_large.png'), 'MOJ_logo_large.png')
        .pipe(res)
    } catch (e) {
      return res.send(e.message)
    }
  }
}

module.exports = ConvertPdf
