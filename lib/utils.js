const fs = require('fs');

const pwd = function({PWD}) {
  console.log(PWD);
  return {PWD};
}

// cd ../a ./a ./ ../ -  /tmp

const cd = function({PWD}, directory) {
  const currentDir = process.env.PWD;
  const parentDir = directory.replace(/(.*)\/.*$/, '$1');
  const previousDir = process.env.OLDPWD;

  if(!fs.existsSync(directory)) process.exit(1);

  PWD = directory.replace(/../g, parentDir);
  PWD = directory.replace(/./g, currentDir);
  console.log(PWD);


  return {PWD};
}

const ls = function({PWD}) {
  const contents = fs.readdirSync(PWD);
  console.log(contents.join(' '));

  return {PWD};
}

exports.pwd = pwd;
exports.cd = cd;
exports.ls = ls;
