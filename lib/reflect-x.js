
var keys = require('./keys')
var constants = require('./constants')

module.exports = function reflectX(cx) {

  if (!cx) {
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
      if (key.match(constants.X_REGEX) && key !== 'rx') {
        command.params[key] = flipParam(command.type, cx, param)
      }
      if (key === 'sweepFlag') {
        command.params[key] = 1 - param
      }
    })
    return command
  })

  return this

}

