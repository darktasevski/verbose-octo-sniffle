Building Maintainable Node/Express Applications
===============================================

> Specifically, your goal should be to minimize the time it takes someone else to understand your code.
> -[The Art of Readable Code, Simple and Practical Techniques for Writing Better Code](http://www.amazon.com/Art-Readable-Code-Theory-Practice/dp/0596802293), Preface

The principles and practices described below will help you write your application in a way that makes it easy to maintain. Focused specifically on Node.js and Express applications, they focus less on syntax and more on the tools, structure and configuration aspects.

<!--
### Refer To The Documentation (RTTD) ###

These are something else.

https://www.npmjs.com/package/blocked
http://livereload.com/
https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make
https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/
https://github.com/baryshev/look
https://www.npmjs.com/package/morgan-debug
http://kb.imakewebsites.ca/2014/01/04/new-node-wishlist/
-->

# Start With Express-Generator #

Express provides an [application generator tool](http://expressjs.com/starter/generator.html) that ties into `npm init` to quickly create an Express application skeleton. Keep in mind that the app structure generated is just one of the many, many ways you can structure an Express app. The Express project creators encourage you to not use it at all, or to modify its output to best suit your needs. In other words, use it as a starting point, but don't limit yourself to what it provides.

Install the generator globally:

```
$ npm express-generator -g
```

Then create a directory for your application and run it:

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

This will generate an application directory structure that looks like this:

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

### Examining `package.json` ###

The package.json file is the [software manifest](https://en.wikipedia.org/wiki/Manifest_file) for the application; it holds various metadata relevant to the project. The format and fields of the package.json file are [described in the npm documentation](https://docs.npmjs.com/files/package.json), and you can also [browse an interactive representation of it online](http://browsenpm.org/package.json), so I won't go into detail here about. It's pretty straight forward.

By default, Express includes the following dependencies:

| Module | Description  |
|--------|--------------|
| [body-parser](https://www.npmjs.com/package/body-parser) | Middleware for parsing the HTTP request body (`req.body`). Supports JSON, raw, text and url-encoded data. *Does not handle multipart bodies, see __multer__, below* |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns `req.secret` so it may be used by other middleware. |
| [debug](https://www.npmjs.com/package/debug) | Tiny debugging utility modeled after Node core's debugging technique. |
| [express](http://expressjs.com/) | Naturally, because this is an Express application, our project is going to depend on Express. |
| [jade](http://jade-lang.com/) | Jade is a high performance template engine heavily influenced by [Haml](http://haml.info/) and implemented with JavaScript for node and browsers. Jade is the default view templating engine provided by Express. This can be excluded entirely if your application will not be serving up HTML pages. |
| [morgan](https://www.npmjs.com/package/morgan) | HTTP request logger middleware, this will print out to the console information about every request made. |
| [serve-favicon](https://www.npmjs.com/package/serve-favicon) | Middleware for serving a favicon. This module is exclusively for serving the "default, implicit favicon", which is `GET /favicon.ico`. |

In addition to these dependencies, the following are useful for creating robust REST APIs and web applications.

| Module | Description  |
|--------|--------------|
| [compression](https://www.npmjs.com/package/compression) | Middleware to compress the HTTP response. |
| [multer](https://www.npmjs.com/package/multer) | Middleware for handling multipart/form-data, which is primarily used for uploading files. |

They can be added to your project from the command line while inside your application using `npm install` and the `--save` flag, which will update your `package.json` for you.

```
$ npm install [module name] --save
```

### Reorganize ###

The organization structure I've adopted and that will be evangalized here looks like this:

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

This centralizes all your application code in the `app` folder, segregates the concerns, and moves the entry point of your application into the root folder. Of importance to note:

- Rename/move `./bin/www` to `./server.js`
- Rename/move `./app.js` to `./app/config/express.js`

After which you will need to update both files as well as the `package.json` to reflect the changes in directory structure.

# Be Idiomatic #

Your application entry point (`server.js`) should call the required configuration scripts and start the server in around 100-200 lines. It should be easy to read, and should rarely be modified.

http://stackoverflow.com/questions/11716421/difference-between-npm-start-node-app-js-when-starting-app

# Parameterize Your Environment #

the express application should know what environment it's in (development, test, production, etc) and alter it's functionality accordingly. similarly, global variables that differ between environments should be stored in environment specific configuration files

# Develop With `nodemon`, Deploy With `forever` #

nodemon is great in development. forever does something very similar, but in production

- Keep dependencies out of source control
- Host [your own npm](https://github.com/jbuck/npm-readonly-mirror) registry
- Keep track of outdated dependencies
- https://docs.npmjs.com/misc/scripts
- http://browserify.org/articles

# Use Configuration Files #

speaking of configuration files, modules that require configuration should have their own configuration scripts (mongoose, passport, seraph, socket.io etc.) that get called by the start script


# Find Stuff Easier #

remembering all those paths sucks. there are better ways. use them
https://gist.github.com/branneman/8048520

read in your apps folder https://www.npmjs.com/package/app-module-path

# Convention Over Configuration #

the majority of feature/functionality changes should not require a developer to modify the start or configuration scripts. follow conventions to load them synchronously
