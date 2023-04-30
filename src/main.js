const fs = require('fs');
const {parse} = require('../bin/parser.js');
const {display} = require('../bin/display.js');
const {execute, createEnvironment} = require('../bin/apna-shell.js')

const main = function() {
  const file = process.argv[2];
  const sourceCode = fs.readFileSync(`./${file}`, 'utf-8');
  const parsedCode = parse(sourceCode);

  display(execute(parsedCode, createEnvironment()));
}

main();
