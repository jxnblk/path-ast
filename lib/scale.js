
var keys = require('./keys')
var constants = require('./constants')

// - [ ] Add cx, cy
// - [ ] Default to center
// - [ ] getCenter util

module.exports = function scale(n, cx, cy) {

  var center = this.getCenter()
  cx = typeof cx !== 'undefined' ? cx : center.x
  cy = typeof cy !== 'undefined' ? cy : center.y

  var commands = this.commands

  commands = commands.map(function (command) {
    keys[command.type].forEach(function (key, i) {
      var param = command.params[key]
      if (key.match(constants.X_REGEX)) {
        // command.params[key] = param * n
        command.params[key] = cx + (param - cx) * n
      }
      if (key.match(constants.Y_REGEX)) {
        // command.params[key] = param * n
        command.params[key] = cy + (param - cy) * n
      }
    })
    return command
  })

  return this

}

