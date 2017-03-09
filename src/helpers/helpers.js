function isArray(target) {
  return Array.isArray(target);
}

function isFunc(target) {
  return typeof target === 'function';
}

function isString(target) {
  return typeof target === 'string';
}

function isUndefined(target) {
  return typeof target === 'undefined';
}

function error(message) {
  throw new Error(message);
}

export {
  isArray,
  isFunc,
  isString,
  isUndefined,
  error
}
