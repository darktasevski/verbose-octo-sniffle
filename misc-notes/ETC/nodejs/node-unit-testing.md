Unit Testing with Node.js
=========================

*See the [course repo on GitHub](https://github.com/joeeames/UnitTestingNodeCourse) for updates.*

# Tools #

## [Mocha](http://mochajs.org) and [Chai](http://chaijs.com) ##

```
$ npm install mocha chai

$ npm install mocha -g
```

### Usage ###

Require in the library, make `expect` easier to use.

```javascript
var chai = require('chai');
var expect = chai.expect;
chai.should();
```

> `.equal` compares references, `.eql` does a deep compare.

That last line makes it so every JavaScript object now has a new property called [`should`](http://chaijs.com/guide/styles/#should).

### Test Suites ###

Create a test suite with `describe`.

```javascript
describe('describe tests in this suite', function ()
{
	// tests go here
});
```

Test suites can be nested to create multiple levels of grouping.

```javascript
describe('smoke test', function ()
{
	describe('component one', function ()
	{
		// tests go here
	});

	describe('component two', function ()
	{
		// tests go here
	});
});
```

### Individual Test ###

Create a test with `it()`.

```javascript
it('should do something', function ()
{
	// what it should do
});
```

### Assertions ###

Assert using [`should`](http://chaijs.com/guide/styles/#should).

```javascript
it('should statement', function ()
{
	methodUnderTest(4).should.be.true;
});
```

Assert using [`expect()`](http://chaijs.com/guide/styles/#expect).

```javascript
it('should statement', function ()
{
	expect(methodUnderTest(4)).to.be.true;
});
```

### Test Execution ###

When run without any parameters, mocha will look for a `test.js` file and run those tests or a `test` folder and run all files it finds in there.

```
$ mocha
```

Or you can specify which tests to run by passing a space separated list of files to be executed.

```
$ mocha [name of test file or files]
```

You can also tell mocha to run the tests each time they change.

```
$ mocha -w
```

### Setup and Teardown ###

Create methods to setup and tear down your test.

```javascript
beforeEach(function(){...});
afterEach(function(){...});
```

### Specifying Tests To Execute ###

```javascript
it.skip(...); // skips this test
xit.skip(...); // skips this test

describe.skip(...); //skips this suite
xdescribe.skip(...); //skips this suite

describe.only(...); //only runs this suite
it.only(...); // only runs this test
```

## [Sinon](http://sinonjs.org/) ##

Sinon allows us to unit test our code in isolation from its collaborators by providing spies, stubs and mocks.

```
$ npm install sinon
```

```javascript
var sinon = require('sinon');
```

### Spies ###

Spy on functions and methods.

```javascript
it.('should call the callback passed in', function ()
{
	var spy = sinon.spy(); // this will be what we pass for the callback
	some.method(spy);
	spy.called.should.be.true;
});

it.('should call a specific callback passed in', function ()
{
	function myCallback ()
	{
		console.log('callback executed');
	}

	var spy = sinon.spy(myCallback); // this will be what we pass for the callback
	some.method(spy);
	spy.called.should.be.true;
});

it.('should call a method on an object', function ()
{
	sinon.spy(some, 'otherMethod');

	some.method(spy);
	some.otherMethod.called.should.be.true;
});
```

### Stubs ###

Spy on entire objects.

```javascript
it.('should call a method on an object using a stub', function ()
{
	var stub = sinon.stub(some);

	some.method(stub);
	stub.otherMethod.called.should.be.true;
});

it.('should call a method on an object using a stub', function ()
{
	var stub = sinon.stub(some);
	stub.otherMethod.returns(false); // whatever it needs to return to make the other method return true

	var returnValue = some.method(stub);
	returnValue.should.be.true;
});
```

### Mocks ###

Setup expectations on objects.

```javascript
it('mocks objects', function ()
{
	var mock = sinon.mock(someObj);
	var expectation = mock.expects('otherMethod').once();

	some.method(someObj);
	expectation.verify();
});
```

## Gulp ##

A task runner.

```
$ npm install gulp -g
$ npm install gulp gulp-mocha gulp-util
```

Create a file at the root of your project called `gulpfile.js`.

```javascript
var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('mocha', function ()
{
	return gulp.src(['test/*.js'], { read: false })
	.pipe(mocha({ reporter: 'list' })
	.on('error', gutil.log);
});

gulp.task('watch-mocha', function ()
{
	gulp.run('mocha');
	gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha']);
});

gulp.task('default', ['watch-mocha']);
```

```
$ gulp mocha
$ gulp watch-mocha
$ gulp
```

## Grunt ##

A task runner.

```
$ npm install grunt cli -g
$ npm install grunt grunt-mocha grunt-contrib-watch
```

Create a file at the root of your project called `gruntfile.js`.

```javascript
module.exports = function (grunt)
{
	grunt loadNpmTask('grunt-mocha-test');
	grunt loadNpmTask('grunt-contrib-watch');

	grunt.initConfig(
	{
		mochaTest:
		{
			test : { options : { reporter : 'spec' }, src : ['test/**/*.js'] }
		},

		watch :
		{
			scripts:
			{
				files: ['**/*.js'],
				tasks: ['mochaTest']
			}
		}
	});

	grunt.registerTask('default', 'watch');
};
```

```
$ grunt mochaTest
$ grunt watch
$ grunt
```

# Unit Testing #

It's pretty easy to figure out how to test the basic business logic of an object following the arrange, act, assert pattern. Remember that tests don't need to be DRY, they can be damp.

## Exceptions ##

Usually, if a method throws an exception our test will fail. So, how would we test that a method throws an exception under the right circumstance?

```javascript
it('should throw an error when we call methodX with yValue', function ()
{
	var thing = Thing.create();
	expect(function () { thing.methodX(yValue); }).to.throw();
});
```

## Asynchronous Operations ##

Testing asynchronous operations can be tricky, because our test methods are synchronous. We can do this by having our test accept a paramater, called `done` by convention, which is a method, and our test will not be marked completed until we call this method.

```
it('test asynch method', function (done)
{
	obj.asyncMethod(function()
	{
		obj.prop.should.equal("value");
		done();
	});
});
```

## Promises ##

While promises can be treated just like any other asyncronous method, you can save some steps if all you care is that the promise gets resolved.

```javascript
it('fulfills the promise', function ()
{
	return someObject.methodThatReturnsAPromise(3);
});
```

Or we can use the `chai-as-promised` helper library.

```
$ npm install chai-as-promised
```

```javascript
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

it('returns the correct value from the promise', function ()
{
	return someObject.methodThatReturnsAPromise(3).should.eventually.equal(3);
});
```

## Test Coverage ##

We can use `istanbul` to see how well our unit tests have covered our code.

```
$ npm install -g istanbul

$ istanbul cover node_modules/mocha/bin/_mocha -- -R spec
```

Aside from the command line output, it also creates a `coverage` directory which gives us the ability to drill down into the code to see where we still need coverage. 