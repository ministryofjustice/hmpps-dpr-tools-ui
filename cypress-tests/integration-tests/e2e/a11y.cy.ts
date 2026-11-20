import IndexPage from '../../common/pages'
import Page from '../../common/pages/page'
import RequestPage from '../../common/pages/requestPage'
import { terminalLog } from '../support/a11yUtil'

context('Passes a11y checks', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubProductCollections')
    cy.task('stubExternalMovements')
    cy.task('stubDefinitionExternalMovements')
    cy.task('stubExternalMovementsCount')
    cy.task('stubDefinitions')
    cy.task('stubDefinition')
    cy.task('stubUserCaseload')
    cy.task('stubPrisonComponents')
  })

  it('Index page', () => {
    cy.signIn()
    Page.verifyOnPage(IndexPage)

    cy.injectAxe()
    cy.configureAxe({
      rules: [
        {
          id: 'heading-order',
          enabled: false,
        },
      ],
    })
    cy.checkA11y(undefined, undefined, terminalLog)
  })

  it('Report request', () => {
    cy.signIn()
    Page.verifyOnPage(IndexPage).reportLinks().first().click()
    Page.verifyOnPage(RequestPage)

    cy.injectAxe()
    cy.configureAxe({
      rules: [
        {
          id: 'heading-order',
          enabled: false,
        },
      ],
    })
    cy.checkA11y(undefined, undefined, terminalLog)
  })
})
