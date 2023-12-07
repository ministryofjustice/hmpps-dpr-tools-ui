import type { ApiConfig } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/data/types'
import RestClient from './restClient'

export default class PreviewClient {
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  deleteDefinition(definitionId: string, token: string): Promise<void> {
    return new RestClient('Preview API Client', this.config, token).delete({
      path: `/definitions/${definitionId}`,
    })
  }

  uploadDefinition(definition: string, token: string): Promise<void> {
    return new RestClient('Preview API Client', this.config, token).put({
      path: `/definitions/definitionId`,
      data: definition,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
