const production = process.env.NODE_ENV === 'production'

function get<T>(name: string, fallback: T, options = { requireInProduction: false }): T | string {
  if (process.env[name]) {
    return process.env[name]
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

const requiredInProduction = { requireInProduction: true }

export class AgentConfig {
  timeout: number

  constructor(timeout = 8000) {
    this.timeout = timeout
  }
}

function getAuthorisedRoles() {
  const envVarRoles = get('AUTHORISED_ROLES', '', requiredInProduction)

  if (envVarRoles.length !== 0) {
    return envVarRoles.split(',')
  }

  return []
}

const apiCommonConfig = {
  timeout: {
    response: Number(get('HMPPS_AUTH_TIMEOUT_RESPONSE', 10000)),
    deadline: Number(get('HMPPS_AUTH_TIMEOUT_DEADLINE', 10000)),
  },
  agent: new AgentConfig(Number(get('HMPPS_AUTH_TIMEOUT_RESPONSE', 10000))),
  apiClientId: get('API_CLIENT_ID', 'clientid', requiredInProduction),
  apiClientSecret: get('API_CLIENT_SECRET', 'clientsecret', requiredInProduction),
  systemClientId: get('SYSTEM_CLIENT_ID', 'clientid', requiredInProduction),
  systemClientSecret: get('SYSTEM_CLIENT_SECRET', 'clientsecret', requiredInProduction),
}

export default {
  buildNumber: get('BUILD_NUMBER', '1_0_0', requiredInProduction),
  productId: get('PRODUCT_ID', 'UNASSIGNED', requiredInProduction),
  gitRef: get('GIT_REF', 'xxxxxxxxxxxxxxxxxxx', requiredInProduction),
  branchName: get('GIT_BRANCH', 'xxxxxxxxxxxxxxxxxxx', requiredInProduction),
  production,
  https: production,
  staticResourceCacheDuration: '1h',
  redis: {
    host: get('REDIS_HOST', '127.0.0.1', requiredInProduction),
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_AUTH_TOKEN,
    tls_enabled: get('REDIS_TLS_ENABLED', 'false'),
  },
  session: {
    secret: get('SESSION_SECRET', 'app-insecure-default-session', requiredInProduction),
    expiryMinutes: Number(get('WEB_SESSION_TIMEOUT_IN_MINUTES', 120)),
  },
  apis: {
    hmppsAuth: {
      url: get('HMPPS_AUTH_URL', 'http://localhost:9090/auth', requiredInProduction),
      externalUrl: get('HMPPS_AUTH_EXTERNAL_URL', get('HMPPS_AUTH_URL', 'http://localhost:9090/auth')),
      authorizeUri: get('HMPPS_AUTHORISE_URI', '/oauth/authorize'),
      tokenUri: get('TOKEN_URI', '/oauth/token'),
      ...apiCommonConfig,
    },
    manageUsers: {
      url: get('HMPPS_MANAGE_USERS_URL', 'http://localhost:9090/auth', requiredInProduction),
      userInfoUri: get('HMPPS_USER_INFO_URI', '/users/me'),
      userRoleUri: get('HMPPS_USER_ROLE_URI', '/users/me/roles'),
      ...apiCommonConfig,
    },
    tokenVerification: {
      url: get('TOKEN_VERIFICATION_API_URL', 'http://localhost:8100', requiredInProduction),
      verificationUri: get('TOKEN_VERIFICATION_URI', '/token/verify'),
      timeout: {
        response: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000)),
        deadline: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE', 5000)),
      },
      agent: new AgentConfig(Number(get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000))),
      enabled: get('TOKEN_VERIFICATION_ENABLED', 'false') === 'true',
    },
    report: {
      url: get('API_URL', 'https://dpr-tools-api-dev.hmpps.service.justice.gov.uk', requiredInProduction),
      timeout: Number(get('API_TIMEOUT', 120000)),
      agent: new AgentConfig(Number(get('REPORTING_API_TIMEOUT_RESPONSE', 120000))),
    },
  },
  domain: get('INGRESS_URL', 'http://localhost:3000', requiredInProduction),
  environmentName: get('ENVIRONMENT_NAME', ''),
  authorisation: {
    roles: getAuthorisedRoles(),
  },
  dpr: {
    routePrefix: 'dpr',
  },
}
