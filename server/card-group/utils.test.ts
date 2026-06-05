import { expect } from '@jest/globals'
import { components } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/api'
import { reportDefinitionsToCards, variantDefinitionsToCards } from './utils'

describe('reportDefinitionsToCards', () => {
  it('Maps correctly', () => {
    const report: components['schemas']['ReportDefinitionSummary'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [],
      authorised: true,
    }
    const mapped = reportDefinitionsToCards([report], '/prefix')

    expect(mapped).toEqual([
      {
        text: 'Two',
        href: `/prefix/one`,
        description: 'Three',
      },
    ])
  })

  it('Maps correctly with dataProductDefinitionsPath', () => {
    const report: components['schemas']['ReportDefinitionSummary'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [],
      authorised: true,
    }
    const mapped = reportDefinitionsToCards([report], '/prefix', { dataProductDefinitionsPath: 'test-location' })

    expect(mapped).toEqual([
      {
        text: 'Two',
        href: `/prefix/one?dataProductDefinitionsPath=test-location`,
        description: 'Three',
      },
    ])
  })
})

describe('variantDefinitionsToCards', () => {
  it('Maps correctly', () => {
    const report: components['schemas']['ReportDefinitionSummary'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      authorised: true,
      variants: [
        {
          id: 'four',
          name: 'Five',
          description: 'Six',
          isMissing: false,
        },
      ],
    }
    const mapped = variantDefinitionsToCards(report, '/prefix')

    expect(mapped).toEqual([
      {
        text: 'Five',
        href: `/prefix/one/four`,
        description: 'Six',
      },
    ])
  })

  it('Maps correctly with dataProductDefinitionsPath', () => {
    const report: components['schemas']['ReportDefinitionSummary'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [
        {
          id: 'four',
          name: 'Five',
          description: 'Six',
          isMissing: false,
        },
      ],
      authorised: true,
    }
    const mapped = variantDefinitionsToCards(report, '/prefix', { dataProductDefinitionsPath: 'test-location' })

    expect(mapped).toEqual([
      {
        text: 'Five',
        href: `/prefix/one/four?dataProductDefinitionsPath=test-location`,
        description: 'Six',
      },
    ])
  })
})
