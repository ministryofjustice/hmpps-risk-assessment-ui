const { Router } = require('express')
const wizard = require('hmpo-form-wizard')
const steps = require('./steps')
const fields = require('./fields')
const getOffenderDetails = require('../../common/middleware/getOffenderDetails')
const getAssessmentQuestions = require('../../common/middleware/getAssessmentQuestions')

const router = Router()

router.get('*', (req, res, next) => {
  res.locals.pageTitle = steps[req.url]?.pageTitle
  next()
})

router.get('/offences-and-convictions', getOffenderDetails, getAssessmentQuestions)
router.get('/needs', getOffenderDetails, getAssessmentQuestions)

router.use(
  wizard(steps, fields, {
    journeyName: 'rsr',
    journeyPageTitle: 'Risk of Serious Recidivism (RSR) assessment',
    name: 'rsr',
    entryPoint: true,
  }),
)

module.exports = router
