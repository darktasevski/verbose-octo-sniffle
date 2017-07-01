const MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {
  
  assert.equal(err, null);
  console.log('Successfully connected to MongoDB');

  let query = {'category_code': 'biotech'};

  // Find returns a cursor, which can be assigned
  // `find()` does not make a request to the server until we try to use some of the documents
  const cursor = db.collection('companies').find(query);

  // cursor objects have their own `forEach` method
  // Expects first argument -> doc, second argument -> what to do when cursor is exhausted or error

  // This is a better way for dealing with massive databases
  cursor.forEach(
    (doc) => console.log(`${doc.name} is a ${doc.category_code} company.`),
    (err) => {
      assert.equal(err, null);
      return db.close();
    }
  )
})