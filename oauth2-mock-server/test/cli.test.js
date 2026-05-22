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
var promises_1 = require('fs/promises')
var vitest_1 = require('vitest')
var child_script_1 = require('./lib/child-script')
vitest_1.vi.mock('fs/promises', function () {
  return {
    writeFile: vitest_1.vi.fn().mockImplementation(function () {
      return ''
    }),
  }
})
var mockWriteFileAsync = vitest_1.vi.mocked(promises_1.writeFile)
;(0, vitest_1.describe)('CLI', function () {
  ;(0, vitest_1.afterEach)(function () {
    vitest_1.vi.resetModules()
  })
  vitest_1.it.each([['-h'], ['--help']])('should be able to print out usage information (%s)', function (arg) {
    return __awaiter(void 0, void 0, void 0, function () {
      var res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, executeCli(arg)]
          case 1:
            res = _a.sent()
            ;(0, vitest_1.expect)(res.result).toBeNull()
            ;(0, vitest_1.expect)(res.exitCode).toBeUndefined()
            ;(0, vitest_1.expect)(res.stdout).toMatch(/^Usage: oauth2-mock-server \[options\]/)
            return [2 /*return*/]
        }
      })
    })
  })
  vitest_1.it.each([['-unknown'], ['--unknown'], ['123'], [' ']])(
    'should not allow unrecognized options',
    function (arg) {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, executeCli(arg)]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res).toEqual(errorResponse("Unrecognized option '".concat(arg, "'.")))
              return [2 /*return*/]
          }
        })
      })
    },
  )
  vitest_1.it.each([['0.0.0.0'], ['::'], ['localhost'], ['127.0.0.1'], ['::1']])(
    'should accept a binding address (%s)',
    function (address) {
      return __awaiter(void 0, void 0, void 0, function () {
        var res
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, executeCli('-a', address, '-p', '0')]
            case 1:
              res = _a.sent()
              ;(0, vitest_1.expect)(res).toEqual({
                result: vitest_1.expect.any(Object),
                exitCode: undefined,
                stdout: vitest_1.expect.any(String),
                stderr: '',
              })
              ;(0, vitest_1.expect)(res.stdout).toMatch(/^OAuth 2 server listening on http:\/\/.+?:\d+$/m)
              ;(0, vitest_1.expect)(res.stdout).toMatch(/^OAuth 2 issuer is http:\/\/localhost:\d+$/m)
              return [2 /*return*/]
          }
        })
      })
    },
  )
  vitest_1.it.each([['not-a-number'], ['-1'], ['65536']])("should not allow invalid port number '%s'", function (port) {
    return __awaiter(void 0, void 0, void 0, function () {
      var res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, executeCli('-p', port)]
          case 1:
            res = _a.sent()
            ;(0, vitest_1.expect)(res).toEqual(errorResponse('Invalid port number.'))
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)('should allow importing JSON-formatted keys', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var res, keys
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              executeCli(
                '--jwk',
                'test/keys/test-rs256-key.json',
                '--jwk',
                'test/keys/test-es256-key.json',
                '--jwk',
                'test/keys/test-eddsa-key.json',
                '-p',
                '0',
              ),
            ]
          case 1:
            res = _a.sent()
            ;(0, vitest_1.expect)(res.stdout).toMatch(/^Added key with kid "test-rs256-key"$/m)
            ;(0, vitest_1.expect)(res.stdout).toMatch(/^Added key with kid "test-es256-key"$/m)
            ;(0, vitest_1.expect)(res.stdout).toMatch(/^Added key with kid "test-eddsa-key"$/m)
            ;(0, vitest_1.expect)(res.result).not.toBeNull()
            keys = res.result.issuer.keys
            ;(0, vitest_1.expect)(keys.get('test-rs256-key')).toBeDefined()
            ;(0, vitest_1.expect)(keys.get('test-es256-key')).toBeDefined()
            ;(0, vitest_1.expect)(keys.get('test-eddsa-key')).toBeDefined()
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)('should allow exporting JSON-formatted keys', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var generatedPath, res, key
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            generatedPath = ''
            mockWriteFileAsync.mockImplementation(function (p) {
              if (typeof p !== 'string') {
                throw new Error('Unepextected path type.')
              }
              generatedPath = p
              return Promise.resolve()
            })
            return [4 /*yield*/, executeCli('--save-jwk', '-p', '0')]
          case 1:
            res = _a.sent()
            ;(0, vitest_1.expect)(res.result).not.toBeNull()
            key = res.result.issuer.keys.get()
            ;(0, vitest_1.expect)(key).toBeDefined()
            ;(0, vitest_1.expect)(key).toHaveProperty('kid')
            ;(0, vitest_1.expect)(generatedPath).toBe(''.concat(key.kid, '.json'))
            ;(0, vitest_1.expect)(res.stdout).toMatch(/^Generated new RSA key with kid "[\w-]+"$/m)
            ;(0, vitest_1.expect)(res.stdout).toMatch(/^JSON web key written to file "[\w-]+\.json"\.$/m)
            return [2 /*return*/]
        }
      })
    })
  })
})
function executeCli() {
  var args = []
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i]
  }
  return __awaiter(this, void 0, void 0, function () {
    var res
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, (0, child_script_1.default)(args)]
        case 1:
          res = _a.sent()
          if (!res.result) return [3 /*break*/, 3]
          return [4 /*yield*/, res.result.stop()]
        case 2:
          _a.sent()
          _a.label = 3
        case 3:
          return [2 /*return*/, res]
      }
    })
  })
}
function errorResponse(message) {
  return {
    err: vitest_1.expect.any(Error),
    result: null,
    exitCode: 1,
    stdout: '',
    stderr: ''.concat(message, '\n'),
  }
}
