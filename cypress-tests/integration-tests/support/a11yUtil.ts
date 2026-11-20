import * as axe from 'axe-core'

export const terminalLog = (violations: axe.Result[]) => {
    const violationData = violations.map(({ id, impact, help, helpUrl, nodes }) => ({
      id,
      impact,
      help,
      helpUrl,
      nodes: nodes.length,
    }))

    if (violationData.length > 0) {
      cy.task('log', 'Violation summary')
      cy.task('table', violationData)

      cy.task('log', 'Violation detail')
      cy.task('log', '----------------')

      violations.forEach(v => {
        v.nodes.forEach(node => {
          cy.task('log', node.failureSummary)
          cy.task('log', `Impact: ${node.impact}`)
          cy.task('log', `Target: ${node.target}`)
          cy.task('log', `HTML: ${node.html}`)
          cy.task('log', '----------------')
        })
      })
    }
  }