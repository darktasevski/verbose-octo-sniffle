// Arrays with nested documents:
// Suppose you had this:

// "awards" : {
//     "oscars" : [
//         {"award": "bestAnimatedFeature", "result": "won"},
//         {"award": "bestMusic", "result": "won"},
//         {"award": "bestPicture", "result": "nominated"},
//         {"award": "bestSoundEditing", "result": "nominated"},
//         {"award": "bestScreenplay", "result": "nominated"}
//     ],
//     "wins" : 56,
//     "nominations" : 86,
//     "text" : "Won 2 Oscars. Another 56 wins and 86 nominations."
// }

// What query would you use to return all movies in collection that either won or were nominated for Oscar best picture?
db.movieDetails.find({ 'awards.oscars.award': 'bestPicture' })
