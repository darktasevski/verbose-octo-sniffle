# Grunt Hello World demo
## Introduction
Grunt is a JavaScript Task Runner

## Install Grunt via npm
```
$ sudo npm install -g grunt-cli --verbose
```

### Notice
> This will put the **grunt** command in your system path.
> ...
> Note that installing **grunt-cli** does not install the Grunt task runner.
> The job of Grunt CLI is simple: runt he version of Grunt which has been
> installed next to a Gruntfile.

### How the CLI works
> Each time **grunt** is run, it looks for a locally installed Grunt using
> node's **required()** system.
> Because of this, you can run **grunt** from any subfolder in your project.
>
> If a locally installed Grunt is found, the CLI loads the local installation
> of the Grunt library, applies the configuration from your **Gruntfile**, and
> executes any tasks you've requested for it to run.

## Run the demo
### Get the
```
$ git clone https://github.com/qiuzhong/mis-notes.git
$ cd misc-notes/node/grunt/demo
$ npm install --verbose
$ grunt
Running "default" task
Hello from Grunt.

Done.
```

### Steps to generate a grunt project
```
$ mkdir myproject
$ npm init
$ npm install grunt --save-dev --verbose
$ touch Gruntfile.js
```

After update **Gruntfile.js**, run
```
$ grunt
```
