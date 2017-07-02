// Find indexes
db.students.getIndexes();

// Delete index
db.students.dropIndex({student_id: 1});