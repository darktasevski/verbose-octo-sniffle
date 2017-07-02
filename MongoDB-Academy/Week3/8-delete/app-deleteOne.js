var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    
    // Do a query for all permalinks
    var query = {"permalink": {"$exists": true, "$ne": null}};
    var projection = {"permalink": 1, "updated_at": 1};

    var cursor = db.collection('companies').find(query);
    cursor.project(projection);
    cursor.sort({"permalink": 1})

    var numToRemove = 0;

    var previous = { "permalink": "", "updated_at": "" };
    cursor.forEach(
        function(doc) {

            if ( (doc.permalink == previous.permalink) && (doc.updated_at == previous.updated_at) ) {
                console.log(doc.permalink);

                numToRemove = numToRemove + 1;

                var filter = {"_id": doc._id};

                db.collection('companies').deleteOne(filter, function(err, res) {

                    assert.equal(err, null);
                    console.log(res.result);

                });

            }
            // Sets the first document in the duplicates as the previous, then if the next document is the SAME as the document being traversed, delete it
            previous = doc;
            
        },
        function(err) {

            assert.equal(err, null);

        }
    );

});


