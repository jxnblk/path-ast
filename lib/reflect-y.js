
var keys = require('./keys')
var constants = require('./constants')

// - [ ] default to getCenter util

module.exports = function reflectY(cy) {

  if (!cy) {
    return this
  }

  function flipParam(commandType, center, param) {
    if (commandType.match(/[a-z]/)) {
      return param * -1
    } else {
      return center + center - param
    }
  }

  this.commands = this.commands.map(function (command) {
    keys[command.type].forEach(function (key, i) {
      var param = command.params[key]
      if (key.match(constants.Y_REGEX) && key !=='ry') {
        command.params[key] = flipParam(command.type, cy, param)
      }
      if (key === 'sweepFlag') {
        command.params[key] = 1 - param
      }
    })
    return command
  })

  return this

}

