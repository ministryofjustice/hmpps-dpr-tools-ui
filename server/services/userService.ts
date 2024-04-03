import { convertToTitleCase } from '../utils/utils'
// import type HmppsAuthClient from '../data/hmppsAuthClient'
// import type { User } from '../data/hmppsAuthClient'
import type HmppsManageUsersClient from '../data/hmppsManageUsersClient'
import type { User } from '../data/hmppsManageUsersClient'

export interface UserDetails extends User {
  displayName: string
}

export default class UserService {
  constructor(private readonly hmppsManageUsersClient: HmppsManageUsersClient) {}

  async getUser(token: string): Promise<UserDetails> {
    const user = await this.hmppsManageUsersClient.getUser(token)
    return { ...user, displayName: convertToTitleCase(user.name) }
  }
}
