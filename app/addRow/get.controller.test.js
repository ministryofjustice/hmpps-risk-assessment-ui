// Initialise nunjucks environment
const { configure } = require('nunjucks')

const nunjucksEnvironment = configure({}, {})
const dateFilter = require('nunjucks-date-filter')
const { encodeHTML } = require('../../common/utils/util')
const { mojDate } = require('../../node_modules/@ministryofjustice/frontend/moj/filters/all.js')()
// add custom nunjucks filters
nunjucksEnvironment.addFilter('date', dateFilter)
nunjucksEnvironment.addFilter('mojDate', mojDate)
nunjucksEnvironment.addFilter('encodeHtml', str => encodeHTML(str))

const { displayAddRow } = require('./get.controller')
const questionGroupPointer = require('../../wiremock/responses/questionGroups.json')[
  '22222222-2222-2222-2222-222222222203'
].contents[0].contents[0]
const expected = require('./fixtures/expected.json')

jest.mock('../../common/data/hmppsAssessmentApi')

const user = { token: 'mytoken' }
let expectedForThisTest

describe('display table group and answers', () => {
  const req = {
    body: {},
    originalUrl: 'this.url/has/this/many/parts',
    user,
    params: {
      assessmentId: 'test-assessment-id',
      groupId: '22222222-2222-2222-2222-222222222204',
      subgroup: 0,
      tableName: 'children',
    },
  }
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    locals: {
      offenderDetails: {
        name: 'Fred Smith',
      },
      questionGroup: questionGroupPointer,
    },
  }

  beforeEach(() => {
    res.locals.questionGroup = JSON.parse(JSON.stringify(questionGroupPointer))
    expectedForThisTest = JSON.parse(JSON.stringify(expected))
    req.params.subgroup = 0
  })

  it('should render the page with the correct structure', async () => {
    await displayAddRow(req, res)
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, expectedForThisTest)
  })
})
