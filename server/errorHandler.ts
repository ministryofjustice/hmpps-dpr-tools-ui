import type { Request, Response } from 'express'
import type { HTTPError } from 'superagent'
import logger from '../logger'

export default function createErrorHandler() {
  return (error: HTTPError, req: Request, res: Response): void => {
    logger.error(`Error handling request for '${req.originalUrl}', user '${res.locals.user?.username}'`, error)

    if (error.status === 401 || error.status === 403) {
      logger.info('Logging user out')
      return res.redirect('/sign-out')
    }

    res.locals.message = error.message
    res.locals.status = error.status
    res.locals.stack = error.stack

    res.status(error.status || 500)

    return res.render('pages/error')
  }
}
