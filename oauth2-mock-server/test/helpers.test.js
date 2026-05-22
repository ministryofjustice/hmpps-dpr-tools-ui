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
var helpers_1 = require('../src/lib/helpers')
;(0, vitest_1.describe)('helpers', function () {
  ;(0, vitest_1.describe)('assertIsString', function () {
    vitest_1.it.each([null, 1, true, {}, []])('throws on wrong types (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsString)(input, 'boom')
      }).toThrow()
    })
    ;(0, vitest_1.it)('does not throw on strings', function () {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsString)('good', 'will not throw')
      }).not.toThrow()
    })
  })
  ;(0, vitest_1.describe)('assertIsStringOrUndefined', function () {
    vitest_1.it.each([null, 1, true, {}, []])('throws on wrong types (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsStringOrUndefined)(input, 'boom')
      }).toThrow()
    })
    ;(0, vitest_1.it)('does not throw on strings', function () {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsStringOrUndefined)('good', 'will not throw')
      }).not.toThrow()
    })
    ;(0, vitest_1.it)('does not throw on undefined', function () {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsStringOrUndefined)(undefined, 'will not throw')
      }).not.toThrow()
    })
  })
  ;(0, vitest_1.describe)('assertIsAddressInfo', function () {
    vitest_1.it.each(['nope', null])('throws on wrong values (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsAddressInfo)(input)
      }).toThrow()
    })
    ;(0, vitest_1.it)('does not throw on valid input', function () {
      var input = {
        address: 'here',
        family: 'We are family!',
        port: 42,
      }
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsAddressInfo)(input)
      }).not.toThrow()
    })
  })
  ;(0, vitest_1.describe)('assertIsPlainObject', function () {
    vitest_1.it.each(['nope', null, 1, false, []])('throws on wrong values (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsPlainObject)(input, 'boom')
      }).toThrow()
    })
    vitest_1.it.each([{}, { a: 1 }])('does not throw on valid input (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsPlainObject)(input, 'boom')
      }).not.toThrow()
    })
  })
  ;(0, vitest_1.describe)('assertIsValidTokenRequest', function () {
    vitest_1.it.each([
      'nope',
      null,
      1,
      false,
      [],
      { grant_type: 1 },
      { grant_type: 'g', code: 1 },
      { grant_type: 'g', scope: 1 },
      { grant_type: 'g', scope: 's', code: 1 },
      { grant_type: 'g', scope: 1, code: 'c' },
      { grant_type: 'g', scope: '1', code: 'c', aud: 1 },
      { grant_type: 'g', scope: '1', code: 'c', aud: [1] },
    ])('throws on wrong values (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsValidTokenRequest)(input)
      }).toThrow()
    })
    vitest_1.it.each([
      { grant_type: 'g' },
      { grant_type: 'g', code: 'c' },
      { grant_type: 'g', scope: 's' },
      { grant_type: 'g', scope: 's', code: 'c' },
      { grant_type: 'g', scope: 's', code: 'c', aud: 'a' },
      { grant_type: 'g', scope: 's', code: 'c', aud: ['a', 'b'] },
    ])('does not throw on valid input (%s)', function (input) {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.assertIsValidTokenRequest)(input)
      }).not.toThrow()
    })
  })
  ;(0, vitest_1.describe)('shift', function () {
    ;(0, vitest_1.it)('throws on empty array', function () {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.shift)([])
      }).toThrow()
    })
    ;(0, vitest_1.it)('throws on array containing an undefined entry', function () {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.shift)([undefined])
      }).toThrow()
    })
    ;(0, vitest_1.it)('does not throw on valid input', function () {
      ;(0, vitest_1.expect)(function () {
        return (0, helpers_1.shift)(['a'])
      }).not.toThrow()
    })
  })
  ;(0, vitest_1.describe)('pkce', function () {
    ;(0, vitest_1.describe)('code_verifier', function () {
      ;(0, vitest_1.it)('should accept a valid PKCE code_verifier', function () {
        var verifier128 =
          'PXa7p8YHHUAJGrcG2eW0x7FY_EBtRTlaUHnyz1jKWnNp0G-2HZt9KjA0UOp87DmuIqoV4Y_owVsM-QICvrSa5dWxOndVEhSsFMMgy68AYkw4PGHkGaN_aIRIHJ8mQ4EZ'
        var verifier42 = 'xyo94uhy3zKvgB0NJwLms86SwcjtWviEOpkBnGgaLlo'
        ;(0, vitest_1.expect)((0, helpers_1.isValidPkceCodeVerifier)(verifier128)).toBe(true)
        ;(0, vitest_1.expect)((0, helpers_1.isValidPkceCodeVerifier)(verifier42)).toBe(true)
        var verifierWith129chars = ''.concat(verifier128, 'a')
        ;(0, vitest_1.expect)((0, helpers_1.isValidPkceCodeVerifier)(verifierWith129chars)).toBe(false)
        ;(0, vitest_1.expect)((0, helpers_1.isValidPkceCodeVerifier)(verifier42.slice(0, verifier42.length - 1))).toBe(
          false,
        )
      })
      ;(0, vitest_1.it)('should create a valid code_verifier', function () {
        ;(0, vitest_1.expect)((0, helpers_1.isValidPkceCodeVerifier)((0, helpers_1.createPKCEVerifier)())).toBe(true)
      })
      ;(0, vitest_1.it)('should create a valid code_challenge', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, expectedChallenge, generatedCodeChallenge, expectedCodeLength, _a
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                verifier = 'xyo94uhy3zKvgB0NJwLms86SwcjtWviEOpkBnGgaLlo'
                expectedChallenge = 'b7elB7ZyxIXgFyvBznKvxl7wOB-H17Pz0a3B62NIMFI'
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier, 'S256')]
              case 1:
                generatedCodeChallenge = _b.sent()
                ;(0, vitest_1.expect)(generatedCodeChallenge).toBe(expectedChallenge)
                expectedCodeLength = 43
                _a = vitest_1.expect
                return [
                  4 /*yield*/,
                  (0, helpers_1.createPKCECodeChallenge)((0, helpers_1.createPKCEVerifier)(), 'S256'),
                ]
              case 2:
                _a.apply(void 0, [_b.sent()]).toHaveLength(expectedCodeLength)
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should match code_verifier and code_challenge', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier, codeChallengeMethod, challenge, _a
          var _b
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                codeChallengeMethod = 'S256'
                _b = {}
                return [4 /*yield*/, (0, helpers_1.createPKCECodeChallenge)(verifier, codeChallengeMethod)]
              case 1:
                challenge = ((_b.challenge = _c.sent()), (_b.method = codeChallengeMethod), _b)
                _a = vitest_1.expect
                return [4 /*yield*/, (0, helpers_1.pkceVerifierMatchesChallenge)(verifier, challenge)]
              case 2:
                _a.apply(void 0, [_c.sent()]).toBe(true)
                return [2 /*return*/]
            }
          })
        })
      })
      ;(0, vitest_1.it)('should throw on an unsupported method', function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var verifier
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                verifier = (0, helpers_1.createPKCEVerifier)()
                return [
                  4 /*yield*/,
                  (0, vitest_1.expect)(
                    (0, helpers_1.createPKCECodeChallenge)(verifier, 'BAD-METHOD'),
                  ).rejects.toThrowError('Unsupported PKCE method ("BAD-METHOD")'),
                ]
              case 1:
                _a.sent()
                return [2 /*return*/]
            }
          })
        })
      })
    })
  })
})
