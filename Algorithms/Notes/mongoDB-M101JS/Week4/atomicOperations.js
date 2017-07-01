/* Atomic Operations

When working on a single document, the work will be completed before the document is visible. The document will be seen with all or none of the changes.

Three different approaches:
1. Restructure code so that you are working within a single document.

2. Implement locking in software.

3. Tolerate a little bit of inconsistency.
*/