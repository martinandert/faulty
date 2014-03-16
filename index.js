'use strict';

function isString(obj) {
  return Object.prototype.toString.call(obj) == '[object String]';
}

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function defaultInitFunc(message, props) {
  for (var key in props) {
    if (hasProp(props, key)) {
      this[key] = props[key]; // jshint ignore:line
    }
  }
}

module.exports = function(name, initFunc) {
  if (!(isString(name) && /^[A-Z][A-Za-z0-9_]*$/.test(name))) {
    throw new Error('invalid `name` argument');
  }

  var definition =
    'return function ' + name + '() {' +
    '  var err = Error.apply(this, arguments);' +
    '  err.name  = this.name = "' + name + '";' +
    '  this.stack    = err.stack;' +
    '  this.message  = err.message;' +
    '  this.initialize.apply(this, arguments);' +
    '  return this;' +
    '}';

  var error = new Function(definition)(); // jshint ignore:line

  function ErrorPrototype() {
    this.constructor = error;
  }

  ErrorPrototype.prototype = Error.prototype;
  error.prototype = new ErrorPrototype();
  error.prototype.initialize = initFunc || defaultInitFunc;

  error.prototype.inspect = function() {
    return '[' + this.constructor.name + (this.message ? ': ' + this.message : '') + ']';
  };

  return error;
};
