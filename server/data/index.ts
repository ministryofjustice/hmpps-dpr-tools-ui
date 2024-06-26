/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import UserDataStore from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/userDataStore'
import { initialiseAppInsights, buildAppInsightsClient } from '../utils/azureAppInsights'
import applicationInfoSupplier from '../applicationInfo'

const applicationInfo = applicationInfoSupplier()
initialiseAppInsights()
buildAppInsightsClient(applicationInfo)

import HmppsAuthClient from './hmppsAuthClient'
import HmppsManageUsersClient from './hmppsManageUsersClient'
import { createRedisClient } from './redisClient'
import TokenStore from './tokenStore'

type RestClientBuilder<T> = (token: string) => T

export const dataAccess = () => ({
  applicationInfo,
  hmppsAuthClient: new HmppsAuthClient(new TokenStore(createRedisClient())),
  hmppsManageUsersClient: new HmppsManageUsersClient(new TokenStore(createRedisClient())),
  userDataStore: new UserDataStore(createRedisClient()),
})

export type DataAccess = ReturnType<typeof dataAccess>

export { HmppsAuthClient, RestClientBuilder, HmppsManageUsersClient }
