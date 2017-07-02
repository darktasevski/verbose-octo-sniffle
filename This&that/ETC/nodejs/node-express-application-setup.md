Node.js and Express Application Setup
=====================================

*How To set up a Node.js and Express application and development environment on a Windows PC.*

### Table of Contents ###

1. [Background and Prerequisites](#background-and-prerequisites)
2. [Install Node.js and npm](#install-node.js-and-npm)
3. [Install Express Application Generator](#install-express-application-generator)
4. [Generate An Express Application](#generate-an-express-application)
5. [Configure The Express Application](#configure-the-express-application)
6. [Running and Monitoring](#running-and-monitoring)
7. [Including Static Resources](#including-static-resources)
8. [More Express Customization](#more-express-customization)
9. [Topics Coming Soon](#topics-coming-soon)


# Background and Prerequisites #

**Node.js®** (Node) is a platform built on [Chrome's JavaScript runtime](https://code.google.com/p/v8/) for easily building fast, scalable network applications. Node.js uses an [event-driven](https://strongloop.com/strongblog/node-js-event-loop/), [non-blocking I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O) model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. **Express** is a minimal and flexible Node web application framework that provides a robust set of features for web and mobile applications.

This guide will not cover [JavaScript programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or the [model-view-controller (MVC) pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). It is assumed these concepts are already familiar to you.

To use Node you must type command-line instructions, so you need to be comfortable with (or at least know how to start) a command-line tool like the [Windows Command Prompt](http://windows.microsoft.com/en-us/windows-vista/open-a-command-prompt-window), [PowerShell](https://technet.microsoft.com/en-us/library/bb978526.aspx), [Cygwin](https://www.cygwin.com/), or the Git shell (which is installed along with [Git for Windows](https://git-scm.com/downloads)). This last one is my preferred command-line tool for Node.js development.

While no specific IDE is required, you will need a text editor. My preference is [Sublime Text](http://www.sublimetext.com/3), and you can find my [installation and configuration instructions on my website](http://scottoffen.com/2015/03/02/sublime-text-3-for-developers/).

## A Note About io.js ##

*Purely FYI, this has absolutely no bearing on how we are going to install and use Node or Express.*

**io.js** began as a fork of Node and is compatible with the npm ecosystem. It's goal was to continue development under an "open governance model" as opposed to the corporate stewardship model used by [Joyent](https://www.joyent.com/) with Node.

In its role as steward, Joyent's task was to keep Node on track and ensure its consistent development. In 2014 talks of a possible split from Node.js began, and reached critial mass as development of the framework continued to slow and talks broke down with Joyent.

Eventually, io.js was born. Finally, after months of pressure, [Joyent has backed down as steward](http://www.linuxfoundation.org/news-media/announcements/2015/06/nodejs-foundation-advances-community-collaboration-announces-new) and handed Node off to an independent organization, and the io.js and Node.js codebases will be merged and become a single offering once more.

# Install Node.js and npm #

Download the latest version from the [Node.js website homepage](https://nodejs.org/), or go to the [downloads section](https://nodejs.org/download/) to download older versions. The most current available version at the time of this writing is *0.12.7*.

**npm** is the package manager for Node.js, created in 2009 as an open source project to help JavaScript developers easily share packaged modules of code. The npm Registry is a public collection of packages of open-source code for Node.js, front-end web apps, mobile apps, robots, routers, and countless other needs of the JavaScript community. `npm` is the command line client that allows developers to install and publish those packages. A version of it will be installed along with Node, so you don't need to worry about installing it separately.

Node will want to install by default in your `Program Files` directory. To avoid needing administrative privileges to make any modifications to Node, I prefer to install it into an apps folder I created on the root of my primary partition - namely `C:\apps\nodejs`.

In order to make the `node` and `npm` CLI available on the Windows command line, Node will add this installation directory to your systems `PATH` environment variable.

You can verify the installation by going to a command line and running the following command, each of which should provide you with a version number.

```
$ node -v
v0.12.7

$ npm -v
2.11.3
```

## Installing Modules Locally or Globally ##

With npm, there are two ways to install things:

1. Globally: This drops modules in `{prefix}/lib/node_modules`, and puts executable files in `{prefix}/bin`, where `{prefix}` is usually `%APPDATA%\Roaming\npm`. It also installs man pages in `{prefix}/share/man`, if they’re supplied.

2. Locally: This installs your package in the current working directory. Node modules go in `./node_modules`, executables go in `./node_modules/.bin/`, and man pages aren’t installed at all.

>To install a module globally, add the `-g` option to the `npm install` command. As long as it comes after the command, it doesn't matter if it comes before or after the module name you are trying to install.

### Which To Choose ###

In general, the rule of thumb is:

- If you’re installing something that you want to use in your program, using `require('whatever')`, then install it locally, at the root of your project.

- If you’re installing something that you want to use in your shell, on the command line or something, install it globally, so that its binaries end up in your PATH environment variable.

### When You Can't Choose ###

There are some cases where you want to do both. Coffee-script and Express both are good examples of apps that have a command line interface, as well as a library. In those cases, you can:

- Install it in both places. Seriously, are you that short on disk space? It’s fine, really. They’re tiny JavaScript programs.

- Install it globally, and then `npm link coffee-script` or `npm link express` (if you’re on a platform that supports symbolic links.) Then you only need to update the global copy to update all the symlinks as well.

The first option is the best in my opinion. Simple, clear, explicit. The second is really handy if you are going to re-use the same library in a bunch of different projects.

## Install Nodemon ##

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. By installing it globally via npm, you can just use `nodemon` instead of `node` to run your code, and your process will automatically restart when your code changes.

```
$ npm install nodemon -g
```

## Install Python 2.7 ##

While Node does not require Python to be installed, some modules requires [Python (version 2.7)](https://www.python.org/downloads/) to be installed and the path to Python be available via a System Environment Variable named `PYTHON` in order to build and install. We can wait until we get an error that requires us to do this, or we can preemptively install the language and add the environment variable. I would recommend a preemptive course of action.

# Install Express Application Generator #

With Node and npm installed, you can now create an Express application. Start by installing the [application generator tool](http://expressjs.com/starter/generator.html), `express`, globally via npm.

```
$ npm install express-generator -g
``` 

Once installed, you can see all the command line options available using the `-h` option:

```
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

# Generate An Express Application #

Use the express application generator to create a skeleton express application. Start by navigating to the directory you want to contain your application and run the command:

```
$ express [your app name]

   create : .
   create : ./package.json
   create : ./app.js
   create : ./public
   create : ./public/javascripts
   create : ./public/images
   create : ./routes
   create : ./routes/index.js
   create : ./routes/users.js
   create : ./views
   create : ./views/index.jade
   create : ./views/layout.jade
   create : ./views/error.jade
   create : ./public/stylesheets
   create : ./public/stylesheets/style.css
   create : ./bin
   create : ./bin/www

   install dependencies:
     $ cd . && npm install

   run the app:
     $ DEBUG=[your app name]:* npm start
```

The generated app directory structure will look like this:

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

This app can be run immediately by running `npm install` on the command line in the application folder, followed by `npm start`, but let's forego that for just a minute and focus on what was generated.

## Examining `package.json` ##

The `package.json` file is the [software manifest](https://en.wikipedia.org/wiki/Manifest_file) for the application; it holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies. It also contains other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both npm and to the end users of the package.

The format and fields of the `package.json` file are [described in the npm documentation](https://docs.npmjs.com/files/package.json), and you can also [browse an interactive representation of it online](http://browsenpm.org/package.json), so I won't go into detail here about. It's pretty straight forward.

```javascript
{
	"name"    : "[your app name]",
	"version" : "0.0.0",
	"private" : true,

	"scripts" :
	{
		"start" : "node ./bin/www"
	},

	"dependencies" :
	{
		"body-parser"   : "~1.13.2",
		"cookie-parser" : "~1.3.5",
		"debug"         : "~2.2.0",
		"express"       : "~4.13.1",
		"jade"          : "~1.11.0",
		"morgan"        : "~1.6.1",
		"serve-favicon" : "~2.3.0"
	}
}
```

> Dependencies are specified in a simple object that maps a package name to a version range. The version range is a string which has **one or more space-separated descriptors**. The descriptors must be parsable by [node-semver](https://github.com/npm/node-semver), which is bundled with npm as a dependency. The minimum you need to know is:
> - `version` Must match version exactly
> - `>version`  Must be greater than version
> - `>=version` Must be greater than or equal to version
> - `<version`  Must be less than version
> - `<=version` Must be less than or equal to version
> - `~version` "Approximately equivalent to version" See semver(7)
> - `^version` "Compatible with version" See semver(7)
> - `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
> - `*` Matches any version, can all use just an empty string
> - `version1 - version2` Same as >=version1 <=version2.
>
> My preference is to use the `~` during development, however once moving to production, explicit versions should probably by specified.

### Default Modules ###

It is, however, noteworthy to look at the default dependencies include by the Express application generator.

| Module | Description  |
|--------|--------------|
| [body-parser](https://www.npmjs.com/package/body-parser) | Middleware for parsing the HTTP request body (`req.body`). Supports JSON, raw, text and url-encoded data. *Does not handle multipart bodies, see __multer__, below* |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns `req.secret` so it may be used by other middleware. |
| [debug](https://www.npmjs.com/package/debug) | Tiny debugging utility modeled after Node core's debugging technique. |
| [express](http://expressjs.com/) | Naturally, because this is an Express application, our project is going to depend on Express. |
| [jade](http://jade-lang.com/) | Jade is a high performance template engine heavily influenced by [Haml](http://haml.info/) and implemented with JavaScript for node and browsers. Jade is the default view templating engine provided by Express. This can be excluded entirely if your application will not be serving up HTML pages. |
| [morgan](https://www.npmjs.com/package/morgan) | HTTP request logger middleware, this will print out to the console information about every request made. |
| [serve-favicon](https://www.npmjs.com/package/serve-favicon) | Middleware for serving a favicon. This module is exclusively for serving the "default, implicit favicon", which is `GET /favicon.ico`. |

In addition to these dependencies, the following are useful for creating robust REST APIs and web applications. We'll add them later in our customization section.

| Module | Description  |
|--------|--------------|
| [compression](https://www.npmjs.com/package/compression) | Middleware to compress the HTTP response. |
| [multer](https://www.npmjs.com/package/multer) | Middleware for handling multipart/form-data, which is primarily used for uploading files. |

> While the order of the dependencies in the `package.json` file does not matter, the order in which the middleware is loaded in and added to Express **does** matter.

### Default Start Script ###

The `scripts` section of the generated `package.json` exposes addition npm commands. The object assumes that the key is the npm command and the value is the script path. These scripts can get executed when you run `npm run {command name}` or `npm run-script {command name}`.

The default start script is `node ./bin/www`, and identifies that script as our "server" script.

# Configure The Express Application #

As the app structure generated by the generator is just one of the multiple ways of structuring Express apps, we should feel free to not use it or to modify it to best suit our needs. The changes below to the structure and layout of the project improves the organization for an MVC application.

### Rename ###

Rename the following files:

1. Rename `./bin/www` to `./bin/server.js`
2. Rename `./app.js` to `./express.js`

### Reorganize ###

Reorganize the files and folders to match this structure, creating or deleting folders as needed.

```
.
├── app
│   ├── config
│   |   └── express.js
│   ├── controllers
│   ├── models
│   ├── routes
│   |   ├── index.js
│   |   └── users.js
│   └── views
|       ├── error.jade
|       ├── index.jade
|       └── layout.jade
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
└── server.js
```

### Modify `package.json` ###

Because we moved `server.js` out of `./bin` (and subsequently deleted the empty `./bin` folder), we need to tell the start script in our `package.json` about this change.

```javascript
{
	...
	"scripts" :
	{
		"start" : "node ./server.js"
	},
	...
}
```

### Modify `server.js` ###

Because we moved and renamed `app.js` to `express.js`, which tells our server how to configure express, we'll need to update our `server.js` file with the new location. Find the line near the top of this file (mine is on line 7) that looks like this:

```javascript
var app = require('../app');
```

And change it to this:

```javascript
var app = require('./app/config/express');
```

### Modify `express.js` ###

Because we moved our routes and templates into our new `app` folder, we also need to update `express.js` to reflect their new locations. These line are most likely together, but I'll call out the changes to them seperately.

**Routes**

My routes are defined on lines 8 and 9. I'll change them from this:

```javascript
var routes = require('./routes/index');
var users = require('./routes/users');
```

To this:

```javascript
var routes = require('../routes/index');
var users = require('../routes/users');
```

**Views**

The location of my view templates is on line 14. I'll update the location from this:

```javascript
app.set('views', path.join(__dirname, 'views'));
```

To this:

```javascript
app.set('views', './app/views');
```

> Notice the difference between the relative path I used for the routes versus the views. This is because the path stored in `process.cwd()` is prepended to the path used by the views. See the [Express 4.x app settings table](http://expressjs.com/4x/api.html#app.settings.table) for more information.

# Running and Monitoring #

With these changes made, we are ready to fire up our baseline Express application. Remember those two lines the generator told us to use that I recommended we not do yet? Yeah, it's time to use those.

## Installing Dependencies ##

On the command line from within your application directory, run:

```
$ npm install
```

The dependencies listed in the dependencies section of your `package.json` file will be downloaded and placed in a folder named `./node_modules`, which will be created in your application directory.

In the future, when we need to add new dependencies to our application, we can either:

- Add the dependency to `package.json` and run `npm install` again, or
- Install our dependency using `npm install [module] --save`, which will automatically add the dependency to the `package.json` file for us, or
- Install our dependency using `npm install [module]`, noting which version it installed, and add the dependency to the `package.json` manually 

Of these options, I generally prefer the last one, unless I need a specific (older) version of a module.

## Running The Application ##

We can start the app running several different ways. During our development cycles, we want to see more output that we would in production, and it's nice to have that output in a friendly, human-readable format.

Using the `node` command directly provides us with no feedback on what our application is doing during the startup process or when it is ready to start serving up pages, but we could use it just the same like this:

```
$ node ./server.js
```

We can get a little more feedback on what our application is doing by using `npm`, but it still doesn't tell us when the app is ready to go:

```
$ npm start

> [your app name]@[your app version] start [current working directory]
> node ./server.js
```

And if we turn on `DEBUG`, as suggested when our express application was generated, we get a little more output with some nice, color-coded formatting:

```
$ DEBUG=[your app name]:* npm start

> [your app name]@[your app version] start [current working directory]
> node ./server.js

  [your app name]:server Listening on port 3000 +0ms
```

Finally, there is an even better way to run our server during our development cycles, and that is to use `nodemon`, one of the Node modules we installed early on. When coupled with `DEBUG`, our server becomes pleasantly verbose during the starting up phase.

```
$ DEBUG=[your app name]:* nodemon
21 Aug 12:32:27 - [nodemon] v1.4.1
21 Aug 12:32:27 - [nodemon] to restart at any time, enter `rs`
21 Aug 12:32:27 - [nodemon] watching: *.*
21 Aug 12:32:27 - [nodemon] starting `node ./server.js`
  [your app name]:server Listening on port 3000 +0ms
```

The server should now be up and running at http://localhost:3000. If we open that in a browser window, we'll see additional output provided by the `morgan` middleware, telling us all about the requests it's received:

```
GET / 200 37.975 ms - 170
GET /stylesheets/style.css 404 26.891 ms - 1140
GET /favicon.ico 404 10.853 ms - 1140
```

> Notice the requests for the `favicon.ico`. Most evergreen browsers now make this request automatically the first time a request is made to a domain, even before it receives any response from the original request. We don't have one yet, and by default the `serve-favicon` middleware is disabled until we enable it, so the server returns a `404 Not Found`.

Because we're using `nodemon`, we can make changes to the code and `nodemon` will automatically restart our server for us, picking up the changes we made. In those rare instances where we might want to restart the server manually, just type `rs` in the console window where the app is running and hit `Enter`, and it will restart for you.

```
$ DEBUG=[your app name]:* nodemon
21 Aug 12:41:48 - [nodemon] v1.4.1
21 Aug 12:41:48 - [nodemon] to restart at any time, enter `rs`
21 Aug 12:41:48 - [nodemon] watching: *.*
21 Aug 12:41:48 - [nodemon] starting `node ./server.js`
  [your app name]:server Listening on port 3000 +0ms
rs
21 Aug 12:41:51 - [nodemon] starting `node ./server.js`
  [your app name]:server Listening on port 3000 +0ms
```

# Including Static Resources #

Static resources are binary files (such as images or compressed files), stylesheets and JavaScript or HTML files that don't need to be processed by Node before returning them to the client. Put these files in the `public` folder, and they will be served up automatically.

The Express Application Generator creates the subfolders `images`, `stylesheets` and `javascripts` for you, but you don't have to use them. You can make any changes to the items in the public folder without making any changes to your Express application.

> The (seemingly) obvious exception, of course, would be where Jade templates reference JavaScript, stylesheet and images in the public folders. However, one could make the case that updating template files used by the application isn't the same as changing the application code. 

# More Express Customization #

I've made extensive customizations to both the default `server.js` (formerly `./bin/www`) and `express.js` (formerly `./app.js`) files. Here is what they look like now. In addition to these changes, I've also added `compression`, `method-override` and `multer` to my `package.json`, and ran `npm install` to download those modules.

## Custom `server.js` ##

```javascript
#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/***********************************************************************************
 * Configure global paths                                                          *
 **********************************************************************************/
var path       = require('path');
global.appname = '[your app name]'
global.root    = __dirname;
global.path    =
{
	'config'      : path.join(global.root, 'app', 'config'),
	'controllers' : path.join(global.root, 'app', 'controllers'),
	'models'      : path.join(global.root, 'app', 'models'),
	'public'      : path.join(global.root, 'public'),
	'routes'      : path.join(global.root, 'app', 'routes'),
	'views'       : path.join(global.root, 'views')
};
/**********************************************************************************/


/***********************************************************************************
 * Module dependencies                                                             *
 **********************************************************************************/
var debug   = require('debug')(global.appname + ':server');
var express = require(path.join(global.path.config, 'express'));
var app     = express();
var https   = (process.env.NODE_ENV !== 'development') ? require('https') : require('http');

debug("NODE_ENV : " + process.env.NODE_ENV);
/**********************************************************************************/


/***********************************************************************************
 * Get port from environment and store in Express.                                 *
 **********************************************************************************/
var port = (function (val)
{
	var port = parseInt(val, 10);

	if (isNaN(port)) // named pipe
	{
		return val;
	}

	if (port >= 0) // port number
	{
		return port;
	}

	return false;
})(process.env.PORT || '3000');
app.set('port', port);
/**********************************************************************************/


/***********************************************************************************
 * Create server and listen on provided port, on all network interfaces.           *
 **********************************************************************************/
var server = https.createServer(app);
server.listen(port);
/**********************************************************************************/


/***********************************************************************************
 * Event listener for HTTP server "error" event.                                   *
 **********************************************************************************/
server.on('error', function (error)
{
	if (error.syscall !== 'listen')
	{
		throw error;
	}

	var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code)
	{
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});
/**********************************************************************************/


/***********************************************************************************
 * Event listener for HTTP server "listening" event.                               *
 **********************************************************************************/
server.on('listening', function ()
{
	var addr = server.address();
	var bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
});
/**********************************************************************************/
```

### Development vs Other Environments ###

The value of the `NODE_ENV` environment variable is stored in [`process.env.NODE_ENV`](https://nodejs.org/api/process.html#process_process_env), and aliased in Express applications in [`app.get('env')`](http://expressjs.com/4x/api.html#app.get). If there is no value in that environment variable, then the value of `process.env.NODE_ENV` is obviously `undefined`.

Given that we want to set up our application differently based on our environment, it's important that we have a value there. Here are the various ways we can accomplish that.

- Set a System Environment Variable named `NODE_ENV` and set it's value to either *development* or *production*.

- Set the value of `NODE_ENV` for the current command line environment session using `set NODE_ENV=production`

But if we fail to do either of those things, we need to make sure we have a default value. Hence, the first line in our new server.js file makes sure that if we don't set that value explicitly, we'll default to *development*.

```javascript
process.env.NODE_ENV = process.env.NODE_ENV || development;
```

You'll see us using that value very soon.

### Creating Global Attributes ###

Node provides access to the global namespace object with a special variable available in all modules call (surprise!) [`global`](https://nodejs.org/api/globals.html#globals_global). We can use this to store our global values for later use. Right up front, I like to parameterize the application name and the location of our application folders. Note that attribute values are not restricted to primitives.

```javascript
var path       = require('path');
global.appname = '[your app name]'
global.path    =
{
	'config'      : path.join(__dirname, 'app', 'config'),
	'controllers' : path.join(__dirname, 'app', 'controllers'),
	'models'      : path.join(__dirname, 'app', 'models'),
	'public'      : path.join(__dirname, 'public'),
	'routes'      : path.join(__dirname, 'app', 'routes'),
	'views'       : path.join(__dirname, 'app', 'views')
};
```

> In the generated express application, a (quasi) global variable [`__dirname`](https://nodejs.org/api/globals.html#globals_dirname) was used to identify the path to our view templates. This variable stores in it the name of the directory that the currently executing script (module) resides in.

### Debug, Express and HTTP(S) ###

Right away we're going to include the debugger, and use our new global variables to configure its output prefix.

```javascript
var debug   = require('debug')(global.appname + ':server');
```

The next two lines require in our Express configuration and use it to create the `app` variable. This is a reflection of the changes I've made to `express.js`, as you'll see in the next section. 

```javascript
var express = require(path.join(global.path.config, 'express'));
var app     = express();
```

And finally we'll require in either `https` or `http`, depending on our environment. If you won't be using SSL in production, you'll just use `http`.

```javascript
var https   = (process.env.NODE_ENV !== 'development') ? require('https') : require('http');
```

### Other Refactoring ###

The remaining changes I've made are a refactoring of what was already there. Taking a look at it should be all it takes to understand the changes.

## Custom `express.js` ##

The function exposed by our new `express.js` returns a configured instance of express.

```javascript
/***********************************************************************************
 * Dependencies                                                                    *
 **********************************************************************************/
var fs             = require('fs');
var debug          = require('debug')(global.appname + ':express');
var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var multer         = require('multer');
var compress       = require('compression');
var favicon        = require('serve-favicon');
/**********************************************************************************/


/***********************************************************************************
 * Express Configuration                                                           *
 **********************************************************************************/
module.exports = function ()
{
	var app = express();

	// view engine setup
	app.set('views', global.path.views);
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	app.use(favicon(path.join(global.path.public, 'favicon.png')));

	// log in development, compress in production
	if (app.get('env') === 'development')
	{
		app.use(logger('dev'));
	}
	else
	{
		app.use(compress());
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(multer());
	app.use(cookieParser());
	app.use(express.static(path.join(global.path.public)));


	// apply user defined routes
	var routes = global.path.routes;
	fs.readdirSync(routes).forEach(function (file)
	{
		if (file.match(/route/i))
		{
			var route    = '/' + (file.split('.'))[0];
			var resource = path.join(routes, file);

			if (route === '/index')
			{
				app.use('/', require(resource));
				app.use(route + '.html', require(resource));
			}
			else
			{
				app.use(route, require(resource));
			}

			debug('added route : ' + route);
		}
	});


	// catch 404 and forward to error handler
	app.use(function(req, res, next)
	{
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});


	// development error handler : will print stacktrace
	if (app.get('env') === 'development')
	{
		app.use(function(err, req, res, next)
		{
			res.status(err.status || 500);
			res.render('error',
			{
				error   : err,
				status  : err.status,
				message : err.message
			});
		});
	}


	// production error handler : no stacktraces leaked to user
	app.use(function(err, req, res, next)
	{
		res.status(err.status || 500);
		res.render('error',
		{
				error   : {},
				status  : err.status,
				message : err.message
		});
	});

	return app;
};
/**********************************************************************************/
```

### Development Versus Everything Else ###

The biggest upfront change - other than the new modules we're includeing - is making the decision to use `morgan` only in development and `compression` only in non-development environment.

```javascript
if (app.get('env') === 'development')
{
	app.use(logger('dev'));
}
else
{
	app.use(compress());
}
```

### Synchronous Route Definitions ###

Here is our first instance of [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration). After adding all the necessary middleware, we then use the (intentionally) synchronous `fs.readdirSync` to iterate over all the files in our routes directory and attach them to our express application.

```javascript
var routes = global.path.routes;
fs.readdirSync(routes).forEach(function (file)
{
	if (file.match(/route/i))
	{
		var route    = '/' + (file.split('.'))[0];
		var resource = path.join(routes, file);

		if (route === '/index')
		{
			app.use('/', require(resource));
			app.use(route + '.html', require(resource));
		}
		else
		{
			app.use(route, require(resource));
		}

		debug('added route : ' + route);
	}
});
```

The convention used is that our routes should be named using the pattern `[resource].route.js`. If you want to have files in the routes folder, but not use them as routes, just exclude the word "route" from the file name. The `[resource]` part of the file name will be used to route traffic to routes defined in that route file. So, all traffic to `/user` will be routed to the routes in the file `user.route.js`.

We also treat the file `index.route.js` a little differently, allowing it to respond to `/` and `/index.html`, as it is less likely that we really want to expose a resourse at `/index`.

### Other Refactoring ###

What remains should be recognizable as simple refactoring of the generated code, where we attach handlers for `404 Not Found` and seperate error handlers for development and non-development environments.

Also note that throughout this file, we make heavy use of the global variables defined in `server.js`. This will make it easier to proliferate changes in our application if we decide to change the name or where things are located.

## Environment Dependent Configuration ##

I've added another directory and three more files to my `config` directory.

```
.
└── app
    └── config
        ├── env
        |   ├── production.js
        |   └── development.js
        ├── config.js
        └── express.js
```

As we go about adding things to our application like database connectivity or social media integration, it will be convinient to store configuration variables related to these interactions in a seperate file. Furthermore, we will likely want to use a different set of values depending on the environment we are in.

We'll do that by referencing the `config.js` file wherever needed to pull in those values for us.

```javascript
var config = require(path.join(global.path.config, 'config'));
```

And our config.js file looks like this:

```javascript
var path = require('path');
module.exports = require(path.join(global.path.config, 'env', process.env.NODE_ENV));
```

Which will then expose the configuration appropriate to our environment. In turn, the `production.js` and `development.js` files both look like this for now:

```javascript
module.exports =
{
	// We'll put our configuration here as we come to it
};
```

### Environment Types ###

Up to this point, other than the occasional reference to "non-development", I've only talked about development and production environments. The reality is that you can set up as many different named environments as you want; Node and Express don't care! You can set up logic and configuration files for `testing` environments, `staging` environments, or `demo` environments, it's entirely up to you!

# Topics Coming Soon #

- Deploying Node/Express Applications
- Mongo and Mongoose
- Neo4j and Seraph
- Key Differences Between Mongoose and Seraph
