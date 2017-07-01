const MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {

  assert.equal(err, null);
  console.log('Successfully connected to MongoDB');

  const query = {'category_code': 'biotech'};

  // `1` to include a field, `0` to exclude a field
  // All fields are excluded as default except for `_id`
  const projection = {'name': 1, 'category_code': 1, '_id': 0};

  const cursor = db.collection('companies').find(query);
  // Call a specific projection on the cursor, to tell it what to show
  cursor.project(projection)

  cursor.forEach(
    (doc) => {
      console.log(`${doc.name} is a ${doc.category_code} company.`);
      console.log(doc);
    },
    (err) => {
      assert.equal(err, null);
      return db.close();
    }
  )
})