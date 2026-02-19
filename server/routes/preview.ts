import { NextFunction, Request, type RequestHandler, Response, Router } from 'express'
import multer from 'multer'
import CatalogueUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/catalogueUtils'
import UserReportsListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/userReportsListUtils'
import { components } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/api'
import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'
import { reportDefinitionsToCards, variantDefinitionsToCards } from '../card-group/utils'

CatalogueUtils.initCatalogue = jest.fn()
UserReportsListUtils.initUserReports = jest.fn()

export default function routes(services: Services): Router {
  const router = Router()

  const populateDefinitions = (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      services.reportingService.getDefinitions(res.locals.user.token).then(definitions => {
        res.locals.reports = definitions

        if (req.params.definitionId) {
          const definition = definitions.find(d => d.id === req.params.definitionId)
          if (!definition) {
            next(`Definition ID not found: ${req.params.definitionId}`)
            return
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
    const catalogue = await CatalogueUtils.initCatalogue({ res, services })
    const userReportsLists = await UserReportsListUtils.initUserReports({ res, services })

    // Preview tool component
    const reportDefinitions: Array<components['schemas']['ReportDefinitionSummary']> = res.locals.reports
    const toolDefinitions = reportDefinitions.map(definition => ({
      value: definition.id,
      text: definition.name,
    }))
    const { errorSummary, errorMessage } = req.query

    res.render('pages/preview', {
      title: 'Preview Reports',
      cards: { items: reportDefinitionsToCards(reportDefinitions, '/preview/definitions'), variant: 1 },
      definitions: toolDefinitions,
      errorSummary,
      errorMessage,
      breadCrumbList: [{ title: 'Home', href: '/' }],
      userReportsLists,
      catalogue,
    })
  })

  get('/preview/definitions/:definitionId', (req, res) => {
    const reportDefinition: components['schemas']['ReportDefinitionSummary'] = res.locals.report

    res.render('pages/card', {
      title: reportDefinition.name,
      groups: [
        {
          cards: { items: variantDefinitionsToCards(reportDefinition, '/async-reports'), variant: 1 },
        },
      ],
      breadCrumbList: [
        { title: 'Home', href: '/' },
        { title: 'Preview reports', href: '/preview' },
      ],
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

  return router
}
