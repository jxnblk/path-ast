
// - [ ] account for arc edges

var _ = require('lodash')

module.exports = function() {

  var xValues = []
  var yValues = []

  this.commands.forEach(function (command) {
    if (typeof command.params.x !== 'undefined') {
      xValues.push(command.params.x)
    }
    if (typeof command.params.y !== 'undefined') {
      yValues.push(command.params.y)
    }
  })

  var minX = _.min(xValues)
  var maxX = _.max(xValues)
  var minY = _.min(yValues)
  var maxY = _.max(yValues)
  return {
    x: (maxX - minX) / 2 + minX,
    y: (maxY - minY) / 2 + minY,
  }

}

