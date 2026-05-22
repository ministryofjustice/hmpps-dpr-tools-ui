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
var _OAuth2Service_issuer,
  _OAuth2Service_requestHandler,
  _OAuth2Service_nonce,
  _OAuth2Service_codeChallenges,
  _OAuth2Service_endpoints
Object.defineProperty(exports, '__esModule', { value: true })
exports.OAuth2Service = void 0
var node_url_1 = require('node:url')
var node_crypto_1 = require('node:crypto')
var node_events_1 = require('node:events')
var node_assert_1 = require('node:assert')
var express_1 = require('express')
var cors_1 = require('cors')
var basic_auth_1 = require('basic-auth')
var helpers_1 = require('./helpers')
var types_1 = require('./types')
var types_internals_1 = require('./types-internals')
var DEFAULT_ENDPOINTS = Object.freeze({
  wellKnownDocument: '/.well-known/openid-configuration',
  token: '/token',
  jwks: '/jwks',
  authorize: '/authorize',
  userinfo: '/userinfo',
  revoke: '/revoke',
  endSession: '/endsession',
  introspect: '/introspect',
})
/**
 * Provides a request handler for an OAuth 2 server.
 */
var OAuth2Service = /** @class */ (function (_super) {
  __extends(OAuth2Service, _super)
  function OAuth2Service(oauth2Issuer, endpoints) {
    var _this = _super.call(this) || this
    /**
     * Creates a new instance of OAuth2Server.
     * @param {OAuth2Issuer} oauth2Issuer The OAuth2Issuer instance
     *     that will be offered through the service.
     * @param {OAuth2EndpointsInput | undefined} paths Endpoint path name overrides.
     */
    _OAuth2Service_issuer.set(_this, void 0)
    _OAuth2Service_requestHandler.set(_this, void 0)
    _OAuth2Service_nonce.set(_this, void 0)
    _OAuth2Service_codeChallenges.set(_this, void 0)
    _OAuth2Service_endpoints.set(_this, void 0)
    _this.buildRequestHandler = function () {
      var app = (0, express_1.default)()
      console.log('building request handler')
      app.disable('x-powered-by')
      app.use(express_1.default.json())
      app.use((0, cors_1.default)())
      app.get(
        __classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').wellKnownDocument,
        _this.openidConfigurationHandler,
      )
      app.get(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').jwks, _this.jwksHandler)
      app.post(
        __classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').token,
        express_1.default.urlencoded({ extended: false }),
        _this.tokenHandler,
      )
      app.get(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').authorize, _this.authorizeHandler)
      app.get(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').userinfo, _this.userInfoHandler)
      app.post(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').revoke, _this.revokeHandler)
      app.get(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').endSession, _this.endSessionHandler)
      app.post(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').introspect, _this.introspectHandler)
      app.get('/users/me/caseloads', _this.caseloadHandler)
      app.get('/users/me/email', _this.userInfoEmailHandler)
      return app
    }
    _this.openidConfigurationHandler = function (_req, res) {
      ;(0, helpers_1.assertIsString)(_this.issuer.url, 'Unknown issuer url.')
      var normalizedIssuerUrl = trimPotentialTrailingSlash(_this.issuer.url)
      var openidConfig = {
        issuer: _this.issuer.url,
        token_endpoint: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').token),
        authorization_endpoint: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').authorize),
        userinfo_endpoint: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').userinfo),
        token_endpoint_auth_methods_supported: ['none'],
        jwks_uri: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').jwks),
        response_types_supported: ['code'],
        grant_types_supported: ['client_credentials', 'authorization_code', 'password'],
        token_endpoint_auth_signing_alg_values_supported: ['RS256'],
        response_modes_supported: ['query'],
        id_token_signing_alg_values_supported: ['RS256'],
        revocation_endpoint: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').revoke),
        subject_types_supported: ['public'],
        end_session_endpoint: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').endSession),
        introspection_endpoint: ''
          .concat(normalizedIssuerUrl)
          .concat(__classPrivateFieldGet(_this, _OAuth2Service_endpoints, 'f').introspect),
        code_challenge_methods_supported: helpers_1.supportedPkceAlgorithms,
      }
      return res.json(openidConfig)
    }
    _this.jwksHandler = function (_req, res) {
      res.set('Content-Type', 'application/jwk-set+json')
      return res.json({ keys: _this.issuer.keys.toJSON() })
    }
    _this.tokenHandler = function (req, res, next) {
      return __awaiter(_this, void 0, void 0, function () {
        var tokenTtl,
          xfn,
          code,
          verifier,
          savedCodeChallenge,
          doesVerifierMatchCodeChallenge,
          e_1,
          reqBody_1,
          scope_1,
          aud_1,
          token,
          body,
          credentials,
          clientId_1,
          xfn_1,
          _a,
          _b,
          tokenEndpointResponse,
          e_2
        var _this = this
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              _c.trys.push([0, 8, , 9])
              tokenTtl = helpers_1.defaultTokenTtl
              res.set({ 'Cache-Control': 'no-store', Pragma: 'no-cache' })
              xfn = void 0
              ;(0, helpers_1.assertIsValidTokenRequest)(req.body)
              if (!('code_verifier' in req.body && 'code' in req.body)) return [3 /*break*/, 4]
              _c.label = 1
            case 1:
              _c.trys.push([1, 3, , 4])
              code = req.body.code
              verifier = req.body['code_verifier']
              savedCodeChallenge = __classPrivateFieldGet(this, _OAuth2Service_codeChallenges, 'f').get(code)
              if (savedCodeChallenge === undefined) {
                throw new node_assert_1.AssertionError({ message: 'code_challenge required' })
              }
              __classPrivateFieldGet(this, _OAuth2Service_codeChallenges, 'f').delete(code)
              if (!(0, helpers_1.isValidPkceCodeVerifier)(verifier)) {
                throw new node_assert_1.AssertionError({
                  message:
                    "Invalid 'code_verifier'. The verifier does not conform with the RFC7636 spec. Ref: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1",
                })
              }
              return [4 /*yield*/, (0, helpers_1.pkceVerifierMatchesChallenge)(verifier, savedCodeChallenge)]
            case 2:
              doesVerifierMatchCodeChallenge = _c.sent()
              if (!doesVerifierMatchCodeChallenge) {
                throw new node_assert_1.AssertionError({
                  message: 'code_verifier provided does not match code_challenge',
                })
              }
              return [3 /*break*/, 4]
            case 3:
              e_1 = _c.sent()
              return [
                2 /*return*/,
                res.status(400).json({
                  error: 'invalid_request',
                  error_description: e_1.message,
                }),
              ]
            case 4:
              reqBody_1 = req.body
              scope_1 = reqBody_1.scope
              aud_1 = reqBody_1.aud
              switch (req.body.grant_type) {
                case 'client_credentials':
                  xfn = function (_header, payload) {
                    Object.assign(payload, { scope: scope_1, aud: aud_1 })
                  }
                  break
                case 'password':
                  xfn = function (_header, payload) {
                    Object.assign(payload, {
                      sub: reqBody_1.username,
                      amr: ['pwd'],
                      scope: scope_1,
                    })
                  }
                  break
                case 'authorization_code':
                  scope_1 = scope_1 !== null && scope_1 !== void 0 ? scope_1 : 'dummy'
                  xfn = function (_header, payload) {
                    Object.assign(payload, { sub: 'johndoe', amr: ['pwd'], scope: scope_1 })
                  }
                  break
                case 'refresh_token':
                  scope_1 = scope_1 !== null && scope_1 !== void 0 ? scope_1 : 'dummy'
                  xfn = function (_header, payload) {
                    Object.assign(payload, { sub: 'johndoe', amr: ['pwd'], scope: scope_1 })
                  }
                  break
                default:
                  return [2 /*return*/, res.status(400).json({ error: 'invalid_grant' })]
              }
              return [4 /*yield*/, this.buildToken(req, tokenTtl, xfn)]
            case 5:
              token = _c.sent()
              body = {
                access_token: token,
                token_type: 'Bearer',
                expires_in: tokenTtl,
                scope: scope_1,
              }
              if (!(req.body.grant_type !== 'client_credentials')) return [3 /*break*/, 7]
              credentials = (0, basic_auth_1.default)(req)
              clientId_1 = credentials ? credentials.name : req.body.client_id
              xfn_1 = function (_header, payload) {
                Object.assign(payload, { sub: 'johndoe', aud: clientId_1 })
                if (
                  reqBody_1.code !== undefined &&
                  __classPrivateFieldGet(_this, _OAuth2Service_nonce, 'f')[reqBody_1.code]
                ) {
                  Object.assign(payload, {
                    nonce: __classPrivateFieldGet(_this, _OAuth2Service_nonce, 'f')[reqBody_1.code],
                  })
                  delete __classPrivateFieldGet(_this, _OAuth2Service_nonce, 'f')[reqBody_1.code]
                }
              }
              _a = body
              _b = 'id_token'
              return [4 /*yield*/, this.buildToken(req, tokenTtl, xfn_1)]
            case 6:
              _a[_b] = _c.sent()
              body['refresh_token'] = (0, node_crypto_1.randomUUID)()
              _c.label = 7
            case 7:
              tokenEndpointResponse = { body: body, statusCode: 200 }
              /**
               * Before token response event.
               * @event OAuth2Service#beforeResponse
               * @param {MutableResponse} response The response body and status code.
               * @param {IncomingMessage} req The incoming HTTP request.
               */
              this.emit(types_1.Events.BeforeResponse, tokenEndpointResponse, req)
              return [2 /*return*/, res.status(tokenEndpointResponse.statusCode).json(tokenEndpointResponse.body)]
            case 8:
              e_2 = _c.sent()
              return [2 /*return*/, next(e_2)]
            case 9:
              return [2 /*return*/]
          }
        })
      })
    }
    _this.authorizeHandler = function (req, res) {
      var code = (0, node_crypto_1.randomUUID)()
      var _a = req.query,
        nonce = _a.nonce,
        scope = _a.scope,
        redirectUri = _a.redirect_uri,
        responseType = _a.response_type,
        state = _a.state,
        code_challenge = _a.code_challenge,
        code_challenge_method = _a.code_challenge_method
      ;(0, helpers_1.assertIsString)(redirectUri, 'Invalid redirectUri type')
      ;(0, helpers_1.assertIsStringOrUndefined)(nonce, 'Invalid nonce type')
      ;(0, helpers_1.assertIsStringOrUndefined)(scope, 'Invalid scope type')
      ;(0, helpers_1.assertIsStringOrUndefined)(state, 'Invalid state type')
      ;(0, helpers_1.assertIsStringOrUndefined)(code_challenge, 'Invalid code_challenge type')
      ;(0, helpers_1.assertIsStringOrUndefined)(code_challenge_method, 'Invalid code_challenge_method type')
      var url = new node_url_1.URL(redirectUri)
      if (responseType === 'code') {
        if (code_challenge) {
          var codeChallengeMethod =
            code_challenge_method !== null && code_challenge_method !== void 0 ? code_challenge_method : 'plain'
          ;(0, helpers_1.assertIsString)(codeChallengeMethod, "Invalid 'code_challenge_method' type")
          if (!helpers_1.supportedPkceAlgorithms.includes(codeChallengeMethod)) {
            return res.status(400).json({
              error: 'invalid_request',
              error_description: 'Unsupported code_challenge method '
                .concat(codeChallengeMethod, '. The following code_challenge_method are supported: ')
                .concat(helpers_1.supportedPkceAlgorithms.join(', ')),
            })
          }
          __classPrivateFieldGet(_this, _OAuth2Service_codeChallenges, 'f').set(code, {
            challenge: code_challenge,
            method: codeChallengeMethod,
          })
        }
        if (nonce !== undefined) {
          __classPrivateFieldGet(_this, _OAuth2Service_nonce, 'f')[code] = nonce
        }
        url.searchParams.set('code', code)
      } else {
        url.searchParams.set('error', 'unsupported_response_type')
        url.searchParams.set(
          'error_description',
          'The authorization server does not support obtaining an access token using this response_type.',
        )
      }
      if (state) {
        url.searchParams.set('state', state)
      }
      var authorizeRedirectUri = { url: url }
      /**
       * Before authorize redirect event.
       * @event OAuth2Service#beforeAuthorizeRedirect
       * @param {MutableRedirectUri} authorizeRedirectUri The redirect uri and query params to redirect to.
       * @param {IncomingMessage} req The incoming HTTP request.
       */
      _this.emit(types_1.Events.BeforeAuthorizeRedirect, authorizeRedirectUri, req)
      // Note: This is a textbook definition of an "open redirect" vuln
      // cf. https://cwe.mitre.org/data/definitions/601.html
      //
      // However, this whole library is expected to be used as a test helper,
      // so there's no real point in making the exposed API more complex (by
      // exposing an endpoint to preregister whitelisted urls, for instance)
      // for the sake of security.
      //
      // This is *not* a real oAuth2 server. This is *not* to be run in production.
      return res.redirect(url.href)
    }
    _this.caseloadHandler = function (_req, res) {
      console.log('case load handler called')
      var caseLoadResponse = {
        body: {
          username: 'johndoe',
          active: true,
          accountType: 'GENERAL',
          activeCaseLoad: { id: 'WWI', name: 'WANDSWORTH (HMP)' },
          caseloads: [],
        },
        statusCode: 200,
      }
      return res.status(caseLoadResponse.statusCode).json(caseLoadResponse.body)
    }
    _this.userInfoHandler = function (req, res) {
      var userInfoResponse = {
        body: {
          sub: 'johndoe',
          name: 'John Doe',
          username: 'TESTUSER',
          active: true,
          staffId: 231232,
        },
        statusCode: 200,
      }
      /**
       * Before user info event.
       * @event OAuth2Service#beforeUserinfo
       * @param {MutableResponse} response The response body and status code.
       * @param {IncomingMessage} req The incoming HTTP request.
       */
      _this.emit(types_1.Events.BeforeUserinfo, userInfoResponse, req)
      return res.status(userInfoResponse.statusCode).json(userInfoResponse.body)
    }
    _this.userInfoEmailHandler = function (req, res) {
      var userInfoEmailResponse = {
        body: [{ email: 'test@user.com' }],
        statusCode: 200,
      }
      /**
       * Before user info event.
       * @event OAuth2Service#beforeUserinfo
       * @param {MutableResponse} response The response body and status code.
       * @param {IncomingMessage} req The incoming HTTP request.
       */
      _this.emit(types_1.Events.BeforeUserinfo, userInfoEmailResponse, req)
      return res.status(userInfoEmailResponse.statusCode).json(userInfoEmailResponse.body)
    }
    _this.revokeHandler = function (req, res) {
      var revokeResponse = { statusCode: 200 }
      /**
       * Before revoke event.
       * @event OAuth2Service#beforeRevoke
       * @param {StatusCodeMutableResponse} response The response status code.
       * @param {IncomingMessage} req The incoming HTTP request.
       */
      _this.emit(types_1.Events.BeforeRevoke, revokeResponse, req)
      return res.status(revokeResponse.statusCode).send('')
    }
    _this.endSessionHandler = function (req, res) {
      ;(0, helpers_1.assertIsString)(req.query['post_logout_redirect_uri'], 'Invalid post_logout_redirect_uri type')
      var postLogoutRedirectUri = {
        url: new node_url_1.URL(req.query['post_logout_redirect_uri']),
      }
      /**
       * Before post logout redirect event.
       * @event OAuth2Service#beforePostLogoutRedirect
       * @param {MutableRedirectUri} postLogoutRedirectUri
       * @param {IncomingMessage} req The incoming HTTP request.
       */
      _this.emit(types_1.Events.BeforePostLogoutRedirect, postLogoutRedirectUri, req)
      return res.redirect(postLogoutRedirectUri.url.href)
    }
    _this.introspectHandler = function (req, res) {
      var introspectResponse = {
        body: { active: true },
        statusCode: 200,
      }
      /**
       * Before introspect event.
       * @event OAuth2Service#beforeIntrospect
       * @param {MutableResponse} response The response body and status code.
       * @param {IncomingMessage} req The incoming HTTP request.
       */
      _this.emit(types_1.Events.BeforeIntrospect, introspectResponse, req)
      return res.status(introspectResponse.statusCode).json(introspectResponse.body)
    }
    __classPrivateFieldSet(_this, _OAuth2Service_issuer, oauth2Issuer, 'f')
    __classPrivateFieldSet(_this, _OAuth2Service_endpoints, __assign(__assign({}, DEFAULT_ENDPOINTS), endpoints), 'f')
    __classPrivateFieldSet(_this, _OAuth2Service_requestHandler, _this.buildRequestHandler(), 'f')
    __classPrivateFieldSet(_this, _OAuth2Service_nonce, {}, 'f')
    __classPrivateFieldSet(_this, _OAuth2Service_codeChallenges, new Map(), 'f')
    return _this
  }
  Object.defineProperty(OAuth2Service.prototype, 'issuer', {
    /**
     * Returns the OAuth2Issuer instance bound to this service.
     * @type {OAuth2Issuer}
     */
    get: function () {
      return __classPrivateFieldGet(this, _OAuth2Service_issuer, 'f')
    },
    enumerable: false,
    configurable: true,
  })
  /**
   * Builds a JWT with a key in the keystore. The key will be selected in a round-robin fashion.
   * @param {IncomingMessage} req The incoming HTTP request.
   * @param {number} expiresIn Time in seconds for the JWT to expire. Default: 3600 seconds.
   * @param {ScopesOrTransform} [scopesOrTransform] A scope, array of scopes,
   *     or JWT transformation callback.
   * @returns {Promise<string>} The produced JWT.
   * @fires OAuth2Service#beforeTokenSigning
   */
  OAuth2Service.prototype.buildToken = function (req, expiresIn, scopesOrTransform) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.issuer.once(types_internals_1.InternalEvents.BeforeSigning, function (token) {
              /**
               * Before token signing event.
               * @event OAuth2Service#beforeTokenSigning
               * @param {MutableToken} token The unsigned JWT header and payload.
               * @param {IncomingMessage} req The incoming HTTP request.
               */
              _this.emit(types_1.Events.BeforeTokenSigning, token, req)
            })
            return [4 /*yield*/, this.issuer.buildToken({ scopesOrTransform: scopesOrTransform, expiresIn: expiresIn })]
          case 1:
            return [2 /*return*/, _a.sent()]
        }
      })
    })
  }
  Object.defineProperty(OAuth2Service.prototype, 'requestHandler', {
    /**
     * Returns a request handler to be used as a callback for http.createServer().
     * @type {Function}
     */
    get: function () {
      return __classPrivateFieldGet(this, _OAuth2Service_requestHandler, 'f')
    },
    enumerable: false,
    configurable: true,
  })
  return OAuth2Service
})(node_events_1.EventEmitter)
exports.OAuth2Service = OAuth2Service
;(_OAuth2Service_issuer = new WeakMap()),
  (_OAuth2Service_requestHandler = new WeakMap()),
  (_OAuth2Service_nonce = new WeakMap()),
  (_OAuth2Service_codeChallenges = new WeakMap()),
  (_OAuth2Service_endpoints = new WeakMap())
var trimPotentialTrailingSlash = function (url) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}
