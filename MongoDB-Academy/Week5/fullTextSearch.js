/**
 * Full Test Search Index
**/

// Search a full document with a long string (ex. preamble)
db.sentences.createIndex({'words': 'text'})

// Essentially creates an array-like index (in the background) for each word in a text and applies a '$or' operator

// Project a score field that is attached to text searches, ranks based on best match
db.sentences.find({$text: {$search: 'dog tree obsidian'}}, {score: {$meta: 'textScore'}});