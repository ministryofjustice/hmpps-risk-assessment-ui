const StartRsrAssessment = require('./controllers/start')
const TaskList = require('./controllers/taskList')
const StubSaveAndContinue = require('./controllers/stubSaveAndContinue')

module.exports = {
  '/start': {
    pageTitle: 'Start',
    controller: StartRsrAssessment,
    reset: true,
    entryPoint: true,
    template: `${__dirname}/templates/start`,
    next: 'task-list',
  },
  '/task-list': {
    pageTitle: 'Community payback assessment',
    controller: TaskList,
    template: `${__dirname}/templates/taskList`,
  },
  '/individuals-details': {
    pageTitle: 'Individual\'s details',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-individuals-details',
    ],
  },
  '/cultural-and-religious-adjustments': {
    pageTitle: 'Cultural and religious adjustments',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-cultural-and-religious-adjustments',
    ],
  },
  '/placement-preferences': {
    pageTitle: 'Placement preferences',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-placement-preferences',
    ],
  },
  '/risk-of-harm-in-the-community': {
    pageTitle: 'Risk of harm in the community',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-risk-of-harm-in-the-community',
    ],
  },
  '/managing-risk': {
    pageTitle: 'Managing-risk',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-managing-risk',
    ],
  },
  '/disabilities-and-mental-health': {
    pageTitle: 'Disabilities and mental health',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-disabilities-and-mental-health',
    ],
  },
  '/health-issues': {
    pageTitle: 'Health issues',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-health-issues',
    ],
  },
  '/travel': {
    pageTitle: 'Travel',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-travel',
    ],
  },
  '/caring-commitments': {
    pageTitle: 'Caring commitments',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-caring-commitments',
    ],
  },
  '/employment-education-and-skills': {
    pageTitle: 'Employment, education and skills',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-employment-education-and-skills',
    ],
  },
  '/training-and-employment-opportunities': {
    pageTitle: 'Training and employment opportunities',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-training-and-employment-opportunities',
    ],
  },
  '/availability': {
    pageTitle: 'Availability',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-availability',
    ],
  },
  '/intensive-working': {
    pageTitle: 'Intensive working',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-intensive-working',
    ],
  },
  '/equipment': {
    pageTitle: 'Equipment',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    next: 'task-list',
    fields: [
      'section-complete-equipment',
    ],
  },
  '/pdf-preview-and-declaration': {
    pageTitle: 'PDF preview and declaration',
    controller: StubSaveAndContinue,
    template: `${__dirname}/templates/default`,
    fields: [
      'declaration'
    ],
    next: 'task-list',
  },
}
