import { type dprServices as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'
import { createDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'

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
    productCollectionClient,
    featureFlagService,
  } = dataAccess()

  const userService = new UserService(hmppsManageUsersClient)

  const serviceConfig = {
    bookmarking: true,
    download: true,
    saveDefaults: true,
  }

  const dprServices = createDprServices(
    {
      reportingClient,
      dashboardClient,
      reportDataStore,
      missingReportClient,
      productCollectionClient,
      featureFlagService,
    },
    serviceConfig,
  )

  return {
    applicationInfo,
    userService,
    previewClient,
    ...dprServices,
  }
}

export type Services = dprServicesType & {
  applicationInfo: ApplicationInfo
  userService: UserService
  previewClient: PreviewClient
}

export { UserService }
