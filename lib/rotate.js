
// Not currently working
// - [x] Fix radian to degrees
// - [ ] handle relative commands
// - [ ] default to getCenter
// - [ ] xAxisRotation

var _ = require('lodash')
var keys = require('./keys')
var constants = require('./constants')

var pairs = [
  ['x', 'y'],
  ['x1', 'y1'],
  ['x2', 'y2']
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

  this.commands = this.commands.map(function (command) {
    var params = command.params
    pairs.forEach(function (pair) {
      var xKey = pair[0]
      var yKey = pair[1]
      var x = params[xKey]
      var y = params[yKey]
      if (typeof x === 'undefined' && typeof y === 'undefined') {
        return command
      } else if (typeof x === 'undefined') {
        command.type = command.type.match(/[A-Z]/) ? 'L' : 'l'
        x = lastX
      } else if (typeof y === 'undefined') {
        command.type = command.type.match(/[A-Z]/) ? 'L' : 'l'
        y = lastY
      }
      lastX = params.x || lastX
      lastY = params.y || lastY
      var radius = getRadius(cx - x, cy - y)
      var pointAngle = getAngle(cx - x, y - cy, angle)

      command.params[xKey] = cx + rx(radius, pointAngle)
      command.params[yKey] = cy + ry(radius, pointAngle)
    })
    var largeArcFlag = command.params.largeArcFlag
    var sweepFlag = command.params.sweepFlag
    var xAxisRotation = command.params.xAxisRotation
    if (typeof xAxisRotation !== 'undefined') {
      console.log('xAxisRotation', sweepFlag, largeArcFlag, xAxisRotation, angle)
      command.params.xAxisRotation += angle
      console.log('xAxisRotation', xAxisRotation)
    }
    return command
  })

  return this

}

