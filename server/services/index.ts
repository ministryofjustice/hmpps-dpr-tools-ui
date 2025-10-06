import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import { Services as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/Services'
import createDprServices from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/ReportStoreServiceUtils'

import { dataAccess } from '../data'
import UserService from './userService'
import PreviewClient from '../data/previewClient'
import { ApplicationInfo } from '../applicationInfo'

export const services = (): Services => {
  const {
    applicationInfo,
    hmppsManageUsersClient,
    reportDataStore,
    reportingClient,
    dashboardClient,
    previewClient,
    missingReportClient,
    userClient,
  } = dataAccess()

  const userService = new UserService(hmppsManageUsersClient, userClient)
  const dprServices = createDprServices({ reportingClient, dashboardClient, reportDataStore, missingReportClient })

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
