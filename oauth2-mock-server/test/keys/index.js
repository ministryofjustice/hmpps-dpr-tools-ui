'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getParsed = getParsed
var path_1 = require('path')
var helpers_1 = require('../../src/lib/helpers')
function getParsed(filename) {
  var filepath = path_1.default.join(__dirname, filename)
  return (0, helpers_1.readJsonFromFile)(filepath)
}
