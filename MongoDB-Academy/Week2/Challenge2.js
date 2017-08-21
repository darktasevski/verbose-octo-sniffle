// Write an update command that will remove the "tomato.consensus" field for all documents matching the following criteria:
// --> The number of imdb votes is less than 10,000
// --> The year for the movie is between 2010 and 2013 inclusive
// --> The tomato.consensus field is null

db.movieDetails.updateMany({ year: {$gte: 2010, $lte: 2013}, 
                              "imdb.votes": {$lt: 10000},
                              $and: [{"tomato.consensus": {$exists: true} },
                                    {"tomato.consensus": null} ] },
                           { $unset: { "tomato.consensus": "" } });