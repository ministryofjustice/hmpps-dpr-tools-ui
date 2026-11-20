const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

module.exports = defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'cypress-tests/acceptance-tests/fixtures',
  screenshotsFolder: 'cypress-tests/acceptance-tests/screenshots',
  videosFolder: 'cypress-tests/acceptance-tests/videos',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  taskTimeout: 60000,
  video: true,
  e2e: {
    specPattern: '**/*.acceptance.cy.ts',
    async setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler())

      // Explicitly map CI secrets — do not rely on config placeholders winning over CYPRESS_*.
      config.env.USERNAME = process.env.CYPRESS_USERNAME || ''
      config.env.PASSWORD = process.env.CYPRESS_PASSWORD || ''
      config.env.PROBATION_USERNAME = process.env.CYPRESS_PROBATION_USERNAME || ''
      config.env.PROBATION_PASSWORD = process.env.CYPRESS_PROBATION_PASSWORD || ''

      const missing = ['USERNAME', 'PASSWORD', 'PROBATION_USERNAME', 'PROBATION_PASSWORD'].filter(
        key => !config.env[key],
      )
      if (missing.length) {
        throw new Error(
          `Acceptance tests missing Cypress credentials: ${missing.join(', ')}. ` +
            'Set repo secrets CYPRESS_USERNAME, CYPRESS_PASSWORD, CYPRESS_PROBATION_USERNAME, CYPRESS_PROBATION_PASSWORD.',
        )
      }

      // Log presence only (never values) so CI can confirm secrets: inherit worked.
      console.log(
        `[acceptance] credentials present: USERNAME=${Boolean(config.env.USERNAME)} ` +
          `PASSWORD=${Boolean(config.env.PASSWORD)} ` +
          `PROBATION_USERNAME=${Boolean(config.env.PROBATION_USERNAME)} ` +
          `PROBATION_PASSWORD=${Boolean(config.env.PROBATION_PASSWORD)}`,
      )

      return config
    },
    baseUrl: 'https://dpr-tools-ui-dev.hmpps.service.justice.gov.uk/',
    supportFile: 'cypress-tests/acceptance-tests/support/index.ts',
  },
  env: {
    SIGN_IN_URL: 'sign-in-dev.hmpps.service.justice.gov.uk',
    API_BASE_URL: 'https://dpr-tools-ui-dev.hmpps.service.justice.gov.uk',
    PROBATION_BASE_URL: 'https://dpr-tools-probation-dev.hmpps.service.justice.gov.uk/',
  },
})
