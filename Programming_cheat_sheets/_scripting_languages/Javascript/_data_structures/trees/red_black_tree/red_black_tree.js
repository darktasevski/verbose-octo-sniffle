/**
 * Red-Black-Tree Node
 */
function Node(key){
    this.color = null;
    this.left = null, 
    this.right = null, 
    this.parent = null;
    this.key = key;
}

/**
 * A working and tested red black tree!
 * http://www.codebytes.in/2014/10/red-black-tree-java-implementation.html
 */
function RedBlackTree(){
    
    //
    // private attributes
    //
    
    var RED = 0,
        BLACK = 1,
        nullNode = createNullNode(),
        root = nullNode;

    //
    // public
    //

    var self = this;

    //
    // public functions
    //

    self.printTree = printTree;
    self.findNode = findNode;
    self.insert = insert;
    self.fixTree = fixTree;
    self.rotateLeft = rotateLeft;
    self.rotateRight = rotateRight;
    self.deleteTree = deleteTree;
    self.transplant = transplant;
    self.remove = remove;
    self.deleteFixup = deleteFixup;
    self.treeMinimum = treeMinimum;
    self.getRoot = getRoot;
    self.print = print;

    //
    // private functions
    //

    function message(msg){
        console.log(msg);
    }

    function createNode(key){
        node = new Node(key);

        node.color = BLACK;
        node.left = nullNode, 
        node.right = nullNode, 
        node.parent = nullNode;
        node.key = key;

        return node;
    }

    function createNullNode(){
        node = new Node(null);

        node.color = BLACK;
        node.left = null, 
        node.right = null, 
        node.parent = -1;

        return node;
    }

    function getRoot(){
        return root;
    }

    function print(){
        self.printTree(self.getRoot());
    }

    function printTree(node) {
        if (node == nullNode) {
            return;
        }
        printTree(node.left);

        console.log(
            ((node.color == RED) ? "Color: Red " : "Color: Black " ) + 
            "Key: " + node.key + 
            " Parent: " + node.parent.key
        );
        
        printTree(node.right);
    }

    function findNode(nodeToFind, node) {
        if (root == nullNode) {
            return null;
        }

        if (nodeToFind.key < node.key) {
            if (node.left != nullNode) {
                return findNode(nodeToFind, node.left);
            }
        } else if (nodeToFind.key > node.key) {
            if (node.right != nullNode) {
                return findNode(nodeToFind, node.right);
            }
        } else if (nodeToFind.key == node.key) {
            return node;
        }
        return null;
    }
    
    /**
     * Insertion function.
     * If the root is null, set it.
     * visit each node, starting from the root, when you find a slot that is null, set it.
     * 
     */
    function insert(key) {
        message("------------------------- inserting " + key + "\n");
        node = createNode(key);
        temp = root;

        if (root == nullNode) {
            root = node;
            node.color = BLACK;
            node.parent = nullNode;
            message("Root is " + node.key);
        } else {
            node.color = RED;
            while (true) {
                message("currentNode: " + temp.key);

                if (node.key < temp.key) {
                    message( "    " + node.key + " < " + temp.key + " so, going left");
                    if (temp.left == nullNode) {
                        message("    found a spot in " + temp.key + "'s left");
                        temp.left = node;
                        node.parent = temp;
                        break;
                    } else {
                        temp = temp.left;
                    }
                } else if (node.key >= temp.key) {
                    message("    " +  node.key + " >= " + temp.key + " so, going right");
                    if (temp.right == nullNode) {
                        message("    found a spot in " + temp.key + "'s right");
                        temp.right = node;
                        node.parent = temp;
                        break;
                    } else {
                        temp = temp.right;
                    }
                }
            }
            fixTree(node);
        }
    }

    /**
     * Takes as argument the newly inserted node.
     * after the insertion, this function crawls up the ancestry, looking for violations.
     */
    function fixTree(node) {
        while (node.parent.color == RED) {
            uncle = nullNode;
            if (node.parent == node.parent.parent.left) {
                uncle = node.parent.parent.right;

                if (uncle != nullNode && uncle.color == RED) {
                    node.parent.color = BLACK;
                    uncle.color = BLACK;
                    node.parent.parent.color = RED;
                    node = node.parent.parent;
                    continue;
                } 
                if (node == node.parent.right) {
                    //Double rotation needed
                    node = node.parent;
                    rotateLeft(node);
                } 
                node.parent.color = BLACK;
                node.parent.parent.color = RED;
                //if the "else if" code hasn't executed, this
                //is a case where we only need a single rotation 
                rotateRight(node.parent.parent);
            } else {
                uncle = node.parent.parent.left;
                 if (uncle != nullNode && uncle.color == RED) {
                    node.parent.color = BLACK;
                    uncle.color = BLACK;
                    node.parent.parent.color = RED;
                    node = node.parent.parent;
                    continue;
                }
                if (node == node.parent.left) {
                    //Double rotation needed
                    node = node.parent;
                    rotateRight(node);
                }
                node.parent.color = BLACK;
                node.parent.parent.color = RED;
                //if the "else if" code hasn't executed, this
                //is a case where we only need a single rotation
                rotateLeft(node.parent.parent);
            }
        }
        root.color = BLACK;
    }
    
    /**
     * Performs a left rotation, on a node that is a root of a subtree.
     * returns the new root of the subtree.
     */
    function rotateLeft(node) {
        if (node.parent != nullNode) {
            if (node == node.parent.left) {
                node.parent.left = node.right;
            } else {
                node.parent.right = node.right;
            }
            node.right.parent = node.parent;
            node.parent = node.right;
            if (node.right.left != nullNode) {
                node.right.left.parent = node;
            }
            node.right = node.right.left;
            node.parent.left = node;
        } else {//Need to rotate root
            right = root.right;
            root.right = right.left;
            right.left.parent = root;
            root.parent = right;
            right.left = root;
            right.parent = nullNode;
            root = right;
        }
    }
    
    /**
     * Performs a right rotation, on a node that is a root of a subtree.
     * returns the new root of the subtree.
     */
    function rotateRight(node) {
        if (node.parent != nullNode) {
            if (node == node.parent.left) {
                node.parent.left = node.left;
            } else {
                node.parent.right = node.left;
            }

            node.left.parent = node.parent;
            node.parent = node.left;
            if (node.left.right != nullNode) {
                node.left.right.parent = node;
            }
            node.left = node.left.right;
            node.parent.right = node;
        } else {//Need to rotate root
            left = root.left;
            root.left = root.left.right;
            left.right.parent = root;
            root.parent = left;
            left.right = root;
            left.parent = nullNode;
            root = left;
        }
    }

    /**
     * Deletes whole tree
     */
    function deleteTree(){ 
        root = nullNode;
    }
    
    //Deletion Code .
    
    //This operation doesn't care about the new Node's connections
    //with previous node's left and right. The caller has to take care
    //of that.
    function transplant(target, node2){ 
          if(target.parent == nullNode){
              root = node2;
          }else if(target == target.parent.left){
              target.parent.left = node2;
          }else
              target.parent.right = node2;
          node2.parent = target.parent;
    }
    
    /**
     *
     *
     */
    function remove(key){
        z = new createNode(key)

        if((z = findNode(z, root))==null)return false;
        var x;
        var y = z; // temporary reference y
        var y_original_color = y.color;
        
        if(z.left == nullNode){
            x = z.right;  
            transplant(z, z.right);  
        }else if(z.right == nullNode){
            x = z.left;
            transplant(z, z.left); 
        }else{
            y = treeMinimum(z.right);
            y_original_color = y.color;
            x = y.right;
            if(y.parent == z)
                x.parent = y;
            else{
                transplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color; 
        }
        if(y_original_color==BLACK)
            deleteFixup(x);  
        return true;
    }
    
    /**
     * x -> node
     * w -> Uncle
     *
     */
    function deleteFixup(x){  
        while(x != root && x.color == BLACK){ 
            if(x == x.parent.left){ // if x is a left child
                w = x.parent.right;
                if(w.color == RED){  // if Uncle is RED
                    w.color = BLACK;
                    x.parent.color = RED;
                    rotateLeft(x.parent);
                    w = x.parent.right;
                }
                if(w.left.color == BLACK && w.right.color == BLACK){
                    w.color = RED;
                    x = x.parent;
                    continue;
                }
                else if(w.right.color == BLACK){
                    w.left.color = BLACK;
                    w.color = RED;
                    rotateRight(w);
                    w = x.parent.right;
                }
                if(w.right.color == RED){
                    w.color = x.parent.color;
                    x.parent.color = BLACK;
                    w.right.color = BLACK;
                    rotateLeft(x.parent);
                    x = root;
                }
            }else{  // if x is a right child
                w = x.parent.left;
                if(w.color == RED){   // if Uncle is RED
                    w.color = BLACK;
                    x.parent.color = RED;
                    rotateRight(x.parent);
                    w = x.parent.left;
                }
                if(w.right.color == BLACK && w.left.color == BLACK){
                    w.color = RED;
                    x = x.parent;
                    continue;
                }
                else if(w.left.color == BLACK){
                    w.right.color = BLACK;
                    w.color = RED;
                    rotateLeft(w);
                    w = x.parent.left;
                }
                if(w.left.color == RED){
                    w.color = x.parent.color;
                    x.parent.color = BLACK;
                    w.left.color = BLACK;
                    rotateRight(x.parent);
                    x = root;
                }
            }
        }
        x.color = BLACK; 
    }
    
    /**
     *
     *
     */
    function treeMinimum(subTreeRoot){  
        while(subTreeRoot.left!=nullNode){
            subTreeRoot = subTreeRoot.left;
        }
        return subTreeRoot;
    }
    
}

//
// API
//

var tree = new RedBlackTree();

[8,1,7,2,6,3,5,4,9,10,11].forEach(function(n){
    tree.insert(n);
});

/*
tree.print()

Color: Black Key: 1 Parent: 2
Color: Black Key: 2 Parent: 5
Color: Black Key: 3 Parent: 2
Color: Red Key: 4 Parent: 3
Color: Black Key: 5 Parent: null
Color: Black Key: 6 Parent: 7
Color: Black Key: 7 Parent: 5
Color: Black Key: 8 Parent: 9
Color: Red Key: 9 Parent: 7
Color: Black Key: 10 Parent: 9
Color: Red Key: 11 Parent: 10
*/

[3,2,1,11,10,9].forEach(function(n){
    tree.remove(n);
});

/*
tree.print()

Color: Black Key: 4 Parent: 5
Color: Red Key: 5 Parent: 7
Color: Black Key: 6 Parent: 5
Color: Black Key: 7 Parent: null
Color: Black Key: 8 Parent: 7
*/
