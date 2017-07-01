const MongoClient = require('mongodb').MongoClient,
      commandLineArgs = require('command-line-args'),
      getUsage = require('command-line-usage'),
      assert = require('assert');

let options = commandLineOptions();

MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {

  assert.equal(err, null);
  console.log('Successfully connected to MongoDB.');

  let query = queryDocument(options);
  let projection = {'_id': 0, 'name': 1, 'founded_year': 1,
                    'number_of_employees': 1, 'crunchbase_url': 1};

  let cursor = db.collection('companies').find(query, projection);
  let numMatches = 0;

  cursor.forEach(
    (docs) => {
      console.log(docs);
      numMatches++;
    },
    // Err function is called when cursor is consumed
    (err) => {
      assert.equal(err, null);
      console.log('Our query was:', JSON.stringify(query))
      console.log('Matching documents:', numMatches);
      return db.close();
    }
  );
})

function commandLineOptions() {
  const optionDefinitions = [
    {name: 'firstYear', alias: 'f', type: Number},
    {name: 'lastYear', alias: 'l', type: Number},
    {name: 'employees', alias: 'e', type: Number}
  ]
  const options = commandLineArgs(optionDefinitions);
  const sections = [
    {
      header: 'Usage',
      content: 'The first two options below are required. The rest are optional.'
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    }
  ]
  if ( !(('firstYear' in options) && ('lastYear' in options))) {
    console.log(getUsage(sections));
    process.exit();
  }
  return options;
}

function queryDocument(options) {
  console.log(options);
  let query = {
    'founded_year': {
      '$gte': options.firstYear,
      '$lte': options.lastYear
    }
  };
  if ('employees' in options) {
    query.number_of_employees = {'$gte': options.employees}
  }
  return query;
}