import { ApiConfig } from '../config'
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

  uploadDefinition(definitionId: string, definition: string, token: string): Promise<void> {
    return new RestClient('Preview API Client', this.config, token).put({
      path: `/definitions/${definitionId}`,
      data: definition,
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  downloadDefinition(definitionId: string, token: string): Promise<Response> {
    return new RestClient('Preview API Client', this.config, token).get({
      path: `/definitions/original/${definitionId}`,
      raw: true,
    })
  }
}
