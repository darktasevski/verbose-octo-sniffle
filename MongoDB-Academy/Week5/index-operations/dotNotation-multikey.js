/**
 * Dot Notation and Multikey indexes
**/

// Indexing on arrays
/*
Consider the following document:

{ 'student_id': 0,
  'scores': [
    {
      'type': 'quiz',
      'score': 80
    },
    {
      'type': 'homework',
      'score': 80
    },
    {
      'type': 'homework',
      'score': 80
    },
    {
      'type': 'test',
      'score': 80
    }
  ]
}
*/

// Creating an index on the score key:
db.students.createIndex({'scores.score': 1});

// It is possible to search for a record where the 'score' is above a certain value:
db.students.find({'scores.score': {'$gt': 99}});

// What about a query with an 'exam' score above '99'
// Use '$elemMatch' to match SUB-documents
db.students.find({'scores': {$eleMatch: {type: 'exam', score: {'$gt': 99.8}}}})