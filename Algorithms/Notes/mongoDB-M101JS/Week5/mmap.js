/*
 * MMAP v1
 * (Memory Mapped Files)
*/

/*
Example:
100GB file on disk needs to be stored into DB.

MongoDB calls mmap() system call
- Must be on 64-bit computer 
  - (a 32-bit address space limits to 4GB of virtual memory)

- Puts the 100 GB file into virtual memory

Offers:
1. Collection level locking:
- Each collection is its own file. That means only one 'write' can occur at once. (Multi-read, single write lock)

2. In place updates:
- Try to update right in place. If can't, mark it as a hole and move it to somewhere that has more space.

3. Power of 2 Size Allocation:
- Create 3 byte document, get 4 bytes. You create a 7 byte document, you get 8 bytes, etc...
- Minimum record space in MongoDB is 32 bytes.
*/