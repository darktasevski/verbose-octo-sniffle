/**
 * Multikey indexes
 
 Schema that includes students and teachers
 
 Students collection:
 {
   _id: 0,
   name: 'Aos',
   teachers: [1, 7, 10, 23]
 }
 Teachers collection:
 {
   _id: 10,
   name: 'Mrs Williams'
 }

 Query: Find all teachers for a particular student
 1. Specify student, return the teachers
 2. Finding all the students with a certain teacher
  - Use multikey index
  db.students.ensureIndex({'teachers': 1})
  db.students.find({'teachers': {$all: [0, 1]}})



*/