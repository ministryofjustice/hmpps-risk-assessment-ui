const StartRsrAssessment = require('./controllers/start')
const SaveAndContinue = require('./controllers/saveAndContinue')
const GetPredictorScores = require('./controllers/getPredictorScores')
const CompleteRsrAssessment = require('./controllers/completeRsrAssessment')

module.exports = {
  '/start': {
    pageTitle: 'Start',
    controller: StartRsrAssessment,
    reset: true,
    entryPoint: true,
    template: `${__dirname}/templates/start`,
    next: 'offences-and-convictions',
  },
  '/offences-and-convictions': {
    pageTitle: 'Offences and convictions',
    controller: SaveAndContinue,
    fields: [
      'date_first_sanction',
      'age_first_conviction',
      'total_sanctions',
      'total_violent_offences',
      'date_current_conviction',
      'any_sexual_offences',
      'most_recent_sexual_offence_date',
      'total_sexual_offences_adult',
      'total_sexual_offences_child',
      'total_sexual_offences_child_image',
      'total_non_contact_sexual_offences',
      'earliest_release_date',
      'completed_interview',
    ],
    next: [
      {
        // Skip the needs section if an interview has not been conducted
        field: 'completed_interview',
        value: 'NO',
        next: 'predictor-scores',
      },
      'needs', // else default to the needs page
    ],
    template: `${__dirname}/templates/offences`,
  },
  '/needs': {
    pageTitle: 'Needs',
    controller: SaveAndContinue,
    fields: [], // Fields omitted for brevity
    next: 'predictor-scores',
    template: `${__dirname}/templates/needs`,
  },
  '/predictor-scores': {
    pageTitle: 'Scores',
    controller: GetPredictorScores,
    next: 'complete',
    noPost: true,
    template: `${__dirname}/templates/scores`,
  },
  '/complete': {
    pageTitle: 'Complete',
    controller: CompleteRsrAssessment,
    noPost: true,
    template: `${__dirname}/templates/complete`,
  },
}
