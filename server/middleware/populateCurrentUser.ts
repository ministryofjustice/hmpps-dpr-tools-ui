import { RequestHandler } from 'express'
import { initUserStoreServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/StoreServiceUtils'
import logger from '../../logger'
import { Services } from '../services'

export default function populateCurrentUser(services: Services): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.user) {
        logger.info(`LOCAL USER: ${JSON.stringify(res.locals.user, null, 2)}`)
        const user = res.locals.user && (await services.userService.getUser(res.locals.user.token))
        if (user) {
          res.locals.user = { ...user, ...res.locals.user }
        } else {
          logger.info('No user available')
        }
      }

      await initUserStoreServices(res.locals.user.uuid, services)

      next()
    } catch (error) {
      logger.error(error, `Failed to retrieve user for: ${res.locals.user && res.locals.user.username}`)
      res.redirect('/sign-in')
    }
  }
}
