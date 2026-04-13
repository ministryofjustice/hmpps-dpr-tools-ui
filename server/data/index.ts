/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import { initDprReportingClients } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/initDprReportingClients'
import { createDataAccess as createAuthoringDataAccess } from '@modular-data/hmpps-authoring-lib-ui'
import { initialiseAppInsights, buildAppInsightsClient } from '../utils/azureAppInsights'
import applicationInfoSupplier from '../applicationInfo'
import config from '../config'
import PreviewClient from './previewClient'

const applicationInfo = applicationInfoSupplier()
initialiseAppInsights()
buildAppInsightsClient(applicationInfo)

import HmppsAuthClient from './hmppsAuthClient'
import HmppsManageUsersClient from './hmppsManageUsersClient'
import { createRedisClient } from './redisClient'
import TokenStore from './tokenStore'

type RestClientBuilder<T> = (token: string) => T

const apiConfig = {
  url: config.apis.report.url,
  agent: {
    timeout: config.apis.report.timeout,
  },
}

const previewClient = new PreviewClient(apiConfig)

export const dataAccess = () => {
  const tokenStore = new TokenStore(createRedisClient())

  const authoringDataAccess = createAuthoringDataAccess({
    coreApiConfig: config.apis.authoring,
    authConfig: config.apis.hmppsAuth,
    tokenStore,
  })

  return {
    applicationInfo,
    hmppsAuthClient: new HmppsAuthClient(tokenStore),
    hmppsManageUsersClient: new HmppsManageUsersClient(tokenStore),
    previewClient,
    authoringDataAccess,
    ...initDprReportingClients(config.apis.report, createRedisClient()),
  }
}

export type DataAccess = ReturnType<typeof dataAccess>

export { HmppsAuthClient, RestClientBuilder, HmppsManageUsersClient }
