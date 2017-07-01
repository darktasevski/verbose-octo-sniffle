// Adding an index
db.students.createIndex({student_id: 1})

// More verbose commands, add 'explain()'
db.students.explain().createIndex({student_id: 1})

// Compound index
// '1' -- ascending, '2' -- descending
db.students.createIndex({student_id: 1, class_id: -1})