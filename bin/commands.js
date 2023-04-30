const fs = require('fs');
const {resolvePath} = require('./path-handler.js');

const pwd = function(env) {
  return {...env, outputStream: [...env.outputStream, env.pwd]};
}

const cd = function(env, path) {
  if(path === undefined) return {...env, pwd: '/', oldPwd: env.pwd};
  if(path === '-') return {...env, pwd: env.oldPwd, oldPwd: env.pwd};

  const resolvedPath = resolvePath(env.pwd, path);

  if(!fs.existsSync(resolvedPath)) {
    const error= `cd: no such file or directory present: ${path}`;
    return {...env, errorStream: [...env.errorStream, error]}
  }

  return {...env, pwd: resolvedPath, oldPwd: env.pwd};
}

const listContent = function(localEnv, path) {
  const resolvedPath = resolvePath(localEnv.pwd, path);
  const contents = fs.readdirSync(resolvedPath).join(' ');
  localEnv.output.push(contents);
  return localEnv;
}

const ls = function(env, paths) {
  if(paths.length === 0) {
    paths = [env.pwd];
  }

  return paths.reduce(function(env, path){
    let localEnv = {pwd: env.pwd, output: [], error: []};
    localEnv = listContent(localEnv, path);

    env.outputStream = [...env.outputStream, ...localEnv.output];
    env.errorStream = [...env.errorStream, ...localEnv.error];

    return env;
  }, env);
}

exports.pwd = pwd;
exports.cd = cd;
exports.ls = ls;
