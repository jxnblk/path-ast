
var keys = require('./keys')

module.exports = function (string, options) {

  var COMMAND_SPLIT_REGEX = /[\s\,](?=[a-zA-Z])/

  var ast = {}
  ast.raw = string.trim()
  ast.commands = []

  function parseRawString (str) {
    return str.split(COMMAND_SPLIT_REGEX)
  }

  function parseCommandString (str) {
    var type = str.substring(0, 1)
    var params = str.substring(1)
    var arr = params.split(/\s|\,/)
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
      command.params[key] = command.params.arr[i]
    })
    delete command.params.arr
    delete command.params.raw
    return command
  }

  ast.commands = parseRawString(ast.raw)
    .map(parseCommandString)
    .map(parseParameters)

  return ast

}

