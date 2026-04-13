import { Router } from 'express'
import type { Services } from '../services'
import { createRouter } from '@modular-data/hmpps-authoring-lib-ui'

export default function setUpAuthoring(services: Services): Router {
    const router = Router({ mergeParams: true })
    const authoringRouter = createRouter(services.authoringServices)

    router.use('/authoring', authoringRouter)
    return router
}