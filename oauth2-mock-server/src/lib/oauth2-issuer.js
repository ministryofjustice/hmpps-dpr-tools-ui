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
var _OAuth2Issuer_keys
Object.defineProperty(exports, '__esModule', { value: true })
exports.OAuth2Issuer = void 0
/**
 * OAuth2 Issuer library
 * @module lib/oauth2-issuer
 */
var node_events_1 = require('node:events')
var jose_1 = require('jose')
var jwk_store_1 = require('./jwk-store')
var helpers_1 = require('./helpers')
var types_internals_1 = require('./types-internals')
/**
 * Represents an OAuth 2 issuer.
 */
var OAuth2Issuer = /** @class */ (function (_super) {
  __extends(OAuth2Issuer, _super)
  /**
   * Creates a new instance of HttpServer.
   */
  function OAuth2Issuer() {
    var _this = _super.call(this) || this
    _OAuth2Issuer_keys.set(_this, void 0)
    _this.url = undefined
    __classPrivateFieldSet(_this, _OAuth2Issuer_keys, new jwk_store_1.JWKStore(), 'f')
    return _this
  }
  Object.defineProperty(OAuth2Issuer.prototype, 'keys', {
    /**
     * Returns the key store.
     * @type {JWKStore}
     */
    get: function () {
      return __classPrivateFieldGet(this, _OAuth2Issuer_keys, 'f')
    },
    enumerable: false,
    configurable: true,
  })
  /**
   * Builds a JWT.
   * @param {TokenBuildOptions} [opts] JWT token building overrides
   * @returns {Promise<string>} The produced JWT.
   * @fires OAuth2Issuer#beforeSigning
   */
  OAuth2Issuer.prototype.buildToken = function (opts) {
    return __awaiter(this, void 0, void 0, function () {
      var key, timestamp, header, payload, scopesOrTransform, token, privateKey, jwt
      var _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            key = this.keys.get(opts === null || opts === void 0 ? void 0 : opts.kid)
            if (key === undefined) {
              throw new Error('Cannot build token: Unknown key.')
            }
            timestamp = Math.floor(Date.now() / 1000)
            header = {
              kid: key.kid,
            }
            ;(0, helpers_1.assertIsString)(this.url, 'Unknown issuer url')
            payload = {
              iss: this.url,
              iat: timestamp,
              exp:
                timestamp +
                ((_a = opts === null || opts === void 0 ? void 0 : opts.expiresIn) !== null && _a !== void 0
                  ? _a
                  : helpers_1.defaultTokenTtl),
              nbf: timestamp - 10,
            }
            if ((opts === null || opts === void 0 ? void 0 : opts.scopesOrTransform) !== undefined) {
              scopesOrTransform = opts.scopesOrTransform
              if (typeof scopesOrTransform === 'string') {
                payload['scope'] = scopesOrTransform
              } else if (Array.isArray(scopesOrTransform)) {
                payload['scope'] = scopesOrTransform.join(' ')
              } else if (typeof scopesOrTransform === 'function') {
                scopesOrTransform(header, payload)
              }
            }
            token = {
              header: header,
              payload: payload,
            }
            /**
             * Before signing event.
             * @event OAuth2Issuer#beforeSigning
             * @param {MutableToken} token The JWT header and payload.
             */
            this.emit(types_internals_1.InternalEvents.BeforeSigning, token)
            return [4 /*yield*/, (0, jose_1.importJWK)(key)]
          case 1:
            privateKey = _b.sent()
            return [
              4 /*yield*/,
              new jose_1.SignJWT(token.payload)
                .setProtectedHeader(__assign(__assign({}, token.header), { typ: 'JWT', alg: key.alg }))
                .sign(privateKey),
            ]
          case 2:
            jwt = _b.sent()
            console.log('built jwt ', jwt)
            return [2 /*return*/, jwt]
        }
      })
    })
  }
  return OAuth2Issuer
})(node_events_1.EventEmitter)
exports.OAuth2Issuer = OAuth2Issuer
_OAuth2Issuer_keys = new WeakMap()
