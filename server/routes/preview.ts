import { NextFunction, Request, type RequestHandler, Response, Router } from 'express'
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'
import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/data/reportingClient'
import { components } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/api'
import asyncMiddleware from '../middleware/asyncMiddleware'

export default function routes(reportingClient: ReportingClient): Router {
  const router = Router()

  const populateDefinitions = (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      reportingClient.getDefinitions(res.locals.user.token).then(definitions => {
        res.locals.reports = definitions

        if (req.params.definitionId) {
          const definition = definitions.find(d => d.id === req.params.definitionId)
          if (!definition) {
            next(`Definition ID not found: ${req.params.definitionId}`)
          }
          res.locals.report = definition

          if (req.params.variantId) {
            const variant = definition.variants.find(v => v.id === req.params.variantId)
            if (!definition) {
              next(`Definition ID not found: ${req.params.definitionId}`)
            }
            res.locals.variant = variant
          }
        }

        next()
      }),
    ).catch(next)
  }

  const get = (path: string | string[], handler: RequestHandler) =>
    router.get(path, populateDefinitions, asyncMiddleware(handler))

  get('/', (req, res) => {
    res.render('pages/card', {
      title: 'DPR Tools',
      groups: [
        {
          cards: [
            {
              text: 'Preview reports',
              href: '/preview',
              description: 'Preview report definitions',
            },
          ],
        },
      ],
    })
  })

  get('/preview', (req, res) => {
    const reportDefinitions: Array<components['schemas']['ReportDefinition']> = res.locals.reports

    res.render('pages/card', {
      title: 'Preview Reports',
      groups: [
        {
          cards: [
            {
              text: 'Upload',
              href: '/preview/upload',
              description: 'Upload a report definition',
            },
          ],
        },
        {
          title: 'Definition Previews',
          cards: reportDefinitions.map(definition => ({
            text: definition.name,
            description: definition.description,
            href: `/preview/definitions/${definition.id}`,
          })),
        },
      ],
    })
  })

  get('/preview/definitions/{definitionId}', (req, res) => {
    const reportDefinition: components['schemas']['ReportDefinition'] = res.locals.report

    res.render('pages/card', {
      title: 'Preview Reports - ',
      groups: [
        {
          cards: [
            {
              text: 'Upload',
              href: '/preview/upload',
              description: 'Upload a report definition',
            },
          ],
        },
        {
          title: 'Definition Previews',
          cards: reportDefinition.variants.map(variant => ({
            text: variant.name,
            description: variant.description,
            href: `/preview/definitions/${req.params.definitionId}/${variant.id}`,
          })),
          breadCrumbList: [{ text: 'Preview reports', href: '/preview' }],
        },
      ],
    })
  })

  get('/preview/definitions/{definitionId}/{variantId}', (req, res, next) => {
    const reportDefinition: components['schemas']['ReportDefinition'] = res.locals.report
    const variantDefinition: components['schemas']['VariantDefinition'] = res.locals.variant
    const { resourceName } = variantDefinition
    const { token } = res.locals.user

    switch (variantDefinition.specification.template) {
      case 'list':
        ReportListUtils.renderListWithData({
          title: `${reportDefinition.name} - ${variantDefinition.name}`,
          fields: variantDefinition.specification.fields,
          request: req,
          response: res,
          next,
          getListDataSources: reportQuery => ({
            data: reportingClient.getList(resourceName, token, reportQuery),
            count: reportingClient.getCount(resourceName, token, reportQuery),
          }),
          otherOptions: {
            breadCrumbList: [
              { text: 'Preview reports', href: '/preview' },
              { text: reportDefinition.name, href: `/preview/definitions/${reportDefinition.id}` },
            ],
          },
          layoutTemplate: 'partials/layout.njk',
        })
        break

      default:
        next()
    }
  })

  return router
}
