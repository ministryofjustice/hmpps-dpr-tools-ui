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
var _JWKStore_keyRotator, _KeyRotator_keys
Object.defineProperty(exports, '__esModule', { value: true })
exports.JWKStore = void 0
/**
 * JWK Store library
 * @module lib/jwk-store
 */
var node_crypto_1 = require('node:crypto')
var node_assert_1 = require('node:assert')
var jose_1 = require('jose')
var helpers_1 = require('./helpers')
var generateRandomKid = function () {
  return (0, node_crypto_1.randomBytes)(40).toString('hex')
}
var RsaPrivateFieldsRemover = function (jwk) {
  var x = __assign({}, jwk)
  delete x.d
  delete x.p
  delete x.q
  delete x.dp
  delete x.dq
  delete x.qi
  return x
}
var EcdsaPrivateFieldsRemover = function (jwk) {
  var x = __assign({}, jwk)
  delete x.d
  return x
}
var EddsaPrivateFieldsRemover = function (jwk) {
  var x = __assign({}, jwk)
  delete x.d
  return x
}
var privateToPublicTransformerMap = {
  // RSASSA-PKCS1-v1_5
  RS256: RsaPrivateFieldsRemover,
  RS384: RsaPrivateFieldsRemover,
  RS512: RsaPrivateFieldsRemover,
  // RSASSA-PSS
  PS256: RsaPrivateFieldsRemover,
  PS384: RsaPrivateFieldsRemover,
  PS512: RsaPrivateFieldsRemover,
  // ECDSA
  ES256: EcdsaPrivateFieldsRemover,
  ES256K: EcdsaPrivateFieldsRemover,
  ES384: EcdsaPrivateFieldsRemover,
  ES512: EcdsaPrivateFieldsRemover,
  // Edwards-curve DSA
  EdDSA: EddsaPrivateFieldsRemover,
}
var supportedAlgs = Object.keys(privateToPublicTransformerMap)
function normalizeKeyKid(jwk, opts) {
  ;(0, helpers_1.assertIsPlainObject)(jwk, 'Invalid jwk format')
  if (jwk['kid'] !== undefined) {
    return
  }
  if (opts !== undefined && opts.kid !== undefined) {
    jwk['kid'] = opts.kid
  } else {
    jwk['kid'] = generateRandomKid()
  }
}
/**
 * Simple JWK store
 */
var JWKStore = /** @class */ (function () {
  /**
   * Creates a new instance of the keystore.
   */
  function JWKStore() {
    _JWKStore_keyRotator.set(this, void 0)
    __classPrivateFieldSet(this, _JWKStore_keyRotator, new KeyRotator(), 'f')
  }
  /**
   * Generates a new random key and adds it into this keystore.
   * @param {string} alg The selected algorithm.
   * @param {object} [opts] The options.
   * @param {string} [opts.kid] The key identifier to use.
   * @param {string} [opts.crv] The OKP "crv" to be used for "EdDSA" algorithm.
   * @returns {Promise<JWK>} The promise for the generated key.
   */
  JWKStore.prototype.generate = function (alg, opts) {
    return __awaiter(this, void 0, void 0, function () {
      var generateOpts, pair, joseJwk, jwk
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            generateOpts = opts !== undefined && opts.crv !== undefined ? { crv: opts.crv } : {}
            return [4 /*yield*/, (0, jose_1.generateKeyPair)(alg, generateOpts)]
          case 1:
            pair = _a.sent()
            return [4 /*yield*/, (0, jose_1.exportJWK)(pair.privateKey)]
          case 2:
            joseJwk = _a.sent()
            normalizeKeyKid(joseJwk, opts)
            joseJwk.alg = alg
            jwk = joseJwk
            __classPrivateFieldGet(this, _JWKStore_keyRotator, 'f').add(jwk)
            return [2 /*return*/, jwk]
        }
      })
    })
  }
  /**
   * Adds a JWK key to this keystore.
   * @param {object} maybeJwk The JWK key to add.
   * @returns {Promise<JWK>} The promise for the added key.
   */
  JWKStore.prototype.add = function (maybeJwk) {
    return __awaiter(this, void 0, void 0, function () {
      var tempJwk, jwk, privateKey
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            tempJwk = __assign({}, maybeJwk)
            normalizeKeyKid(tempJwk)
            if (tempJwk.alg === undefined) {
              throw new Error('Unspecified JWK "alg" property')
            }
            if (!supportedAlgs.includes(tempJwk.alg)) {
              throw new Error('Unsupported JWK "alg" value ("'.concat(tempJwk.alg, '")'))
            }
            jwk = tempJwk
            return [4 /*yield*/, (0, jose_1.importJWK)(jwk)]
          case 1:
            privateKey = _a.sent()
            if (!(privateKey instanceof node_crypto_1.KeyObject) || privateKey.type !== 'private') {
              throw new Error('Invalid JWK type. No "private" key related data has been found.')
            }
            __classPrivateFieldGet(this, _JWKStore_keyRotator, 'f').add(jwk)
            return [2 /*return*/, jwk]
        }
      })
    })
  }
  /**
   * Gets a key from the keystore in a round-robin fashion.
   * If a 'kid' is provided, only keys that match will be taken into account.
   * @param {string} [kid] The optional key identifier to match keys against.
   * @returns {JWK.Key | null} The retrieved key.
   */
  JWKStore.prototype.get = function (kid) {
    return __classPrivateFieldGet(this, _JWKStore_keyRotator, 'f').next(kid)
  }
  /**
   * Generates a JSON representation of this keystore, which conforms
   * to a JWK Set from {I-D.ietf-jose-json-web-key}.
   * @param {boolean} [includePrivateFields] `true` if the private fields
   *        of stored keys are to be included.
   * @returns {JWK[]} The JSON representation of this keystore.
   */
  JWKStore.prototype.toJSON = function (includePrivateFields) {
    if (includePrivateFields === void 0) {
      includePrivateFields = false
    }
    return __classPrivateFieldGet(this, _JWKStore_keyRotator, 'f').toJSON(includePrivateFields)
  }
  return JWKStore
})()
exports.JWKStore = JWKStore
_JWKStore_keyRotator = new WeakMap()
var KeyRotator = /** @class */ (function () {
  function KeyRotator() {
    _KeyRotator_keys.set(this, [])
  }
  KeyRotator.prototype.add = function (key) {
    var pos = this.findNext(key.kid)
    if (pos > -1) {
      __classPrivateFieldGet(this, _KeyRotator_keys, 'f').splice(pos, 1)
    }
    __classPrivateFieldGet(this, _KeyRotator_keys, 'f').push(key)
  }
  KeyRotator.prototype.next = function (kid) {
    var i = this.findNext(kid)
    if (i === -1) {
      return undefined
    }
    return this.moveToTheEnd(i)
  }
  KeyRotator.prototype.toJSON = function (includePrivateFields) {
    var keys = []
    for (var _i = 0, _a = __classPrivateFieldGet(this, _KeyRotator_keys, 'f'); _i < _a.length; _i++) {
      var key = _a[_i]
      if (includePrivateFields) {
        keys.push(__assign({}, key))
        continue
      }
      var cleaner = privateToPublicTransformerMap[key.alg]
      if (cleaner === undefined) {
        throw new Error("Unsupported algo '{key.alg}'")
      }
      keys.push(cleaner(key))
    }
    return keys
  }
  KeyRotator.prototype.findNext = function (kid) {
    if (__classPrivateFieldGet(this, _KeyRotator_keys, 'f').length === 0) {
      return -1
    }
    if (kid === undefined) {
      return 0
    }
    return __classPrivateFieldGet(this, _KeyRotator_keys, 'f').findIndex(function (x) {
      return x.kid === kid
    })
  }
  KeyRotator.prototype.moveToTheEnd = function (i) {
    var key = __classPrivateFieldGet(this, _KeyRotator_keys, 'f').splice(i, 1)[0]
    if (key === undefined) {
      throw new node_assert_1.AssertionError({
        message: 'Unexpected error. key is supposed to exist',
      })
    }
    __classPrivateFieldGet(this, _KeyRotator_keys, 'f').push(key)
    return key
  }
  return KeyRotator
})()
_KeyRotator_keys = new WeakMap()
