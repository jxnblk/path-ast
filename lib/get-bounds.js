
// - [ ] account for arc edges

var _ = require('lodash')

module.exports = function () {

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

  return {
    minX: _.min(xValues),
    maxX: _.max(xValues),
    minY: _.min(yValues),
    maxY:_.max(yValues)
  }
}
