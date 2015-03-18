
module.exports = function(ast, options) {

  var string = '';
  ast.commands.forEach(function(command) {
      // Object.keys does not guarantee correct order
      // Need to build a parameters parser
    var params = Object.keys(command.parameters).map(function(key) {
      return command.parameters[key];
    });
    string += command.type + params.join(' ') + ' ';
  });


  return string.trim();

};
