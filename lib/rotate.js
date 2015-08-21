
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

function rx(radius, angle) {
  return radius * Math.cos(rad(angle))
}

function ry(radius, angle) {
  return radius * Math.sin(rad(angle))
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
      if (typeof x === 'undefined'  && typeof y === 'undefined') {
        return command
      } else if (typeof x === 'undefined') {
        console.log('lastX', lastX)
        x = lastX
      } else if (typeof y === 'undefined') {
        console.log('lastY', lastY)
        y = lastY
      }
      var radius = getRadius(cx - x, cy - y)
      /*
        var newX = cx + rx(radius, angle)
        var newY = cy + ry(radius, angle)
        console.log(
          cx, cy,
          angle, 'deg',
          command.type,
          x, newX, ':',
          y, newY,
          'radius', radius
        )
      */
      angle = angle - 90
      if (typeof params[xKey] !== 'undefined') {
        console.log(command.type, x, rx(radius, angle))
        command.params[xKey] = cx + rx(radius, angle)
      }
      if (typeof params[yKey] !== 'undefined') {
        console.log(command.type, y, ry(radius, angle))
        command.params[yKey] = cy + ry(radius, angle)
      }
    })
    return command
  })

  return this

}

