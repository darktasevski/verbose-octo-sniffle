// Multikey indexes

/**
Consider this collection:

{ name: 'Andrew',
  tags: ['photography', 'hiking', 'golf'],
  color: 'red',
  location: ['NY', 'CA']
}
**/

// Create an index on (tags), or (tags, color)
// Only one key can be an array

db.foo.insert({a: 1, b: [3, 4, 5]}); // legal

db.foo.insert({a: [1, 2, 3], b: 3}); // legal

db.foo.insert({a: [1, 2, 3], b: [3, 4, 5]}); 
// ILLEGAL