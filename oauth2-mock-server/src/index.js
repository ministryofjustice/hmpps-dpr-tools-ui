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
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p)
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OAuth2Server = exports.OAuth2Issuer = exports.JWKStore = void 0
var jwk_store_1 = require('./lib/jwk-store')
Object.defineProperty(exports, 'JWKStore', {
  enumerable: true,
  get: function () {
    return jwk_store_1.JWKStore
  },
})
var oauth2_issuer_1 = require('./lib/oauth2-issuer')
Object.defineProperty(exports, 'OAuth2Issuer', {
  enumerable: true,
  get: function () {
    return oauth2_issuer_1.OAuth2Issuer
  },
})
var oauth2_server_1 = require('./lib/oauth2-server')
Object.defineProperty(exports, 'OAuth2Server', {
  enumerable: true,
  get: function () {
    return oauth2_server_1.OAuth2Server
  },
})
__exportStar(require('./lib/types'), exports)
