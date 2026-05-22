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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.default = exec
var util_1 = require('util')
function exec(args) {
  return __awaiter(this, void 0, void 0, function () {
    var log, error, res, mod, _a, err_1
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          process.argv = __spreadArray(['irrelevant', 'irrelevant as well'], args, true)
          log = ConsoleOutHook('log')
          error = ConsoleOutHook('error')
          res = {
            result: null,
            err: undefined,
            exitCode: 0,
            stdout: '',
            stderr: '',
          }
          _b.label = 1
        case 1:
          _b.trys.push([1, 4, 5, 6])
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require('../../src/oauth2-mock-server')
            }),
          ]
        case 2:
          mod = _b.sent()
          _a = res
          return [4 /*yield*/, mod.default]
        case 3:
          _a.result = _b.sent()
          return [3 /*break*/, 6]
        case 4:
          err_1 = _b.sent()
          res.err = err_1
          return [3 /*break*/, 6]
        case 5:
          log.mockRestore()
          error.mockRestore()
          res.exitCode = process.exitCode
          process.exitCode = undefined
          return [7 /*endfinally*/]
        case 6:
          res.stdout = log.output()
          res.stderr = error.output()
          return [2 /*return*/, res]
      }
    })
  })
}
function ConsoleOutHook(method) {
  var entries = []
  var old = console[method]
  console[method] = function (msg) {
    var args = []
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i]
    }
    entries.push(util_1.default.format.apply(util_1.default, __spreadArray([msg], args, false)))
    entries.push('\n')
  }
  return {
    mockClear: function mockClear() {
      entries = []
    },
    mockRestore: function mockRestore() {
      console[method] = old
    },
    output: function output() {
      return entries.join('')
    },
  }
}
