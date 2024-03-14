import { type RequestHandler, Router } from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'

export default function routes(): Router {
  const router = Router()

  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/edit', (req, res) => {
    res.render('pages/edit', {
      title: 'Edit DPD',
    })
  })

  return router
}
