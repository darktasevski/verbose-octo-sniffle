# Starting a MEAN project

**Prerequisites:**

- NodeJS/npm installed

- MongoDB installed/configured

- Run _sudo npm install -g @angular/cli_


## Steps..

_ng new project_ - creates and downloads npm pakages

_ng serve_ - starts the server

_npm install --save express body-parser_ - installs express

Create a folder called _server_ and under it create another folder called _api_

On the root of _server_ create a file called _server.js_ and a file _api.js_ under the _routes_ folder.

(the content of these files is in this rep under the same location as this .md file)

Add to project.json the following line _"dev": "ng build && node server/server.js",_ under _"scripts": {_ 

Finally run by: _npm run dev_ (it takes a few moments to compile the typescript..)

