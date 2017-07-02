/**
 * Indexes
**/

/*
Consider this document:
{name: 'Zoe', hair_color: 'Brown', DOB: '2001-03-23'}

If no indexes, scan whole document for name Zoe.

An index is an ordered set of things.

Imagine a simple index on the 'name'.
- 'Andrew' on the left, 'Zoe' on the right.
- Each index point has a pointer to the physical record.
- Fast to search, using binary search. 

Mongo is structured using a B+ tree.

Consider an index on 'name' and 'hair_color'.
Each index entry: (name, hair_color)
('Andrew', 'Blonde'), ('Andrew', 'Red')


Indexing is not free.
- Slows down writes
- Reads much faster

(If inserting large amount of data, do not create an index. Once all data is inserted, then you can create an index.)


*/