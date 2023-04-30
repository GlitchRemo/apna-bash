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

exports.resolvePath = resolvePath;
