import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import DashboardClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dashboardClient'
import ReportingService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/reportingService'
import { Services as dprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/Services'
import DashboardService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/dashboardService'
import { createUserStoreServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/StoreServiceUtils'
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
  const dashboardClient = new DashboardClient(apiConfig)
  const previewClient = new PreviewClient(apiConfig)

  const reportingService = new ReportingService(reportingClient)
  const dashboardService = new DashboardService(dashboardClient)

  const userStoreServices = createUserStoreServices(userDataStore)

  return {
    applicationInfo,
    userService,
    reportingClient,
    previewClient,
    reportingService,
    dashboardService,
    ...userStoreServices,
  }
}

export type Services = dprServices & {
  applicationInfo: ApplicationInfo
  userService: UserService
  reportingClient: ReportingClient
  previewClient: PreviewClient
}

export { UserService }
