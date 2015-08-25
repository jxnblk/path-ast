
// Not currently working
// - [ ] Fix radian to degrees
// - [ ] default to getCenter

var _ = require('lodash')
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
  var n = Math.atan(a / b)
  var d = deg(n)

  if (b < 0) {
    d = 180 - d
  }
  if (a <= 0) {
    d = 360 - d
  }
  if (b === 0) {
    console.log('b zero', b, d)
  }
  if (a === 0) {
    console.log('a zero', a, d)
  }
  return d + angle
}

module.exports = function rotate(cx, cy, angle) {

  angle = angle - 90

  this.commands = this.commands.map(function (command) {
    // to do: handle relative commands
    var params = command.params
    var lastX = 0
    var lastY = 0
    pairs.forEach(function (pair) {
      var xKey = pair[0]
      var yKey = pair[1]
      var x = params[xKey]
      var y = params[yKey]
      // console.log(command.type, pair)
      if (typeof x === 'undefined' && typeof y === 'undefined') {
        return command
      } else if (typeof x === 'undefined') {
        console.log(command.type, 'lastX', lastX, y)
        x = lastX
      } else if (typeof y === 'undefined') {
        console.log(command.type, 'lastY', x, lastY)
        y = lastY
      }
      lastX = x
      lastY = y
      var radius = getRadius(cx - x, cy - y)
      var pointAngle = getAngle(cx - x, cy - y, angle)

      if (typeof params[xKey] !== 'undefined') {
        command.params[xKey] = cx + rx(radius, pointAngle)
      }
      if (typeof params[yKey] !== 'undefined') {
        command.params[yKey] = cy + ry(radius, pointAngle)
      }
    })
    return command
  })

  return this

}

