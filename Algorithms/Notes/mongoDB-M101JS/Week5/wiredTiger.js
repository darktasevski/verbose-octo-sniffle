/**
 * Wired Tiger
**/

/*
Default storage engine in 3.2

1. Document-level concurrency:
- Assumes two writes are not in the same document

2. Compression - data and indexes

Example: 100GB file on disk
- File brought in pages
- WT decides which to keep in memory and what it decides to send back to disk
- This allows compression

3. Append-only engine
- No in place updates
- Updated documents are marked as no longer used
- Allocate new space and write document there
- Reclaim old space


*/