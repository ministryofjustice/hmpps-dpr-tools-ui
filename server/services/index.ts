import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import AsyncReportStoreService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/requestedReportsService'
import RecentlyViewedStoreService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/recentlyViewedService'
import BookmarkService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/bookmarkService'
import ReportingService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/reportingService'
import { Services as dprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/Services'
import DashboardService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/dashboardService'
import MetricService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/metricsService'
import { dataAccess } from '../data'
import UserService from './userService'
import config from '../config'
import PreviewClient from '../data/previewClient'
import { ApplicationInfo } from '../applicationInfo'

export const services = (): Services => {
  const { applicationInfo, hmppsManageUsersClient, userDataStore } = dataAccess()

  const userService = new UserService(hmppsManageUsersClient)

  const reportingClient = new ReportingClient({
    url: config.apis.report.url,
    agent: {
      timeout: config.apis.report.timeout,
    },
  })

  const previewClient = new PreviewClient({
    url: config.apis.report.url,
    agent: {
      timeout: config.apis.report.timeout,
    },
  })

  const reportingService = new ReportingService(reportingClient)
  const asyncReportsStore = new AsyncReportStoreService(userDataStore)
  const recentlyViewedStoreService = new RecentlyViewedStoreService(userDataStore)
  const bookmarkService = new BookmarkService(userDataStore)

  // TODO: Plumb in real data clients.
  const metricService = new MetricService(null)
  const dashboardService = new DashboardService(null)

  return {
    applicationInfo,
    userService,
    reportingClient,
    previewClient,
    asyncReportsStore,
    recentlyViewedStoreService,
    reportingService,
    bookmarkService,
    metricService,
    dashboardService,
  }
}

export type Services = dprServices & {
  applicationInfo: ApplicationInfo
  userService: UserService
  reportingClient: ReportingClient
  previewClient: PreviewClient
}

export { UserService }
