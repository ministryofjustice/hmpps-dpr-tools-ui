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
exports.createPKCECodeChallenge =
  exports.supportedPkceAlgorithms =
  exports.createPKCEVerifier =
  exports.isValidPkceCodeVerifier =
  exports.readJsonFromFile =
  exports.defaultTokenTtl =
    void 0
exports.assertIsString = assertIsString
exports.assertIsStringOrUndefined = assertIsStringOrUndefined
exports.assertIsAddressInfo = assertIsAddressInfo
exports.assertIsPlainObject = assertIsPlainObject
exports.pkceVerifierMatchesChallenge = pkceVerifierMatchesChallenge
exports.assertIsValidTokenRequest = assertIsValidTokenRequest
exports.shift = shift
/* eslint-disable jsdoc/require-jsdoc */
var node_assert_1 = require('node:assert')
var node_fs_1 = require('node:fs')
var node_crypto_1 = require('node:crypto')
var is_plain_object_1 = require('is-plain-object')
exports.defaultTokenTtl = 3600
function assertIsString(input, errorMessage) {
  if (typeof input !== 'string') {
    throw new node_assert_1.AssertionError({ message: errorMessage })
  }
}
function assertIsStringOrUndefined(input, errorMessage) {
  if (typeof input !== 'string' && input !== undefined) {
    throw new node_assert_1.AssertionError({ message: errorMessage })
  }
}
function assertIsAddressInfo(input) {
  if (input === null || typeof input === 'string') {
    throw new node_assert_1.AssertionError({ message: 'Unexpected address type' })
  }
}
function assertIsPlainObject(obj, errMessage) {
  if (!(0, is_plain_object_1.isPlainObject)(obj)) {
    throw new node_assert_1.AssertionError({ message: errMessage })
  }
}
function pkceVerifierMatchesChallenge(verifier, challenge) {
  return __awaiter(this, void 0, void 0, function () {
    var generatedChallenge
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, (0, exports.createPKCECodeChallenge)(verifier, challenge.method)]
        case 1:
          generatedChallenge = _a.sent()
          return [2 /*return*/, generatedChallenge === challenge.challenge]
      }
    })
  })
}
function assertIsValidTokenRequest(body) {
  assertIsPlainObject(body, 'Invalid token request body')
  if ('scope' in body) {
    assertIsString(body['scope'], "Invalid 'scope' type")
  }
  assertIsString(body['grant_type'], "Invalid 'grant_type' type")
  if ('code' in body) {
    assertIsString(body['code'], "Invalid 'code' type")
  }
  if ('aud' in body) {
    var aud = body['aud']
    if (Array.isArray(aud)) {
      aud.forEach(function (a) {
        return assertIsString(a, "Invalid 'aud' type")
      })
    } else {
      assertIsString(aud, "Invalid 'aud' type")
    }
  }
}
function shift(arr) {
  if (arr.length === 0) {
    throw new node_assert_1.AssertionError({ message: 'Empty array' })
  }
  var val = arr.shift()
  if (val === undefined) {
    throw new node_assert_1.AssertionError({ message: 'Empty value' })
  }
  return val
}
var readJsonFromFile = function (filepath) {
  var content = (0, node_fs_1.readFileSync)(filepath, 'utf8')
  var maybeJson = JSON.parse(content)
  assertIsPlainObject(maybeJson, 'File "'.concat(filepath, '" doesn\'t contain a properly JSON serialized object.'))
  return maybeJson
}
exports.readJsonFromFile = readJsonFromFile
var isValidPkceCodeVerifier = function (verifier) {
  var PKCE_CHALLENGE_REGEX = /^[A-Za-z0-9\-._~]{43,128}$/
  return PKCE_CHALLENGE_REGEX.test(verifier)
}
exports.isValidPkceCodeVerifier = isValidPkceCodeVerifier
var createPKCEVerifier = function () {
  var randomBytes = node_crypto_1.webcrypto.getRandomValues(new Uint8Array(32))
  return Buffer.from(randomBytes).toString('base64url')
}
exports.createPKCEVerifier = createPKCEVerifier
exports.supportedPkceAlgorithms = ['plain', 'S256']
var createPKCECodeChallenge = function () {
  var args_1 = []
  for (var _i = 0; _i < arguments.length; _i++) {
    args_1[_i] = arguments[_i]
  }
  return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (verifier, algorithm) {
    var challenge, _a, buffer
    if (verifier === void 0) {
      verifier = (0, exports.createPKCEVerifier)()
    }
    if (algorithm === void 0) {
      algorithm = 'plain'
    }
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _a = algorithm
          switch (_a) {
            case 'plain':
              return [3 /*break*/, 1]
            case 'S256':
              return [3 /*break*/, 2]
          }
          return [3 /*break*/, 4]
        case 1:
          {
            challenge = verifier
            return [3 /*break*/, 5]
          }
          _b.label = 2
        case 2:
          return [4 /*yield*/, node_crypto_1.webcrypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))]
        case 3:
          buffer = _b.sent()
          challenge = Buffer.from(buffer).toString('base64url')
          return [3 /*break*/, 5]
        case 4:
          throw new Error('Unsupported PKCE method ("'.concat(algorithm, '")'))
        case 5:
          return [2 /*return*/, challenge]
      }
    })
  })
}
exports.createPKCECodeChallenge = createPKCECodeChallenge
