
var keys = require('./keys')
var constants = require('./constants')

// - [ ] Add cx, cy
// - [ ] Default to center
// - [ ] getCenter util

module.exports = function scale(n) {

  var commands = this.commands

  commands = commands.map(function (command) {
    keys[command.type].forEach(function (key, i) {
      var param = command.params[key]
      if (key.match(constants.X_REGEX) || key.match(constants.Y_REGEX)) {
        if (!command.params[key]) {
          // Remove syntax errors
          return false
        }
        command.params[key] = param * n
      }
    })
    return command
  })
  .filter(function (command) {
    return command !== false
  })

  return this

}

