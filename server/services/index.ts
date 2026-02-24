import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import { Services as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/Services'
import { createDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/CreateDprServices'

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
    hmppsAuthClient
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
    //config.apis.tokenVerification.enabled
    config.systemTokenEnabled
  )

  return {
    applicationInfo,
    userService,
    previewClient,
    reportingClient,
    systemTokenService,
    ...dprServices,
  }
}

export type Services = dprServicesType & {
  applicationInfo: ApplicationInfo
  userService: UserService
  reportingClient: ReportingClient
  previewClient: PreviewClient,
  systemTokenService: SystemTokenService
}

export { UserService }
