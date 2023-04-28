const fs = require('fs');
const utils = require('./lib/utils.js');
const {parser} = require('./lib/parser.js');

const execute = function(environment, {command, args}) {
  if(utils[command] === undefined) {
    console.error('Invalid command');
    process.exit(1);
  }

  return utils[command](environment, ...args);
}

const main = function() {
  const file = process.argv[2];
  const sourceCode = fs.readFileSync(`./${file}`, 'utf-8');
  const parsedCode = parser(sourceCode);

  parsedCode.reduce(execute, {PWD: process.env.PWD});
}

main();
