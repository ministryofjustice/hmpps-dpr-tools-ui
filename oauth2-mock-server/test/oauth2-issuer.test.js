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
var vitest_1 = require('vitest')
var oauth2_issuer_1 = require('../src/lib/oauth2-issuer')
var testKeys = require('./keys')
var test_helpers_1 = require('./lib/test_helpers')
;(0, vitest_1.describe)('OAuth 2 issuer', function () {
  var issuer
  ;(0, vitest_1.beforeAll)(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            issuer = new oauth2_issuer_1.OAuth2Issuer()
            issuer.url = 'https://issuer.example.com'
            return [4 /*yield*/, issuer.keys.add(testKeys.getParsed('test-rs256-key.json'))]
          case 1:
            _a.sent()
            return [4 /*yield*/, issuer.keys.add(testKeys.getParsed('test-es256-key.json'))]
          case 2:
            _a.sent()
            return [4 /*yield*/, issuer.keys.add(testKeys.getParsed('test-eddsa-key.json'))]
          case 3:
            _a.sent()
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)("should not allow to build tokens for an unknown 'kid'", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              (0, vitest_1.expect)(function () {
                return issuer.buildToken({ kid: 'unknown-kid' })
              }).rejects.toThrow('Cannot build token: Unknown key.'),
            ]
          case 1:
            _a.sent()
            return [2 /*return*/]
        }
      })
    })
  })
  vitest_1.it.each([
    ['test-rs256-key', 'RS256'],
    ['test-es256-key', 'ES256'],
    ['test-eddsa-key', 'EdDSA'],
  ])('should be able to build tokens (%s)', function (kid, expectedAlg) {
    return __awaiter(void 0, void 0, void 0, function () {
      var now, expiresIn, token, decoded, p, parsedP
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            now = Math.floor(Date.now() / 1000)
            expiresIn = 1000
            return [4 /*yield*/, issuer.buildToken({ kid: kid, expiresIn: expiresIn })]
          case 1:
            token = _a.sent()
            ;(0, vitest_1.expect)(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
            return [4 /*yield*/, (0, test_helpers_1.verifyTokenWithKey)(issuer, token, kid)]
          case 2:
            decoded = _a.sent()
            ;(0, vitest_1.expect)(decoded.protectedHeader).toEqual({
              alg: expectedAlg,
              typ: 'JWT',
              kid: kid,
            })
            p = decoded.payload
            ;(0, vitest_1.expect)(p).toMatchObject({
              iss: issuer.url,
              iat: vitest_1.expect.any(Number),
              exp: vitest_1.expect.any(Number),
              nbf: vitest_1.expect.any(Number),
            })
            parsedP = p
            ;(0, vitest_1.expect)(parsedP.iat).toBeGreaterThanOrEqual(now)
            ;(0, vitest_1.expect)(parsedP.exp - parsedP.iat).toEqual(expiresIn)
            ;(0, vitest_1.expect)(parsedP.nbf).toBeLessThan(now)
            return [2 /*return*/]
        }
      })
    })
  })
  var scopeInjector = function (_header, payload) {
    payload['scope'] = 'urn:scope-1 urn:scope-2'
  }
  vitest_1.it.each([['urn:scope-1 urn:scope-2'], [['urn:scope-1', 'urn:scope-2']], [scopeInjector]])(
    'should be able to build tokens with a scope',
    function (scopes) {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, decoded
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, issuer.buildToken({ kid: 'test-rs256-key', scopesOrTransform: scopes })]
            case 1:
              token = _a.sent()
              return [4 /*yield*/, (0, test_helpers_1.verifyTokenWithKey)(issuer, token, 'test-rs256-key')]
            case 2:
              decoded = _a.sent()
              ;(0, vitest_1.expect)(decoded.payload).toHaveProperty('scope')
              ;(0, vitest_1.expect)(decoded.payload['scope']).toBe('urn:scope-1 urn:scope-2')
              return [2 /*return*/]
          }
        })
      })
    },
  )
  ;(0, vitest_1.it)('should be able to build tokens and modify the header or the payload before signing', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var transform, token, decoded
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            transform = function (header, payload) {
              header['x5t'] = 'a-new-value'
              payload['sub'] = 'the-subject'
            }
            return [4 /*yield*/, issuer.buildToken({ kid: 'test-rs256-key', scopesOrTransform: transform })]
          case 1:
            token = _a.sent()
            return [4 /*yield*/, (0, test_helpers_1.verifyTokenWithKey)(issuer, token, 'test-rs256-key')]
          case 2:
            decoded = _a.sent()
            ;(0, vitest_1.expect)(decoded).toMatchObject({
              protectedHeader: { x5t: 'a-new-value' },
              payload: {
                sub: 'the-subject',
              },
            })
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)('should be able to modify the header and the payload through a beforeSigning event', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var token, decoded
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            issuer.once('beforeSigning', function (token) {
              token.header.x5t = 'a-new-value'
              token.payload.sub = 'the-subject'
            })
            return [4 /*yield*/, issuer.buildToken({ kid: 'test-rs256-key' })]
          case 1:
            token = _a.sent()
            return [4 /*yield*/, (0, test_helpers_1.verifyTokenWithKey)(issuer, token, 'test-rs256-key')]
          case 2:
            decoded = _a.sent()
            ;(0, vitest_1.expect)(decoded).toMatchObject({
              protectedHeader: { x5t: 'a-new-value' },
              payload: {
                sub: 'the-subject',
              },
            })
            return [2 /*return*/]
        }
      })
    })
  })
})
