# Express.js PART 1 

```bash
$ npm install express
$ npm install -g express-generator # so you can generate your app!!! with `$ express myapp`
  $ express myapp --hogan -c less  # for mustache and less
  $ cd myapp
  $ npm install # for dependencies
  $ npm start # to start the app # it will start in port 3000






# or a specific version:
$ npm install express@4.9

# or a more specific version:
$ npm install express@3.15.2
```




### hello world

```js
// /app.js

var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.send('Hello World');
});

app.listen(3000);
```

### other `app` functions

```js
app.post(...)
app.put(...)
app.patch(...)
app.delete(...)

```

### `app.listen` also excepts a optional call back

```js
//...
app.listen(3000, function(){
  console.log('Listening on port 3000');
});

```

```bash
$ node app.js #=> Listening on port 3000


$ curl http://localhost:3000/ #=> Hello world
```


### you can use node functions in express:


```js
// /app.js

var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.write('Hello World'); // .write()
  response.end();  // .end()
});

app.listen(3000);
```



### responding with JSON

- the `send` function converts `Objects` and `Arrays` to `JSON`

```js
// /app.js

// ...

app.get('/blocks', function(request, response){
  var blocks = ['Fixed', 'Movable', 'Rotationg'];
  response.send(blocks); // `.send` will convert the Array to JSON! and set the proper response headers automatically! 

  // response.json(blocks); // works the same way as the above!
});

// ...

```


```bash
$ curl -i http://localhost:3000/blocks # -i option is to show HEADERS

#=> HTTP/1.1 200 OK
#=> X-Powered-By: Express
#=> Content-Type: application/json; charset=utf-8

#=> ["Fixed", "Movable", "Rotationg"]  # its in JSON format!!!


```



### responding with HTML

```js
// /app.js

// ...

app.get('/blocks', function(request, response){
  var blocks = '<p>hello</p>';
  response.send(blocks); // it will set the response headers to 'tex/html'

  
});

// ...

```



### redirecting

```js
// /app.js

// ...

app.get('/blocks', function(request, response){
  response.redirect('/parts'); // 302 status code 'moved temporarily'
  response.redirect(301, '/parts'); // change status code to 301 'moved permanently'
});

// ...

```





# Express.js PART 2 (how MIDDLEWARE works)


- Express is great for building APIs
- place HTML files unde the /public folder



### serving HTML files


```js
// /app.js

var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.sendFile(__dirname + '/public/index.html');
  
});

app.listen(3000);
```


```html
<!-- /public/index.html -->
<p>hello there</p>

```



### using a middleware

```js
// /app.js

// ...
app.use(express.static('public')); // servers the /public/index.html file
// ...

```




### what is `Middleware` ?

- they are functions added to the `stack`, executed sequentially that have access to the `request` and `response` objects 

- in them, we can do validation, authentication, data parsing, etc...

- they happend after the `request` and  before reaching the `routes` 

- an Express application is ecentialy a stack of middleware, runing one after another



### using middleware in Express

```js
// /app.js

// ...

app.use(function(request, response, next){
  // ...
  next(); // you need to call this so it can proceed to the next middleware...
});

// ...

```

### Gotcha - Dont use `next();` after `response.send('foo');`
```js
// /app.js
// ...
app.use(function(request, response){
  response.send('done!');  // this will stop triggering all the next widdlewares... BAD!
  next(); // <------- this would not work because of the above line
});
// ...

```


### serving static assets

- the static middleware serves EVERYTHING!!! under the specific folder

```js
// /app.js
// ...
app.use(express.static('public'););

// ...

```



### loading data using AJAX


```html
<!-- /public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Building Blocks</title>
</head>
<body>
 <h1>Blocks</h1>
 <ul class='block-list'></ul>
 <script src="jquery.js"></script>
 <script src="client.js"></script>
</body>
</html>
```

```js
// /public/client.js

$(function(){
  $.get('/blocks', appendToList);

  function appendToList(blocks) {
    var list = [];
    for(var i in blocks){
      list.push($('<li>', { text: blocks[i] }));
    }
    $('.block-list').append(list);
  }
});

```


```js
// /app.js

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];
  response.json(blocks);
});

app.listen(3000);

```

























































