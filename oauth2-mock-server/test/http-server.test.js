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
var fs_1 = require('fs')
var vitest_1 = require('vitest')
var supertest_1 = require('supertest')
var http_server_1 = require('../src/lib/http-server')
;(0, vitest_1.describe)('HTTP Server', function () {
  ;(0, vitest_1.it)('should be able to start and stop the server', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var server, host, res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            server = new http_server_1.HttpServer(dummyHandler)
            return [4 /*yield*/, (0, vitest_1.expect)(server.start()).resolves.not.toThrow()]
          case 1:
            _a.sent()
            host = 'http://127.0.0.1:'.concat(server.address().port)
            return [4 /*yield*/, (0, supertest_1.default)(host).get('/').expect(200)]
          case 2:
            res = _a.sent()
            ;(0, vitest_1.expect)(res.body).toEqual({
              value: 'Dummy response',
            })
            return [4 /*yield*/, (0, vitest_1.expect)(server.stop()).resolves.not.toThrow()]
          case 3:
            _a.sent()
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)('should be listening only when the server is started', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var server
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            server = new http_server_1.HttpServer(dummyHandler)
            ;(0, vitest_1.expect)(server.listening).toBe(false)
            return [4 /*yield*/, server.start()]
          case 1:
            _a.sent()
            ;(0, vitest_1.expect)(server.listening).toBe(true)
            return [4 /*yield*/, server.stop()]
          case 2:
            _a.sent()
            ;(0, vitest_1.expect)(server.listening).toBe(false)
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)('should support https if cert + key options are supplied', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var server, host, res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            server = new http_server_1.HttpServer(dummyHandler, {
              key: (0, fs_1.readFileSync)('test/keys/localhost-key.pem'),
              cert: (0, fs_1.readFileSync)('test/keys/localhost-cert.pem'),
            })
            return [4 /*yield*/, (0, vitest_1.expect)(server.start()).resolves.not.toThrow()]
          case 1:
            _a.sent()
            ;(0, vitest_1.expect)(server.listening).toBe(true)
            host = 'https://127.0.0.1:'.concat(server.address().port)
            return [4 /*yield*/, (0, supertest_1.default)(host).get('/').trustLocalhost(true).expect(200)]
          case 2:
            res = _a.sent()
            ;(0, vitest_1.expect)(res.body).toEqual({
              value: 'Dummy response',
            })
            return [4 /*yield*/, server.stop()]
          case 3:
            _a.sent()
            ;(0, vitest_1.expect)(server.listening).toBe(false)
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)('should have an address only when the server is started', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var server
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            server = new http_server_1.HttpServer(dummyHandler)
            ;(0, vitest_1.expect)(function () {
              return server.address()
            }).toThrow('Server is not started.')
            return [4 /*yield*/, server.start()]
          case 1:
            _a.sent()
            ;(0, vitest_1.expect)(server.address()).toMatchObject({
              address: vitest_1.expect.any(String),
              family: vitest_1.expect.stringMatching(/IPv4|IPv6/),
              port: vitest_1.expect.any(Number),
            })
            return [4 /*yield*/, server.stop()]
          case 2:
            _a.sent()
            ;(0, vitest_1.expect)(function () {
              return server.address()
            }).toThrow('Server is not started.')
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)("should not be able to start the server when it's already started", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var server
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            server = new http_server_1.HttpServer(dummyHandler)
            return [4 /*yield*/, server.start()]
          case 1:
            _a.sent()
            return [
              4 /*yield*/,
              (0, vitest_1.expect)(server.start()).rejects.toThrow('Server has already been started.'),
            ]
          case 2:
            _a.sent()
            return [4 /*yield*/, server.stop()]
          case 3:
            _a.sent()
            return [2 /*return*/]
        }
      })
    })
  })
  ;(0, vitest_1.it)("should not be able to stop the server when it's already stopped", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var server
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            server = new http_server_1.HttpServer(dummyHandler)
            return [4 /*yield*/, (0, vitest_1.expect)(server.stop()).rejects.toThrow('Server is not started.')]
          case 1:
            _a.sent()
            return [2 /*return*/]
        }
      })
    })
  })
})
var dummyHandler = function (_req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end('{ "value": "Dummy response" }')
}
