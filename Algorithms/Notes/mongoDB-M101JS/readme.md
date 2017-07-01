# MongoDB Class notes

## Week 1:

### Mongo Shell

* First start the mongo shell using mongo command at command prompt

* `help` shows a list of commands

* `show dbs` - see the list of existing dbs

* `use [dbname]` - will create a new db, if the db doesnt already exist

Eg: `use videos`
Creates a db named videos.

* `use companies`
  `db.dropDatabase()` will delete the companies database

* `db.movies.insertOne(JSON obj)` - creates a collection named movies inside a db and inserts a document

* `db.movies.drop` - delete documents

* `db.movies.find()` - lists the documents inside movies

* `db.movies.find().pretty()` - proper visualisation for `find()`

* `db.movies.find({})` - same as `find()`

* `db.movies.find({key: value})` - returns a cursor object with matching key:value pair in the movies collection

Eg: `db.movies.find({"year":1981})`

* Cursor operations:

```javascript
var c = db.movies.find({"year":1981})
c.hasNext() //returns true there is a  next entry yet to be visited.
c.next() //shows the next object - 1 at a time
```

* Documents in MongoDB do not need to have same set of fields.

### Node Driver

* NodeJS driver is a driver written in JS, used to communicate between the server and mongodb - managing connections, handle requests and errors.

* NodeJS driver for mongods is mongodb module. Do `npm install mongodb` or include it in package.json.

* In NodeJS, db related functions such as connect, find, etc are asynchronous. 

* Normally for find() operations, toArray() is used to convert the cursor object to array object so that array methods can be used.

### Express

* Used for handling http requests and routes. 

* Use templating engines for dynamically loading web pages instead of static strings.

* `consolidate` module provides wrappers for templates. 

* While using `consolidate`, certain app settings need to be done - provide name of the template engine, associate it with html type, provide location of views folder that contains the templates.

### GET Request with Express, Req Parameters and route names

* Colon in routes - used to store the route names

Eg: /:name - get the value after the colon and store it in a variable called name.
use `var name = req.params.name` - to access the name variable

* GET parameters - the parameters after `?` in routes

Eg: /:name?var1=value
`var param1 = req.query.var1`

### POST Request with Express

* POST request is handled by accessing the parameters in req.body.

* `express.bodyParser()` - middleware in express - used before `app.router` - bodyParser processing happens before the next route loads. It will parse the body of request and populates req.body so that the next route below the current route can use req.body. 

* `errorHandler()` has 4 args - err obj, req obj, res obj, next callback

* `next` is a function passed in by the Express with req and res objs to handle errors. 

* `next` is called with error obj, it Looks for `errorHandler()` middleware registered in the code and runs it.  

## Week 2: CRUD operations in mongo shell

### 1. Create 

* `db.movies.insertOne(object)` - inserts the object to movies collection. 

* `insertMany(objects)` - for multiple entries, prevents duplicate documents (those with same underscore id) by default and stops the insert operation after throwing `duplicate key error`.

* `insertMany(objects, {"ordered" : false})` - when duplicate documents are found, it skips them and completes the insert operation for the rest of the entries, instead of stopping once the error is encountered. 

### 2. Read

* `db.movies.find().pretty or db.movies.find({}).pretty() or db.movies.find(query document).pretty()` - dealt with in week 1. 

* `db.movies.find(query document)` the query document can have more than 1 key: value pairs and they are all anded implicitly to find the match. Dot notations for keys need to be enclosed in quotes.

* `db.movies.find(query document).count()` - returns the number of documents matching the query. 

#### Equality matches on arrays

* Exact match - enclose the value inside square bracket, it will look for the exact match in the same order as those inside the square brackets. 
Eg : `db.movies.find({writers: ["Ethan Coel"]})` - Returns the document in which the writers array should have only 1 element - Ethan Coel. 
`db.movies.find({writers: ["Ethan Coel", "John Coel"]})` - Returns the document in which the writers array should have only 2 elements - Ethan Coel and John Coel - in the same order. 

* Any element in the array matches the value - use normal scalar notation
Eg : `db.movies.find({writers: "Ethan Coel"})` - Returns the document in which the writers array contains one of its elements as - Ethan Coel. 

* An element of specific position - use dot notation
Eg : `db.movies.find({"writers.0": "Ethan Coel"})` - Returns the document in which the writers array should have only 1 element - Ethan Coel. 

#### Cursors

* Read operations return a cursor object. 

```javascript
var c = db.movies.find();
//function to iterate the results batch. 1 batch typically contains about 101 documents.
var doc = function() {
c.hasNext() ? c.next() : null;
};
doc();
c.objsLeftInBatch();
```

#### Projections

* Used to limit the fields that are returned on a query.

1. Including Fields: fieldname: 1 includes the fieldname
Eg : `db.movies.find({writers": "Ethan Coel"}, { title: 1 }).pretty()` - returns only the titles and `_id` matching the query
`db.movies.find({writers": "Ethan Coel"}, { title: 1, _id: 0 }).pretty()` - returns only the titles matching the query

2. Excluding fields: fieldname: 0 excludes the fieldname
Eg `db.movies.find({writers": "Ethan Coel"}, { title: 0, year: 0, screenplay: 0 }).pretty()`

#### Comparison Operators 

* Comparison operations such as greater, lesser, etc.

Examples:
`db.movies.find({runtime: {$gt:90}}).pretty()` 
`db.movies.find({runtime: {$gt:90 , $lt: 120}}).pretty()` 
`db.movies.find({runtime: {$gte:90}}).pretty()` 
`db.movies.find({rated: {$ne: "UNRATED"}}).prretty()` - ne - not equal to - returns even the documents not having the rated field.
`rated: {$in: ["P", "PG"]}` - matching range of values

* Can work with many fields, chain operators

#### Element Operators

* `$exists` - To check whether an element exists 
Eg: `db.movies.find({ "tomato.meter" : {$exists: true} })`

* `$type` - returns documents of the specified type
Eg: `db.movies.find({ "_id" : {$type : "string"} })`

#### Logical Operators

* Operations - AND, OR, NOT and NOR (opposite of OR)

Eg:
`db.movies.find({ $or: [ {"tomato.meter": {$gt:95} }, {"metacritic":{ $gt: 88 } } ] })`

* AND operation. 
Eg:
`db.movies.find({ $and: [ {"tomato.meter": {$gt:95} }, {"metacritic":{ $gt: 88 } } ] })` 
is same as :
`db.movies.find( {"tomato.meter": {$gt:95} }, {"metacritic":{ $gt: 88 } } )` 

* AND operation allows us to specify constraints for the same field. 

`db.movies.find({ $and: [ {"metacritic": {$ne:null} }, {"metacritic":{ $exists: true } } ] })` - this cannot be done using normal queries because duplicate fields in a json object are not allowed.

#### Regex Operators

Eg: `db.movies.find({"awards.text": { $regex: /^Won\s.*/} })`

#### Array Operators

* Work with array value fields.

Eg:
1. `$all` - All elements should match the elements in the query array. `db.movies.find({genres : { $all: ["Comedy", "Drama" , "Crime"]} })`
2. `$size` - Length of the array. `db.movies.find({genres : { $size: 1} })`
3. `$elemMatch` - Match a single element within an array field. `db.movies.find({boxoffice : { $elemMatch: {country: "UK", revenue: { $gt: 15}}} })`

### 3. Update

#### updateOne

* `updateOne({field1}, { updateOperator : {field2, field3 ...}})` - Finds the first document matching the field1 (the filter) and updates it with field2, field3, etc by applying the updateOperator.  

#### Field Update Operators

* Operate on fields inside documents. 

Eg - `db.movies.updateOne({title: "Martian"}, { $set : {review: "My review"}})`
`db.movies.updateOne({title: "Martian"}, { $inc : {"tomato.review": 3}})`

#### Updating Arrays

* Add 1 element to an array:
`$push: {fieldname: {arrayelement}}`

* Add many elements to an array - use modifiers. 
Eg:
```javascript
db.movies.updateOne({title: "Martian"}, {$push: {reviews:
                                                    {$each: [
                                                        {element1},
                                                        {element2},
                                                        ...
                                                    ],
                                                    $position: 0,
                                                    $slice: 5
                                                    }}})
```
* `$position` used with `$each` indicates where the element has to be pushed in the array.

* `$slice` modifier is used with `$each` to limit the size of the array. For keeping first 5, use 5; last five, use -5. 

#### updateMany

* Updates all documents matching the filter. 
Eg: `db.movies.updateMany( {rated: null}, { $unset: {rated: " "}})

#### Upserts:

* When no document is found matching the filter, insert a new document. 
* Use a third argument in updateOne as {upsert: true}

#### replaceOne

## Week 3: Node Driver

* Use  `mongoimport` to import from human readable json file. `mongorestore` dumps only bson data.
* In `MongoClient.connect` function, the connection url contains - host:portnumber/database 
* Default port is 27017. To connect to different port, use `mongod --port [portname]`
* To pass query, first store the query document in `query` object. 
* Similarly store the projection in another object. 

### Using cursors in node driver

* Result of find operation returns a cursor object. 
* Use the data only when required. In `var cursor = db.collection('companies').find(query)`, without callback in find, the statement only describes the query. In this case find creates a cursor object but doesnt perform the operation unless a request to any document is made (through cursor.forEach). Data is streamed through cursor only when asked for. Whereas using toArray with find returns all the documents in one go. 
* For including projection, chain a call to project on the cursor. This adds additional detail to the query. 
Eg: `cursor.project(projection)` or `find(query, projection)`
* In cursor.forEach method, there are 2 callbacks as arguments. In the 1st argument, the callback is called for each document returned by it. When cursor is exhausted with all documents in all the batches or when there's an error, the 2nd callback is executed.  
* In case of massive docs, using forEach with cursor, only batch of documents are returned at a time. Results in faster operation and reduced bandwidth consumption. 
* Stringifying the `_id` is different in mongo shell and node driver. In mongo shell, the `_id` is of type `ObjectId` whereas in node, its just a hex number. 

### `$regex` with Node 

* `"$options" : "1"` is used with `$regex` to indicate case insensitive regex expression. 

### Skip, limit, sort in Node driver

* MongoDB always executes curosr operations in this order- Sort, skip and limit - regardless of the order which we mention in the program. 

* These are cursor methods like `project`. It adds to the query representation, and is executed only when we pass args to the function (forEach).

* Sorting on single fields: 
`sort({fieldname: 1 or -1})` 1 - ascending order, -1 - descending order

* For sorting on multiple fields: Include the fields in an array
Eg: `cursor.sort([["founded_year", 1], ["number_of_employees", -1]]);` 
This sorts in the same order of fields as given: First, cmpanies are sorted by year in asc. order and within an individual year, the companies are sorted by employee number. 

* Skip: Tells how many search results to skip starting from first. Eg: `skip(30)` skips first 30 documents. Useful in displaying results page by page. 

* Limit: To limit the size of search result.

### CommandLineArgs module

* To pass command line arguments.

* Single letter labels start with `-` and string labels with `--`