
var past = require('..')
var geomicons = require('geomicons-open/src/js/paths')

module.exports = {
  geomicons: geomicons,
  paths: {
    diamond: 'M0 16 L16 32 L32 16 L16 0z',
    relative: 'm0 16 l16 16 l16 -16 l-16 -16z',
    nospace: 'M373 434l207 207l-17 17l-207 -207zM564 240l17 16l-166 166l-17 -16l166 -166v0z',
  },
  asts: {
    bookmark: past.parse(geomicons.bookmark),
    camera: past.parse(geomicons.camera),
    chat: past.parse(geomicons.chat),
  }
}
