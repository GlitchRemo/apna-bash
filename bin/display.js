const display = function(environment) {
  console.log(environment.outputStream);
  console.error(environment.errorStream);
}

exports.display = display;

