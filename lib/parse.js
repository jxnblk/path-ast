
module.exports = function(string, options) {

  var COMMAND_SPLIT_REGEX = /(\s|\,)(?=[a-zA-Z])/;

  var ast = {};
  ast.raw = string;
  ast.commands = [];

  function parseRawString(string) {
    var raw = string.split(COMMAND_SPLIT_REGEX);
    var commands = [];
    raw.map(function(command, i) {
      if (command.length < 2 && command.match(/\s|\,/)) {
        return false
      }
      commands.push(command);
    });
    return commands;
  }

  function parseCommandString(command) {
    var type = command.substring(0, 1);
    var rawParameters = command.substring(1);
    var parametersArr = rawParameters.split(/\s|\,/);
    if (!command.substring(0, 1).match(/[a-zA-Z]/)) {
      console.error('First character is not a letter');
    }
    if (!rawParameters.match(/[A-Za-z0-9]/)) {
      rawParameters = '';
      parametersArr = [];
    }
    return {
      raw: command,
      type: type,
      parameters: {
        raw: rawParameters,
        arr: parametersArr
      }
    }
  }

  function parseParameters(obj) {
    var arr = obj.parameters.arr;
    var type = obj.type
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

  var rawCommands = parseRawString(string);

  rawCommands.forEach(function(command) {
    ast.commands.push(parseCommandString(command));
  });

  ast.commands.map(function(commandObj) {
    parseParameters(commandObj);
  });

  return ast;

};
