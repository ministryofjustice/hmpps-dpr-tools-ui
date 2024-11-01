import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import MetricsClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/metricsClient'
import DashboardClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dashboardClient'
import RequestedReportService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/requestedReportService'
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
  const apiConfig = {
    url: config.apis.report.url,
    agent: {
      timeout: config.apis.report.timeout,
    },
  }
  const reportingClient = new ReportingClient(apiConfig)
  const metricsClient = new MetricsClient(apiConfig)
  const dashboardClient = new DashboardClient(apiConfig)
  const previewClient = new PreviewClient(apiConfig)

  const reportingService = new ReportingService(reportingClient)
  const requestedReportService = new RequestedReportService(userDataStore)
  const recentlyViewedService = new RecentlyViewedStoreService(userDataStore)
  const bookmarkService = new BookmarkService(userDataStore)
  const metricService = new MetricService(metricsClient)
  const dashboardService = new DashboardService(dashboardClient)

  return {
    applicationInfo,
    userService,
    reportingClient,
    previewClient,
    requestedReportService,
    recentlyViewedService,
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
