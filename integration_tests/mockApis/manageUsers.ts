import { Response } from 'superagent'

import { stubFor } from './wiremock'

const stubUser = (name: string) =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/users/me',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: {
        staffId: 231232,
        username: 'USER1',
        active: true,
        name,
      },
    },
  })

const stubUserRoles = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/users/me/roles',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: [{ roleCode: 'SOME_USER_ROLE' }],
    },
  })

const stubUserEmail = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/users/me/email',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: [{ email: 'SOME_USER_EMAIL' }],
    },
  })

const stubActiveCaseload = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: '/user/caseload/active',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: [{ activeCaseloadId: 'SOME_USER_CASELOAD_ID' }],
    },
  })

export default {
  stubAuthUser: (name = 'john smith'): Promise<[Response, Response, Response, Response]> =>
    Promise.all([stubUser(name), stubUserRoles(), stubUserEmail(), stubActiveCaseload()]),
}
