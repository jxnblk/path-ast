
var keys = require('./keys')
var constants = require('./constants')

module.exports = function translate(x, y) {

  this.commands = this.commands.map(function (command) {
    keys[command.type].forEach(function (key, i) {
      var param = command.params[key]
      if (!command.type.match(/[A-Z]/) || typeof command.params[key] === 'undefined') {
        return false
      }
      if (key.match(constants.X_REGEX)) {
        command.params[key] = param + x
      }
      if (key.match(constants.Y_REGEX)) {
        command.params[key] = param + y
      }
    })
    return command
  })
  .filter(function (command) {
    return command !== false
  })

  return this

}

