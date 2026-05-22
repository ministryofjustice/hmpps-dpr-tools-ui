#!/usr/bin/env node
'use strict'
/**
 * Copyright (c) AXA Assistance France
 *
 * Licensed under the AXA Assistance France License (the "License"); you
 * may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.md file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
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
var promises_1 = require('node:fs/promises')
var node_path_1 = require('node:path')
var helpers_1 = require('./lib/helpers')
var index_1 = require('./index')
var config_1 = require('./config')
/* eslint no-console: off */
var defaultOptions = {
  port: 8080,
  keys: [],
  saveJWK: false,
}
function cli(args) {
  return __awaiter(this, void 0, void 0, function () {
    var options
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          try {
            options = parseCliArgs(args)
          } catch (err) {
            console.error(err instanceof Error ? err.message : err)
            process.exitCode = 1
            throw err
          }
          if (options === null) {
            showHelp()
            return [2 /*return*/, null]
          }
          return [4 /*yield*/, startServer(options)]
        case 1:
          return [2 /*return*/, _a.sent()]
      }
    })
  })
}
function parseCliArgs(args) {
  var opts = __assign({}, defaultOptions)
  while (args.length > 0) {
    var arg = (0, helpers_1.shift)(args)
    switch (arg) {
      case '-h':
      case '--help':
        return null
      case '-a':
        opts.host = (0, helpers_1.shift)(args)
        break
      case '-p':
        opts.port = parsePort((0, helpers_1.shift)(args))
        break
      case '-c':
        opts.cert = (0, helpers_1.shift)(args)
        break
      case '-k':
        opts.key = (0, helpers_1.shift)(args)
        break
      case '--jwk':
        opts.keys.push((0, helpers_1.readJsonFromFile)((0, helpers_1.shift)(args)))
        break
      case '--save-jwk':
        opts.saveJWK = true
        break
      default:
        throw new Error("Unrecognized option '".concat(arg, "'."))
    }
  }
  return opts
}
function showHelp() {
  var scriptName = node_path_1.default.basename(__filename, '.ts')
  console.log(
    'Usage: '
      .concat(scriptName, ' [options]\n       ')
      .concat(
        scriptName,
        ' -a localhost -p 8080\n\nOptions:\n  -h, --help        Shows this help information.\n  -a <address>      Address on which the server will listen for connections.\n                    If omitted, the server will accept connections on [::]\n                    if IPv6 is available, or 0.0.0.0 otherwise.\n  -p <port>         TCP port on which the server will listen for connections.\n                    If omitted, 8080 will be used.\n                    If 0 is provided, the operating system will assign\n                    an arbitrary unused port.\n  -c <cert>         Optional file path to an SSL cert. Both cert and key need\n                    to be supplied to enable SSL.\n  -k <key>          Optional file path to an SSL key. Both key and cert need\n                    to be supplied to enable SSL.\n  --jwk <filename>  Adds a JSON-formatted key to the server\'s keystore.\n                    Can be specified many times.\n  --save-jwk        Saves all the keys in the keystore as "{kid}.json".\n\nIf no keys are added via the --jwk option, a new random RSA key\nwill be generated. This key can then be saved to disk with the --save-jwk\nfor later reuse.',
      ),
  )
}
function parsePort(portStr) {
  var port = parseInt(portStr, 10)
  if (Number.isNaN(port) || port < 0 || port > 65535) {
    throw new Error('Invalid port number.')
  }
  return port
}
function saveJWK(keys) {
  return __awaiter(this, void 0, void 0, function () {
    var _i, keys_1, key, filename
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ;(_i = 0), (keys_1 = keys)
          _a.label = 1
        case 1:
          if (!(_i < keys_1.length)) return [3 /*break*/, 4]
          key = keys_1[_i]
          filename = ''.concat(key.kid, '.json')
          return [4 /*yield*/, (0, promises_1.writeFile)(filename, JSON.stringify(key, null, 2))]
        case 2:
          _a.sent()
          console.log('JSON web key written to file "'.concat(filename, '".'))
          _a.label = 3
        case 3:
          _i++
          return [3 /*break*/, 1]
        case 4:
          return [2 /*return*/]
      }
    })
  })
}
function startServer(opts) {
  return __awaiter(this, void 0, void 0, function () {
    var server, jwk, addr, hostname
    var _this = this
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          server = new index_1.OAuth2Server(opts.key, opts.cert, config_1.config.oauth2Options)
          return [
            4 /*yield*/,
            Promise.all(
              opts.keys.map(function (key) {
                return __awaiter(_this, void 0, void 0, function () {
                  var jwk
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/, server.issuer.keys.add(key)]
                      case 1:
                        jwk = _a.sent()
                        console.log('Added key with kid "'.concat(jwk.kid, '"'))
                        return [2 /*return*/]
                    }
                  })
                })
              }),
            ),
          ]
        case 1:
          _a.sent()
          if (!(opts.keys.length === 0)) return [3 /*break*/, 3]
          return [4 /*yield*/, server.issuer.keys.generate('RS256')]
        case 2:
          jwk = _a.sent()
          console.log('xxx Generated new RSA key with kid "'.concat(jwk.kid, '"'))
          _a.label = 3
        case 3:
          // Add the client ID to a token
          //const basicAuth = require('basic-auth');
          server.service.on('beforeTokenSigning', function (token, req) {
            console.log('attempting to add client id to token on req' + req)
            token.payload.client_id = 'mock-oauth-clientId'
            token.payload.authorities = ['ROLE_PRISONS_REPORTING_TOOLS_USER', 'ROLE_PRISONS_REPORTING_USER']
          })
          if (!opts.saveJWK) return [3 /*break*/, 5]
          return [4 /*yield*/, saveJWK(server.issuer.keys.toJSON(true))]
        case 4:
          _a.sent()
          _a.label = 5
        case 5:
          //add roles endpoint
          return [4 /*yield*/, server.start(opts.port, opts.host)]
        case 6:
          //add roles endpoint
          _a.sent()
          addr = server.address()
          hostname = addr.family === 'IPv6' ? '['.concat(addr.address, ']') : addr.address
          console.log('OAuth 2 server listening on http://'.concat(hostname, ':').concat(addr.port))
          ;(0, helpers_1.assertIsString)(server.issuer.url, 'Empty host')
          console.log('OAuth 2 issuer url is '.concat(server.issuer.url))
          process.once('SIGINT', function () {
            console.log('OAuth 2 server is stopping...')
            var handler = function () {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [4 /*yield*/, server.stop()]
                    case 1:
                      _a.sent()
                      return [2 /*return*/]
                  }
                })
              })
            }
            handler().catch(function (e) {
              throw e
            })
            console.log('OAuth 2 server has been stopped.')
          })
          return [2 /*return*/, server]
      }
    })
  })
}
exports.default = cli(process.argv.slice(2))
