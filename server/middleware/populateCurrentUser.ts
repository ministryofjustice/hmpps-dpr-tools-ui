import { RequestHandler } from 'express'
import AsyncReportStoreService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/requestedReportsService'
import RecentlyViewedStoreService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/recentlyViewedService'
import BookmarkService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/bookmarkService'
import logger from '../../logger'
import UserService from '../services/userService'

export default function populateCurrentUser(
  userService: UserService,
  asyncReportsStore: AsyncReportStoreService,
  recentlyViewedStoreService: RecentlyViewedStoreService,
  bookmarkService: BookmarkService,
): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.user) {
        const user = res.locals.user && (await userService.getUser(res.locals.user.token))
        if (user) {
          res.locals.user = { ...user, ...res.locals.user }
        } else {
          logger.info('No user available')
        }
      }

      await asyncReportsStore.init(res.locals.user.uuid)
      await recentlyViewedStoreService.init(res.locals.user.uuid)
      await bookmarkService.init(res.locals.user.uuid)

      next()
    } catch (error) {
      logger.error(error, `Failed to retrieve user for: ${res.locals.user && res.locals.user.username}`)
      res.redirect('/sign-in')
    }
  }
}
