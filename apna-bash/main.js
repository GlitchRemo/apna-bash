const fs = require('fs');
const file = process.argv[2];
let PWD = process.env.PWD;

const pwd = function() {
  console.log(PWD);
}

const cd = function(directory) {
  PWD = `${PWD}/${directory}`;
}

const ls = function() {
  const contents = fs.readdirSync(PWD);
  console.log(contents.join(' '));
}

const execute = function(instruction) {
  const lookup = {pwd, cd, ls};
  const tokens = instruction.split(' ');
  const command = tokens[0];
  const argument = tokens[1];

  lookup[command](argument);
}

const main = function() {
  const string = fs.readFileSync(`./${file}`, 'utf-8');
  const instructions = string.trim().split('\n');

  instructions.map(execute);
}

main();
