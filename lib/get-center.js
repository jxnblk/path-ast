
var _ = require('lodash')

module.exports = function() {

  var xValues = []
  var yValues = []

  this.commands.forEach(function (command) {
    if (typeof command.x !== 'undefined') {
      xValues.push(command.x)
    }
    if (typeof command.y !== 'undefined') {
      yValues.push(command.y)
    }
  })

  return {
    x: _.max(xValues) - _.min(xValues),
    y: _.max(yValues) - _.min(yValues)
  }

}

