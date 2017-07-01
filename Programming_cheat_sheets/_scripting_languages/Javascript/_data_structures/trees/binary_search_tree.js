//  simple binary search tree (with no balancing)

// node: could be an instance, or null


function Node(data){
    this.data = data;
    this.left = null;
    this.right = null;
}

function BinarySearchTree(){
    this.root = null;

    /*
     * algorithm:
     * if there is no root, add node as root
     * if there is a root, mark it as currentNode
     * 1. loop forever: find which direction to go, by comparing data
     * 2. if currentNode.right/left is null, add the newNode there, and break out of the loop
     * 3. if not, mark currentNode = currentNode.right/left
     */
    this.insert = function(data){
        var newNode = new Node(data);

        if(this.root == null){
            this.root = newNode;
        }else{
            currentNode = this.root;
            while(true){

                // if data is greater, and the slot is empty, insert newNode there
                if(data > currentNode.data){
                    if(currentNode.right == null){
                        currentNode.right = newNode;
                        return; // exit the loop, we are done!
                    }else{
                        currentNode = currentNode.right;
                    }
                }else{
                    if(currentNode.left == null){
                        currentNode.left = newNode;
                        return; // exit the loop, we are done!
                    }else{
                        currentNode = currentNode.left;
                    }
                }
            }
        }
    };

    this.inOrder = function(node){
        if(node){
            this.inOrder(node.left);
            console.log(node.data);
            this.inOrder(node.right);
        }
    };

    this.preOrder = function(node){
        if(node){
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    };

    this.postOrder = function(node){
        if(node){
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.data);
        }
    };

    this.print = function(){
        this.inOrder(this.root);
    };

    /**
     * iterative implementation
     */
    this.findMax = function(){
        if(this.root == null){
            console.log('Tree is empty...');
        }else{
            var currentNode = this.root;
            while(true){
                if(currentNode.right == null){
                    console.log('Max: ' + currentNode.data);
                    return; // we are done, exit the loop
                }else{
                    currentNode = currentNode.right;
                }
            }
        }
    };

    /**
     * iterative implementation
     */
    this.findMin = function(){
        if(this.root == null){
            console.log('Tree is empty...');
        }else{
            var currentNode = this.root;
            while(true){
                if(currentNode.left == null){
                    console.log('Min: ' + currentNode.data);
                    return; // we are done, exit the loop
                }else{
                    currentNode = currentNode.left;
                }
            }
        }
    };

    this.find = function(data){};

    this.delete = function(data){};

    this.depthFirstSearch = function(data){};

    this.breadthFirstSearch = function(data){};
}

//---------------------------------------------- usage:
var tree = new BinarySearchTree();

tree.insert(10);
tree.insert(15);
tree.insert(20);
tree.insert(25);
tree.insert(30);
tree.insert(35);

tree.findMax(); // 35
tree.findMin(); // 10

tree.print(); // 10 15 20 25 30 35

