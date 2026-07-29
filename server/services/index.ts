import {
  createDprServices,
  type dprServices as dprServicesType,
} from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'

import { ApplicationInfo } from '../applicationInfo'
import config from '../config'
import { dataAccess } from '../data'
import PreviewClient from '../data/previewClient'
import SystemTokenService from './systemTokenService'
import UserService from './userService'

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
    reportIdMigrationService,
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
      reportIdMigrationService,
    },
    serviceConfig,
  )

  const systemTokenService = new SystemTokenService(hmppsAuthClient, config.systemTokenEnabled)

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
