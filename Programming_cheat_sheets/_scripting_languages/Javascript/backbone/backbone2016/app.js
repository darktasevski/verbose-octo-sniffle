'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());  // so we can use `request.body.foo` // $ npm instal body-parser


var fakeDataBase = {
  "1": {name: "Erich Spinos", age: 20, job: 'programmer', id: 1},
  "2": {name: "Brian Spinos", age: 20, job: 'programmer', id: 2}
};

var currentId = 2;

// remember: files are not available if you dont 'app.use' them...
// express.static('js') will allow you to use files 'under' the /js folder, but its important to specify '/js' so you can reference the folder name
app.use('/js', express.static('js'));  // to use the client JS files!

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/users', function(request, response){
  response.sendFile(__dirname + '/users.html');
});
//----------------- REST/CRUD

// create
app.post('/users', function(request, response){  // create a user  POST /users
  console.log('\n\nshould create new user');
  // response.json({name: 'brian created', age: 19, job: 'senior dev'});
  fakeDataBase[currentId +=1] = {name: request.body.name, age: request.body.age, job: request.body.job, id: currentId };
  console.log('-------------- db:');
  console.log(fakeDataBase);
  console.log('-------------- body:');
  console.log(request.body);
});

// read
app.get('/users/:id', function(request, response){  // get  /user/1
  console.log('\n\nshould get user with id:' + request.params.id);
  // response.json({name: 'foo', age: 19, job: 'painter'});
  response.json(fakeDataBase[request.params.id]);
  console.log('-------------- db:');
  console.log(fakeDataBase);
  console.log('-------------- body:');
  console.log(request.body);
});

// update
app.put('/users/:id', function(request, response){   // save existing user PUT /users/1
    console.log('\n\nshould update user with id:' + request.params.id);
  // response.json({name: 'brian deleted', age: 19, job: 'senior dev'});
  fakeDataBase[request.params.id] = {name: request.body.name, age: request.body.age, job: request.body.job, id: request.params.id };
  console.log('-------------- db:');
  console.log(fakeDataBase);
  console.log('-------------- body:');
  console.log(request.body);
});

// delete
app.delete('/users/:id', function(request, response){  // delete a specific user  DELETE /users/1
    console.log('\n\nshould delete user with id:' + request.params.id);
  // response.json({name: 'brian deleted', age: 19, job: 'senior dev'});
  delete fakeDataBase[request.params.id];
  console.log('-------------- db:');
  console.log(fakeDataBase);
  console.log('-------------- body:');
  console.log(request.body);
});

// read all
app.get('/users', function(request, response){  // get all users
  console.log('\n\nshould get all users');
  // response.json({name: 'foo', age: 19, job: 'painter'});
  console.log('-------------- db:');
  console.log(fakeDataBase);
  console.log('-------------- body:');
  console.log(request.body);
});

// app.post('/users/:id', function(request, response){
//     console.log('should update user with :id');
//   response.json({name: 'foo', age: 19, job: 'senior dev'});
// });

app.listen(3000);

