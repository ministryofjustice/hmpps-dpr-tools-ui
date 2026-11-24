import { ApiConfig } from '../config'
import RestClient from './restClient'

export type UploadDefinitionResponse = {
  path: string
  issueType: 'MISSING_FIELD' | 'INVALID_FIELD_VALUE' | 'TRAILING_COMMA' | 'GENERAL_SYNTAX_ERROR' | 'UNKNOWN_ISSUE'
  extraHint: string | undefined
  issueTypeDescription: string
}[]

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

  uploadDefinition(definition: string, token: string): Promise<UploadDefinitionResponse> {
    return new RestClient('Preview API Client', this.config, token).put({
      path: `/definitions`,
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
