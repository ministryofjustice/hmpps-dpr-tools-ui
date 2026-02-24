import { components } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/api'

const addAdditionalQueryParams = (path: string, additionalQueryParams?: Record<string, string>) => {
  if (additionalQueryParams && Object.keys(additionalQueryParams).length > 0) {
    return `${path}${createQuerystringFromObject(additionalQueryParams)}`
  }

  return path
}

const createQuerystringFromObject = (
  source: NodeJS.Dict<string | Array<string>>,
  fields?: components['schemas']['FieldDefinition'][],
) => {
  const querystring = Object.keys(source)
    .flatMap((key: string) => {
      const fieldDef = fields?.find(f => `filters.${f.name}` === key)
      const value = source[key] || ''

      if (Array.isArray(value)) {
        return value.map(v => `${encodeURI(key)}=${encodeURI(v)}`)
      }

      if (fieldDef && fieldDef.filter && fieldDef.filter.type.toLowerCase() === 'multiselect') {
        const values = value.split(',')
        return values.map(v => {
          return `${encodeURI(key)}=${encodeURI(v)}`
        })
      }

      return [`${encodeURI(key)}=${encodeURI(value)}`]
    })
    .join('&')

  return `?${querystring}`
}

export const reportDefinitionsToCards = (
  reportDefinitions: Array<components['schemas']['ReportDefinitionSummary']>,
  pathPrefix: string,
  additionalQueryParams?: NodeJS.Dict<string>,
) => {
  return reportDefinitions.map((d: components['schemas']['ReportDefinitionSummary']) => ({
    text: d.name,
    href: addAdditionalQueryParams(`${pathPrefix}/${d.id}`, additionalQueryParams),
    description: d.description,
  }))
}

export const variantDefinitionsToCards = (
  reportDefinition: components['schemas']['ReportDefinitionSummary'],
  pathPrefix: string,
  additionalQueryParams?: NodeJS.Dict<string>,
) => {
  let suffix = ''
  if (pathPrefix === '/async-reports') suffix = '/request'

  return reportDefinition.variants.map((v: components['schemas']['VariantDefinitionSummary']) => ({
    text: v.name,
    href: addAdditionalQueryParams(`${pathPrefix}/${reportDefinition.id}/${v.id}${suffix}`, additionalQueryParams),
    description: v.description,
  }))
}
