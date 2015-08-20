
var pathAst = require('..')
var assert = require('assert')

// Fixtures
var nospace = 'M373 434l207 207l-17 17l-207 -207zM564 240l17 16l-166 166l-17 -16l166 -166v0z'
var geomicons = require('geomicons-open/src/js/paths')
var bookmark = pathAst.parse(geomicons.bookmark)
var bookmarkMove = bookmark.commands[0].params
var camera = pathAst.parse(geomicons.camera)
var cameraArc = camera.commands[10].params
var chat = pathAst.parse(geomicons.chat)
var chatCurve = chat.commands[4].params

// Print ASTs
// console.log(JSON.stringify(bookmark, null, 2), JSON.stringify(camera, null, 2), JSON.stringify(chat, null, 2))

var chatString = pathAst.stringify(chat)

describe('path-ast', function () {

  it('should have two parameters for M', function () {
    assert.equal(Object.keys(bookmarkMove).length, 2)
  })

  it('should have seven parameters for A', function () {
    assert.equal(Object.keys(cameraArc).length, 7)
  })

  it('should have six parameters for C', function () {
    assert.equal(Object.keys(chatCurve).length, 6)
  })

  it('should handle paths with no spaces', function (done) {
    assert.doesNotThrow(function () {
      var nospaceAST = pathAst.parse(nospace)
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
    var raw = pathAst.parse(nospace).raw
    assert.equal(raw, nospace)
  })

  it('stringify should match input', function () {
    assert.equal(geomicons.chat.trim(), chatString)
  })

  it('should convert to absolute values', function (done) {
    assert.doesNotThrow(function () {
      var ast = pathAst.parse(nospace)
      var abs = ast.toAbsolute()
      done()
    })
  })

  it('should reflect x and y params', function (done) {
    assert.doesNotThrow(function () {
      var flippedX = bookmark.reflectX(16)
      done()
    })
  })

})

