const fs = require('fs');
const commands = require('../bin/commands.js');

const createEnvironment = function() {
  const environment = {
    pwd: process.env.PWD, 
    oldPwd: process.env.OLDPWD, 
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

const execute = function({command, args}, env) {
  const commandToExecute = commands[command];

  if(!isValidCommand(commandToExecute)) {
    const error = `apna-bash: command not found: ${command}`;
    return {error: [error]}
  }

  return commandToExecute(env, expandWildcard(args, env.pwd));
}

const apnaBash = function(parsedCode, env) {
  const outputStream = [];
  const errorStream = [];

  return parsedCode.reduce(function({env, outputStream, errorStream}, lineOfCode) {
    let {env: localEnv, output, error} = execute(lineOfCode, env);
    outputStream = [...outputStream, output];
    errorStream = [...errorStream, error];
    env = {...env, ...localEnv};
    return {env, outputStream, errorStream};

  }, {env, outputStream, errorStream});
}

exports.apnaBash = apnaBash;
exports.createEnvironment = createEnvironment;
