// Initialise nunjucks environment
const { configure } = require('nunjucks')

const nunjucksEnvironment = configure({}, {})
const dateFilter = require('nunjucks-date-filter')
const { mojDate } = require('@ministryofjustice/frontend/moj/filters/all')()
const { encodeHTML } = require('../../utils/util')
// add custom nunjucks filters
nunjucksEnvironment.addFilter('date', dateFilter)
nunjucksEnvironment.addFilter('mojDate', mojDate)
nunjucksEnvironment.addFilter('encodeHtml', str => encodeHTML(str))

const { compileInlineConditionalQuestions, annotateWithAnswers } = require('./getHandlers')

const questions = [
  {
    type: 'question',
    questionId: '11111111-1111-1111-1111-111111111231',
    questionCode: 'no_fixed_abode',
    answerType: 'radio',
    questionText: 'Currently of no fixed abode or in transient accommodation',
    displayOrder: '1',
    mandatory: 'no',
    validation: '{"mandatory":{"errorMessage":"Select an option","errorSummary":"Select an accommodation status"}}',
    answerSchemas: [
      {
        answerSchemaUuid: '44444444-4444-4444-4444-444444444444',
        answerSchemaCode: 'SR15.1.2.1',
        value: 'Y',
        text: 'Yes',
        conditionals: [
          {
            conditional: 'further_information',
            displayInline: true,
          },
        ],
      },
      {
        answerSchemaUuid: '44444444-4444-4444-4444-444444444445',
        answerSchemaCode: 'SR15.1.2.2',
        value: 'N',
        text: 'No',
      },
    ],
    attributes: {
      'data-question-code': 'no_fixed_abode',
      'data-question-type': 'radio',
    },
  },
  {
    type: 'question',
    questionId: '12345678-1234-1234-1234-1234-123456789012',
    questionCode: 'further_information',
    answerType: 'textarea',
    questionText: 'Further information',
    displayOrder: '1',
    mandatory: 'no',
    conditional: 'yes',
    answerSchemas: [],
    answer: null,
    validation:
      '{"mandatory":{"errorMessage":"Enter some details","errorSummary":"Enter more detail about the accommodation"}}',
    attributes: {
      'data-question-code': 'further_information',
      'data-question-type': 'textarea',
    },
  },
]

describe('getQuestionGroups', () => {
  describe('process conditional questions', () => {
    it('compiles out-of-line conditional questions', () => {
      const thisTestQuestionGroup = JSON.parse(JSON.stringify(questions))
      thisTestQuestionGroup[0].answerSchemas[0].conditionals[0].displayInline = false

      const expected = [
        {
          answerSchemas: [
            {
              answerSchemaCode: 'SR15.1.2.1',
              answerSchemaUuid: '44444444-4444-4444-4444-444444444444',
              attributes: [
                ['data-conditional', 'further_information'],
                ['data-aria-controls', 'conditional-id-form-further_information'],
                ['aria-expanded', 'false'],
              ],
              conditionals: [
                {
                  conditional: 'further_information',
                  displayInline: false,
                },
              ],
              text: 'Yes',
              value: 'Y',
            },
            {
              answerSchemaCode: 'SR15.1.2.2',
              answerSchemaUuid: '44444444-4444-4444-4444-444444444445',
              text: 'No',
              value: 'N',
            },
          ],
          answerType: 'radio',
          attributes: [['data-contains-conditional', 'true']],
          displayOrder: '1',
          isConditional: true,
          mandatory: 'no',
          questionCode: 'no_fixed_abode',
          questionId: '11111111-1111-1111-1111-111111111231',
          questionText: 'Currently of no fixed abode or in transient accommodation',
          type: 'question',
          validation:
            '{"mandatory":{"errorMessage":"Select an option","errorSummary":"Select an accommodation status"}}',
        },
        {
          answer: null,
          answerSchemas: [],
          answerType: 'textarea',
          attributes: [
            ['data-outofline', 'true'],
            ['data-base-question-code', 'further_information'],
          ],
          conditional: 'yes',
          displayOrder: '1',
          formClasses:
            'govuk-radios__conditional govuk-radios__conditional--no-indent govuk-radios__conditional--hidden',
          isConditional: true,
          mandatory: 'no',
          questionCode: 'further_information',
          questionId: '12345678-1234-1234-1234-1234-123456789012',
          questionText: 'Further information',
          type: 'question',
          validation:
            '{"mandatory":{"errorMessage":"Enter some details","errorSummary":"Enter more detail about the accommodation"}}',
        },
      ]
      const result = compileInlineConditionalQuestions(thisTestQuestionGroup, {})
      expect(result).toEqual(expected)
    })

    it('compiles inline conditional questions', () => {
      const thisQuestionGroup = JSON.parse(JSON.stringify(questions))
      const expected = [
        {
          answerSchemas: [
            {
              answerSchemaCode: 'SR15.1.2.1',
              answerSchemaUuid: '44444444-4444-4444-4444-444444444444',
              conditional: {
                html:
                  ' <div class="govuk-character-count" data-module="govuk-character-count" data-maxlength="4000"><div class="govuk-form-group"><label class="govuk-label further_information govuk-label--m" for="further_information">Further information</label><div id="further_information-hint" class="govuk-hint"></div><textarea class="govuk-textarea govuk-js-character-count" id="further_information" name="further_information" rows="5" aria-describedby="further_information-info further_information-hint"></textarea>\n</div><div id="further_information-info" class="govuk-hint govuk-character-count__message" aria-live="polite">You can enter up to 4000 characters\n</div></div>',
              },
              conditionals: [
                {
                  conditional: 'further_information',
                  displayInline: true,
                },
              ],
              text: 'Yes',
              value: 'Y',
            },
            {
              answerSchemaCode: 'SR15.1.2.2',
              answerSchemaUuid: '44444444-4444-4444-4444-444444444445',
              text: 'No',
              value: 'N',
            },
          ],
          answerType: 'radio',
          attributes: {
            'data-question-type': 'radio',
            'data-question-code': 'no_fixed_abode',
          },
          displayOrder: '1',
          mandatory: 'no',
          questionCode: 'no_fixed_abode',
          questionId: '11111111-1111-1111-1111-111111111231',
          questionText: 'Currently of no fixed abode or in transient accommodation',
          type: 'question',
          validation:
            '{"mandatory":{"errorMessage":"Select an option","errorSummary":"Select an accommodation status"}}',
        },
      ]
      const result = compileInlineConditionalQuestions(thisQuestionGroup, {})
      expect(result).toEqual(expected)
    })
  })

  describe('annotateWithAnswers', () => {
    const checkboxGroup = {
      type: 'question',
      questionId: 'f988f76c-3d6c-4f45-aa29-7dc8d11198d7',
      questionCode: '1.1',
      answerType: 'checkboxGroup',
      questionText: 'Checkbox Group',
      displayOrder: 1,
      mandatory: false,
      readOnly: false,
      conditional: false,
      referenceDataTargets: [],
      answerSchemas: [
        {
          answerSchemaUuid: '59a0f4fe-4cca-426b-9402-0236dae24902',
          answerSchemaCode: 'first_option',
          value: '0941c5b2-f42d-4120-ad79-44954674fe00',
          text: 'First Option',
        },
        {
          answerSchemaUuid: 'c36d2ccd-c049-4640-806e-34b012f682d8',
          answerSchemaCode: 'second_option',
          value: 'f988f76c-3d6c-4f45-aa29-7dc8d11198d7',
          text: 'Second Option',
        },
      ],
    }

    const answers = {
      '0941c5b2-f42d-4120-ad79-44954674fe00': ['YES'],
    }

    it('annotates the answer schemas for checkbox Groups when the answer is in the body', () => {
      const [theQuestion] = annotateWithAnswers([checkboxGroup], {}, answers)
      const [firstAnswer, secondAnswer] = theQuestion.answerSchemas
      expect(firstAnswer.checked).toBe(true)
      expect(secondAnswer.checked).toBe(false)
    })

    it('annotates the answer schemas for checkbox Groups when the answer exists in the backend', () => {
      const [theQuestion] = annotateWithAnswers([checkboxGroup], answers, {})
      const [firstAnswer, secondAnswer] = theQuestion.answerSchemas
      expect(firstAnswer.checked).toBe(true)
      expect(secondAnswer.checked).toBe(false)
    })

    it('only annotates selected answers when the value is "YES"', () => {
      const singleSelected = {
        '0941c5b2-f42d-4120-ad79-44954674fe00': ['YES'],
        'f988f76c-3d6c-4f45-aa29-7dc8d11198d7': ['NO'],
      }

      const [theQuestion] = annotateWithAnswers([checkboxGroup], singleSelected, {})
      const [firstAnswer, secondAnswer] = theQuestion.answerSchemas
      expect(firstAnswer.checked).toBe(true)
      expect(secondAnswer.checked).toBe(false)
    })
  })
})
