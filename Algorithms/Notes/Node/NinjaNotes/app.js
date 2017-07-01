var express = require('express');
var bodyParser = require('body-parser');

// Firing framework as server
var app = express();

// Parses POST data, refer to NPM body-parser
// https://www.npmjs.com/package/body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Tell express that we will use EJS as our view engine
// It will look in the '/views' folder
app.set('view engine', 'ejs');
// Middleware to serve static files
app.use('/assets', express.static('assets'))

// Works as HTTP request methods
// GET => app.get('route', callbackFunc(){})
// POST => app.post()
// app.get('/', function(req, res) {
//   // sendFile() method allows being able to send a file
//   res.sendFile(__dirname + '/index.html')
// });

// app.get('/contact', function(req, res) {
//   res.send('this is the contact page')
// });

/**
 **** EJS
*/

// Route variables/parameters (:id) accessed via req object (req.params)
app.get('/variable/:name', function(req, res) {
  res.send('You requested to see a profile with the id of ' + req.params.name);
});

// res.render() -> looks in `/views` folder
// Passed in property name of object ('person' in this case)
app.get('/profile/:name', function(req, res) {
  var data = {age: 29, job: 'Ninja', hobbies: ['eating', 'fighting', 'fishing']}
  res.render('profile', {person: req.params.name, data: data});
})

app.get('/contact', function(req, res) {
  // Request object also passes in queries, as an object
  res.render('contact', {qs: req.query});
})

// POST REQUEST handling using 'body-parser'
app.post('/contact', urlencodedParser, function(req, res) {
  // POST request middleware
  console.log(req.body);
  res.render('contact-success', {data: req.body});
})

app.get('/', function(req, res) {
  res.render('index');
})


app.listen(3000);

