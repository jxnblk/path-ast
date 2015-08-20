
var keys = require('./keys')
var constants = require('./constants')

function rad(a) {
  return Math.PI * a / 180
}

// Reference
function rx(x, r, a) {
  return x + r * Math.cos(rad(a))
}

function ry(y, r, a) {
  return y + r * Math.sin(rad(a))
}

function getRadius(x, y) {
  // x^2 + y^2 = r^2
  // Math.pow(x, 2) + Math.pow(y, 2) = Math.pow(r, 2)
  return Math.sqrt( Math.pow(x, 2), + Math.pow(y, 2) )
}

module.exports = function rotate(x, y, a) {

  var prevX, prevY

  this.commands = this.commands.map(function (command) {
    var params = command.params
    if (params.x || params.y) {
      prevX = params.x || 0
      prevY = params.y || 0
      var radius = getRadius(x - prevX, y - prevY)
      console.log('coor', prevX, prevY)
      console.log('diff coor', x - prevX, y - prevY)
      console.log('radius', radius)
      var nextX = rx(x, radius, 0)
      var nextY = ry(y, radius, 0)
      console.log('new coordinates', nextX, nextY)
    }
    // To do: handle x1, y1, x2, y2, rx, ry
    /*
    keys[command.type].forEach(function (key, i) {
      var param = command.params[key]
      if (key.match(constants.X_REGEX) || key.match(constants.Y_REGEX)) {
        // command.params[key] = param * n
      }
    })
    */
    return command
  })

  return this

}

