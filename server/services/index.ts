import { type dprServices as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'
import { createDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'

import { dataAccess } from '../data'
import UserService from './userService'
import PreviewClient from '../data/previewClient'
import { ApplicationInfo } from '../applicationInfo'
import SystemTokenService from './systemTokenService'
import config from '../config'

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
    hmppsAuthClient,
  } = dataAccess()

  const userService = new UserService(hmppsManageUsersClient)

  const serviceConfig = {
    bookmarking: true,
    download: true,
    saveDefaults: true
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

  const systemTokenService = new SystemTokenService(
    hmppsAuthClient,
    config.systemTokenEnabled
  )

  return {
    applicationInfo,
    userService,
    previewClient,
    systemTokenService,
    ...dprServices,
  }
}

export type Services = dprServicesType & {
  applicationInfo: ApplicationInfo
  userService: UserService
  previewClient: PreviewClient
  systemTokenService: SystemTokenService
}

export { UserService }
