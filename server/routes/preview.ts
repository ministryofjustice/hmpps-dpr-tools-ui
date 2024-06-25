import { NextFunction, Request, type RequestHandler, Response, Router } from 'express'
import multer from 'multer'
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'
import CardUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/card-group/utils'
import AsyncReportslistUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/async-reports-list/utils'
import { components } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/api'
import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'

export default function routes(services: Services): Router {
  const router = Router()

  const populateDefinitions = (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      services.reportingClient.getDefinitions(res.locals.user.token).then(definitions => {
        res.locals.reports = definitions

        if (req.params.definitionId) {
          const definition = definitions.find(d => d.id === req.params.definitionId)
          if (!definition) {
            next(`Definition ID not found: ${req.params.definitionId}`)
          }
          res.locals.report = definition

          if (req.params.variantId) {
            const variant = definition.variants.find(v => v.id === req.params.variantId)
            if (!variant) {
              next(`Variant ID not found: ${req.params.definitionId}`)
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
          cards: {
            items: [
              {
                text: 'Preview reports',
                href: '/preview',
                description: 'Preview report definitions',
              },
            ],
            variant: 1,
          },
        },
      ],
    })
  })

  get('/preview', async (req, res) => {
    const reportDefinitions: Array<components['schemas']['ReportDefinitionSummary']> = res.locals.reports

    res.render('pages/preview', {
      title: 'Preview Reports',
      cards: { items: CardUtils.reportDefinitionsToCards(reportDefinitions, '/preview/definitions'), variant: 1 },
      definitions: reportDefinitions.map(definition => ({
        value: definition.id,
        text: definition.name,
      })),
      errorSummary: req.query.errorSummary,
      errorMessage: req.query.errorMessage,
      breadCrumbList: [{ title: 'Home', href: '/' }],
      ...(await AsyncReportslistUtils.renderList({
        recentlyViewedStoreService: services.recentlyViewedStoreService,
        asyncReportsStore: services.asyncReportsStore,
        dataSources: services.reportingService,
        res,
        maxRows: 6,
      })),
    })
  })

  get('/preview/definitions/:definitionId', (req, res) => {
    const reportDefinition: components['schemas']['ReportDefinitionSummary'] = res.locals.report

    res.render('pages/card', {
      title: reportDefinition.name,
      groups: [
        {
          cards: { items: CardUtils.variantDefinitionsToCards(reportDefinition, '/preview/definitions'), variant: 1 },
        },
      ],
      breadCrumbList: [
        { title: 'Home', href: '/' },
        { title: 'Preview reports', href: '/preview' },
      ],
    })
  })

  get('/preview/definitions/:definitionId/:variantId', (req, res, next) => {
    const { token } = res.locals.user

    services.reportingClient
      .getDefinition(token, req.params.definitionId, req.params.variantId)
      .then(reportDefinition => {
        switch (reportDefinition.variant.specification.template) {
          case 'list':
            ReportListUtils.renderListWithData({
              title: `${reportDefinition.name} - ${reportDefinition.variant.name}`,
              variantDefinition: reportDefinition.variant,
              request: req,
              response: res,
              next,
              getListDataSources: reportQuery => ({
                data: services.reportingClient.getList(reportDefinition.variant.resourceName, token, reportQuery),
                count: services.reportingClient.getCount(reportDefinition.variant.resourceName, token, reportQuery),
              }),
              otherOptions: {
                breadCrumbList: [
                  { title: 'Home', href: '/' },
                  { title: 'Preview reports', href: '/preview' },
                  { title: reportDefinition.name, href: `/preview/definitions/${reportDefinition.id}` },
                ],
              },
              layoutTemplate: 'partials/layout.njk',
              dynamicAutocompleteEndpoint: `/preview/values/${reportDefinition.id}/${reportDefinition.variant.id}/{fieldName}?prefix={prefix}`,
            })
            break

          default:
            next(
              `Unrecognised template: '${reportDefinition.variant.specification.template}', currently only 'list' is supported.`,
            )
        }
      })
  })

  router.post('/preview/delete', (req, res) => {
    const deleteDefinitionId = req.body.deleteDefinition
    const { token } = res.locals.user

    services.previewClient.deleteDefinition(deleteDefinitionId, token).then(() => {
      res.redirect('/preview')
    })
  })

  router.post('/preview/download', (req, res) => {
    const downloadDefinitionId = req.body.downloadDefinition
    const { token } = res.locals.user

    services.previewClient.downloadDefinition(downloadDefinitionId, token).then(result => {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-disposition', `attachment; filename=${downloadDefinitionId}.json`)
      res.end(result.text)
    })
  })

  const storage = multer.memoryStorage()
  const upload = multer({ storage })

  router.post('/preview/upload', upload.single('uploadDefinition'), (req, res) => {
    const definition = req.file
    const { token } = res.locals.user

    const definitionBody = definition.buffer.toString()
    const definitionId = JSON.parse(definitionBody).id

    services.previewClient
      .uploadDefinition(definitionId, definitionBody, token)
      .then(() => {
        res.redirect('/preview')
      })
      .catch(reason => {
        let summary = 'Invalid definition'
        if (reason.status !== 400) {
          summary = 'Upload failed'
        }
        const message = reason.data ? reason.data.userMessage : reason.message
        res.redirect(`/preview?errorSummary=${encodeURI(summary)}&errorMessage=${encodeURI(message)}`)
      })
  })

  get('/preview/values/:definitionId/:variantId/:fieldName', (req, res, next) => {
    services.reportingClient
      .getFieldValues({
        token: res.locals.user.token,
        definitionName: req.params.definitionId,
        variantName: req.params.variantId,
        fieldName: req.params.fieldName,
        prefix: req.query.prefix.toString(),
      })
      .then(result => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result))
      })
      .catch(err => {
        next(err)
      })
  })

  return router
}
