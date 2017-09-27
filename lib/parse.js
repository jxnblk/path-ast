
var keys = require('./keys')
var constants = require('./constants')
var scale = require('./scale')
var translate = require('./translate')
var rotate = require('./rotate')
var reflectX = require('./reflect-x')
var reflectY = require('./reflect-y')
var toAbsolute = require('./to-absolute')
var getCenter = require('./get-center')
var getBounds = require('./get-bounds')

module.exports = function (string, options) {

  var ast = {}
  ast.raw = string.trim()
  ast.scale = scale
  ast.translate = translate
  ast.rotate = rotate
  ast.reflectX = reflectX
  ast.reflectY = reflectY
  ast.toAbsolute = toAbsolute
  ast.getCenter = getCenter
  ast.getBounds = getBounds
  ast.commands = []

  function parseRawString (str) {
    var arr = str.split(constants.COMMAND_SPLIT_REGEX)
      .map(function (str) {
        return str.trim()
      })
      .filter(function (str) {
        return str !== ''
      })
    return arr
  }

  function parseCommandString (str) {
    var type = str.substring(0, 1)
    var params = str.substring(1)
    var arr = params.split(/\s|\,/)
      .filter(function (param) {
        return param !== ''
      })
      .map(function (param) {
        return parseFloat(param)
      })
    if (!str.substring(0, 1).match(/[a-zA-Z]/)) {
      console.error('First character is not a letter')
    }
    if (!params.match(/[A-Za-z0-9]/)) {
      params = ''
      arr = []
    }
    return {
      raw: str,
      type: type,
      params: {
        raw: params,
        arr: arr
      }
    }
  }

  function parseParameters (command) {
    keys[command.type].forEach(function (key, i) {
      if (typeof command.params.arr[i] === 'undefined') {
        console.log('Missing parameter', command)
        return false
      }
      command.params[key] = command.params.arr[i]
    })
    delete command.params.arr
    delete command.params.raw
    return command
  }

  ast.commands = parseRawString(ast.raw)
    .map(parseCommandString)
    .map(parseParameters)
    .filter(function (command) {
      // Remove syntax errors
      return command
    })

  return ast

}
