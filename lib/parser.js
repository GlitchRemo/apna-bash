const tokenizer = function(string) {
  const tokens = string.split(/\s+/);
  const [command, ...args] = tokens;
  return {command, args}
}

const parser = function(sourceCode) {
  const linesOfCode = sourceCode.trim().split(/\n+/);
  return linesOfCode.map(tokenizer);
}

exports.parser = parser;
