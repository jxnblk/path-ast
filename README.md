# path-ast

SVG path element command parser/stringifier

## Usage

```bash
npm i path-ast
```

```js
var pathAst = require('path-ast')

var pathString = 'M8 48 L56 48 L32 12 Z'

var ast = pathAst.parse(pathString)
// Returns a path AST

var pathData = pathAst.stringify(ast)
// Returns a string for use in the <path> element’s d attribute.
```

### Transform Methods

These methods are experimental and mutate the AST. They work best with absolute coordinates. Use the `toAbsolute()` method to convert relative coordinates to absolute.
The raw string for each command is not altered by these methods and can be used to inspect differences after transformation.

#### `scale(n, cx, cy)`

Scales a path by the ratio `n` where `1` is 100%, centered at `cx` and `cy`.
If `cx` and `cy` are not provided, the method will attempt to find the center of the path.

#### `translate(x, y)`

Translates a path by `x` and `y`.

#### `rotate(angle, cx, cy)`

Rotates a path by `angle` in degrees, centered at `cx` and `cy`.
If `cx` and `cy` are not provided, the method will attempt to find the center of the path.

#### `reflectX(cx)`

Flips the path horizontally across the axis `cx`.
If `cx` is not provided, the method will attempt to find the horizontal center of the path.

#### `reflectY(cy)`

Flips the path vertically across the axis `cy`.
If `cy` is not provided, the method will attempt to find the vertical center of the path.

#### `toAbsolute()`

Converts relative command coordinates to absolute.

#### `getCenter()`

Used internally to determine the center of a path. Returns an object with x and y coordinates. Arc and curve commands that extend beyond the outer edges of points are not factored into calculating the center.

MIT License

