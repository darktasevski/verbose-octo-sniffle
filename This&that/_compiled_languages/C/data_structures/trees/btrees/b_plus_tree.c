/** 
 * 
 * Gotchas:
 *    - A pointer is not like the 'C pointer', it is just a number to be used as a file offset.
 *    - The leaf-nodes do not store the record data, just a pointer to it. (a file offset)
 *    - BLOCK is a chunk of data retrieved from DISK
 *    - PAGE is a chunck of data retrieved from DISK, then added to memory
 * 
 *  memory types:
 *    - 1. RAM, primary memory, main memory, internal memory, temporary storage... (all the same)
 *    - 2. DISK, secondary memory, external memory, permanent storage...  (all the same)
 * 
 * 
 * 
 * http://www.cburch.com/cs/340/reading/btree/
 * 
 * http://technicalpostsbyarifkhan.blogspot.com/2014/01/b-tree-data-structure-explained.html
 * 
 * http://goneill.co.nz/btree-demo.php (demo)
 * http://goneill.co.nz/btree.php
 * 
 * http://comet.lehman.cuny.edu/jung/cmp420758/chapter18.pdf
 *
 * this type of tree is NOT fully loaded into memory,
 * instead each node if fetched from a file 
 * (and since fetching data from a file is slow, we should fetch as less as possible)
 * these fetches are called 'BLOCKS' and your OS as a speicif 'BLOCK SIZE' that varies from 4K, 8K, and more???
 * 
 * data retrieved from DISK (external memory) is refered as 'BLOCK'
 * A piece of data that is stored to disk (and read into memory) as a unit is called a 'PAGE'
 * 
 * It is typical for a B-tree to store the number of records in a single node that make the 
 * node size equal to the natural page size of the file-system. In this way, the disk acceses can be optimized.
 * 
 * 
 * internal-nodes  keep only int pointers and leaf-nodes to store data.
 * 
 * the pointers are ints that refer to a offset in the database file
 * 
 * the are 3 types of nodes: root, internal-nodes and leaf-nodes
 * the leaf nodes should also be a doublely linked list, for range queries
 * 
 * usually the b+ tree node has 100 to 1000 child nodes,
 * the height of the tree should be from 3 to 5 ?
 * 
 * leaf-nodes have int pointers (file offset) to find the record
 * the leaf nodes also have another int pointer to find the record within the PAGE ???
 * 
 * the internal-nodes store only keys, and an int pointer (file offset) to the child nodes ???
 * 
 * 
 * 
 * 
B-tree of order 5 OR m=5

max children = 5

min children = ceil(m/2) = 3
B-tree of degree 5 OR t=5

max keys = 2t-1

min keys = t-1


 * 
 * to access fields in a database row, use offsets, since you need to declare each field type, 
 * which gives you the size of each field!
 * 
 * b+ trees do not store row data in the leaf-nodes, they store int pointers to the BLOCK and record offset 
 * (to find the row in the Database file)
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * /


