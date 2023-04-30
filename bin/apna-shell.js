const fs = require('fs');
const commands = require('../bin/commands.js');

const createEnvironment = function() {
  const environment = {
    pwd: process.env.PWD, 
    oldPwd: process.env.OLDPWD, 
    outputStream: [], 
    errorStream: []
  };

  return environment;
}

const expandWildcard = function(args, pwd) {
  return args.flatMap(function(arg, pwd) {
    if(arg === '*') return fs.readdirSync(pwd);
    return arg;
  });
}

const isValidCommand = function(command) {
  return command !== undefined; 
}

const execute = function(parsedCode, env) {
  return parsedCode.reduce(function({env, outputStream, errorStream}, {command, args}) {
    const commandToExecute = commands[command];

    if(!isValidCommand(commandToExecute)) {
      const error = `apna-bash: command not found: ${command}`;
      return {...env, errorStream: [...env.errorStream, error]}

      return commandToExecute(env, expandWildcard(args, env.pwd));
    }, {env, outputStream: [], errorStream: []});
  }

    exports.execute = execute;
    exports.createEnvironment = createEnvironment;
