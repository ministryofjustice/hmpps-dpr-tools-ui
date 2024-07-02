import Page, { PageElement } from './page'

export default class PreviewPage extends Page {
  constructor() {
    super('Preview Reports')
  }

  openControls = (): PageElement => cy.get('#previewControls')

  uploadDefinitionAccordionButton = (): PageElement => cy.get('button[aria-controls="-content-1"]')

  uploadDefinitionInput = (): PageElement => cy.get('#uploadDefinition')

  uploadDefinitionSubmit = (): PageElement => cy.get('#upload-definition-form-submit')

  errorMessageTitle = (): PageElement => cy.get('.govuk-error-summary__title')

  errorMessageDescription = (): PageElement => cy.get('.govuk-error-summary__body')
}
