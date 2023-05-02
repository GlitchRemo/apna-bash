const isValidToken = function(token) {
  return token !== '';
}
const tokenizer = function(string) {
  const tokens = string.split(/\s+/);
  const [command, ...args] = tokens.filter(isValidToken);
  return {command, args}
}

const parse = function(sourceCode) {
  const linesOfCode = sourceCode.trim().split(/\n+/);
  return linesOfCode.map(tokenizer);
}

exports.parse = parse;
