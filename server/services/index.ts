import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import DashboardClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dashboardClient'
import ReportingService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/reportingService'
import { Services as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/Services'
import DashboardService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/dashboardService'
import createDprServices from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/ReportStoreServiceUtils'

import { dataAccess } from '../data'
import UserService from './userService'
import config from '../config'
import PreviewClient from '../data/previewClient'
import { ApplicationInfo } from '../applicationInfo'

export const services = (): Services => {
  const { applicationInfo, hmppsManageUsersClient, reportDataStore } = dataAccess()

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

  const dprServices = createDprServices({ reportingClient, dashboardClient, reportDataStore })

  return {
    applicationInfo,
    userService,
    previewClient,
    reportingClient,
    ...dprServices,
  }
}

export type Services = dprServicesType & {
  applicationInfo: ApplicationInfo
  userService: UserService
  reportingClient: ReportingClient
  previewClient: PreviewClient
}

export { UserService }
