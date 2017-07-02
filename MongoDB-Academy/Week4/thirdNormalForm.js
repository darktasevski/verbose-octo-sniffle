/*  Relation Database Normalization

Normalization:
- Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key.
- Reduction and elimination of redundant data

- Example: A post in a blog, each post will have an author e-mail but if you needed to update the e-mail address of 'Andrew', you should only have to do it once

Examples of un-normalized databases:
(https://en.wikipedia.org/wiki/Database_normalization)

1. Update anomaly:
    If the same information can be expressed in multiple rows (like our example above):
    Eg:
    Post-ID         Author            Email  
    ------          -----             -----               1               Andrew          andrew@email.com
    2               Andrew          ad@gmail.com <--- ???

    An update to the email address should occur to all post IDs, but an update anomaly causes inconsistency in the database.

2. Insertion anomaly:
    If the database table will not allow a certain fact to be recorded at all, an insertion anomaly occurs. This happens when a table (relation) is modeled around a certain element (eg. skill), and the new data that is required to be entered does not have the skill. In this case, the data cannot be entered unless the skill is set to null.

3. Deletion anomaly:
    If the deletion of some data requires the deletion of completely unrelated data, a deletion anomaly occurs. Each data set must stand on its own and not affect other data sets.

First normal form (1NF)
-----------------------
A property of a relation in a relational database. 
- Three criteria:
  1. Eliminate repeating groups in individual tables
  2. Create a separate table for each set of related data
  3. Indentify each set of related data with a primary key

  All row and column intersections must contain exactly one value. There are no duplicate rows. There is no implicit (or explicit) ordering to the rows or columns. Each data set stands on its own and cannot be decomposed into smaller pieces (atomic).

Second normal form (2NF)
------------------------
A property of a relational database that expands on first normal form.
- Two criteria:
  1. Must be in first normal form (see above)
  2. No partial dependencies

A parial dependency is when an attribute of a table requires (dependent) on only part of the primary key. In order to comply with second normal form, all attributes must comply with the whole of the primary key.

Third normal form (3NF)
-----------------------
A property of a relational database that expands on second normal form.
- Two criteria:
  1. Must be in second normal form.
  2. All attributes of a table must ONLY depend on every key of the table, and NOT through transitive linking

Example of non-transitive linking:
X -> Z
  Here X is only linked to Z, and nothing but Z.

Example of transitive linking:
X -> Y and Y -> Z (or: X -> Y -> Z)
  Here X is linked to Z only through the link from Y to Z.
*/