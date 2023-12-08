import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from './testutils/appSetup'

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({})
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /preview', () => {
  it('should render preview page', () => {
    return request(app)
      .get('/preview')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Preview Reports')
        expect(res.text).toContain('Upload definition')
        expect(res.text).toContain('Delete definition')
        expect(res.text).toContain('Preview definitions')
        expect(res.text).toContain('Test definition')
        expect(res.text).toContain('This is a test definition')
      })
  })
})

describe('GET /preview/definitions', () => {
  it('should render report preview page', () => {
    return request(app)
      .get('/preview/definitions/test')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Test definition')
        expect(res.text).toContain('Test variant')
        expect(res.text).toContain('This is a test variant definition')
      })
  })
})

describe('GET /preview/definitions/list', () => {
  it('should render report preview page', () => {
    return request(app)
      .get('/preview/definitions/test/testvariant')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Test definition - Test variant')
        expect(res.text).toContain('Field')
        expect(res.text).toContain('Value')
      })
  })
})

describe('POST /preview/delete', () => {
  it('should attempt to delete definition', () => {
    return request(app)
      .post('/preview/delete')
      .send({
        definitionId: 'test',
      })
      .then(r => {
        expect(r.status).toEqual(302)

        return request(app)
          .get('/preview')
          .expect('Content-Type', /html/)
          .expect(res => {
            expect(res.text).toContain('Preview Reports')
            expect(res.text).toContain('Preview definitions')
            expect(res.text).not.toContain('Test definition')
            expect(res.text).not.toContain('This is a test definition')
          })
      })
  })
})

describe('POST /preview/upload', () => {
  it('should attempt to upload definition', () => {
    const buffer = Buffer.from(
      '{ "id": "uploaded", "name": "Uploaded definition", "description": "This is an uploaded definition" }',
    )

    return request(app)
      .post('/preview/upload')
      .attach('uploadDefinition', buffer, 'uploaded.json')
      .then(r => {
        expect(r.status).toEqual(302)

        return request(app)
          .get('/preview')
          .expect('Content-Type', /html/)
          .expect(res => {
            expect(res.text).toContain('Preview Reports')
            expect(res.text).toContain('Preview definitions')
            expect(res.text).toContain('Uploaded definition')
            expect(res.text).toContain('This is an uploaded definition')
          })
      })
  })
})
