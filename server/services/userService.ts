import jwtDecode from 'jwt-decode'
import { convertToTitleCase } from '../utils/utils'
import type HmppsManageUsersClient from '../data/hmppsManageUsersClient'
import type { User } from '../data/hmppsManageUsersClient'

export interface UserDetails extends User {
  name?: string
  displayName: string
  uuid?: string
  email: string
  roles: string[]
}

export default class UserService {
  constructor(private readonly hmppsManageUsersClient: HmppsManageUsersClient) {}

  async getUser(token: string): Promise<UserDetails> {
    const user = await this.hmppsManageUsersClient.getUser(token)
    const { email } = await this.hmppsManageUsersClient.getUserEmail(token)
    const { authorities: roles = [] } = jwtDecode(token) as { authorities?: string[] }
    const displayName = user.name ? convertToTitleCase(user.name) : ''
    return { ...user, email, roles, displayName }
  }
}
