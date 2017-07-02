const express = require('express'),
      bodyParser = require('body-parser'),
      engines = require('consolidate'),
      MongoClient = require('mongodb').MongoClient

app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}))

function errorHandler(err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).render('error', {error: err});
}

const connectToMongo = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/challenge1', (err, db) => {
      resolve(db);
      reject(err);
    })
  })
}

connectToMongo()
.then(
  function fulfilled(db) {
    console.log('Successfully connected to MongoDB.');
    app.get('/', (req, res) => {
      db.collection('movies').find({}).toArray((err, docs) => {
        res.render('movies', {'movies': docs})
      })
    });

    app.post('/add_movies', (req, res, next) => {
      const title = req.body.title;
      const year = req.body.year;
      const imdb = req.body.imdb;

      if ((title == '') || (year == '') || (imdb == '')) {
        next('Please provide an entry for all fields.');
      } else {
        db.collection('movies').insertOne({"title": title, "year": year, "imdb": imdb},
        (err, r) => {
          if (err) {console.error(err)};
          console.log("Document inserted with _id: " + r.insertedId);
          res.redirect('/');
        });
      }
    });

    app.use(errorHandler);

    const server = app.listen(3000, () => {
      const port = server.address().port;
      console.log('Express server listening on port %s...', port);
    })
  }, 
  function rejected(err) {
    console.error(err);
  }
)
