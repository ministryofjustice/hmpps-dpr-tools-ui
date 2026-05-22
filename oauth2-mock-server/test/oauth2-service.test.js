'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype)
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var http_1 = require('http')
var querystring_1 = require('querystring')
var vitest_1 = require('vitest')
var supertest_1 = require('supertest')
var oauth2_issuer_1 = require('../src/lib/oauth2-issuer')
var oauth2_service_1 = require('../src/lib/oauth2-service')
var helpers_1 = require('../src/lib/helpers')
var testKeys = require('./keys')
var test_helpers_1 = require('./lib/test_helpers')
vitest_1.describe.each(['https://issuer.example.com', 'https://issuer.example.com/'])(
  'OAuth 2 service with issuer %s',
  function (issuerUrl) {
    var issuer
    var service
    ;(0, vitest_1.beforeAll)(function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              issuer = new oauth2_issuer_1.OAuth2Issuer()
              issuer.url = issuerUrl
              return [4 /*yield*/, issuer.keys.add(testKeys.getParsed('test-rs256-key.json'))]
            case 1:
              _a.sent()
              service = new oauth2_service_1.OAuth2Service(issuer)
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should use custom endpoint paths', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var customService,
          res,
          endpointsPrefix,
          getTestCases,
          _i,
          getTestCases_1,
          _a,
          path,
          expectedStatus,
          query,
          postTestCases,
          _b,
          postTestCases_1,
          _c,
          path,
          expectedStatus
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              customService = new oauth2_service_1.OAuth2Service(issuer, {
                wellKnownDocument: '/custom-well-known',
                jwks: '/custom-jwks',
                token: '/custom-token',
                authorize: '/custom-authorize',
                userinfo: '/custom-userinfo',
                // 'revoke', 'endSession' purposefully omitted to test defaults,
                introspect: '/custom-introspect',
              })
              return [
                4 /*yield*/,
                (0, supertest_1.default)(customService.requestHandler).get('/custom-well-known').expect(200),
              ]
            case 1:
              res = _d.sent()
              endpointsPrefix = wellKnownEndpointsPrefixFrom(customService.issuer)
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                jwks_uri: ''.concat(endpointsPrefix, '/custom-jwks'),
                token_endpoint: ''.concat(endpointsPrefix, '/custom-token'),
                authorization_endpoint: ''.concat(endpointsPrefix, '/custom-authorize'),
                userinfo_endpoint: ''.concat(endpointsPrefix, '/custom-userinfo'),
                revocation_endpoint: ''.concat(endpointsPrefix, '/revoke'),
                end_session_endpoint: ''.concat(endpointsPrefix, '/endsession'),
                introspection_endpoint: ''.concat(endpointsPrefix, '/custom-introspect'),
              })
              getTestCases = [
                ['/custom-jwks', 200],
                ['/jwks', 404],
                ['/custom-userinfo', 200],
                ['/userinfo', 404],
                ['/authorize', 404],
                ['/custom-authorize', 302, 'redirect_uri=http://example.com&scope=dummy_scope&state=1'],
                ['/endsession', 302, 'post_logout_redirect_uri=http://example.com'],
              ]
              ;(_i = 0), (getTestCases_1 = getTestCases)
              _d.label = 2
            case 2:
              if (!(_i < getTestCases_1.length)) return [3 /*break*/, 5]
              ;(_a = getTestCases_1[_i]), (path = _a[0]), (expectedStatus = _a[1]), (query = _a[2])
              return [
                4 /*yield*/,
                (0, supertest_1.default)(customService.requestHandler)
                  .get(path)
                  .query(query !== null && query !== void 0 ? query : '')
                  .expect(expectedStatus),
              ]
            case 3:
              _d.sent()
              _d.label = 4
            case 4:
              _i++
              return [3 /*break*/, 2]
            case 5:
              postTestCases = [
                ['/custom-token', 500], // 500 implies it was routed successfully
                ['/token', 404],
                ['/revoke', 200],
                ['/custom-introspect', 200],
              ]
              ;(_b = 0), (postTestCases_1 = postTestCases)
              _d.label = 6
            case 6:
              if (!(_b < postTestCases_1.length)) return [3 /*break*/, 9]
              ;(_c = postTestCases_1[_b]), (path = _c[0]), (expectedStatus = _c[1])
              return [
                4 /*yield*/,
                (0, supertest_1.default)(customService.requestHandler).post(path).expect(expectedStatus),
              ]
            case 7:
              _d.sent()
              _d.label = 8
            case 8:
              _b++
              return [3 /*break*/, 6]
            case 9:
              return [2 /*return*/]
          }
        })
      })
    })
    var wellKnownEndpointsPrefixFrom = function (issuer) {
      var url = issuer.url
      ;(0, vitest_1.expect)(url).not.toBeNull()
      return url.endsWith('/') ? url.slice(0, -1) : url
    }
    ;(0, vitest_1.it)('should expose an OpenID configuration endpoint', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, endpointsPrefix
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler).get('/.well-known/openid-configuration').expect(200),
              ]
            case 1:
              res = _a.sent()
              endpointsPrefix = wellKnownEndpointsPrefixFrom(service.issuer)
              ;(0, vitest_1.expect)(res.body).toEqual({
                issuer: service.issuer.url,
                token_endpoint: ''.concat(endpointsPrefix, '/token'),
                authorization_endpoint: ''.concat(endpointsPrefix, '/authorize'),
                userinfo_endpoint: ''.concat(endpointsPrefix, '/userinfo'),
                token_endpoint_auth_methods_supported: ['none'],
                jwks_uri: ''.concat(endpointsPrefix, '/jwks'),
                response_types_supported: ['code'],
                grant_types_supported: ['client_credentials', 'authorization_code', 'password'],
                token_endpoint_auth_signing_alg_values_supported: ['RS256'],
                response_modes_supported: ['query'],
                id_token_signing_alg_values_supported: ['RS256'],
                revocation_endpoint: ''.concat(endpointsPrefix, '/revoke'),
                subject_types_supported: ['public'],
                introspection_endpoint: ''.concat(endpointsPrefix, '/introspect'),
                code_challenge_methods_supported: ['plain', 'S256'],
                end_session_endpoint: ''.concat(endpointsPrefix, '/endsession'),
              })
              ;(0, vitest_1.expect)(JSON.stringify(res.body)).not.toMatch(/(?<!https:|http:)\/\//)
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose an JWKS endpoint', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, (0, supertest_1.default)(service.requestHandler).get('/jwks').expect(200)]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                keys: [
                  {
                    kty: 'RSA',
                    kid: 'test-rs256-key',
                    n: vitest_1.expect.any(String),
                    e: vitest_1.expect.any(String),
                  },
                ],
              })
              ;(0, vitest_1.expect)(res.body.keys[0]).not.toHaveProperty('d')
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that handles Client Credentials grants', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                tokenRequest(service.requestHandler)
                  .send({
                    grant_type: 'client_credentials',
                    scope: 'urn:first-scope urn:second-scope',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'urn:first-scope urn:second-scope',
              })
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
              ]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                iss: service.issuer.url,
                scope: resBody.scope,
              })
              return [2 /*return*/]
          }
        })
      })
    })
    vitest_1.it.each(['aud', ['aud1', 'aud2']])(
      'should expose a token endpoint that includes an aud claim on Client Credentials grants',
      function (aud) {
        return __awaiter(void 0, void 0, void 0, function () {
          var res, resBody, decoded
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler)
                    .send(
                      querystring_1.default.stringify({
                        grant_type: 'client_credentials',
                        aud: aud,
                      }),
                    )
                    .expect(200),
                ]
              case 1:
                res = _a.sent()
                resBody = res.body
                return [
                  4 /*yield*/,
                  (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
                ]
              case 2:
                decoded = _a.sent()
                ;(0, vitest_1.expect)(decoded.payload).toMatchObject({ aud: aud })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)(
      'should expose a token endpoint that handles Resource Owner Password Credentials grants',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res, resBody, key, decoded
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .post('/token')
                    .type('form')
                    .send({
                      grant_type: 'password',
                      username: 'the-resource-owner@example.com',
                      scope: 'urn:first-scope urn:second-scope',
                    })
                    .expect(200),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res.body).toMatchObject({
                  access_token: vitest_1.expect.any(String),
                  token_type: 'Bearer',
                  expires_in: 3600,
                  scope: 'urn:first-scope urn:second-scope',
                  refresh_token: vitest_1.expect.any(String),
                })
                resBody = res.body
                key = service.issuer.keys.get('test-rs256-key')
                ;(0, vitest_1.expect)(key).not.toBeNull()
                return [
                  4 /*yield*/,
                  (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
                ]
              case 2:
                decoded = _a.sent()
                ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                  iss: service.issuer.url,
                  scope: resBody.scope,
                  sub: 'the-resource-owner@example.com',
                  amr: ['pwd'],
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)('should expose a token endpoint that handles authorization_code grants', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    grant_type: 'authorization_code',
                    code: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                    redirect_uri: 'https://example.com/callback',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'dummy',
                id_token: vitest_1.expect.any(String),
                refresh_token: vitest_1.expect.any(String),
              })
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
              ]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                iss: service.issuer.url,
                scope: 'dummy',
                sub: 'johndoe',
                amr: ['pwd'],
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that copies scope for authorization_code grants', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    grant_type: 'authorization_code',
                    code: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                    redirect_uri: 'https://example.com/callback',
                    scope: 'test',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'test',
                id_token: vitest_1.expect.any(String),
                refresh_token: vitest_1.expect.any(String),
              })
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
              ]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                iss: service.issuer.url,
                scope: 'test',
                sub: 'johndoe',
                amr: ['pwd'],
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)(
      'should expose a token endpoint that handles authorization_code grants without the basic authorization',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res, key, resBody, decoded, decodedIdToken
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .post('/token')
                    .type('form')
                    .send({
                      grant_type: 'authorization_code',
                      code: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                      redirect_uri: 'https://example.com/callback',
                      client_id: 'client_id_sample',
                    })
                    .expect(200),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res.body).toMatchObject({
                  access_token: vitest_1.expect.any(String),
                  token_type: 'Bearer',
                  expires_in: 3600,
                  scope: 'dummy',
                  id_token: vitest_1.expect.any(String),
                  refresh_token: vitest_1.expect.any(String),
                })
                key = service.issuer.keys.get('test-rs256-key')
                ;(0, vitest_1.expect)(key).not.toBeNull()
                resBody = res.body
                return [
                  4 /*yield*/,
                  (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
                ]
              case 2:
                decoded = _a.sent()
                ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                  iss: service.issuer.url,
                  scope: 'dummy',
                  sub: 'johndoe',
                  amr: ['pwd'],
                })
                return [
                  4 /*yield*/,
                  (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.id_token, 'test-rs256-key'),
                ]
              case 3:
                decodedIdToken = _a.sent()
                ;(0, vitest_1.expect)(decodedIdToken.payload).toMatchObject({
                  aud: 'client_id_sample',
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)('should expose a token endpoint that handles refresh_token grants', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    grant_type: 'refresh_token',
                    refresh_token: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'dummy',
                id_token: vitest_1.expect.any(String),
                refresh_token: vitest_1.expect.any(String),
              })
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
              ]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                iss: service.issuer.url,
                scope: 'dummy',
                sub: 'johndoe',
                amr: ['pwd'],
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that copies scope for refresh_token grants', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    grant_type: 'refresh_token',
                    refresh_token: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                    scope: 'test',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'test',
                id_token: vitest_1.expect.any(String),
                refresh_token: vitest_1.expect.any(String),
              })
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
              ]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                iss: service.issuer.url,
                scope: 'test',
                sub: 'johndoe',
                amr: ['pwd'],
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that remembers nonce', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var resAuth, res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .get('/authorize')
                  .query(
                    'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                  ),
              ]
            case 1:
              resAuth = _a.sent()
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                  })
                  .expect(200),
              ]
            case 2:
              res = _a.sent()
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                id_token: vitest_1.expect.any(String),
              })
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.id_token, 'test-rs256-key'),
              ]
            case 3:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                sub: 'johndoe',
                aud: 'abcecedf',
                nonce: '21ba8e4a-26af-4538-b98a-bccf031f6754',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that remembers nonces of multiple clients', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var resAuth, res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .get('/authorize')
                  .query(
                    'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                  ),
              ]
            case 1:
              resAuth = _a.sent()
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .get('/authorize')
                  .query(
                    'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state456&client_id=abcecedf&nonce=7184422e-f260-11ea-adc1-0242ac120002',
                  ),
              ]
            case 2:
              _a.sent()
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                  })
                  .expect(200),
              ]
            case 3:
              res = _a.sent()
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                id_token: vitest_1.expect.any(String),
              })
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.id_token, 'test-rs256-key'),
              ]
            case 4:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                sub: 'johndoe',
                aud: 'abcecedf',
                nonce: '21ba8e4a-26af-4538-b98a-bccf031f6754',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that forgets nonce used', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .get('/authorize')
                  .query(
                    'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                  ),
              ]
            case 1:
              _a.sent()
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler).post('/token').type('form').send({
                  grant_type: 'authorization_code',
                  code: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                  redirect_uri: 'https://example.com/callback',
                  client_id: 'abcecedf',
                }),
              ]
            case 2:
              _a.sent()
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .send({
                    grant_type: 'authorization_code',
                    code: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                  })
                  .expect(200),
              ]
            case 3:
              res = _a.sent()
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                id_token: vitest_1.expect.any(String),
              })
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.id_token, 'test-rs256-key'),
              ]
            case 4:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                sub: 'johndoe',
                aud: 'abcecedf',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose a token endpoint that accepts a JSON request body', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('json')
                  .send({
                    grant_type: 'password',
                    username: 'the-resource-owner@example.com',
                    scope: 'urn:first-scope urn:second-scope',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'urn:first-scope urn:second-scope',
                refresh_token: vitest_1.expect.any(String),
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)(
      'should redirect to callback url when calling authorize endpoint with code response type and no state',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .get('/authorize')
                    .query(
                      'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&client_id=abcecedf',
                    )
                    .redirects(0)
                    .expect(302),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res).toMatchObject({
                  headers: {
                    location: vitest_1.expect.stringMatching(/http:\/\/example\.com\/callback\?code=[^&]*/),
                  },
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)(
      'should redirect to callback url keeping state when calling authorize endpoint with code response type',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .get('/authorize')
                    .query(
                      'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf',
                    )
                    .redirects(0)
                    .expect(302),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res).toMatchObject({
                  headers: {
                    location: vitest_1.expect.stringMatching(
                      /http:\/\/example\.com\/callback\?code=[^&]*&state=state123/,
                    ),
                  },
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)(
      'should be able to manipulate url and query params when redirecting within authorize endpoint',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                service.once('beforeAuthorizeRedirect', function (authorizeRedirectUri, req) {
                  ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                  ;(0, vitest_1.expect)(authorizeRedirectUri.url.toString()).toMatch(
                    /http:\/\/example.com\/callback\?code=[^&]+&state=state123/,
                  )
                  authorizeRedirectUri.url.hostname = 'foo.com'
                  authorizeRedirectUri.url.pathname = '/cb'
                  authorizeRedirectUri.url.protocol = 'https'
                  authorizeRedirectUri.url.searchParams.set('code', 'testcode')
                  authorizeRedirectUri.url.searchParams.set('extra_param', 'value')
                  authorizeRedirectUri.url.searchParams.delete('state')
                })
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .get('/authorize')
                    .query(
                      'response_type=code&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf',
                    )
                    .redirects(0)
                    .expect(302),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res).toMatchObject({
                  headers: {
                    location: vitest_1.expect.stringMatching(/https:\/\/foo\.com\/cb\?code=testcode&extra_param=value/),
                  },
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)(
      'should redirect to callback url with an error and keeping state when calling authorize endpoint with an invalid response type',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .get('/authorize')
                    .query(
                      'response_type=invalid_response_type&redirect_uri=http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf',
                    )
                    .redirects(0)
                    .expect(302),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res).toMatchObject({
                  headers: {
                    location:
                      'http://example.com/callback?error=unsupported_response_type&error_description=The+authorization+server+does+not+support+obtaining+an+access+token+using+this+response_type.&state=state123',
                  },
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)('should not handle token requests unsupported grant types', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                tokenRequest(service.requestHandler)
                  .send({
                    grant_type: 'INVALID_GRANT_TYPE',
                  })
                  .expect(400),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                error: 'invalid_grant',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should be able to transform the token endpoint response', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              service.once('beforeResponse', function (tokenEndpointResponse, req) {
                ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                tokenEndpointResponse.body.expires_in = 9000
                tokenEndpointResponse.body.some_stuff = 'whatever'
                tokenEndpointResponse.statusCode = 302
              })
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/token')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    grant_type: 'authorization_code',
                    code: '6b575dd1-2c3b-4284-81b1-e281138cdbbd',
                    redirect_uri: 'https://example.com/callback',
                  })
                  .expect(302),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
                token_type: 'Bearer',
                expires_in: 9000,
                scope: 'dummy',
                id_token: vitest_1.expect.any(String),
                refresh_token: vitest_1.expect.any(String),
                some_stuff: 'whatever',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should allow customizing the token response through a beforeTokenSigning event', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, key, resBody, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              service.once('beforeTokenSigning', function (token, req) {
                ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                token.payload.custom_header = req.headers['custom-header']
                token.payload.iss = 'https://tada.com'
              })
              return [
                4 /*yield*/,
                tokenRequest(service.requestHandler)
                  .set('Custom-Header', 'custom-token-value')
                  .send({
                    grant_type: 'client_credentials',
                    scope: 'a-test-scope',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              key = service.issuer.keys.get('test-rs256-key')
              ;(0, vitest_1.expect)(key).not.toBeNull()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                access_token: vitest_1.expect.any(String),
              })
              resBody = res.body
              return [
                4 /*yield*/,
                (0, test_helpers_1.verifyTokenWithKey)(service.issuer, resBody.access_token, 'test-rs256-key'),
              ]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toMatchObject({
                iss: 'https://tada.com',
                scope: 'a-test-scope',
                custom_header: 'custom-token-value',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose the userinfo endpoint', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, (0, supertest_1.default)(service.requestHandler).get('/userinfo').expect(200)]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                sub: 'johndoe',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should allow customizing the userinfo response through a beforeUserinfo event', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              service.once('beforeUserinfo', function (userInfoResponse, req) {
                ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                userInfoResponse.body = {
                  error: 'invalid_token',
                  error_message: 'token is expired',
                }
                userInfoResponse.statusCode = 401
              })
              return [4 /*yield*/, (0, supertest_1.default)(service.requestHandler).get('/userinfo').expect(401)]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                error: 'invalid_token',
                error_message: 'token is expired',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose the revoke endpoint', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/revoke')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    token: 'authorization_code',
                    token_type_hint: 'refresh_token',
                  })
                  .expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.text).toBe('')
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should allow customizing the revoke response through a beforeRevoke event', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              service.once('beforeRevoke', function (revokeResponse, req) {
                ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                revokeResponse.body = ''
                revokeResponse.statusCode = 204
              })
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .post('/revoke')
                  .type('form')
                  .set(
                    'authorization',
                    'Basic '.concat(Buffer.from('dummy_client_id:dummy_client_secret').toString('base64')),
                  )
                  .send({
                    token: 'authorization_code',
                    token_type_hint: 'refresh_token',
                  })
                  .expect(204),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.text).toBeFalsy()
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose CORS headers in a GET request', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler).get('/.well-known/openid-configuration').expect(200),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res).toMatchObject({
                headers: { 'access-control-allow-origin': '*' },
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should expose CORS headers in an OPTIONS request', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, (0, supertest_1.default)(service.requestHandler).options('/token').expect(204)]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res).toMatchObject({
                headers: { 'access-control-allow-origin': '*' },
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should redirect to post_logout_redirect_uri when calling end_session_endpoint', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var postLogoutRedirectUri, res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              postLogoutRedirectUri = 'http://example.com/signin?param=test'
              return [
                4 /*yield*/,
                (0, supertest_1.default)(service.requestHandler)
                  .get('/endsession')
                  .query('post_logout_redirect_uri='.concat(encodeURIComponent(postLogoutRedirectUri)))
                  .redirects(0)
                  .expect(302),
              ]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.headers['location']).toBe(postLogoutRedirectUri)
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)(
      'should be able to manipulate url and query params when redirecting within post_logout_redirect_uri',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var postLogoutRedirectUri, res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                postLogoutRedirectUri = 'http://example.com/signin?param=test'
                service.once('beforePostLogoutRedirect', function (postLogoutRedirectURL, req) {
                  ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                  ;(0, vitest_1.expect)(postLogoutRedirectURL.url.toString()).toBe(postLogoutRedirectUri)
                  postLogoutRedirectURL.url.hostname = 'post-logout.com'
                })
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler)
                    .get('/endsession')
                    .query('post_logout_redirect_uri='.concat(encodeURIComponent(postLogoutRedirectUri)))
                    .redirects(0)
                    .expect(302),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res.headers['location']).toBe('http://post-logout.com/signin?param=test')
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)(
      'should expose a token introspection endpoint that returns information about a token',
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).post('/introspect').type('form').expect(200),
                ]
              case 1:
                res = _a.sent()
                ;(0, vitest_1.expect)(res.body).toMatchObject({
                  active: true,
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    ;(0, vitest_1.it)('should allow customizing the introspect response through a beforeIntrospect event', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              service.once('beforeIntrospect', function (introspectResponse, req) {
                ;(0, vitest_1.expect)(req).toBeInstanceOf(http_1.IncomingMessage)
                introspectResponse.body = {
                  active: true,
                  scope: 'dummy',
                  username: 'johndoe',
                }
                introspectResponse.statusCode = 200
              })
              return [4 /*yield*/, (0, supertest_1.default)(service.requestHandler).post('/introspect').expect(200)]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res.body).toMatchObject({
                active: true,
                scope: 'dummy',
                username: 'johndoe',
              })
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.describe)('PKCE', function () {
      ;(0, vitest_1.it)('should grant access in normal PKCE flow with SHA-256 code_verifier', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, searchParams, _a, resAuth, res
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                _a = URLSearchParams.bind
                _b = {
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                }
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier, 'S256')]
              case 1:
                searchParams = new (_a.apply(URLSearchParams, [
                  void 0,
                  ((_b.code_challenge = _c.sent()), (_b.code_challenge_method = 'S256'), _b),
                ]))()
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 2:
                resAuth = _c.sent()
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler).send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                    code_verifier: verifier,
                  }),
                ]
              case 3:
                res = _c.sent()
                ;(0, vitest_1.expect)(res.statusCode).toBe(200)
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should grant access in normal PKCE flow with plain code_verifier', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, searchParams, _a, resAuth, res
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                _a = URLSearchParams.bind
                _b = {
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                }
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier)]
              case 1:
                searchParams = new (_a.apply(URLSearchParams, [
                  void 0,
                  ((_b.code_challenge = _c.sent()), (_b.code_challenge_method = 'plain'), _b),
                ]))()
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 2:
                resAuth = _c.sent()
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler).send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                    code_verifier: verifier,
                  }),
                ]
              case 3:
                res = _c.sent()
                ;(0, vitest_1.expect)(res.statusCode).toBe(200)
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should revoke on mismatching code_challenge_method', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, searchParams, _a, resAuth, res
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                _a = URLSearchParams.bind
                _b = {
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                }
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier, 'plain')]
              case 1:
                searchParams = new (_a.apply(URLSearchParams, [
                  void 0,
                  ((_b.code_challenge = _c.sent()), (_b.code_challenge_method = 'S256'), _b),
                ]))()
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 2:
                resAuth = _c.sent()
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler).send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                    code_verifier: verifier,
                  }),
                ]
              case 3:
                res = _c.sent()
                ;(0, vitest_1.expect)(res.statusCode).toBe(400)
                ;(0, vitest_1.expect)(res.body).toMatchInlineSnapshot(
                  '\n        {\n          "error": "invalid_request",\n          "error_description": "code_verifier provided does not match code_challenge",\n        }\n      ',
                )
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should revoke on invalid code_verifier', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, searchParams, _a, resAuth, res
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                _a = URLSearchParams.bind
                _b = {
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                }
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier)]
              case 1:
                searchParams = new (_a.apply(URLSearchParams, [
                  void 0,
                  ((_b.code_challenge = _c.sent()), (_b.code_challenge_method = 'S256'), _b),
                ]))()
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 2:
                resAuth = _c.sent()
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler).send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                    code_verifier: 'invalid',
                  }),
                ]
              case 3:
                res = _c.sent()
                ;(0, vitest_1.expect)(res.statusCode).toBe(400)
                ;(0, vitest_1.expect)(res.body).toMatchInlineSnapshot(
                  '\n        {\n          "error": "invalid_request",\n          "error_description": "Invalid \'code_verifier\'. The verifier does not conform with the RFC7636 spec. Ref: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1",\n        }\n      ',
                )
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should revoke on non-matching challenge', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var searchParams, resAuth, res
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                searchParams = new URLSearchParams({
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                })
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 1:
                resAuth = _a.sent()
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler).send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                    code_verifier: (0, helpers_1.createPKCEVerifier)(),
                  }),
                ]
              case 2:
                res = _a.sent()
                ;(0, vitest_1.expect)(res.statusCode).toBe(400)
                ;(0, vitest_1.expect)(res.body).toMatchInlineSnapshot(
                  '\n        {\n          "error": "invalid_request",\n          "error_description": "code_challenge required",\n        }\n      ',
                )
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should revoke on unsupported code_challende_method', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var searchParams, _a, resAuth
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                _a = URLSearchParams.bind
                _b = {
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                }
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)()]
              case 1:
                searchParams = new (_a.apply(URLSearchParams, [
                  void 0,
                  ((_b.code_challenge = _c.sent()), (_b.code_challenge_method = 'invalid'), _b),
                ]))()
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 2:
                resAuth = _c.sent()
                ;(0, vitest_1.expect)(resAuth.statusCode).toBe(400)
                ;(0, vitest_1.expect)(resAuth.body).toMatchInlineSnapshot(
                  '\n        {\n          "error": "invalid_request",\n          "error_description": "Unsupported code_challenge method invalid. The following code_challenge_method are supported: plain, S256",\n        }\n      ',
                )
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should default to plain code_challenge_method if not provided', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, searchParams, _a, resAuth, res
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                _a = URLSearchParams.bind
                _b = {
                  response_type: 'code',
                  redirect_uri:
                    'http://example.com/callback&scope=dummy_scope&state=state123&client_id=abcecedf&nonce=21ba8e4a-26af-4538-b98a-bccf031f6754',
                }
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier, 'plain')]
              case 1:
                searchParams = new (_a.apply(URLSearchParams, [void 0, ((_b.code_challenge = _c.sent()), _b)]))()
                return [
                  4 /*yield*/,
                  (0, supertest_1.default)(service.requestHandler).get('/authorize').query(searchParams.toString()),
                ]
              case 2:
                resAuth = _c.sent()
                return [
                  4 /*yield*/,
                  tokenRequest(service.requestHandler).send({
                    grant_type: 'authorization_code',
                    code: getCode(resAuth),
                    redirect_uri: 'https://example.com/callback',
                    client_id: 'abcecedf',
                    code_verifier: verifier,
                  }),
                ]
              case 3:
                res = _c.sent()
                ;(0, vitest_1.expect)(res.statusCode).toBe(200)
                return [2 /*return*/]
            }
          })
        })
      })
    })
  },
)
function getCode(response) {
  ;(0, vitest_1.expect)(response).toMatchObject({
    header: { location: vitest_1.expect.any(String) },
  })
  var parsed = response
  var url = new URL(parsed.header.location)
  return url.searchParams.get('code')
}
function tokenRequest(app) {
  return (0, supertest_1.default)(app)
    .post('/token')
    .type('form')
    .expect('Cache-Control', 'no-store')
    .expect('Pragma', 'no-cache')
}
