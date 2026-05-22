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
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable')
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it')
    return kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
  }
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot read private member from an object whose class did not declare it')
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver)
  }
var _HttpServer_server, _HttpServer_isSecured
Object.defineProperty(exports, '__esModule', { value: true })
exports.HttpServer = void 0
var node_http_1 = require('node:http')
var node_https_1 = require('node:https')
var node_net_1 = require('node:net')
var node_url_1 = require('node:url')
var helpers_1 = require('./helpers')
/**
 * Provides a restartable wrapper for http.CreateServer().
 */
var HttpServer = /** @class */ (function () {
  /**
   * Creates a new instance of HttpServer.
   * @param {RequestListener} requestListener The function that will handle the server's requests.
   * @param {HttpServerOptions} options Optional HttpServerOptions to start the server with https.
   */
  function HttpServer(requestListener, options) {
    _HttpServer_server.set(this, void 0)
    _HttpServer_isSecured.set(this, void 0)
    __classPrivateFieldSet(this, _HttpServer_isSecured, false, 'f')
    if (
      (options === null || options === void 0 ? void 0 : options.key) &&
      (options === null || options === void 0 ? void 0 : options.cert)
    ) {
      __classPrivateFieldSet(this, _HttpServer_server, (0, node_https_1.createServer)(options, requestListener), 'f')
      __classPrivateFieldSet(this, _HttpServer_isSecured, true, 'f')
    } else {
      __classPrivateFieldSet(this, _HttpServer_server, (0, node_http_1.createServer)(requestListener), 'f')
    }
  }
  Object.defineProperty(HttpServer.prototype, 'listening', {
    /**
     * Returns a value indicating whether or not the server is listening for connections.
     * @type {boolean}
     */
    get: function () {
      return __classPrivateFieldGet(this, _HttpServer_server, 'f').listening
    },
    enumerable: false,
    configurable: true,
  })
  /**
   * Returns the bound address, family name and port where the server is listening,
   * or null if the server has not been started.
   * @returns {AddressInfo} The server bound address information.
   */
  HttpServer.prototype.address = function () {
    if (!this.listening) {
      throw new Error('Server is not started.')
    }
    var address = __classPrivateFieldGet(this, _HttpServer_server, 'f').address()
    ;(0, helpers_1.assertIsAddressInfo)(address)
    return address
  }
  /**
   * Starts the server.
   * @param {number} [port] Port number. If omitted, it will be assigned by the operating system.
   * @param {string} [host] Host name.
   * @returns {Promise<void>} A promise that resolves when the server has been started.
   */
  HttpServer.prototype.start = function (port, host) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_a) {
        if (this.listening) {
          throw new Error('Server has already been started.')
        }
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            __classPrivateFieldGet(_this, _HttpServer_server, 'f')
              .listen(port, host)
              .on('listening', resolve)
              .on('error', reject)
          }),
        ]
      })
    })
  }
  /**
   * Stops the server.
   * @returns {Promise} Resolves when the server has been stopped.
   */
  HttpServer.prototype.stop = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_a) {
        if (!this.listening) {
          throw new Error('Server is not started.')
        }
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            __classPrivateFieldGet(_this, _HttpServer_server, 'f').close(function (err) {
              if (err) {
                return reject(err)
              }
              return resolve()
            })
          }),
        ]
      })
    })
  }
  HttpServer.prototype.buildIssuerUrl = function (host, port) {
    var url = new node_url_1.URL(
      ''
        .concat(__classPrivateFieldGet(this, _HttpServer_isSecured, 'f') ? 'https' : 'http', '://localhost:')
        .concat(port),
    )
    if (host && !coversLocalhost(host)) {
      url.hostname = host.includes(':') ? '['.concat(host, ']') : host
    }
    return url.origin
  }
  return HttpServer
})()
exports.HttpServer = HttpServer
;(_HttpServer_server = new WeakMap()), (_HttpServer_isSecured = new WeakMap())
var coversLocalhost = function (address) {
  switch ((0, node_net_1.isIP)(address)) {
    case 4:
      return address === '0.0.0.0' || address.startsWith('127.')
    case 6:
      return address === '::' || address === '::1'
    default:
      return false
  }
}
