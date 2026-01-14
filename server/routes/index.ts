import { type RequestHandler, Router } from 'express'
import dprPlatformRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes'
import process from 'process'
import { Environment as NunjucksEnvironment } from 'nunjucks'
import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'

export default function routes(services: Services, nunjucksEnvironment: NunjucksEnvironment): Router {
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

  const cwd = process.cwd()
  router.use(
    '/',
    dprPlatformRoutes({
      services,
      layoutPath: `${cwd}/dist/server/views/partials/layout.njk`,
    }),
  )

  return router
}
