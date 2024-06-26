import UserService from './userService'
import HmppsManageUsersClient, { type User } from '../data/hmppsManageUsersClient'

jest.mock('../data/hmppsManageUsersClient')

const token = 'some token'

describe('User service', () => {
  let hmppsManageUsersClient: jest.Mocked<HmppsManageUsersClient>
  let userService: UserService

  describe('getUser', () => {
    beforeEach(() => {
      hmppsManageUsersClient = new HmppsManageUsersClient(null) as jest.Mocked<HmppsManageUsersClient>
      userService = new UserService(hmppsManageUsersClient)
    })

    it('Retrieves and formats user name', async () => {
      hmppsManageUsersClient.getUser.mockResolvedValue({ name: 'john smith' } as User)

      const result = await userService.getUser(token)

      expect(result.displayName).toEqual('John Smith')
    })

    it('Propagates error', async () => {
      hmppsManageUsersClient.getUser.mockRejectedValue(new Error('some error'))

      await expect(userService.getUser(token)).rejects.toEqual(new Error('some error'))
    })
  })
})
