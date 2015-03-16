
var pathAst = require('..');
var geomicons = require('geomicons-open/src/js/paths');

var array = [];
Object.keys(geomicons).forEach(function(key) {
  array.push(geomicons[key]);
});

var results = [];
array.forEach(function(path) {
  results.push(pathAst.parse(path));
});


console.log(JSON.stringify(results, null, 2));

