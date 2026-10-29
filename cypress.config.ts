/* eslint-disable no-console */

import { defineConfig } from 'cypress'
import auth from './cypress-tests/integration-tests/mockApis/auth'
import frontendComponents from './cypress-tests/integration-tests/mockApis/frontendComponents'
import manageUsers from './cypress-tests/integration-tests/mockApis/manageUsers'
import reports from './cypress-tests/integration-tests/mockApis/reports'
import tokenVerification from './cypress-tests/integration-tests/mockApis/tokenVerification'
import { resetStubs } from './cypress-tests/integration-tests/mockApis/wiremock'

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'cypress-tests/integration-tests/fixtures',
  screenshotsFolder: 'cypress-tests/integration-tests/screenshots',
  videosFolder: 'cypress-tests/integration-tests/videos',
  taskTimeout: 60000,
  video: true,
  e2e: {
    env: {
      prisonBaseUrl: 'http://localhost:3007',
      probationBaseUrl: 'http://localhost:3005',
    },
    setupNodeEvents(on) {
      on('task', {
        reset: resetStubs,
        ...auth,
        ...tokenVerification,
        ...reports,
        ...manageUsers,
        ...frontendComponents,
        log(message) {
          console.log(message)

          return null
        },
        table(message) {
          console.table(message)

          return null
        },
      })
    },
    baseUrl: 'http://localhost:3007',
    excludeSpecPattern: '**/!(*.cy).ts',
    specPattern: 'cypress-tests/integration-tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress-tests/integration-tests/support/index.ts',
  },
})
