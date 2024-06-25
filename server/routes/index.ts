import { type RequestHandler, Router } from 'express'
import addAsyncReportingRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/asyncReports'
import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'

export default function routes(services: Services): Router {
  const router = Router()

  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

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

  addAsyncReportingRoutes({
    router,
    asyncReportsStore: services.asyncReportsStore,
    recentlyViewedStoreService: services.recentlyViewedStoreService,
    dataSources: services.reportingService,
    layoutPath: '../../../../../dist/server/views/partials/layout.njk',
    templatePath: 'dpr/views/',
  })

  return router
}
