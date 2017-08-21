/**
 * AVL tree
 * http://www.geeksforgeeks.org/avl-tree-set-2-deletion/
 */
 
// An AVL tree node
function Node(){
    this.key;
    this.left;
    this.right;
    this.height;
}

function AvlTree(){
    var self = this;

    //
    // public
    //

    self.insert = insert;
    self.remove = remove;
    self.preOrder = preOrder;
    self.inOrder = inOrder;
    self.postOrder = postOrder;
    

    //
    // private
    //

    var TreeRoot = null;

    function insert(key){
        TreeRoot = _insert(TreeRoot, key);
    }

    function remove(key){
        TreeRoot = deleteNode(TreeRoot, key);
    }

    function preOrder(){
        _preOrder(TreeRoot);
    }

    function inOrder(){
        _inOrder(TreeRoot);
    }

    function postOrder(){
        _postOrder(TreeRoot);
    }

    // A utility function to get height of the tree
    function height(node){
        if(node == null){
            return 0;
        }
        return node.height;
    }

    // A utility function to get maximum of two integers
    function max(a, b){
        return (a > b)? a : b;
    }

    /**
     * Helper function that allocates a new node with the given key and
     * null left and right pointers. 
     */
    function newNode(key){
        var node = new Node();
                            
        node.key    = key;
        node.left   = null;
        node.right  = null;
        node.height = 1;  // new node is initially added at leaf

        return node;
    }

    // A utility function to right rotate subtree rooted with y
    // See the diagram given above.
    function rightRotate(y){
        var x = y.left;
        var T2 = x.right;
     
        // Perform rotation
        x.right = y;
        y.left = T2;
     
        // Update heights
        y.height = max( height(y.left), height(y.right) ) + 1;
        x.height = max( height(x.left), height(x.right) ) + 1;
     
        // Return new root
        return x;
    }

    // A utility function to left rotate subtree rooted with x
    // See the diagram given above.
    function leftRotate(x){
        var y = x.right;
        var T2 = y.left;
     
        // Perform rotation
        y.left = x;
        x.right = T2;
     
        //  Update heights
        x.height = max( height(x.left), height(x.right) ) + 1;
        y.height = max( height(y.left), height(y.right) ) + 1;
     
        // Return new root
        return y;
    }

    // Get Balance factor of node N
    function getBalance(node){
        if(node == null){
            return 0;
        }
        return height(node.left) - height(node.right);
    }

    function _insert(node, key){
        /* 1.  Perform the normal BST rotation */
        if(node == null){
            return newNode(key);
        }
     
        if(key < node.key){
            node.left  = _insert(node.left, key);
        }else{
            node.right = _insert(node.right, key);
        }
     
        /* 2. Update height of this ancestor node */
        node.height = max( height(node.left), height(node.right) ) + 1;
     
        /* 3. Get the balance factor of this ancestor node to check whether
           this node became unbalanced */
        var balance = getBalance(node);
     
        // If this node becomes unbalanced, then there are 4 cases
     
        // Left Left Case
        if(balance > 1 && key < node.left.key){
            return rightRotate(node);
        }
     
        // Right Right Case
        if(balance < -1 && key > node.right.key){
            return leftRotate(node);
        }
     
        // Left Right Case
        if(balance > 1 && key > node.left.key)
        {
            node.left =  leftRotate(node.left);
            return rightRotate(node);
        }
     
        // Right Left Case
        if(balance < -1 && key < node.right.key)
        {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
     
        /* return the (unchanged) node pointer */
        return node;
    }

    // A utility function to print preorder traversal of the tree.
    // The function also prints height of every node
    function _preOrder(root){
        if(root != null)
        {
            console.log(root.key + ' ');
            _preOrder(root.left);
            _preOrder(root.right);
        }
    }

    // A utility function to print inorder traversal of the tree.
    // The function also prints height of every node
    function _inOrder(root){
        if(root != null)
        {
            _inOrder(root.left);
            console.log(root.key + ' ');
            _inOrder(root.right);
        }
    }

    // A utility function to print postorder traversal of the tree.
    // The function also prints height of every node
    function _postOrder(root){
        if(root != null)
        {
            _postOrder(root.left);
            _postOrder(root.right);
            console.log(root.key + ' ');
        }
    }

    /* Given a non-empty binary search tree, return the node with minimum
    key value found in that tree. Note that the entire tree does not
    need to be searched. */
    function minValueNode(node){
        var current = node;
     
        /* loop down to find the leftmost leaf */
        while(current.left != null){
            current = current.left;
        }
     
        return current;
    }
     
    function deleteNode(root, key){
        // STEP 1: PERFORM STANDARD BST DELETE
     
        if (root == null){
            return root;
        }
     
        // If the key to be deleted is smaller than the root's key,
        // then it lies in left subtree
        if(key < root.key){
            root.left = deleteNode(root.left, key);
        }
     
        // If the key to be deleted is greater than the root's key,
        // then it lies in right subtree
        else if(key > root.key){
            root.right = deleteNode(root.right, key);
        }
     
        // if key is same as root's key, then This is the node
        // to be deleted
        else{
            // node with only one child or no child
            if( (root.left == null) || (root.right == null) ){
                var temp = root.left ? root.left : root.right;
     
                // No child case
                if(temp == null){
                    temp = root;
                    root = null;
                }else{ // One child case
                    root = temp; // Copy the contents of the non-empty child
                }

                delete temp;
            }else{
                // node with two children: Get the inorder successor (smallest
                // in the right subtree)
                var temp = minValueNode(root.right);
     
                // Copy the inorder successor's data to this node
                root.key = temp.key;
     
                // Delete the inorder successor
                root.right = deleteNode(root.right, temp.key);
            }
        }
     
        // If the tree had only one node then return
        if (root == null){
            return root;
        }
     
        // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
        root.height = max( height(root.left), height(root.right ) ) + 1;
     
        // STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether
        //  this node became unbalanced)
        var balance = getBalance(root);
     
        // If this node becomes unbalanced, then there are 4 cases
     
        // Left Left Case
        if (balance > 1 && getBalance(root.left) >= 0){
            return rightRotate(root);
        }
     
        // Left Right Case
        if (balance > 1 && getBalance(root.left) < 0){
            root.left =  leftRotate(root.left);
            return rightRotate(root);
        }
     
        // Right Right Case
        if (balance < -1 && getBalance(root.right) <= 0){
            return leftRotate(root);
        }
     
        // Right Left Case
        if (balance < -1 && getBalance(root.right) > 0){
            root.right = rightRotate(root.right);
            return leftRotate(root);
        }
     
        return root;
    }


}

//
// API
//
 
var tree = new AvlTree();
// var root = null;

/* Constructing tree given in the above figure */
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);
tree.insert(25);


/* The constructed AVL Tree would be
        30
       /  \
     20   40
    /  \     \
   10  25    50
*/

tree.remove(25);
tree.remove(50);


console.log("Pre order traversal of the constructed AVL tree is \n");
tree.inOrder(); // 10 20 30 40
     
  
