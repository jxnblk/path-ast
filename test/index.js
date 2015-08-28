
var past = require('..')
var assert = require('assert')

// Fixtures
var diamond = 'M0 16 L16 32 L32 16 L16 0z'
var diamondAst
var relDiamond = 'm0 16 l16 16 l16 -16 l-16 -16z'
var nospace = 'M373 434l207 207l-17 17l-207 -207zM564 240l17 16l-166 166l-17 -16l166 -166v0z'
var geomicons = require('geomicons-open/src/js/paths')
var bookmark = past.parse(geomicons.bookmark)
var camera = past.parse(geomicons.camera)
var chat = past.parse(geomicons.chat)

// Print ASTs
// console.log(JSON.stringify(bookmark, null, 2), JSON.stringify(camera, null, 2), JSON.stringify(chat, null, 2))

var chatString = past.stringify(chat)

describe('path-ast', function () {

  beforeEach(function () {
    diamondAst = past.parse(diamond)
    relDiamondAst = past.parse(relDiamond)
  })

  it('should have two parameters for M', function () {
    var bookmarkMove = bookmark.commands[0].params
    assert.equal(Object.keys(bookmarkMove).length, 2)
  })

  it('should have seven parameters for A', function () {
    var cameraArc = camera.commands[10].params
    assert.equal(Object.keys(cameraArc).length, 7)
  })

  it('should have six parameters for C', function () {
    var chatCurve = chat.commands[4].params
    assert.equal(Object.keys(chatCurve).length, 6)
  })

  it('should handle paths with no spaces', function (done) {
    assert.doesNotThrow(function () {
      var nospaceAST = past.parse(nospace)
      done()
    })
  })

  it('should scale a path', function (done) {
    assert.doesNotThrow(function () {
      var scaled = bookmark.scale(2)
      done()
    })
  })

  it('should match the raw string', function() {
    var raw = past.parse(nospace).raw
    assert.equal(raw, nospace)
  })

  it('stringify should match input', function () {
    assert.equal(geomicons.chat.trim(), chatString)
  })

  it('should convert to absolute values', function (done) {
    assert.doesNotThrow(function () {
      var ast = past.parse(nospace)
      var abs = ast.toAbsolute()
      done()
    })
  })

  it('should reflect x without error', function (done) {
    assert.doesNotThrow(function () {
      var flipped = diamondAst.reflectX(16)
      done()
    })
  })

  it('should reflect x', function () {
    var flipped = diamondAst.reflectX(16)
    assert.equal(flipped.commands[0].params.x, 32)
  })

  it('should reflect y', function () {
    var flipped = diamondAst.reflectY(16)
    assert.equal(flipped.commands[1].params.y, 0)
  })

  it('should scale .5x', function () {
    var halved = diamondAst.scale(.5)
    assert.equal(halved.commands[0].params.x, 8)
  })

  it('should scale 2x', function () {
    var halved = diamondAst.scale(2)
    assert.equal(halved.commands[0].params.x, -16)
  })

  it('should translate', function () {
    var shifted = diamondAst.translate(4, 4)
    assert.deepEqual(
      shifted.commands[0].params,
      { x: 4, y: 20 }
    )
  })

  it('should calculate the center', function () {
    var center = diamondAst.getCenter()
    assert.deepEqual(center, { x: 16, y: 16 })
  })

  it('should rotate -90°', function () {
    var rotated = diamondAst.rotate(-90)
    assert.deepEqual(
      rotated.commands[0].params,
      { x: 16, y: 32 }
    )
  })

  it('should convert relative to absolute coordinates', function (done) {
    var absolute = relDiamondAst.toAbsolute()
    assert.deepEqual(
      absolute.commands[0].params,
      diamondAst.commands[0].params
    )
    assert.deepEqual(
      absolute.commands[1].params,
      diamondAst.commands[1].params
    )
    assert.deepEqual(
      absolute.commands[2].params,
      diamondAst.commands[2].params
    )
    done()
  })

})

