
var past = require('..')
var assert = require('assert')
var f = require('./fixtures')

describe('Parse and stringify', function () {

  it('should have two parameters for M', function () {
    var bookmarkMove = f.asts.bookmark.commands[0].params
    assert.equal(Object.keys(bookmarkMove).length, 2)
  })

  it('should have seven parameters for A', function () {
    var cameraArc = f.asts.camera.commands[10].params
    assert.equal(Object.keys(cameraArc).length, 7)
  })

  it('should have six parameters for C', function () {
    var chatCurve = f.asts.chat.commands[4].params
    assert.equal(Object.keys(chatCurve).length, 6)
  })

  it('should handle paths with no spaces', function (done) {
    assert.doesNotThrow(function () {
      past.parse(f.paths.nospace)
      done()
    })
  })

  it('stringify should match input', function () {
    var chatString = past.stringify(f.asts.chat)
    assert.equal(f.geomicons.chat.trim(), chatString)
  })

  it('should match the raw string', function () {
    var raw = past.parse(f.paths.nospace).raw
    assert.equal(raw, f.paths.nospace)
  })

})

describe('Transform methods', function () {

  var ast
  var relAst

  beforeEach(function () {
    ast = past.parse(f.paths.diamond)
    relAst = past.parse(f.paths.relative)
  })

  it('should scale a path', function (done) {
    assert.doesNotThrow(function () {
      f.asts.bookmark.scale(2)
      done()
    })
  })

  it('should convert to absolute values', function (done) {
    assert.doesNotThrow(function () {
      var ast = past.parse(f.paths.nospace)
      ast.toAbsolute()
      done()
    })
  })

  it('should reflect x without error', function (done) {
    assert.doesNotThrow(function () {
      ast.reflectX(16)
      done()
    })
  })

  it('should reflect x', function () {
    var flipped = ast.reflectX(16)
    assert.equal(flipped.commands[0].params.x, 32)
  })

  it('should reflect y', function () {
    var flipped = ast.reflectY(16)
    assert.equal(flipped.commands[1].params.y, 0)
  })

  it('should scale .5x', function () {
    var halved = ast.scale(0.5)
    assert.equal(halved.commands[0].params.x, 8)
  })

  it('should scale 2x', function () {
    var halved = ast.scale(2)
    assert.equal(halved.commands[0].params.x, -16)
  })

  it('should translate', function () {
    var shifted = ast.translate(4, 4)
    assert.deepEqual(
      shifted.commands[0].params,
      { x: 4, y: 20 }
    )
  })

  it('should calculate the center', function () {
    var center = ast.getCenter()
    assert.deepEqual(center, { x: 16, y: 16 })
  })

  it('should rotate -90°', function () {
    var rotated = ast.rotate(-90)
    assert.deepEqual(
      rotated.commands[0].params,
      { x: 16, y: 32 }
    )
  })

  it('should convert relative to absolute coordinates', function (done) {
    var absolute = relAst.toAbsolute()
    assert.deepEqual(
      absolute.commands[0].params,
      ast.commands[0].params
    )
    assert.deepEqual(
      absolute.commands[1].params,
      ast.commands[1].params
    )
    assert.deepEqual(
      absolute.commands[2].params,
      ast.commands[2].params
    )
    done()
  })

})

describe('Expand strokes', function () {

  it('should calculate angles')
  it('should expand lines')
  it('should expand arcs')
  it('should expand curves')

})

