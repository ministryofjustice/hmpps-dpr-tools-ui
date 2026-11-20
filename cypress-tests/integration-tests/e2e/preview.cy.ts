import IndexPage from '../pages/index'
import Page from '../pages/page'
import PreviewPage from '../pages/preview'

context('Preview', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserCaseload')
    cy.task('stubDefinitions')
  })

  it('User can navigate from Index to Preview Reports', () => {
    cy.task('stubUploadDefinitionSuccess')
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.previewReportCardLink().click()
    Page.verifyOnPage(PreviewPage)
  })

  it('User can upload a new definition', () => {
    cy.task('stubUploadDefinitionSuccess')
    cy.signIn()
    cy.visit('/preview')
    const page = Page.verifyOnPage(PreviewPage)
    page.openControls().click()
    page.uploadDefinitionAccordionButton().click()
    page.uploadDefinitionInput().selectFile({
      contents: Cypress.Buffer.from('{ "id": "success" }'),
      fileName: 'file.json',
      lastModified: Date.now(),
    })
    page.uploadDefinitionSubmit().click()

    page.errorMessageTitle().should('not.exist')
  })

  it('User sees messages when uploading a new definition errors', () => {
    cy.task('stubUploadDefinitionFailure')
    cy.signIn()
    cy.visit('/preview')
    const page = Page.verifyOnPage(PreviewPage)
    page.openControls().click()
    page.uploadDefinitionAccordionButton().click()
    page.uploadDefinitionInput().selectFile({
      contents: Cypress.Buffer.from('{ "id": "timeout" }'),
      fileName: 'file.json',
      lastModified: Date.now(),
    })
    page.uploadDefinitionSubmit().click()

    page.errorMessageTitle().should('contain.text', 'Upload failed')
    page.errorMessageDescription().should('contain.text', '$.report[0].id')
    page.errorMessageDescription().should('contain.text', 'A required field is missing')

    page.errorMessageDescription().should('contain.text', '$.report[0].specification.field[1].sortable')
    page.errorMessageDescription().should('contain.text', '.....isible\":\"true\",\"sortable\":null,\"defaultsort\":true},{\"name\":\".....')
    page.errorMessageDescription().should('contain.text', 'This field has an invalid value')
  })

  it('User sees message when uploading a new definition times out', () => {
    cy.task('stubUploadDefinitionTimeout')
    cy.signIn()
    cy.visit('/preview')
    const page = Page.verifyOnPage(PreviewPage)
    page.openControls().click()
    page.uploadDefinitionAccordionButton().click()
    page.uploadDefinitionInput().selectFile({
      contents: Cypress.Buffer.from('{ "id": "timeout" }'),
      fileName: 'file.json',
      lastModified: Date.now(),
    })
    page.uploadDefinitionSubmit().click()

    page.errorMessageTitle().should('contain.text', 'Upload failed')
    page.errorMessageDescription().should('contain.text', 'Timeout of 2000ms exceeded')
  })
})
