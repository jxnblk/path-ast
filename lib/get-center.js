
// - [ ] account for arc edges

module.exports = function () {

  var bounds = this.getBounds()

  return {
    x: (bounds.maxX - bounds.minX) / 2 + bounds.minX,
    y: (bounds.maxY - bounds.minY) / 2 + bounds.minY
  }

}
