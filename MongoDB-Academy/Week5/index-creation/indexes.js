/**
 * Index Creation Option, Unique
**/

// Command
db.foo.createIndex({'thing': 1}, {unique: true});

// If collection has two items with the same value, cannot create a unique index

/**
 * Sparse Index
**/

// If creating a unique index, and some documents do not have a value... use a sparse index. Specify a sparse option, it will not include an index on documents which do not have that value
db.foo.createIndex({'thing': 1}, {unique:true, sparse: true})

/**
 * Foreground vs Background index creation
 
 // Foreground:
 - Fast
 - Blocks writers and readers in the database

 // Background:
 - Slow
 - Do not block writers and readers
 - Only one index at a time
**/

// Background index
db.students.createIndex({'scores.score': 1}, {background: true});