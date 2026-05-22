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
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
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
exports.OAuth2Server = void 0
/**
 * OAuth2 HTTP Server library
 * @module lib/oauth2-server
 */
var node_fs_1 = require('node:fs')
var http_server_1 = require('./http-server')
var oauth2_issuer_1 = require('./oauth2-issuer')
var oauth2_service_1 = require('./oauth2-service')
var helpers_1 = require('./helpers')
/**
 * Represents an OAuth2 HTTP server.
 */
var OAuth2Server = /** @class */ (function (_super) {
  __extends(OAuth2Server, _super)
  /**
   * Creates a new instance of OAuth2Server.
   * @param {string | undefined} key Optional key file path for ssl
   * @param {string | undefined} cert Optional cert file path for ssl
   * @param {OAuth2Options | undefined} oauth2Options Optional additional settings
   */
  function OAuth2Server(key, cert, oauth2Options) {
    var _this = this
    if ((key && !cert) || (!key && cert)) {
      throw new Error('Both key and cert need to be supplied to start the server with https')
    }
    var iss = new oauth2_issuer_1.OAuth2Issuer()
    var serv = new oauth2_service_1.OAuth2Service(
      iss,
      oauth2Options === null || oauth2Options === void 0 ? void 0 : oauth2Options.endpoints,
    )
    var options = undefined
    if (key && cert) {
      options = {
        key: (0, node_fs_1.readFileSync)(key),
        cert: (0, node_fs_1.readFileSync)(cert),
      }
    }
    _this = _super.call(this, serv.requestHandler, options) || this
    _this._issuer = iss
    _this._service = serv
    return _this
  }
  Object.defineProperty(OAuth2Server.prototype, 'issuer', {
    /**
     * Returns the OAuth2Issuer instance used by the server.
     * @type {OAuth2Issuer}
     */
    get: function () {
      return this._issuer
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(OAuth2Server.prototype, 'service', {
    /**
     * Returns the OAuth2Service instance used by the server.
     * @type {OAuth2Service}
     */
    get: function () {
      return this._service
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(OAuth2Server.prototype, 'listening', {
    /**
     * Returns a value indicating whether or not the server is listening for connections.
     * @type {boolean}
     */
    get: function () {
      return _super.prototype.listening
    },
    enumerable: false,
    configurable: true,
  })
  /**
   * Returns the bound address, family name and port where the server is listening,
   * or null if the server has not been started.
   * @returns {AddressInfo} The server bound address information.
   */
  OAuth2Server.prototype.address = function () {
    var address = _super.prototype.address.call(this)
    ;(0, helpers_1.assertIsAddressInfo)(address)
    return address
  }
  /**
   * Starts the server.
   * @param {number} [port] Port number. If omitted, it will be assigned by the operating system.
   * @param {string} [host] Host name.
   * @returns {Promise<void>} A promise that resolves when the server has been started.
   */
  OAuth2Server.prototype.start = function (port, host) {
    return __awaiter(this, void 0, void 0, function () {
      var server
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, _super.prototype.start.call(this, port, host)]
          case 1:
            server = _a.sent()
            if (!this.issuer.url) {
              this.issuer.url = _super.prototype.buildIssuerUrl.call(this, host, this.address().port)
            }
            return [2 /*return*/, server]
        }
      })
    })
  }
  /**
   * Stops the server.
   * @returns {Promise} Resolves when the server has been stopped.
   */
  OAuth2Server.prototype.stop = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, _super.prototype.stop.call(this)]
          case 1:
            _a.sent()
            this._issuer.url = undefined
            return [2 /*return*/]
        }
      })
    })
  }
  return OAuth2Server
})(http_server_1.HttpServer)
exports.OAuth2Server = OAuth2Server
