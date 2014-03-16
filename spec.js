var assert = require('assert');
var faulty = require('./');

describe('faulty', function() {
  it('is a function', function() {
    assert.equal(typeof faulty, 'function');
  });

  it('complains if given an invalid name argument', function() {
    assert.throws(function() { faulty(); }, /invalid/);
    assert.throws(function() { faulty('§$%&/(?='); }, /invalid/);
  });

  it('returns a function', function() {
    assert.equal(typeof faulty('Foo'), 'function');
  });

  it('sets the correct name on the returned function', function() {
    assert.equal(faulty('FooBar').name, 'FooBar');
  });

  it('allows a custom initializer function as second arg', function() {
    var WrappedError = faulty('WrappedError', function(_, originalError) { this.originalError = originalError; });
    var error = new Error('foo');
    var err = new WrappedError('message', error);

    assert(err.originalError, error);
  });
});

describe('an instance of a MyError function returned by faulty', function() {
  var MyError = faulty('MyError');
  var err = new MyError('error message here', { foo: 'bar', baz: 123 });

  it('is an instance of Error', function() {
    assert(err instanceof Error);
  });

  it('is an instance of MyError', function() {
    assert(err instanceof MyError);
  });

  it('has the correct message property set', function() {
    assert.equal(err.message, 'error message here');
  });

  it('has the props given as optional second argument set as prototype methods', function() {
    assert.equal(err.foo, 'bar');
    assert.equal(err.baz, 123);
  });
});
