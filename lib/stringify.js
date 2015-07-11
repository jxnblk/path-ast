
var keys = require('./keys')

module.exports = function (ast, options) {

  var string = ast.commands.map(function (command) {

    var params = keys[command.type].map(function (key, i) {
      return command.params[key]
    }).join(' ')

    return command.type + params

  }).join(' ')

  return string.trim()

}

