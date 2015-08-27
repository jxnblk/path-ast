
var keys = require('./keys')
var constants = require('./constants')

var pairs = [
  ['x', 'y'],
  ['x1', 'y1'],
  ['x2', 'y2']
]

module.exports = function toAbsolute() {

  var lastX = 0
  var lastY = 0

  this.commands = this.commands.map(function (command) {
    var params = command.params
    if (command.type.match(/[A-Z]/)) {
      lastX = params.x || lastX
      lastY = params.y || lastY
      return command
    } else {
      command.type = command.type.toUpperCase()
      keys[command.type].forEach(function (key, i) {
        var param = command.params[key]
        if (key.match(constants.X_REGEX)) {
          command.params[key] = lastX + param
        }
        if (key.match(constants.Y_REGEX)) {
          command.params[key] = lastY + param
        }
      })
      lastX = command.params.x || lastX
      lastY = command.params.y || lastY
      return command
    }
  })

  return this

}

