import { RequestHandler } from 'express'
import logger from '../../logger'
import { Services } from '../services'

export default function populateSystemToken(services: Services): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.user) {
        const { user } = res.locals
        const systemToken = res.locals.user && (await services.systemTokenService.getSystemToken(user.sub))
        if (systemToken) {
          res.locals.systemToken = systemToken
        }
      }

      next()
    } catch (error) {
      logger.error(error, `Failed to retrieve system token for user: ${res.locals.user && res.locals.user.username}`)
    }
  }
}
