# Node.js PART 1

- documentation: http://nodejs.org/api/http.html#http_response_writehead_statuscode_reas onphrase_headers

- allows you to build scalable network applications

### what you can build
   - websocket server, (the socket stays open) (like a chat server)

   - fast file upload client (non blocking) (event based, on callbacks)

   - Ad server

   - real time data apps

   - Not a web framework

   - Not multi-threaded server (but two events can happen the same time!!!)


# blocking vs non-blocking code

```js
//blocking code
var contents = fs.readFileSync('/etc/hosts');
console.log(contents); // doing this first,
console.log('Doing something else'); // then doing this after

//non-blocking code
fs.readFileSync('/etc/hosts', function(err, contents){
  console.log(contents); // execute this whennever its ready!
});
console.log('Doing something else');


//non-blocking code (another way to do it!)
var callback = function(err, contents){
  console.log(contents); // execute this whennever its ready!
};
fs.readFileSync('/etc/hosts', callback);
console.log('Doing something else');

```


# node.js hello world

```js
var http = require('http'); // how we require modules
http.createServer(function(request, response){
  response.writeHead(200);  // status code in head
  response.write("hello world"); // response body
  response.end(); // close connection
}).listen(8080); // listen for connections on this port

console.log('listening on port 8080...');
```

```bash
$ node hello.js # "listening on port 8080..."

# keep the server running before running a curl command!!! TIP
$ curl http://localhost:8080  # "hello world"  

# you can see it on the browser also!
# http://localhost:8080/  # "hello world"

```


# how node works

- it registers events, like 'request', 'connection', 'close' (it can have nested events too!)
- it has an event loop (checking for events)
  - events are processed on at a time on the event loop (like a queue)




# example with long running process

```js

// 1. request comes in, and triggers the request event

var http = require('http');

http.createServer(function(request, response){  // request event
  response.writeHead(200);
  response.write("dog is running.");
  setTimeout(function(){                        // timeout event
    response.write("dog is done.");
    response.end();
  }, 5000); // pause for 5 seconds
}).listen(8080);

```




# example of server reading a html file:

```js
// app.js

var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type':'text/html'});
  fs.readFile('index.html', function(error, contents){
    response.write(contents);
    response.end();
  });

}).listen(8080);


```

```html
<!-- index.html -->
<p>hello there</p>
```

```bash
$ node app.js


$ curl http://localhost:8080 # <p>hello there</p>
```




# tips

```js
// instead of:
response.write("hello");
response.end();

// you can do:
response.end("Hello");

```



# Node.js PART 2

### node can listen to events in the html DOM

- like 'click', 'submit', 'hover'...


# Many objects in Node also emit events!

- they inherit from `EventEmitter` constructor
- `net.Server` class inherits from `EventEmitter`, and emits `request` event
- `fs.readStream` inherits from `EventEmitter`, and emits `data` event




```js
// Custom event emitters
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter(); // we want it to emit events like: 'error', 'warn', 'info'

// we want to build event listeners, for those events
logger.on('error', function(message){
  console.log('ERR: ' + message);
});

// to call that event, (event emitters) :
logger.emit('error', 'Spilled Milk'); // any aditional parameters here will be passed to the listeners
logger.emit('error', 'Eggs Cracked');  // 'Err: Eggs Cracked'
```





# how does the request generate a event?

```js
http.createServer(function(request, response){ ... })

// the above code and below are the same!
var server = http.createServer();
server.on('request', function(request, response){ ... });

//...

server.on('close', function(){ ... });
```




# example of chat

```js
var http = require('http');
var EventEmitter = require('events').EventEmitter;

var chat = new EventEmitter();
var users = [], chatlog = [];

chat.on('message', function(message) {
  chatlog.push(message);
  //console.log('\n\n' +  chatlog + '\n\n');
});

chat.on('join', function(nickname) {
  users.push(nickname);
  //console.log('\n\n' +  users + '\n\n');
});

// Emit events here
chat.emit('message', "hello there");
chat.emit('join', "welcome");



http.createServer(function(request, response) {
  response.writeHead(200);
  response.end();

}).listen(8080);

```





# listening for an event multiple times

```js
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  response.writeHead(200);
  response.write("Hello, this is dog");
  response.end();
});

server.on('request', function(request, response) {
  console.log("New request coming in...");
});

server.on('close', function(){
  console.log("Closing down the server...");
});



server.listen(8080);

```









# Node.js PART 3  (streams)


- access data piece by piece, chunck by chunk...
- you can start manipulation that data as soon as it arrieves in the server
- streams are like channels, where data can flow through
- there are different type of streams
  - readable streams
  - writeable streams
  - readable and writeable streams
  - ...
- look at the streams2 API (Node version v0.10.x)

- the `request` object is a readable stream
- and the `response` object is a writeable stream
- we (the server) write data to the `response`




# how to read from the (browser) request?

- the `request` object is a readable stream
  - it inherits from `EventEmitter`
  - it can emit the events:
    - the `readable` event, that is fired when the data is ready to be consumed, read...
    - the `end` event, when the client is done sending all the data


# lets print what we receive from the request

```js

var http = require('http');

http.createServer(function(request, response){  // request event
  response.writeHead(200);



  //------------------------------------------------------------
  request.on('readable', function(){
  	var chunk = null;
  	while(null !== (chunk = request.read())){
      console.log(chunk.toString());
      // we have to call the .toString() because the chunks are BUFFERS (it could be binary data)
  	}
  });

  request.on('end', function(){
    response.end();
  });
  //------ the above code can be substituted by the below ------
  //request.pipe(response);

  // // so when you send data with it will show it to the client:
  // // $  curl -d 'hello' http://localhost:8080
  // // the client will see 'hello', but on the node server terminal... (what?, why?)
  //------------------------------------------------------------





}).listen(8080);


```



# reading and writting a file (using streams)
```js
var fs = require('fs');
var file = fs.createReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy.md");

file.pipe(newFile); // copy the contents of `file` to the `newFile`

// we can pipe any read stream into any write stream
```






# uploading a file (using streams)

```js
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
  var newFile = fs.createWriteStream("readme_copy.md"); // we will write to that file
  request.pipe(newFile);

  request.on('end', function(){
  	response.end('uploaded!');
  });
}).listen(8080);


// $ curl --upload-file readme.md http://localhost:8080  # 'uploaded!'
// it created the new file 'readme_copy.md' with the contents of the old file!!!
```








# file upload showing the progress in percentage

- you need the `HTTP Server` and `File System` modules (that we were using before)

```js
// $ curl --upload-file brian_the_vine.jpg http://localhost:8080 # it could be a html form in the browser...



var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
  var newFile = fs.createWriteStream("readme_copy.md"); // we will write to that file

  // get size of file
  var fileBytes = request.headers['content-length'];

  // keep track of how many bytes were uploaded to the server
  var uploadedBytes = 0;


  // keep track of file upload in percentage!
  request.on('readable', function(){
  	var chunk = null;
  	while(null !== (chunk = request.read())){
  	  uploadedBytes += chunk.length;
  	  var progress = (uploadedBytes / fileBytes) * 100;
  	  response.write("progress: " + parseInt(progress, 10) + "%\n");
  	  // parseInt("number", 10) // 10 is decimal representation, it also rounds it!
  	}
  });







  request.pipe(newFile); // taking care of the actual upload

  request.on('end', function(){
  	response.end('uploaded!\n');
  });
}).listen(8080);

```



















# Node.js PART 4  (module)


### examples:

```js
var http = require('http');

var fs = require('fs');

```


### create a custom module


```js
// custom_hello.js (module)

var hello = function(){
  console.log("hello!");
};

module.exports = hello; // make module's function public! so others can use it


// this way, the module will only have a single public function `hello`
```

```js
// app.js

var hello = require('./custom_hello'); // how to require your custom module!

hello(); // calling the module's public method!
```


### another custom module (another way to write modules)

```js
// custom_goodbye.js (module)

exports.goodbye = function(){
  console.log("bye!");
};


// this way you can have multiple public functions on this module!
```

```js
// app.js

var gb = require('./custom_goodbye'); // how to require your custom module!

gb.goodbye(); // calling the module's public method!

// or in one line:
// require('./custom_goodbye').goodbye();
```




### module with multiple public methods

```js
// my_module.js

var foo = function(){ ... };
var bar = function(){ ... };
var baz = function(){ ... }; // its the module's private function

exports.foo = foo
exports.bar = bar
```

```js
// app.js

var myMod = require('./my_module');
myMod.foo();
myMod.bar();

```



# making http requests

```js
// make_request.js

var http = require('http');

var makeRequest = function(message){
      //var message = "hello world";
      var options = {
        host: 'localhost', port: 8080, path: '/', method: 'POST'
      };

      var request = http.request(options, function(response){
        response.on('data', function(){
          console.log(data); // log response body
        });
      });

      request.write()message; // begins the request above!
      request.end();
};

makeRequest("hello world encapsulated!");

// now allow this function to be available as the module's public function
module.exports = makeRequest;
```

```js
// app.js

var makeRequest = require('./make_request');

makeRequest("hello there again!");
makeRequest("who are you?");

```



# how does Node look for the modules?
  - same directory as the application for a file with that name
  - node will look in `<my_app_folder>/node_modules/make_request.js` directory
  - node will look in `~/brianspinos777/node_modules/make_request.js` directory
  - node will look in `~/node_modules/make_request.js` directory
  - node will look in `/node_modules/make_request.js` directory (root path)

```js


```


# MORE STUFF HERE...
# MORE STUFF HERE...
# MORE STUFF HERE...
# MORE STUFF HERE...
# MORE STUFF HERE...
# MORE STUFF HERE...








# Node.js PART 5 (express)


- first require the library

```js
// /app.js


// you need to install it first:
//    $ npm install --save express # it will add a files/folders to the current directory (it adds it to the dependencies file)

var express = require('express');
var app = express();  // create express server!

// now we can define endpoints!

app.get('/', function(request, response){
  response.sendFile(__dirname + "/index.html");
});

app.listen(8080);

// $ curl http://localhost:8080/ # a get request to the '/' root!
//    200 ok
```


```html
<!-- /index.html -->
<p>hello world</p>
```

### Express routes


```js
var require = require('request');
var url = require('url');
var express = require('express');
var app = express(); // create express server!

app.get('/tweets/:username', function(req, response){
  var username = req.params.username; // get the `:username` from the url

  options = {
    protocol: "http:",
    host: "api.twitter.com",
    pathname: '/1/statuses/user_timeline.json',
    query: { screen_name: username, count: 10}
  }

  var twitterUrl = url.format(options); // url.format(); is from the 'url library'
  //request(twitterUrl).pipe(response);

  request(twitterUrl, function(err, res, body){ // request(); is from the 'request library'
    // `res` is different from  `response` 
    var tweets = JSON.parse(body);
    response.locals = {tweets: tweets, name: username};
    response.render('tweets.ejs');
  });
});

app.listen(8080);

```


```js
// /tweets.ejs

<h1>Tweets for @<%= name %></h1>
<ul>
  <% tweets.forEach(function(tweet){ %>
    <li><%= tweet.text %></li>
  <%  }); %>
</ul>
```





# Node.js PART 6 (socket.io)

### lets build a chat application in the browser!

- using a duplexed websocket connection!
- Socket.io abstracts websockets with fallbacks

```bash
// install socket.io

$ npm install --save socket.io
```

```js
// app.js (the server)

var express = require('express');
var app = express();
var server = require('http').createServer(app); // create http server and have it dispatch requests to express
var io = require('socket.io')(server); // allow it to use the http server to listen for requests

// now socket.io and express are using the same http server

io.on('connection', function(client){
    console.log('Client connected...');
    client.emit('messages', {hello: 'world'}); // emitting the messages event on our client, the browser, and send the object {hello: 'world'}

    client.on('message', function(data){ // send 'messages' from client, the browser, back to the server
        //console.log(data);
        client.broadcast.emit("messages", data); // broadcast to all other clients connected
    });

    client.on('join', function(name){
        client.nickname = name; // set the nickname associated to the client, now the variable is available both on the server and on the client!
    });


    client.on('messages', function(data){
        var nickname = client.nickname;
        client.broadcast.emit("message", nickname + ": " + message);
        client.emit("messages", nickname + ": " + message);
    });
    

});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
```


```html
<!-- /index.html (the client)-->

<!-- src="/socket.io/socket.io.js" - Express knows to serve the socket.io client js for this path. -->
<script type="text/javascript" src="/socket.io/socket.io.js"></script>

<script type="text/javascript">
    var socket = io.connect('http://localhost:8080');
    socket.on('messages', function(data){  // listening to the 'messages' event...
        alert(data.hello);  // data = {hello: 'world'}
        // right here -> insert the message in the page with jQuery some how!
    });

    $('#chart_form').submit(function(e){
        var message = $('#chat_input').val();

        // emit the 'messages' event
        socket.emit('messages', message);
    });

    var server = io.connect('http://localhost:8080');
    server.on('connect', function(data){
        $('#status').html('Connected to chattr!');
        nickname = prompt("What is your nickname?");
        server.emit('join', nickname); // send that nickname variable to the server!
    });
</script>

```

```bash
# start the server

$ node app.js

# go to http://localhost:8080 # in browser 1
# go to http://localhost:8080 # in browser 2
```








# Node.js PART 7 (persisting data)


# THIS PART STILL NEEDS MORE STUFF TO BE ADDED


### you can use several databases, but we will be using REDIS

- download the node redis library

```bash
$ npm install redis --save

```


```js
var redis = require('redis');
var redisClient = redis.createClient(); // `redisClient` NOT TO BE CONFUSED WITH `client`


// REDIS SET
redisClient.set("message1", "hello, yes this is dog"); // key, value
redisClient.set("message2", "hello, no this is spider"); // key, value

// REDIS GET
redisClient.get("message1", function(err, reply){
  console.log(reply); // "hello, yes this is dog"
});

// REDIS LIST LPUSH
var message = "hello, this is dog";
redisClient.lpush("messages", message, function(err, reply){
  // the callback is optional
  // console.log(reply); // "1" -> the length of the list
  redisClient.ltrim("messages", 0, 1); // keeps first two strings and removes the rest
});

// REDIS LRANGE
redisClient.lrange("messages", 0, -1, function(err, messages){
  console.log(messages); // replies with all strings in list
});


// REDIS SET SADD
redisClient.sadd("names", "Dog");
redisClient.sadd("names", "Spider");
redisClient.sadd("names", "Gregg");

// REDIS SET SREM
redisClient.srem("names", "Dog");
redisClient.srem("names", "Spider");
redisClient.srem("names", "Gregg");

// REDIS SET SMEMBERS
redisClient.smembers("names", function(err, names){
  console.log(names); // show members of the set
});
```
















# Node.js (GOTCHAS)

### specify port number
```bash
PORT=9090 node server.js

# node runs the only .js file ???
PORT=9090 node .

```


























