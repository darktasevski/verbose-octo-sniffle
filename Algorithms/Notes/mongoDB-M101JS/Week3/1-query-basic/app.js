const MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {
  
  assert.equal(err, null);
  console.log('Successfully connected to MongoDB');

  let query = {'category_code': 'biotech'};

  db.collection('companies').find(query).toArray((err, docs) => {
    
    assert.equal(err, null);
    assert.notEqual(docs.length, 0);

    docs.forEach((doc) => {
      console.log(`${doc.name} is a ${doc.category_code} company.`);

    db.close();
    })
  })
})