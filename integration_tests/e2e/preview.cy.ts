import IndexPage from '../pages/index'
import Page from '../pages/page'
import PreviewPage from '../pages/preview'

context('Preview', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubDefinitions')
    cy.task('stubUploadDefinitionSuccess')
  })

  it('User can navigate from Index to Preview Reports', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.previewReportCardLink().click()
    Page.verifyOnPage(PreviewPage)
  })

  it('User can upload a new definition', () => {
    cy.signIn()
    cy.visit('/preview')
    const page = Page.verifyOnPage(PreviewPage)
    page.uploadDefinitionInput().selectFile({
      contents: Cypress.Buffer.from('{ "id": "success" }'),
      fileName: 'file.json',
      lastModified: Date.now(),
    })
    page.uploadDefinitionSubmit().click()
    page.uploadDefinitionSubmit().should('be.disabled')
    page.uploadDefinitionSubmit().should('have.text', 'Please wait')
  })
})
