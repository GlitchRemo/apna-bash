const fs = require('fs');
const {resolvePath} = require('./path-handler.js');

const pwd = function(env) {
  return {output: [env.pwd]};
}

const cd = function(env, paths) {
  if(paths.length > 1) {
    const error= `cd: too many arguments`;
    return {error: [error]};
  }

  const path = paths.toString();
  if(paths.length === 0) return {env: {pwd: process.env.HOME, oldPwd: env.pwd}};
  if(path === '-') return {env: {pwd: env.oldPwd, oldPwd: env.pwd}};

  const resolvedPath = resolvePath(env.pwd, path);

  if(!fs.existsSync(resolvedPath)) {
    const error= `cd: no such file or directory present: ${path}`;
    return {error: [error]};
  }

  return {env: {pwd: resolvedPath, oldPwd: env.pwd}};
}

const formatOutput = function(streams) {
  return streams;
}

const list = function(streams, pwd, path) {
  const absPath = resolvePath(pwd, path);

  if(!fs.existsSync(absPath)) {
    errorMsg = `ls: ${path}: no such file or directory`;
    streams.error.push(errorMsg);
    return streams;
  }

  outputMsg = `${path}:\n${fs.readdirSync(absPath).join(' ')}`;
  streams.output.push(outputMsg);
  return streams;
}

const ls = function(env, paths) {
  if(paths.length === 0) {
    paths = [env.pwd];
  }

  const streams = {output: [], error: []};

  return paths.reduce(function(streams, path) {
    return list(streams, env.pwd, path);
  }, streams);
}

exports.pwd = pwd;
exports.cd = cd;
exports.ls = ls;
