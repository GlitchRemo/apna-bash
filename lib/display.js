const display = function(environment) {
  console.log(environment.outputStream.join('\n'));
  console.error(environment.errorStream.join('\n'));
}

exports.display = display;

