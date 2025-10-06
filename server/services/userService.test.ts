import UserService from './userService'
import HmppsManageUsersClient, { UserEmail, type User } from '../data/hmppsManageUsersClient'
import UserClient from '../data/userClient'

jest.mock('../data/hmppsManageUsersClient')
jest.mock('jwt-decode', () => () => ({ authorities: ['ROLE_PRISONS_REPORTING_USER'] }))

const token = 'some token'

describe('User service', () => {
  let hmppsManageUsersClient: jest.Mocked<HmppsManageUsersClient>
  let userClient: jest.Mocked<UserClient>
  let userService: UserService

  describe('getUser', () => {
    beforeEach(() => {
      hmppsManageUsersClient = new HmppsManageUsersClient(null) as jest.Mocked<HmppsManageUsersClient>
      userClient = jest.createMockFromModule('../data/userClient')
      userService = new UserService(hmppsManageUsersClient, userClient)
    })

    it('Retrieves and formats user name', async () => {
      hmppsManageUsersClient.getUser.mockResolvedValue({ name: 'john smith' } as User)
      hmppsManageUsersClient.getUserEmail.mockResolvedValue({ email: 'johnsmith@sdfsdfsd' } as UserEmail)
      userClient.getActiveCaseload = jest.fn().mockResolvedValue('AAA')

      const result = await userService.getUser(token)

      expect(result.displayName).toEqual('John Smith')
      expect(result.email).toEqual('johnsmith@sdfsdfsd')
    })

    it('Propagates error', async () => {
      hmppsManageUsersClient.getUser.mockRejectedValue(new Error('some error'))

      await expect(userService.getUser(token)).rejects.toEqual(new Error('some error'))
    })
  })
})
