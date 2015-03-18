
module.exports = function(string, options) {

  var COMMAND_SPLIT_REGEX = /[\s\,](?=[a-zA-Z])/;

  var ast = {};
  ast.raw = string.trim();
  ast.commands = [];

  function parseRawString(str) {
    return str.split(COMMAND_SPLIT_REGEX);
  }

  function parseCommandString(command) {
    var type = command.substring(0, 1);
    var params = command.substring(1);
    var arr = params.split(/\s|\,/);
    if (!command.substring(0, 1).match(/[a-zA-Z]/)) {
      console.error('First character is not a letter');
    }
    if (!params.match(/[A-Za-z0-9]/)) {
      params = '';
      arr = [];
    }
    return {
      raw: command,
      type: type,
      parameters: {
        raw: params,
        arr: arr
      }
    }
  }

  function parseParameters(obj) {
    var arr = obj.parameters.arr;
    var type = obj.type
    // Consider using the array as the source of truth, since order matters.
    // Change this parameters object to a getter/setter
    switch (type) {
      case 'm':
      case 'M':
      case 'l':
      case 'L':
      case 'T':
      case 't':
        obj.parameters.x = arr[0];
        obj.parameters.y = arr[1];
        break;
      case 'H':
      case 'h':
        obj.parameters.x = arr[0];
        break;
      case 'V':
      case 'v':
        obj.parameters.y = arr[0];
        break;
      case 'C':
      case 'c':
        obj.parameters.x1 = arr[0];
        obj.parameters.y1 = arr[1];
        obj.parameters.x2 = arr[2];
        obj.parameters.y2 = arr[3];
        obj.parameters.x = arr[4];
        obj.parameters.y = arr[5];
        break;
      case 'S':
      case 's':
        obj.parameters.x2 = arr[0];
        obj.parameters.y2 = arr[1];
        obj.parameters.x = arr[2];
        obj.parameters.y = arr[3];
        break;
      case 'Q':
      case 'q':
        obj.parameters.x1 = arr[0];
        obj.parameters.y1 = arr[1];
        obj.parameters.x = arr[2];
        obj.parameters.y = arr[3];
        break;
      case 'A':
      case 'a':
        obj.parameters.rx = arr[0];
        obj.parameters.ry = arr[1];
        obj.parameters.xAxisRotation = arr[2];
        obj.parameters.largeArcFlag = arr[3];
        obj.parameters.sweepFlag = arr[4];
        obj.parameters.x = arr[5];
        obj.parameters.y = arr[6];
        break;
      case 'Z':
      case 'z':
        break;
      default:
        console.error(type + 'is not a valid path command');
    }
    delete obj.raw;
    delete obj.parameters.raw;
    delete obj.parameters.arr;
  }


  ast.commands = parseRawString(ast.raw).map(function(command) {
    return parseCommandString(command);
  });

  ast.commands.map(function(commandObj) {
    parseParameters(commandObj);
  });

  return ast;

};
