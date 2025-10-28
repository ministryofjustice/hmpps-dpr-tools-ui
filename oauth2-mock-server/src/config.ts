import { type OAuth2Options } from './lib/types'

const oauth2Options: OAuth2Options = {
  endpoints: {
    token: '/oauth/token',
  },
}

export const config = {
  oauth2Options,
} as const
