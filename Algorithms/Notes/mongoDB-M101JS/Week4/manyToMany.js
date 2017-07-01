/**
 * Many to Many Relationship

 Example:
 Books : Authors
 Each book could have more than one author, each author could have more than one book

 Students : Teachers

 Most however are: 
 Few : Few

 Books/Authors
 Authors: {
   _id: 27,
   author_name: 'Margaret',
   books: [12, 7, 8]
 }

 Students/Teachers
 
 Students: {
   // ...
   teachers: [...]
 }

 Teachers: {
   // ...
   students: [...]
 }




*/