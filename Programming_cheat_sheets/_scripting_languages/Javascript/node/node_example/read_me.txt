- node was intended for file upload


$ npm init  # generate the package.json file!  (it will walk you through it!)

$ node app.js

$ curl -i http://localhost:8080/



- you can create a node module, just add it to the folder node_modules, and require it like this:
    var foo = require('foo');
    not like this:
    var foo = require('./foo');


$ npm install ejs --save # install and save in the packages.json

# http://stackoverflow.com/questions/7290836/host-multiple-pages-on-nodejs