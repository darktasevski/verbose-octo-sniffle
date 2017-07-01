// red black tree

/**
 * 1. nodes need to be either red or black
 * 2. nil nodes are black 
 * 3. a red node should have only black children
 * 4. every path from a node should have the same number of black nodes
 * 5. root is black
 */
 
 /*
 insertion: 
    case 1: uncle is red
        - change color of P U G
        - check for violations (G could be red and cause other violations)
    
    case 2: uncle is black, new node is inside
        - rotate P (turn into case 3)
    
    case 3: uncle is black, new node is outside
        - rotate G, change color of P G
 
 */
