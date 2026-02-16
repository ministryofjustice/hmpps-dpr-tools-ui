import { RequestHandler } from 'express'
import logger from '../../logger'
import { Services } from '../services'

export default function populateSystemToken(services: Services): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.dprUser) {
        const { dprUser } = res.locals
       
        const userName = dprUser.userName
        const systemToken = res.locals.user && (await services.systemTokenService.getSystemToken(userName))
        logger.info('got system token ' + systemToken)
        if (systemToken) {
           res.locals.systemToken = systemToken
           //set it on the dpr user ?
          dprUser.systemToken = systemToken
          res.locals.dprUser = dprUser
        }
      }

      next()
    } catch (error) {
      logger.error(error, `Failed to retrieve system token for user: ${res.locals.user && res.locals.user.username}`)
    }
  }
}