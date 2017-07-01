/**
 * One to Many relationships
 
 City: Person (many people)
 Many entities that map to one entity
 
 Use true linking -- 2 collections
 People collection:
 {
   name: 'Aos',
   city: 'NYC'
 }
 City collection:
 {
   _id: 'NYC'
 }

 Link people.city -> city

 // One to Few -- 1 collection
 // Blog post:comments

 Post collection {
   name of post:
   comments: [
     ...
   ]
 }
 
*/