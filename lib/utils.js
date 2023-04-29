const fs = require('fs');

const handleAbsolutePath = function(path) {
  return path.replace(/^~/, process.env.HOME);
}

const isAbsolutePath = function(path) {
  return /^[/~]/.test(path);
}

const resolvePath = function(pwd, path) {
  if(isAbsolutePath(path)) return handleAbsolutePath(path);

  const absolutePath = `${pwd}/${path}`;

  return absolutePath.split('/').reduce(function(components, component){
    if(component === '.') return components;
    if(component === '..') return components.slice(0, -1);

    return [...components, component];
  }, []).join('/');
}

const pwd = function(env) {
  const output = env.PWD;
  return {...env, outputStream: [...env.outputStream, output]};
}

const cd = function(env, path) {
  if(path === undefined) return {...env, PWD: '/', OLDPWD: env.PWD};
  if(path === '-') return {...env, PWD: env.OLDPWD, OLDPWD: env.PWD};

  const resolvedPath = resolvePath(env.PWD, path);

  if(!fs.existsSync(resolvedPath)) {
    const error= `cd: no such file or directory present: ${path}`;
    return {...env, errorStream: [...env.errorStream, error]}
  }

  return {...env, PWD: resolvedPath, OLDPWD: env.PWD};
}

const listContent = function(path) {
  const resolvedPath = resolvePath(path);
  return fs.readdirSync(path).join(' ');
}

const ls = function(env, args) {
  if(args.length === 0) {
    args = [env.PWD];
  }

  return args.reduce(function(env, path){
    const contents = listContent(path);
    return {...env, outputStream: [...env.outputStream, contents]};
  }, env);
}

exports.pwd = pwd;
exports.cd = cd;
exports.ls = ls;
