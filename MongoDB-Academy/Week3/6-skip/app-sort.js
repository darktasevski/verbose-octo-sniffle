var MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args'), 
    assert = require('assert');


var options = commandLineOptions();


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    
    var query = queryDocument(options);
    var projection = {"_id": 0, "name": 1, "founded_year": 1,
                      "number_of_employees": 1};

    var cursor = db.collection('companies').find(query);
    cursor.project(projection);

    // `.sort()` sorts in ascending order if 1, descending if -1
    // cursor.sort({founded_year: -1});

    // Uses array for multiple sorts, order is important. In this case 'founded_year' is sorted first, then within each year sort by number of employees
    cursor.sort([["founded_year", 1], ["number_of_employees", -1]]);
        
    var numMatches = 0;

    cursor.forEach(
        function(doc) {
            numMatches = numMatches + 1;
            console.log(doc.name + "\n\tfounded " + doc.founded_year +
                        "\n\t" + doc.number_of_employees + " employees"); 
        },
        function(err) {
            assert.equal(err, null);
            console.log("Our query was:" + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return db.close();
        }
    );

});


function queryDocument(options) {

    var query = {
        "founded_year": {
            "$gte": options.firstYear,
            "$lte": options.lastYear
        }
    };

    if ("employees" in options) {
        query.number_of_employees = { "$gte": options.employees };
    }
    
    return query;
    
}


function commandLineOptions() {

    var cli = commandLineArgs([
        { name: "firstYear", alias: "f", type: Number },
        { name: "lastYear", alias: "l", type: Number },
        { name: "employees", alias: "e", type: Number }
    ]);
    
    var options = cli.parse()
    if ( !(("firstYear" in options) && ("lastYear" in options))) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "The first two options below are required. The rest are optional."
        }));
        process.exit();
    }

    return options;
    
}


