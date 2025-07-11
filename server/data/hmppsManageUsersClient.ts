import { URLSearchParams } from 'url'

import superagent from 'superagent'

import type TokenStore from './tokenStore'
import logger from '../../logger'
import config from '../config'
import generateOauthClientToken from '../authentication/clientCredentials'
import RestClient from './restClient'

const timeoutSpec = config.apis.hmppsAuth.timeout
const hmppsAuthUrl = config.apis.hmppsAuth.url

function getSystemClientTokenFromHmppsAuth(username?: string): Promise<superagent.Response> {
  const clientToken = generateOauthClientToken(
    config.apis.hmppsAuth.systemClientId,
    config.apis.hmppsAuth.systemClientSecret,
  )

  const grantRequest = new URLSearchParams({
    grant_type: 'client_credentials',
    ...(username && { username }),
  }).toString()

  logger.info(`${grantRequest} HMPPS Auth request for client id '${config.apis.hmppsAuth.systemClientId}''`)

  return superagent
    .post(`${hmppsAuthUrl}/oauth/token`)
    .set('Authorization', clientToken)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(grantRequest)
    .timeout(timeoutSpec)
}

export interface User {
  username: string
  name?: string
  active?: boolean
  authSource?: string
  uuid?: string
  userId?: string
  staffId?: number // deprecated, use userId
  activeCaseLoadId?: string // deprecated, use user roles api
}

export interface UserRole {
  roleCode: string
}

export default class HmppsManageUsersClient {
  constructor(private readonly tokenStore: TokenStore) {}

  private static restClient(token: string): RestClient {
    return new RestClient('HMPPS Auth Client', config.apis.manageUsers, token)
  }

  getUser(token: string): Promise<User> {
    logger.info('Getting user details: calling HMPPS Auth ')
    return HmppsManageUsersClient.restClient(token).get<User>({ path: config.apis.manageUsers.userInfoUri })
  }

  getUserRoles(token: string): Promise<string[]> {
    logger.info('Getting user roles: calling HMPPS Auth ')
    return HmppsManageUsersClient.restClient(token)
      .get<UserRole[]>({ path: config.apis.manageUsers.userRoleUri })
      .then(roles => roles.map(role => role.roleCode))
  }

  async getSystemClientToken(username?: string): Promise<string> {
    const key = username || '%ANONYMOUS%'

    const token = await this.tokenStore.getToken(key)
    if (token) {
      return token
    }

    const newToken = await getSystemClientTokenFromHmppsAuth(username)

    // set TTL slightly less than expiry of token. Async but no need to wait
    await this.tokenStore.setToken(key, newToken.body.access_token, newToken.body.expires_in - 60)

    return newToken.body.access_token
  }
}
