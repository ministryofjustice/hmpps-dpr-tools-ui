/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import initDprReportingClients from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dprReportingClient'
import { initialiseAppInsights, buildAppInsightsClient } from '../utils/azureAppInsights'
import applicationInfoSupplier from '../applicationInfo'
import config from '../config'
import PreviewClient from './previewClient'
import UserClient from './userClient'

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

export const dataAccess = () => ({
  applicationInfo,
  hmppsAuthClient: new HmppsAuthClient(new TokenStore(createRedisClient())),
  hmppsManageUsersClient: new HmppsManageUsersClient(new TokenStore(createRedisClient())),
  previewClient,
  userClient: new UserClient(config.apis.report),
  ...initDprReportingClients(config.apis.report, createRedisClient()),
})

export type DataAccess = ReturnType<typeof dataAccess>

export { HmppsAuthClient, RestClientBuilder, HmppsManageUsersClient }
