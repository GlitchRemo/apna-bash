const fs = require('fs');
const utils = require('./lib/utils.js');
const {parser, tokenizer} = require('./lib/parser.js');
const {display} = require('./lib/display.js');

const execute = function(env, {command, args}) {
  if(utils[command] === undefined) {
    const error = `apna-bash: command not found: ${command}`;
    return {...env, errorStream: [...env.errorStream, error]}
  }

  return utils[command](env, args);
}

const main = function() {
  const file = process.argv[2];
  const sourceCode = fs.readFileSync(`./${file}`, 'utf-8');
  const parsedCode = parser(sourceCode);

  const environment = {
    PWD: process.env.PWD, 
    OLDPWD: process.env.OLDPWD, 
    outputStream: [], 
    errorStream: []
  }

  display(parsedCode.reduce(execute, environment));
}

main();
