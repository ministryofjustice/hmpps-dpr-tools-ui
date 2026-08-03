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
import logger from '../../logger'

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

  logger.info(
    'FEATURE_FLAGS_CONFIG : ${featureFlagService}'
  )

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

  logger.info(
    `SERVICE_CONFIG: ${serviceConfig}`
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
