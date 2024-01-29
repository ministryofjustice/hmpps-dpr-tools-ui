import express, { Express } from 'express'
import cookieSession from 'cookie-session'
import { NotFound } from 'http-errors'

import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import routes from '../index'
import nunjucksSetup from '../../utils/nunjucksSetup'
import errorHandler from '../../errorHandler'
import * as auth from '../../authentication/auth'
import type { ApplicationInfo } from '../../applicationInfo'
import previewRoutes from '../preview'
import PreviewClient from '../../data/previewClient'

const definitions = [
  {
    id: 'test',
    name: 'Test definition',
    description: 'This is a test definition',
    variants: [
      {
        id: 'testvariant',
        name: 'Test variant',
        description: 'This is a test variant definition',
      },
    ],
  },
]

const fullDefinition = {
  id: 'test',
  name: 'Test definition',
  description: 'This is a test definition',
  variant: {
    id: 'testvariant',
    name: 'Test variant',
    description: 'This is a test variant definition',
    specification: {
      template: 'list',
      fields: [
        {
          name: 'field',
          display: 'Field',
          defaultsort: true,
        },
      ],
    },
  },
}

const reportingClient: ReportingClient = {
  getDefinitions: () => Promise.resolve(definitions),
  // @ts-expect-error Incomplete value for testing
  getDefinition: () => Promise.resolve(fullDefinition),
  getCount: () => Promise.resolve(123),
  getList: () => Promise.resolve([{ field: 'Value' }]),
}

// @ts-expect-error Incomplete value for testing
const previewClient: PreviewClient = {
  deleteDefinition: () => {
    definitions.pop()
    return Promise.resolve()
  },
  uploadDefinition: (definitionId, definition) => {
    definitions.push(JSON.parse(definition))
    return Promise.resolve()
  },
}

const testAppInfo: ApplicationInfo = {
  applicationName: 'test',
  buildNumber: '1',
  gitRef: 'long ref',
  gitShortHash: 'short ref',
  branchName: 'main',
}

export const user: Express.User = {
  name: 'FIRST LAST',
  userId: 'id',
  token: 'token',
  username: 'user1',
  displayName: 'First Last',
  active: true,
  activeCaseLoadId: 'MDI',
  authSource: 'NOMIS',
}

export const flashProvider = jest.fn()

function appSetup(production: boolean, userSupplier: () => Express.User): Express {
  const app = express()

  app.set('view engine', 'njk')

  nunjucksSetup(app, testAppInfo)
  app.use(cookieSession({ keys: [''] }))
  app.use((req, res, next) => {
    req.user = userSupplier()
    req.flash = flashProvider
    res.locals = {
      user: { ...req.user },
    }
    next()
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(routes())
  app.use(previewRoutes(reportingClient, previewClient))
  app.use((req, res, next) => next(new NotFound()))
  app.use(errorHandler(production))

  return app
}

export function appWithAllRoutes({
  production = false,
  userSupplier = () => user,
}: {
  production?: boolean
  userSupplier?: () => Express.User
}): Express {
  auth.default.authenticationMiddleware = () => (req, res, next) => next()
  return appSetup(production, userSupplier)
}
