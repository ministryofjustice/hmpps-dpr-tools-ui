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
var jwk_store_1 = require('../src/lib/jwk-store')
var testKeys = require('./keys')
;(0, vitest_1.describe)('JWK Store', function () {
  ;(0, vitest_1.describe)('generate()', function () {
    vitest_1.it.each([
      ['RSASSA-PKCS1-v1_5', 'RS256', 'RSA'],
      ['RSASSA-PKCS1-v1_5', 'RS384', 'RSA'],
      ['RSASSA-PKCS1-v1_5', 'RS512', 'RSA'],
      ['RSASSA-PSS', 'PS256', 'RSA'],
      ['RSASSA-PSS', 'PS384', 'RSA'],
      ['RSASSA-PSS', 'PS512', 'RSA'],
      ['ECDSA', 'ES256', 'EC'],
      ['ECDSA', 'ES256K', 'EC'],
      ['ECDSA', 'ES384', 'EC'],
      ['ECDSA', 'ES512', 'EC'],
    ])('should be able to generate a new %s based key (alg = %s)', function (_kind, alg, expectedKty) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, key
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [4 /*yield*/, store.generate(alg)]
            case 1:
              key = _a.sent()
              ;(0, vitest_1.expect)(key).toMatchObject({
                alg: alg,
                kty: expectedKty,
                kid: vitest_1.expect.stringMatching(/^[\w-]+$/),
              })
              return [2 /*return*/]
          }
        })
      })
    })
    vitest_1.it.each(['Ed25519', 'Ed448'])(
      'should be able to generate a new EdDSA based key (crv = %s)',
      function (crv) {
        return __awaiter(void 0, void 0, void 0, function () {
          var store, key
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                store = new jwk_store_1.JWKStore()
                return [4 /*yield*/, store.generate('EdDSA', { crv: crv })]
              case 1:
                key = _a.sent()
                ;(0, vitest_1.expect)(key).toMatchObject({
                  alg: 'EdDSA',
                  kty: 'OKP',
                  crv: crv,
                  kid: vitest_1.expect.stringMatching(/^[\w-]+$/),
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    vitest_1.it.each(['RS123', 'dunno'])('throws on unsupported algs (alg = %s)', function (alg) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.generate(alg)
                }).rejects.toThrow('Invalid or unsupported JWK "alg" (Algorithm) Parameter value'),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    vitest_1.it.each(['Ed007', 'dunno'])('throws on unsupported crv for EdDSA alg (crv = %s)', function (crv) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.generate('EdDSA', { crv: crv })
                }).rejects.toThrow(
                  'Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448',
                ),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    vitest_1.it.each([['RS256', ['e', 'n', 'd', 'p', 'q', 'dp', 'dq', 'qi']]])(
      'should return the private key of a key (alg = %s)',
      function (alg, expectedProps) {
        return __awaiter(void 0, void 0, void 0, function () {
          var store, jwk, _i, expectedProps_1, prop
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                store = new jwk_store_1.JWKStore()
                return [4 /*yield*/, store.generate(alg)]
              case 1:
                jwk = _a.sent()
                for (_i = 0, expectedProps_1 = expectedProps; _i < expectedProps_1.length; _i++) {
                  prop = expectedProps_1[_i]
                  ;(0, vitest_1.expect)(jwk).toHaveProperty(prop)
                }
                return [2 /*return*/]
            }
          })
        })
      },
    )
  })
  ;(0, vitest_1.describe)('add()', function () {
    vitest_1.it.each([
      ['RSA', testKeys.getParsed('test-rs256-key.json')],
      ['EC', testKeys.getParsed('test-es256-key.json')],
      ['OKP', testKeys.getParsed('test-eddsa-key.json')],
    ])('should be able to add a JWK key to the store (kty = %s)', function (keyType, testKey) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, key
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [4 /*yield*/, store.add(testKey)]
            case 1:
              key = _a.sent()
              ;(0, vitest_1.expect)(key).toMatchObject({
                kty: keyType,
                kid: testKey['kid'],
              })
              return [2 /*return*/]
          }
        })
      })
    })
    vitest_1.it.each([
      ['RSA', testKeys.getParsed('test-rs256-key.json')],
      ['EC', testKeys.getParsed('test-es256-key.json')],
      ['OKP', testKeys.getParsed('test-eddsa-key.json')],
    ])('throws when serialized key lacks the "alg" property (kty = %s)', function (_keyType, testKey) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              delete testKey['alg']
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.add(testKey)
                }).rejects.toThrow('Unspecified JWK "alg" property'),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    vitest_1.it.each([
      ['RSA', testKeys.getParsed('test-rs256-key.json')],
      ['EC', testKeys.getParsed('test-es256-key.json')],
      ['OKP', testKeys.getParsed('test-eddsa-key.json')],
    ])('throws when serialized key contains an unsupported "alg" value (kty = %s)', function (_keyType, testKey) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              testKey['alg'] = 'DUNNO256'
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.add(testKey)
                }).rejects.toThrow('Unsupported JWK "alg" value ("DUNNO256")'),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('throws when serialized RSA key is public"', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, testKey
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              testKey = testKeys.getParsed('test-rs256-key.json')
              delete testKey['d']
              delete testKey['p']
              delete testKey['q']
              delete testKey['dp']
              delete testKey['dq']
              delete testKey['qi']
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.add(testKey)
                }).rejects.toThrow('Invalid JWK type. No "private" key related data has been found.'),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('throws when serialized EC key is public"', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, testKey
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              testKey = testKeys.getParsed('test-es256-key.json')
              delete testKey['d']
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.add(testKey)
                }).rejects.toThrow('Invalid JWK type. No "private" key related data has been found.'),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('throws when serialized OKP key is public"', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, testKey
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              testKey = testKeys.getParsed('test-eddsa-key.json')
              delete testKey['d']
              return [
                4 /*yield*/,
                (0, vitest_1.expect)(function () {
                  return store.add(testKey)
                }).rejects.toThrow('Invalid JWK type. No "private" key related data has been found.'),
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('adding a key will overwrite an existing key in the store bearing the same "kid"', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, one, retrievedOne, two, retrievedTwo
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              one = testKeys.getParsed('test-rs256-key.json')
              ;(0, vitest_1.expect)(one['kty']).toBe('RSA')
              one['kid'] = 'new_id'
              return [4 /*yield*/, store.add(one)]
            case 1:
              _a.sent()
              retrievedOne = store.get('new_id')
              ;(0, vitest_1.expect)(retrievedOne).not.toBeNull()
              ;(0, vitest_1.expect)(retrievedOne.kty).toEqual(one['kty'])
              two = testKeys.getParsed('test-es256-key.json')
              ;(0, vitest_1.expect)(two['kty']).toBe('EC')
              two['kid'] = 'new_id'
              return [4 /*yield*/, store.add(two)]
            case 2:
              _a.sent()
              retrievedTwo = store.get('new_id')
              ;(0, vitest_1.expect)(retrievedTwo).not.toBeNull()
              ;(0, vitest_1.expect)(retrievedTwo.kty).toEqual(two['kty'])
              return [2 /*return*/]
          }
        })
      })
    })
  })
  ;(0, vitest_1.describe)('get()', function () {
    ;(0, vitest_1.it)("should be able to retrieve a key by its 'kid'", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, key1, key2, stored1, stored2a, stored2b, stored3
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [4 /*yield*/, store.generate('RS256', { kid: 'key-one' })]
            case 1:
              key1 = _a.sent()
              return [4 /*yield*/, store.generate('RS256', { kid: 'key-two' })]
            case 2:
              key2 = _a.sent()
              ;(0, vitest_1.expect)(key1.kid).not.toEqual(key2.kid)
              stored1 = store.get('key-one')
              stored2a = store.get('key-two')
              stored2b = store.get('key-two')
              stored3 = store.get('non-existing-kid')
              ;(0, vitest_1.expect)(stored1).toBe(key1)
              ;(0, vitest_1.expect)(stored2a).toBe(key2)
              ;(0, vitest_1.expect)(stored2b).toBe(key2)
              ;(0, vitest_1.expect)(stored3).toBeUndefined()
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should be able to retrieve keys in a round-robin manner', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, key1, key2, key3, key4
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [4 /*yield*/, store.generate('RS256', { kid: 'key-one' })]
            case 1:
              _a.sent()
              return [4 /*yield*/, store.generate('RS256', { kid: 'key-two' })]
            case 2:
              _a.sent()
              return [4 /*yield*/, store.generate('RS256', { kid: 'key-three' })]
            case 3:
              _a.sent()
              key1 = store.get()
              ;(0, vitest_1.expect)(key1).not.toBeNull()
              key2 = store.get()
              ;(0, vitest_1.expect)(key2).not.toBeNull()
              ;(0, vitest_1.expect)(key2.kid).not.toEqual(key1.kid)
              key3 = store.get()
              ;(0, vitest_1.expect)(key3).not.toBeNull()
              ;(0, vitest_1.expect)(key3.kid).not.toEqual(key1.kid)
              ;(0, vitest_1.expect)(key3.kid).not.toEqual(key2.kid)
              key4 = store.get()
              ;(0, vitest_1.expect)(key4).not.toBeNull()
              ;(0, vitest_1.expect)(key4.kid).toEqual(key1.kid)
              return [2 /*return*/]
          }
        })
      })
    })
    ;(0, vitest_1.it)('should return undefined when trying to retrieve a key from an empty store', function () {
      var store = new jwk_store_1.JWKStore()
      var res1 = store.get()
      var res2 = store.get('non-existing-kid')
      ;(0, vitest_1.expect)(res1).toBeUndefined()
      ;(0, vitest_1.expect)(res2).toBeUndefined()
    })
  })
  ;(0, vitest_1.describe)('toJSON()', function () {
    vitest_1.it.each([undefined, true, false])(
      'should be able to produce a JSON representation of the public keys in the key store (including private fields: %s)',
      function (shouldIncludePrivates) {
        return __awaiter(void 0, void 0, void 0, function () {
          var store, jwks, _i, jwks_1, key
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                store = new jwk_store_1.JWKStore()
                return [4 /*yield*/, store.generate('RS256', { kid: 'key-one' })]
              case 1:
                _a.sent()
                return [4 /*yield*/, store.generate('RS256', { kid: 'key-two' })]
              case 2:
                _a.sent()
                return [4 /*yield*/, store.generate('RS256', { kid: 'key-three' })]
              case 3:
                _a.sent()
                jwks = store.toJSON(shouldIncludePrivates)
                ;(0, vitest_1.expect)(jwks).toHaveProperty('keys')
                ;(0, vitest_1.expect)(jwks).toBeInstanceOf(Array)
                ;(0, vitest_1.expect)(jwks).toHaveLength(3)
                for (_i = 0, jwks_1 = jwks; _i < jwks_1.length; _i++) {
                  key = jwks_1[_i]
                  ;(0, vitest_1.expect)(key).toBeInstanceOf(Object)
                  ;(0, vitest_1.expect)(key).toHaveProperty('kid')
                  ;(0, vitest_1.expect)(typeof key.kid).toBe('string')
                }
                ;(0, vitest_1.expect)(
                  jwks
                    .map(function (key) {
                      return key.kid
                    })
                    .sort(),
                ).toEqual(['key-one', 'key-three', 'key-two'])
                jwks.forEach(function (jwk) {
                  ;(0, vitest_1.expect)(store.get(jwk.kid)).not.toBeNull()
                  ;['e', 'n'].forEach(function (prop) {
                    ;(0, vitest_1.expect)(jwk).toHaveProperty(prop)
                  })
                  ;['d', 'p', 'q', 'dp', 'dq', 'qi'].forEach(function (prop) {
                    var isExposed = prop in jwk
                    var shouldBeExposed = shouldIncludePrivates === true
                    ;(0, vitest_1.expect)(isExposed).toEqual(shouldBeExposed)
                  })
                })
                return [2 /*return*/]
            }
          })
        })
      },
    )
    vitest_1.it.each([
      ['RSA', testKeys.getParsed('test-rs256-key.json'), ['d', 'p', 'q', 'dp', 'dq', 'qi']],
      ['EC', testKeys.getParsed('test-es256-key.json'), ['d']],
      ['OKP', testKeys.getParsed('test-eddsa-key.json'), ['d']],
    ])('properly removes private fields from key when requesting it (kty = %s)', function (_keyType, testKey, fields) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, keys, key
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              store = new jwk_store_1.JWKStore()
              return [4 /*yield*/, store.add(testKey)]
            case 1:
              _a.sent()
              keys = store.toJSON(false)
              ;(0, vitest_1.expect)(keys).toHaveLength(1)
              key = keys[0]
              fields.forEach(function (prop) {
                ;(0, vitest_1.expect)(key).not.toHaveProperty(prop)
              })
              return [2 /*return*/]
          }
        })
      })
    })
  })
})
