
// Not currently working
// - [x] Fix radian to degrees
// - [ ] handle relative commands
// - [x] default to getCenter
// - [x] xAxisRotation

var _ = require('lodash')
var keys = require('./keys')
var constants = require('./constants')

var pairs = [
  ['x1', 'y1'],
  ['x2', 'y2'],
  ['x', 'y'],
]

function rad(deg) {
  return Math.PI * deg / 180
}

function deg(rad) {
  return rad * 180 / Math.PI
}

function rx(radius, angle) {
  return _.round(radius * Math.cos(rad(angle)), 6)
}

function ry(radius, angle) {
  return _.round(radius * Math.sin(rad(angle)), 6)
}

function getRadius(a, b) {
  return Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) )
}

function getAngle(a, b, angle) {
  var n = Math.atan2(a, b)
  var d = 90 + deg(n)
  return d + angle
}

module.exports = function rotate(angle, cx, cy) {

  var lastX = 0
  var lastY = 0

  var center = this.getCenter()
  cx = typeof cx !== 'undefined' ? cx : center.x
  cy = typeof cy !== 'undefined' ? cy : center.y

  this.commands = this.commands.map(function (command, i, arr) {
    var params = command.params
    var xAxisRotation = command.params.xAxisRotation

    pairs.forEach(function (pair) {
      var xKey = pair[0]
      var yKey = pair[1]
      var x = params[xKey]
      var y = params[yKey]
      var radius
      var pointAngle

      if (typeof x !== 'number' && typeof y !== 'number') {
        return command
      }

      if (command.type.match(/[a-z]/)) {
        x = lastX + x || lastX
        y = lastY + y || lastY
        command.type = command.type.toUpperCase()
      }

      if (typeof x !== 'number' || isNaN(x)) {
        command.type = command.type.match(/[A-Z]/) ? 'L' : 'l'
        x = lastX
      } else if (typeof y !== 'number' || isNaN(y)) {
        command.type = command.type.match(/[A-Z]/) ? 'L' : 'l'
        y = lastY
      }

      lastX = typeof params.x === 'number' ? params.x : lastX
      lastY = typeof params.y === 'number' ? params.y : lastY
      radius = getRadius(cx - x, cy - y)
      pointAngle = getAngle(cx - x, y - cy, angle)

      command.params[xKey] = cx + rx(radius, pointAngle)
      command.params[yKey] = cy + ry(radius, pointAngle)
    })

    if (typeof xAxisRotation !== 'undefined') {
      command.params.xAxisRotation += angle
    }

    return command
  })

  return this

}

