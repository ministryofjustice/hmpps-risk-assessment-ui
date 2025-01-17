const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
// eslint-disable-next-line import/no-unresolved
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit')
const { configureVisualRegression } = require('cypress-visual-regression')

const viewportWidth = 1740
const viewportHeight = 1200

module.exports = defineConfig({
  chromeWebSecurity: false,
  execTimeout: 15000,
  taskTimeout: 15000,
  watchForFileChanges: false,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 100000,
  requestTimeout: 30000,
  responseTimeout: 50000,
  viewportWidth,
  viewportHeight,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, cypress-circleci-reporter',
  },
  video: false,
  e2e: {
    testIsolation: true,
    specPattern: '**/*.feature',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    async setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        const options = { ...launchOptions }
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          options.args.push(`--window-size=${viewportWidth},${viewportHeight}`)
          options.args.push('--force-device-scale-factor=1')
          options.args.push('--incognito')
        }
        prepareAudit(options)
        return options
      })

      await addCucumberPreprocessorPlugin(on, config)

      configureVisualRegression(on)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      )

      on('task', {
        lighthouse: lighthouse((lighthouseReport) => {
          // eslint-disable-next-line no-console
          console.log(lighthouseReport)
        }),
        pa11y: pa11y((pa11yReport) => {
          // eslint-disable-next-line no-console
          console.log(pa11yReport)
        }),
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message)
          return null
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message)
          return null
        },
      })

      return config
    },
  },
  env: {
    visualRegressionType: 'regression',
    visualRegressionFailSilently: true,
    pluginVisualRegressionUpdateImages: true,
    pluginVisualRegressionDiffConfig: { threshold: 0.01 },
    AUTH_URL: 'http://localhost:9091/auth/oauth/token?grant_type=client_credentials&username=foobar',
    AUTH_USERNAME: '',
    AUTH_PASSWORD: '',
  },
})
