import { type dprServices as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'
import { createDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'
import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import { Services as dprServicesType } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/types/Services'
import { createServices as createAuthoringServices } from '@modular-data/hmpps-authoring-lib-ui'

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
    authoringDataAccess,
    hmppsAuthClient,
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
  const authoringServices = createAuthoringServices(authoringDataAccess)

  const systemTokenService = new SystemTokenService(hmppsAuthClient, config.systemTokenEnabled)

  return {
    applicationInfo,
    userService,
    previewClient,
    systemTokenService,
    reportingClient,
    authoringServices,
    ...dprServices,
  }
}

export type Services = dprServicesType & {
  applicationInfo: ApplicationInfo
  userService: UserService
  previewClient: PreviewClient
  systemTokenService: SystemTokenService
  authoringServices: ReturnType<typeof createAuthoringServices>
}

export { UserService }
