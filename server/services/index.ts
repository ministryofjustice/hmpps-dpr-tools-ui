import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/data/reportingClient'
import { dataAccess } from '../data'
import UserService from './userService'
import config from '../config'
import PreviewClient from '../data/previewClient'

export const services = () => {
  const { hmppsAuthClient, applicationInfo } = dataAccess()

  const userService = new UserService(hmppsAuthClient)

  const reportingClient = new ReportingClient({
    url: config.apis.report.url,
    agent: {
      timeout: config.apis.report.timeout,
    },
  })

  const previewClient = new PreviewClient({
    url: config.apis.report.url,
    agent: {
      timeout: config.apis.report.timeout,
    },
  })

  return {
    applicationInfo,
    userService,
    reportingClient,
    previewClient,
  }
}

export type Services = ReturnType<typeof services>

export { UserService }
