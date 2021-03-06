require('dotenv').config()

const production = process.env.NODE_ENV === 'production'

function bool(v) {
  return v in ['true', '1', 'on', 'yes']
}

function get(name, fallback, options = {}) {
  const value = process.env[name]
  if (value) {
    const { parser } = options
    return parser ? parser(value) : value
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

module.exports = {
  apis: {
    hmppsAssessments: {
      url: get('HMPPS_ASSESSMENT_API_URL', 'http://localhost:9191', true),
      timeout: {
        response: get('HMPPS_ASSESSMENT_API_ENDPOINT_TIMEOUT_RESPONSE', 120000, true),
        deadline: get('HMPPS_ASSESSMENT_API_TIMEOUT_DEADLINE', 120000, true),
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000,
      },
    },
    offenderAssessments: {
      url: get('OFFENDER_ASSESSMENT_API_URL', 'http://localhost:9191', true),
      timeout: {
        response: get('OFFENDER_ASSESSMENT_API_ENDPOINT_TIMEOUT_RESPONSE', 20000, true),
        deadline: get('OFFENDER_ASSESSMENT_API_TIMEOUT_DEADLINE', 20000, true),
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000,
      },
    },
    oauth: {
      url: get('OAUTH_ENDPOINT_URL', 'http://localhost:9191/auth', true),
      timeout: {
        response: get('OAUTH_API_ENDPOINT_TIMEOUT_RESPONSE', 10000, true),
        deadline: get('OAUTH_API_TIMEOUT_DEADLINE', 10000, true),
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000,
        verifyToken: get('OAUTH_VERIFY_TOKEN', true),
      },
    },
  },
  domain: `${get('INGRESS_URL', 'http://localhost:3000', true)}`,
  https: production,
  loggingLevel: get('LOGGING_LEVEL', 'info'),
  correlationHeader: get('CORRELATION_HEADER_NAME', 'x-request-id'),
  clsNamespace: get('CLS_NAMESPACE', 'uk.gov.digital.hmpps.service-name'),
  applicationInsights: {
    instrumentationKey: get('APPINSIGHTS_INSTRUMENTATIONKEY', ''),
    disabled: get('APPINSIGHTS_DISABLE', false, { parser: bool }),
    internalLogging: get('APPINSIGHTS_LOGGING', false, { parser: bool }),
  },
  redis: {
    host: get('REDIS_HOST', 'localhost', true),
    port: parseInt(get('REDIS_PORT', '6379'), 10),
    password: get('REDIS_PASSWORD', '', true),
    tls_enabled: get('REDIS_TLS_ENABLED', 'false', true),
  },
  authClientId: get('AUTH_CLIENT_ID', 'clientId'),
  authClientSecret: get('AUTH_CLIENT_SECRET', 'clientSecret'),
  apiClientId: get('API_CLIENT_ID', 'clientId'),
  apiClientSecret: get('API_CLIENT_SECRET', 'clientSecret'),
  sessionSecret: get('SESSION_SECRET', 'superSecret'),
  dev: {
    devAssessmentId: get('DEV_ASSESSMENT_ID', 'fb6b7c33-07fc-4c4c-a009-8d60f66952c4'),
    devPreSentenceQuestionGroupId: get('DEV_PRE_SENTENCE_QUESTION_GROUP_ID', '65a3924c-4130-4140-b7f4-cc39a52603bb'),
  },
}
