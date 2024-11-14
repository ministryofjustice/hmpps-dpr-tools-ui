import { type RequestHandler, Router } from 'express'
import addAsyncReportingRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/asyncReports'
import addRecentlyViewedRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/recentlyViewed'
import addBookmarkingRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/bookmarks'
import addDownloadRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/download'
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

  const libRouteParams = {
    router,
    services,
    layoutPath: '../../../../../dist/server/views/partials/layout.njk',
    templatePath: 'dpr/views/',
  }

  addAsyncReportingRoutes(libRouteParams)
  addRecentlyViewedRoutes(libRouteParams)
  addBookmarkingRoutes(libRouteParams)
  addDownloadRoutes(libRouteParams)

  // //

  return router
}
