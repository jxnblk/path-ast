# path-ast

SVG path element command parser/stringifier

## Usage

```bash
npm i path-ast
```

```js
var pathAst = require('path-ast')

var pathCommands = 'M8 48 L56 48 L32 12 Z'

var ast = pathAst.parse(pathCommands)
// Returns a path command AST

var pathData = pathAst.stringify(ast)
// Returns a string for use in the <path> element’s d attribute.
```

MIT License

