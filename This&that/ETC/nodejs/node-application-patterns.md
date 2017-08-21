Node Application Patterns
=========================
*Think in terms of modules*

# Introduction #

- Node is Simple
- Node is Modular
- Node Community is Broad
- Node Scales Well
- Node is Well Supported (Azure, Heroku, AWS)
- Node is JavaScript!

## Tools ##

Assuming you already have Node.js installed, here are some other tools that will be useful.

### [WebStorm](https://www.jetbrains.com/webstorm/) ###

A JavaScript IDE made by the folks at JetBrains. Not free, but trial versions are available.

### [Grunt](http://gruntjs.com/) ###

A JavaScript task runner. 

### [Powershell](http://en.wikipedia.org/wiki/Windows_PowerShell) ###

A powerful Windows command line utility. Use in place of the traditional command line.

*RGB Background Color: 80, 128, 210*

### Alternatives to Express ###
- [koa](http://koajs.com/) - next rev of Express and built by the Express team
- [geddy](http://geddyjs.org/) - patterned after Ruby on Rails
- [sails](http://sailsjs.org/) - Patterned after Ruby on Rails, more modern and lite-weight than geddy, hooks into backbone.js

# Setting Up Your Project #

## Setting Up Grunt ##

1. Use `npm install grunt-cli -g` to install grunt globally

2. In your project, use `npm` to install project specific grunt plugins:
	- `npm install grunt`
	- `npm install grunt-contrib-jshint`
	- `npm install grunt-contrib-watch`

> Using the `--save` or `--save-dev` flag when installing a module will automatically write it to your `package.json`

### Adding Grunt to `package.json` ###

```javascript
{
	"name"    : "",
	"version" : "",

	"dependencies" :
	{
		
	},

	"devDependencies" :
	{
		"grunt" : "*",
		"grunt-contrib-jshint" : "*",
		"grunt-contrib-watch" : "*"
	}
}
```

### Adding the Gruntfile ###

```javascript
module.exports = function(grunt)
{
	grunt.initConfig(
	{
		jshint :
		{
			files : ['lib/**/*js', 'models/**/*.js']
		},
		watch
		{
			files : ['lib/**/*js', 'models/**/*.js'],
			tasks : ['jshint']
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
}
```

## Code Organization ##

Your node project should look something like this

```
projectfolder
- lib
	- lib_folder
		- package folder
			- index.js (default entry point for libraries)
		- package.json for the modules
- node_modules
	- *node modules*
- app.js
- Gruntfile.js
- package.json
```

## Mocha Test Framework ##

Install `mocha` globally, install `should` into your package:
`npm install mocha -g`
`npm install should --save-dev`

When executed from the command line, `mocha` will look for spec files in a test directory. It is recommended that you keep your tests with your modules.  Add a `mocha.opts` file to your test directory to configure the mocha test runner:

```
--reporter spec
```

Tests in mocha describe features and scenarios.

```javascript
var should = require("should");

describe ("Feature" function ()
{
	describe("Scenario", function ()
	{
		var item_under_test = {};

		before(function ()
		{
			item_under_test = SomeConstructor();
		});

		it("property is value", function ()
		{
			item_under_test.property.should.equal("value");
		});
	});
});
```

## Git and GitHub ##

Each module should have its own repository, as `npm` can use git and GitHub to install modules. Make sure your `package.json` file contains a version, and then include it as dependency in your project.

```javascript
{
	...
	"dependencies" :
	{
		// the name comes from the name in the modules package.json file

		// remote
		"name" : "github-user-name/github-repo-name"

		// local
		"name" : "./local/path"
	}
}
```

# Building A Module #

