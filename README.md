# faulty

A utility function to create custom error objects in Javascript.



## Installation

Install via npm:

```bash
% npm install faulty
```


## Usage

```js
var createError = require('faulty');
// => [Function]

var MyError = createError('MyError');
// => [Function: MyError]

MyError.name
// => 'MyError'

var err = new MyError('something bad has just happened');
// => [MyError: something bad has just happened]

err instanceof Error
// => true

err instanceof MyError
// => true

err.name
// => 'MyError'

err.message
// => 'something bad has just happened'

err.stack
// => 'MyError: something bas has just happened\n  at <...stack trace...>'

var err2 = new MyError('another error', { foo: 'bar', baz: 123 });
// => [MyError: another error]

err2.foo
// => 'bar'

err2.baz
// => 'baz'

var WrappedError = createError('WrappedError', function(message, originalError) {
  this.originalError = originalError;
});

var err3 = new WrappedError('see second arg', new Error('foo'))
// => [WrappedError: see second arg]

err3.originalError
// => [Error: foo]
```


## Contributing

Here's a quick guide:

1. Fork the repo and `make install`.

2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `make test`.

3. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or are fixing a bug, we need a test!

4. Make the test pass.

5. Push to your fork and submit a pull request.


## Licence

Released under The MIT License.
