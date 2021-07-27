// Initialise nunjucks environment
const { configure } = require('nunjucks')

const nunjucksEnvironment = configure({}, {})
const dateFilter = require('nunjucks-date-filter')
const { encodeHTML } = require('../../common/utils/util')
const { mojDate } = require('../../node_modules/@ministryofjustice/frontend/moj/filters/all')()
// add custom nunjucks filters
nunjucksEnvironment.addFilter('date', dateFilter)
nunjucksEnvironment.addFilter('mojDate', mojDate)
nunjucksEnvironment.addFilter('encodeHtml', str => encodeHTML(str))

const { displayQuestionGroup, flattenCheckboxGroups } = require('./get.controller')
const { getAnswers } = require('../../common/data/hmppsAssessmentApi')
const questionGroupPointer = require('../../wiremock/responses/questionGroups.json')[
  '22222222-2222-2222-2222-222222222203'
].contents[0].contents[0]
const expected = require('./fixtures/expected.json')

jest.mock('../../common/data/hmppsAssessmentApi')

const user = { token: 'mytoken', id: '1' }
let expectedForThisTest

describe('display question group and answers', () => {
  const req = {
    body: {},
    user,
    params: {
      assessmentId: 'test-assessment-id',
      groupId: '22222222-2222-2222-2222-222222222204',
      subgroup: 0,
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
    getAnswers.mockReset()
  })

  it('should render the page with the correct structure', async () => {
    getAnswers.mockReturnValueOnce({
      answers: {},
    })
    await displayQuestionGroup(req, res)
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, expectedForThisTest)
  })

  it('should mix in answers when available', async () => {
    const expectedWithAnswers = JSON.parse(JSON.stringify(expectedForThisTest))
    const forenameAnswer = 'Bob'
    const surnameAnswer = 'Mould'
    expectedWithAnswers.questions[0].answer = forenameAnswer
    expectedWithAnswers.questions[1].answer = surnameAnswer
    getAnswers.mockReturnValueOnce({
      answers: {
        '11111111-1111-1111-1111-111111111201': [surnameAnswer],
        '11111111-1111-1111-1111-111111111202': [forenameAnswer],
      },
    })
    await displayQuestionGroup(req, res)
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, expectedWithAnswers)
  })

  it('should default answers where not available', async () => {
    const expectedWithAnswers = JSON.parse(JSON.stringify(expectedForThisTest))
    expectedWithAnswers.questions[0].answer = ''
    expectedWithAnswers.questions[1].answer = ''
    getAnswers.mockReturnValueOnce({
      answers: {
        '11111111-1111-1111-1111-111111111201': [],
        '11111111-1111-1111-1111-111111111202': [],
      },
    })

    await displayQuestionGroup(req, res)
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/index`, expectedWithAnswers)
  })

  it('should throw an error if it cannot retrieve answers', async () => {
    const theError = new Error('Answers error message')
    getAnswers.mockImplementation(() => {
      throw theError
    })
    await displayQuestionGroup(req, res)
    expect(res.render).toHaveBeenCalledWith(`app/error`, { error: theError })
  })

  it('adds assessment information to the template for use by client-side javascript', async () => {
    getAnswers.mockReturnValueOnce({
      answers: {},
      episodeUuid: 'test-episode-id',
    })
    await displayQuestionGroup(req, res)

    expect(res.locals).toMatchObject({
      assessmentUuid: 'test-assessment-id',
      episodeUuid: 'test-episode-id',
    })
  })
})

describe('flattenCheckboxGroups', () => {
  const checkboxGroup = {
    type: 'checkboxGroup',
    checkboxGroupId: '91a60f48-89d4-4106-8f8a-fe797edca111',
    checkboxGroupCode: 'checkbox_group',
    title: 'Checkbox group',
    displayOrder: 1,
    contents: [
      {
        type: 'question',
        questionId: '0941c5b2-f42d-4120-ad79-44954674fe00',
        questionCode: '1.1',
        answerType: 'checkbox',
        questionText: 'First option',
        displayOrder: 1,
        mandatory: true,
        readOnly: false,
        conditional: false,
        referenceDataTargets: [],
        answerSchemas: [
          {
            answerSchemaUuid: '59a0f4fe-4cca-426b-9402-0236dae24902',
            answerSchemaCode: 'yes',
            value: 'YES',
            text: 'Yes',
          },
          {
            answerSchemaUuid: 'c36d2ccd-c049-4640-806e-34b012f682d8',
            answerSchemaCode: 'no',
            value: 'NO',
            text: 'No',
          },
        ],
      },
      {
        type: 'question',
        questionId: 'f988f76c-3d6c-4f45-aa29-7dc8d11198d7',
        questionCode: '1.2',
        answerType: 'checkbox',
        questionText: 'Second option',
        displayOrder: 2,
        mandatory: true,
        readOnly: false,
        conditional: false,
        referenceDataTargets: [],
        answerSchemas: [
          {
            answerSchemaUuid: '59a0f4fe-4cca-426b-9402-0236dae24902',
            answerSchemaCode: 'yes',
            value: 'YES',
            text: 'Yes',
          },
          {
            answerSchemaUuid: 'c36d2ccd-c049-4640-806e-34b012f682d8',
            answerSchemaCode: 'no',
            value: 'NO',
            text: 'No',
          },
        ],
      },
    ],
  }

  it('flattens a checkbox group in to a single question', () => {
    const questions = flattenCheckboxGroups([checkboxGroup])
    expect(questions).toEqual([
      {
        type: 'question',
        questionId: '91a60f48-89d4-4106-8f8a-fe797edca111',
        questionCode: 'checkbox_group',
        displayOrder: 1,
        answerType: 'checkbox',
        questionText: 'Checkbox group',
        mandatory: true,
        readOnly: false,
        conditional: false,
        answerSchemas: [
          { text: 'First option', value: '0941c5b2-f42d-4120-ad79-44954674fe00' },
          { text: 'Second option', value: 'f988f76c-3d6c-4f45-aa29-7dc8d11198d7' },
        ],
      },
    ])
  })
})
