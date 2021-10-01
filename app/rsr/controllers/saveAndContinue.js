const { Controller } = require('hmpo-form-wizard')
const nunjucks = require('nunjucks')
const { postAnswers, getFlatAssessmentQuestions } = require('../../../common/data/hmppsAssessmentApi')
const { logger } = require('../../../common/logging/logger')
const { customValidations } = require('../fields')
const { processReplacements } = require('../../../common/utils/util')

const getErrorMessage = reason => {
  if (reason === 'OASYS_PERMISSION') {
    return 'You do not have permission to update this type of assessment. Speak to your manager and ask them to request a change to your level of authorisation.'
  }

  return 'Something went wrong'
}

const pageValidationErrorsFrom = (validationErrors, serverErrors = []) => {
  const errors = Object.values(validationErrors).reduce(
    (otherErrors, currentError) => ({
      validationErrors: { ...otherErrors.validationErrors, [currentError.key]: { text: currentError.message } },
      errorSummary: [
        ...otherErrors.errorSummary,
        {
          text: currentError.message,
          href: `#${[currentError.key]}-error`,
        },
      ],
    }),
    { validationErrors: {}, errorSummary: [] },
  )

  const processedServerErrors = serverErrors.map(errorMessage => ({
    text: errorMessage,
    href: `#`,
  }))

  return {
    validationErrors: errors.validationErrors,
    errorSummary: [...processedServerErrors, ...errors.errorSummary],
  }
}

const withAnswersFrom = answers => ([fieldName, fieldProperties]) => {
  if (fieldProperties.answerType === 'radio') {
    const checkedAnswer = answers[fieldName]
    return {
      ...fieldProperties,
      answerSchemas: fieldProperties.answerSchemas.map(answerSchema => ({
        ...answerSchema,
        checked: checkedAnswer === answerSchema.value,
      })),
    }
  }

  if (fieldProperties.answerType === 'checkbox') {
    const selected = answers[fieldName] || []
    return {
      ...fieldProperties,
      answerSchemas: fieldProperties.answerSchemas.map(answerSchema => ({
        ...answerSchema,
        selected: selected.includes(answerSchema.value),
      })),
    }
  }

  const answer = answers[fieldName] || ''

  return {
    ...fieldProperties,
    answer,
  }
}

const fieldFrom = (localField, questionSchemaDto = {}) => {
  const validationRules = [...localField.validate]
  if (
    questionSchemaDto.mandatory &&
    localField.validate.filter(validationRule => validationRule.type === 'required').length === 0
  ) {
    const remoteValidationRules = questionSchemaDto.validation ? JSON.parse(questionSchemaDto.validation) : {}
    const { mandatory = {} } = remoteValidationRules
    validationRules.push({
      type: 'required',
      message: mandatory.errorMessage || `[PLACEHOLDER] ${questionSchemaDto.questionText} is mandatory`,
    })
  }

  return {
    conditional: questionSchemaDto.conditional || false,
    readOnly: questionSchemaDto.readOnly || false,
    questionCode: questionSchemaDto.questionCode,
    questionText: questionSchemaDto.questionText,
    helpText: questionSchemaDto.helpText,
    referenceDataTargets: questionSchemaDto.referenceDataTargets,
    answerType: questionSchemaDto.answerType,
    answerSchemas: questionSchemaDto.answerSchemas,
    validate: validationRules,
    dependent: localField.dependent,
    answer: '',
  }
}

const keysByQuestionCode = (otherQuestions, currentQuestion) => ({
  ...otherQuestions,
  [currentQuestion.questionCode]: currentQuestion,
})

const combinedLocalFieldsWith = remoteQuestions => (otherFields, [questionCode, localQuestion]) => ({
  ...otherFields,
  [questionCode]: fieldFrom(localQuestion, remoteQuestions[questionCode]),
})

const combineDateFields = (formValues = {}) => {
  const dateFieldPattern = /-(day|month|year)$/
  const whereDateField = key => dateFieldPattern.test(key)

  const dateFieldNames = Object.keys(formValues).filter(whereDateField)
  const nonDateFieldNames = Object.keys(formValues).filter(fieldName => !whereDateField(fieldName))

  const combinedDateFieldsFor = answers => (otherFields, fieldName) => {
    const dateKey = fieldName.replace(dateFieldPattern, '')

    if (answers[`${dateKey}-year`] === '' || answers[`${dateKey}-month`] === '' || answers[`${dateKey}-day`] === '') {
      return { ...otherFields, [dateKey]: '' }
    }

    const year = answers[`${dateKey}-year`]
    const month = answers[`${dateKey}-month`].toString().padStart(2, '0')
    const day = answers[`${dateKey}-day`].toString().padStart(2, '0')

    return { ...otherFields, [dateKey]: `${year}-${month}-${day}` }
  }

  const answersFrom = answers => (otherFields, fieldName) => ({ ...otherFields, [fieldName]: answers[fieldName] })

  const combinedDateFields = dateFieldNames.reduce(combinedDateFieldsFor(formValues), {})
  return nonDateFieldNames.reduce(answersFrom(formValues), combinedDateFields)
}

const answerDtoFrom = formValues =>
  Object.keys(formValues)
    .filter(fieldName => formValues[fieldName] && formValues[fieldName] !== '')
    .reduce(
      (otherFields, fieldName) => ({
        ...otherFields,
        [fieldName]: Array.isArray(formValues[fieldName]) ? formValues[fieldName] : [formValues[fieldName]],
      }),
      {},
    )

const renderConditionalQuestion = (conditionalQuestions, errors, _nunjucks = nunjucks) => answerSchema => {
  const questionsDependentOnThisAnswer = conditionalQuestions.filter(
    question => question.dependent.value === answerSchema.value,
  )

  const rendered = questionsDependentOnThisAnswer.reduce((previouslyRendered, conditionalQuestion) => {
    const validationError = errors[conditionalQuestion.questionCode]

    const questionString = JSON.stringify(conditionalQuestion)

    const errorString = validationError ? `, ${JSON.stringify(validationError)}` : ''

    const conditionalQuestionString = `
          {% from "common/templates/components/question/macro.njk" import renderQuestion %}
          {{ renderQuestion(${questionString},'',''${errorString}) }}
        `

    const renderedQuestion = _nunjucks.renderString(conditionalQuestionString).replace(/(\r\n|\n|\r)\s+/gm, '')

    return [previouslyRendered, renderedQuestion].join('')
  }, '')
  return { ...answerSchema, conditional: { html: rendered } }
}

const compileConditionalQuestions = (questions, errors) => {
  const inlineConditionalQuestions = questions.filter(
    question => question.dependent && !question.dependent.displayOutOfLine,
  )

  const groupedConditionalQuestions = inlineConditionalQuestions.reduce(
    (groups, currentQuestion) => ({
      ...groups,
      [currentQuestion.dependent.field]: [
        ...(groups[currentQuestion.dependent.field] || []),
        currentQuestion.questionCode,
      ],
    }),
    {},
  )

  return Object.entries(groupedConditionalQuestions).reduce(
    (otherQuestions, [questionCode, conditionalQuestionCodes]) => {
      const [questionSchema] = otherQuestions.filter(q => q.questionCode === questionCode)
      const conditionalQuestionSchemas = otherQuestions.filter(q => conditionalQuestionCodes.includes(q.questionCode))

      const updatedAnswerSchemas = questionSchema.answerSchemas.map(
        renderConditionalQuestion(conditionalQuestionSchemas, errors),
      )

      return [...otherQuestions, { ...questionSchema, answerSchemas: updatedAnswerSchemas }]
    },
    [...questions],
  )
}

class SaveAndContinue extends Controller {
  async locals(req, res, next) {
    res.locals.csrfToken = res.locals['csrf-token']
    delete res.locals['csrf-token']

    res.locals.assessment = req.session.assessment || {}

    const errors = req.sessionModel.get('errors') || {}
    const { validationErrors, errorSummary } = pageValidationErrorsFrom(errors)
    res.locals.errors = validationErrors
    res.locals.errorSummary = errorSummary

    const submittedAnswers = req.sessionModel.get('answers') || {}
    const questions = Object.entries(req.form.options.fields)
    const questionsWithMappedAnswers = questions.map(withAnswersFrom(submittedAnswers))
    const questionWithPreCompiledConditionals = compileConditionalQuestions(
      questionsWithMappedAnswers,
      validationErrors,
    )
    // const questionsWithCompiledConditionals = compileInlineConditionalQuestions(questionsWithMappedAnswers, res.locals.errors)
    const questionsWithReplacements = processReplacements(
      questionWithPreCompiledConditionals,
      req.session?.assessment?.subject,
    )

    res.locals.questions = questionsWithReplacements.reduce(keysByQuestionCode, {})

    super.locals(req, res, next)
  }

  // POST steps
  async configure(req, res, next) {
    const combineLocalAndRemoteFields = (fields, remoteFields) =>
      Object.entries(fields).reduce(combinedLocalFieldsWith(remoteFields), {})

    const questions = await getFlatAssessmentQuestions('RSR', req.user?.token, req.user?.id)
    const questionMap = questions.reduce(keysByQuestionCode, {})
    req.form.options.allFields = combineLocalAndRemoteFields(req.form.options.allFields, questionMap)
    req.form.options.fields = combineLocalAndRemoteFields(req.form.options.fields, questionMap)

    super.configure(req, res, next)
  }

  process(req, res, next) {
    const withValuesFrom = answers => (otherAnswers, currentField) => ({
      ...otherAnswers,
      [currentField]: answers[currentField] || '',
    })
    const filterAnswersForFields = (fields, answers) => Object.keys(fields).reduce(withValuesFrom(answers), {})

    const requestBody = req.body || {}
    const answersWithFormattedDates = combineDateFields(requestBody)
    req.form.values = filterAnswersForFields(req.form?.options?.fields, answersWithFormattedDates)
    req.sessionModel.set('answers', req.form?.values || {})
    super.process(req, res, next)
  }

  async validateFields(req, res, next) {
    // at this point makes changes to sessionModel fields to add in context specific validations
    const answers = req.sessionModel.get('answers') || {}
    const { date_first_sanction = '', total_sanctions = '' } = answers
    const offenderDob = req.session?.assessment?.subject?.dob

    req.sessionModel.options.fields = customValidations(
      req.sessionModel.options.fields,
      offenderDob,
      date_first_sanction,
      total_sanctions,
    )

    super.validateFields(req, res, next)
  }

  async saveValues(req, res, next) {
    const { user } = req
    const answers = answerDtoFrom(req.sessionModel.get('answers'))

    try {
      const [ok, response] = await postAnswers(
        req.session?.assessment?.uuid,
        'current',
        { answers },
        user?.token,
        user?.id,
      )

      if (ok) {
        return super.saveValues(req, res, next)
      }
      // errors returned from OASys
      if (response.status === 422) {
        const { validationErrors, errorSummary } = pageValidationErrorsFrom(response.errors, response.pageErrors)
        req.errors = validationErrors
        req.errorSummary = errorSummary
        // todo: add OASys errors to page and redisplay
      }
      return res.render('app/error', { subHeading: getErrorMessage(response.reason) })
    } catch (error) {
      logger.error(`Could not save to assessment ${req.session?.assessment?.uuid}, current episode, error: ${error}`)
      return res.render('app/error', { error })
    }
  }
}

module.exports = SaveAndContinue
