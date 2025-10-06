import jwtDecode from 'jwt-decode'
import { convertToTitleCase } from '../utils/utils'
import type HmppsManageUsersClient from '../data/hmppsManageUsersClient'
import type { User } from '../data/hmppsManageUsersClient'
import UserClient from '../data/userClient'

export interface UserDetails extends User {
  name?: string
  displayName: string
  uuid?: string
  email: string
  roles: string[]
}

export default class UserService {
  constructor(
    private readonly hmppsManageUsersClient: HmppsManageUsersClient,
    private readonly userClient: UserClient,
  ) {}

  async getUser(token: string): Promise<UserDetails> {
    const user = await this.hmppsManageUsersClient.getUser(token)
    const { email } = await this.hmppsManageUsersClient.getUserEmail(token)
    const activeCaseLoadId = await this.userClient.getActiveCaseload(token)
    const { authorities: roles = [] } = jwtDecode(token) as { authorities?: string[] }
    return { ...user, email, roles, activeCaseLoadId, displayName: convertToTitleCase(user.name) }
  }
}
