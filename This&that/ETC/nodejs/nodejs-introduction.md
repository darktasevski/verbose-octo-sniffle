Introduction to Node.js
=======================

Use the [Cloud9](http://c9.io) cloud-based IDE.

*Conventions for writing asynchronous code: first parameter is error, last parameter is callback.*

# Modules #

Modules are the way to bring external functionality into your Node application.

## Using Modules In Your Application ##

The `require` function loads a module and assigns it to a variable for your application to use. Some modules expose functions and variables, others expose objects to be instantiated. You can choose to load only part of a module, too.

```javascript
// This module exports functions and variables.
// Notice the leading lower case
var foo = require('foo');

var f = 2 + foo.alpha;
var b = foot.beta() * 3;

// This module exports objects to be instantiated
// Notice the leading upper case 
var Bar = require('bar');

var bar = new Bar();

// Import only what you need from a module
var doSomething = require('someModule').doSomething;
```

## Three Main Sources of Node Modules ##

There are three main sources for modules to be used in Node applications.

### Built-In Modules ###

Many come pre-packaged with Node, but must be required for use in your application.

```javascript
var fs     = require('fs');
var http   = require('http');
var crypto = require('crypto');
var os     = require('os');
```

### Your Project Files ###

A great way to modularize your code is to put functionality into modules, and then load them into the application where they are needed.

- Each .js file is its own module
- The `require` method uses file system-like symantics
- Single variable `require()` is still valid

```javascript
// Imports data.js in the same directory
var data = require('./data');

// Imports foo.js in the other sub directory
var foo = require('./other/foo');

// Imports bar.js in a sibling directory
var bar = require('../lib/bar');
```

Functionality from your modules is exposed via the `module.exports` method.

**one.js**
```javascript
// This variable is not exposed directly
var count = 2;

module.exports.getCount = function ()
{
	return count;
};

module.exports.setCount = function (val)
{
	count = val;
};

var doIt = function (i, callback)
{
	//do something, invoke callback
}

module.exports.doIt = doIt;
module.exports.foo = 'bar';
```

**two.js**
```
var one = require('one');
console.log(one.foo);
```

### npm ###

Third party modules can be installed from the npm registry. npm is installed along with node.js.

- Installed via command line using `npm install module_name`
- Imported the same way using the `require` method.
- Be careful when using individual files from withing a module
- Install globally using `npm install -g module_name`
- Only install globally those modules that provide command line utilities (such as less or grunt)

## Create and Publish Modules ##

Share your work with others by publishing your modules to the npm registry. Add the `package.json` file to the root of your project:

```javascript
{
	"name" : "modulename", // required
	"version" : "1.0.0", // required

	"author" : "Your Name Here",
	"description" : "Module description here!",
	"keywords" : [ "array", "of", "keywords" ],
	"repository" :
	{
		"type" : "git",
		"url" : "https://github.com/username/modulename.git"
	},

	"dependencies" :
	{
		"underscore" : "1.4.x",
		"request" : ">=2.1.0"
	}

	"main" : "lib/modulename.js" // The entry point into your module
}
```

Add a user on the npm registry

	$ npm adduser

Publish from within the project root

	$ npm publish .

# Events and Streams #

## Events and EventEmitter ##

### Callbacks vs Events ###

Callbacks are a way to implement asynchronous non-blocking code. Events is another way to do this. Instead of using a callback, have the method immediately return an `EventEmitter` object, and attached handlers to the types of things that might occur.

```javascript
// Traditional Callback:
getThem(param, function(err, items)
{
	// check for error, then opperate on array of items.
});

// Using an EventEmitter
var results = getThem(param);

results.on('item', function (i)
{
	// do something with this item
});

results.on('done', function ()
{
	// no more items
});

results.on('error', function (err)
{
	// handle error
}); 
```

| Callbacks                    | Events                        |
|------------------------------|-------------------------------|
| Request/Reply                | Publish/Subscribe             |
| No results until all results | Act on results as they arrive |
| Either error or results      | Partial results before error  |

### EventEmitter class ###

| publisher                      | subscriber                    |
|--------------------------------|-------------------------------|
| `emitter.emit(event, [args]);` | `emitter.on(event, handler);` |

The event can be of any string, any zero or more arguments can be passed to the handler. These make up the interface exposed by the publisher to the subscriber.

### Patterns ###

1. As a return value from a function call
2. Objects that extend `EventEmitter` to emit events themselves

**First Pattern Example**

```javascript
var EventEmitter = require('events').EventEmitter

var getResource = function (c)
{
	var e = new EventEmitter();

	// Allows us to simulate an async call
	process.nextTick(function ()
	{
		var count = 0;
		e.emit('start');

		var t = setInterval(function ()
		{
			e.emit('data', ++count);
			if (count === c)
			{
				e.emit('end', count);
				clearInterval(t);
			}
		}, 10);
	});

	return (e);
}

var r = getResource(5);

r.on('start', function ()
{
	console.log("started");
});

r.on('data', function (d)
{
	console.log("\tData : " + d);
});

r.on('end', function (t)
{
	console.log("Processed " + t + " data events.");
});

```

**Second Pattern Example**

```javascript
var Resource = require('./resource');
var r = new Resource(7);

r.on('start', function ()
{
	console.log("started");
});

r.on('data', function (d)
{
	console.log("\tData : " + d);
});

r.on('end', function (t)
{
	console.log("Processed " + t + " data events.");
});
```

*resource.js*

```javascript
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Resource (m)
{
	var maxEvents = m;
	var self = this;

	// Allows us to simulate an async call
	process.nextTick(function ()
	{
		var count = 0;
		self.emit('start');

		var t = setInterval(function ()
		{
			self.emit('data', ++count);
			if (count === maxEvents)
			{
				self.emit('end', count);
				clearInterval(t);
			}
		}, 10);
	});
}

util.inherits(Resource, EventEmitter);
module.exports = Resource;
```

## Streams ##

Streams are instances of (and extensions to) `EventEmitter` with an agreeded upon interface. This interface provides a unified abstraction for managing data flow, such as:

- network traffic (http request/response, tcp sockets)
- file i/o
- stdin/stderr/stdout

Each stream is an instance of `ReadableStream`, `WritableStream` or both. A `ReadableStream` can be piped to a `WritableStream`; node will manage the backpressure of the data being read faster than it can be written.

### Piping Streams ###

| `ReadableStream`   | `WritableStream`   |
|--------------------|--------------------|
| readable [boolean] | writable [boolean] |
| event:'data'       | event:'drain'      |
| event:'end'        | event:'error'      |
| event:'error'      | event:'close'      |
| event:'close'      | event:'pipe'       |
| pause()            | write()            |
| resume()           | end()              |
| destroy()          | destroy()          |
| pipe()             | destroySoon()      |

**`ReadableStream` Example**

```javascript
var request = require('request');

var s = request('http://www.example.com');

s.on('data', function (chunk)
{
	console.log(">>>Data>>> " + chunk);
});

s.on('end', function ()
{
	console.log(">>>Done>>>");
});
```

**`WritableStream` Example**

```javascript
console.log("stdout is writable? " + process.stdout.writable);

process.stdout.write("Hello");
process.stdout.write("World");
```

**Piping `ReadableStream` to `WritableStream`**

```javascript
var request = require('request');
var fs = require('fs');
var zlib = require('zlib');

var s = request('http://www.example.com');
s.pipe(process.stdout);

request('http://www.example.com').pipe(process.stdout);

// One line of code to download a webpage and save it to a file
request('http://www.example.com').pipe(fs.createWriteStream("example.html"));

// One line of code to download a webpage and zip it to a file
request('http://www.example.com').pipe(zlib.createGzip()).pipe(fs.createWriteStream("example.html.gz"));
```

# Accessing the Local System #

## The `process` Object ##

Available by default in your application, this object allows your node application to manage its own process as well as other processes on the system.

- A collection of Streams
	- `process.stdin`
	- `process.stdout`
	- `process.stderr`
- Attributes of the current process
	- `process.env`
	- `process.argv`
	- `process.pid`
	- `process.title`
	- `process.uptime()`
	- `process.memoryUsage()`
	- `process.cwd()`
- Process-related actions
	- `process.abort()`
	- `process.chdir()`
	- `process.kill()`
	- `process.setgid()`
	- `process.setuid()`
- An instance of EventEmitter
	- event: `exit`
	- event: `uncaughtException`
	- POSIX signal events (SIGINT, etc.)

## Interacting With the File System ##

	var fs = require('fs');

Many of the functions provided are wrappers for POSIX functions and include by async and sync versions.

```javascript
fs.readdir(path, callback);
fs.readdirSync(path);
```

It also provides stream oriented functions.

```javascript
fs.createReadStream();  // returns a ReadableStream
fs.createWriteStream(); // returns a WritableStream
```

And it provides a `watch` function that returns an `EventEmitter` that publishes a `change` and `error` event.

```javascript
var w = fs.watch(path); // takes a file or directory
w.on('change', function () {});
w.on('error', function () {});
``` 

**Synchronous Example**

```javascript
var fs = require('fs');

if (fs.existsSync('temp))
{
	console.log('Directory exists, removing...');
	if (fs.existsSync('temp/new.txt'))
	{
		fs.unlinkSync('temp/new.txt');
	}
	fs.rmdirSync('temp');
}

fs.mkdirSync('temp');
if (fs.existsSync('temp'))
{
	process.chdir('temp');
	fs.writeFileSync('test.txt', 'blah blah blah');
	fs.renameSync('test.txt', 'new.txt');
	console.log("File has size : " + fs.statSync('new.txt').size + " bytes");
	console.log("File contents : " + fs.readFileSync('new.txt').toString());
}
```

**Asynchronous Example**

```javascript
fs.mkdir('temp', function(err)
{
	fs.exists('temp', function(exists)
	{
		if (exists)
		{
			process.chdir('temp');
			fs.writeFile('test.txt', 'blah blah blah', function(err)
			{
				fs.rename('test.txt', 'new.txt', function(err)
				{
					fs.stat('new.txt', function(err, stats)
					{
						console.log("File has size : " + stats.size + " bytes");
						fs.readFile('new.txt', function(err, data)
						{
							console.log("File contents : " + data.toString());
						});
					});
				});
			});
		}
	});
});
```

## Node Buffers ##

JavaScript has difficulty dealing with binary data, but the networking and file system require it.  The Buffer class provides a raw memory allocation for dealing with binary data directly. Buffers can be converted to/from strings by providing an encoding (ascii, utf-8, utf16le, ucs2, base64, binary, hex), with utf-8 being the default.

```javascript
var b = new Buffer("blah");

console.log(b.toString());
console.log(b.toString('base64'));

var v = new Buffer("blah").toString('base64');

// Call out a specific section of the buffer
console.log(b.toString('utf-8', 0, 2));
```

## Interacting With The Operating System (OS) ##

	var os = require('os');

Provides information about the currently running operating system.

- `os.tmpDir()`
- `os.hostname()`
- `os.type()`
- `os.platform()`
- `os.arch()`
- `os.release()`
- `os.uptime()`
- `os.loadavg()`
- `os.totalmem()`
- `os.freemem()`
- `os.cpus()`
- `os.networkInterfaces()`
- `os.EOL` the default end of line marker for the os

# Interacting With the Web #

## Node As A Web Client ##

```javascript
var http = require('http');
var req = http.request(options, function (res) {}); 
```

Here `options` can be a URL string or an object specifying values for host, port, method, path, headers, auth, etc. The return value is an instance of `ClientRequest`, and can be written and piped to for POST requests.

The `ClientResponse` object (a `ReadableStream`) is provided either via the callback - as in the example above - or as a `response` event on the `request` object.

A simplified interface to GET requests is provided using `http.get()`.

```javascript
var http = require('http');

var options =
{
	host : 'www.google.com',
	port: 80,
	path : '/',
	method : 'GET'
};

console.log("Going to make request...");

// var req = http.request(options, function (response)
var req = http.request('http://www.google.com', function (response)
{
	console.log(response.statusCode);
	response.pipe(process.stdout);
});

req.end(); // closes the WritableStream

// A simplified version for GET
http.get('http://www.google.com', function (response)
{
	console.log(response.statusCode);
	response.pipe(process.stdout);
});
// No need to close WritableStream
```

> `http` vs `request` : `http` does not automatically follow redirects!

## Node As A Web Server ##

```javascript
var http = require('http');

// Create a server
var server = http.createServer(function(req,res)
{
	// process request
	// request  : ServerRequest  : ReadableStream
	// response : ServerResponse : WritableStream
});

// Start the server listening
server.listen(port, [host]);
```

> SSL support is provided using `https.createServer()`

## Real-Time Integrations Using Socket.IO ##

[Socket.IO](http://socket.io/) provides an abstraction over the various methods used to maintain an active connection between a browser and a server. See their website for details on how to implement Socket.IO.

Cloud9 (as of 2012) didn't support Socket.IO unless you explicitly tell it to use xhr polling instead of web sockets.

```javascript
io.configure(function()
{
	io.set('transports', [ 'xhr-polling' ]);
});
```

> Building WebApps in Node? Use ExpressJS!

# Testing and Debugging #

## The Assert Module ##

Built into Node, it needs only to be required!

	var assert = require('assert');

- Tests for equality between expected and actual values
- Tests for expected or unexpected exceptions (`assert.throws()`)
- Tests for truthiness
- Special handling for the `error` parameter
- Message output in each assertion

> `assert.throws()` takes a regular expression parameter that the exception message should match. 

Types of equality
- `assert.equal()`: shallow, coercive equality ==
- `assert.strictEqual()`: strict equality ===
- `assert.deepEqual()`: 
	- identical values are equal (===)
	- values that are not objects are determined by (==)
	- date objects are equal if both refer to the same date/time
	- other objects (including arrays) are equal if:
		- same number of owned properties
		- equivalent values for every key (==)
		- identical prototype

## Mocha and Should ##

A Node application of any complexity will quickly outgrow the built in test capabilities provided by the assert module. A fairly popular test framework is [mocha](http://mochajs.org/). It is often paired with [should.js](https://github.com/shouldjs/should.js), an expressive, readable, framework-agnostic assertion library.

- Run tests serially (sync and a)
- Test cases are organized into test suites
- Includes `before()`, `after()`, `beforeEach()` and `afterEach()` hooks
- Support for pending, exclusive and inclusive tests
- Captures duration
- Can watch source repo and re-run tests on change
- Multiple interfaces for writing tests
- Multiple reporters for rendering test results

should.js extends Node's assert module with Behaviour Driven Development (BDD) style assertions.

> Install mocha globally, and install mocha and should locally

## Using Cloud9 and Chrome ##

Cloud9 provides breakpoints, resume, call stack, interactive execution, variable inspection and more! Coupled with Socket.IO, breakpoints can be set in both the client and server to observe interactions as they happen.

# Scaling Your Application #

One criticism of Node applications is that they do not handle CPU intensive tasks well. This is because spending too much CPU time on any one task in your Node app will block the event loop and prevent other work from being done.

## Child Processes ##

The `child_process` module provides several ways to invoke a new process.

1. `spawn(command, [args], [options])` : Returns a `ChildProcess` object that is an `EventEmitter` (emitting `exit` and `close` events), and has stdin, stdout and stderr streams that can be piped to/from.
2. `exec(command, [options], callback)` : Runs the command string (must include all arguments to command) in a shell, callback is invoked on process completion with error, stdout, and stderr.
3. `execFile(file, [args], [options], callback)` : Similar to `exec`, but `file` is executed directly, rather than in a sub-shell.
4. `fork(modulePath, [args], [options])` : A special version of `spawn`, adds a `send()` function and a `message` event to `ChildProcess`.

## The Cluster Module ##

A single instance of Node runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node processes to handle the load.

The (still experimental) [cluster module](http://nodejs.org/api/cluster.html) allows you to easily create child processes that all share server ports.
