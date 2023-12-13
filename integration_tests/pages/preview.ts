import Page, { PageElement } from './page'

export default class PreviewPage extends Page {
  constructor() {
    super('Preview Reports')
  }

  uploadDefinitionAccordionButton = (): PageElement => cy.get('.govuk-accordion__section-toggle-text:first-child')

  uploadDefinitionInput = (): PageElement => cy.get('#uploadDefinition')

  uploadDefinitionSubmit = (): PageElement => cy.get('#upload-definition-form-submit')

  errorMessageTitle = (): PageElement => cy.get('.govuk-error-summary__title')

  errorMessageDescription = (): PageElement => cy.get('.govuk-error-summary__body')
}
