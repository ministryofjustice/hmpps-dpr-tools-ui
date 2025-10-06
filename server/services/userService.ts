import { convertToTitleCase } from '../utils/utils'
import type HmppsManageUsersClient from '../data/hmppsManageUsersClient'
import type { User } from '../data/hmppsManageUsersClient'

export interface UserDetails extends User {
  name?: string
  displayName: string
  uuid?: string
  email: string
}

export default class UserService {
  constructor(private readonly hmppsManageUsersClient: HmppsManageUsersClient) {}

  async getUser(token: string): Promise<UserDetails> {
    const user = await this.hmppsManageUsersClient.getUser(token)
    const { email } = await this.hmppsManageUsersClient.getUserEmail(token)
    return { ...user, email, displayName: convertToTitleCase(user.name) }
  }
}
