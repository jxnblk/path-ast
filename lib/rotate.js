
// Not currently working

var keys = require('./keys')
var constants = require('./constants')

var pairs = [
  ['x', 'y'],
  ['x1', 'y1'],
  ['x2', 'y2'],
  ['x2', 'y2']
]
// To do xAxisRotation

function rad(deg) {
  return Math.PI * deg / 180
}

function rx(r, angle) {
  return r * Math.cos(rad(angle))
}

function ry(r, angle) {
  return r * Math.sin(rad(angle))
}

function getRadius(x, y) {
  return Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) )
}

module.exports = function rotate(cx, cy, angle) {

  var lastX = 0
  var lastY = 0

  this.commands = this.commands.map(function (command) {
    // to do: handle relative commands
    var params = command.params
    pairs.forEach(function (pair) {
      var xKey = pair[0]
      var yKey = pair[1]
      var x = params[xKey]
      var y = params[yKey]
      if (!x  && !y) {
        return command
      } else if (!x) {
        x = lastX
      } else if (!y) {
        y = lastY
      }
      var radius = getRadius(cx - x, cy - y)
      var newX = rx(radius, angle)
      var newY = ry(radius, angle)
      console.log(
        cx, cy,
        angle, 'deg',
        command.type,
        x, newX, ':',
        y, newY,
        'radius', radius
      )
      if (params[xKey]) {
        command.params[xKey] = cx - rx(radius, angle)
      }
      if (params[yKey]) {
        command.params[yKey] = cy - ry(radius, angle)
      }
    })
    return command
  })

  return this

}

