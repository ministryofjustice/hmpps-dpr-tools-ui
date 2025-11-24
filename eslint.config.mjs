import hmppsConfig from '@ministryofjustice/eslint-config-hmpps'

/**
 * Eslint linter config object
 * @typedef { import('eslint').Linter.Config } LinterConfig
 */

const defaultConfig = hmppsConfig({
  extraIgnorePaths: [
    'cypress-tests/**',
    'assets',
    'public',
    'dist',
    'oauth2-mock-server',
    'cypress.json',
    'reporter-config.json',
  ],
})

/**
 * @type {LinterConfig}
 */
const config = [
  ...defaultConfig,
  {
    rules: {
      'import/no-named-as-default': 0,
    },
  },
]

export default config
