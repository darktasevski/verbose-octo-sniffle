/**
 * Recursive insertion needs two parameters:
 * 1. the currentRoot
 * 2. the data to be inserted
 * 
 * this can be used to have access to the node ancestry (parent, grandParent, ...)
 */
Tree.prototype.insertRecursive = function(currentRoot, data){
    var newNode = new Node(data);

    if(currentRoot == null){
        currentRoot = newNode;
    }else{
        if(data > currentRoot.data){
            // get node to the right
            currentRoot = currentRoot.right;

            if(currentRoot == null){
                // base case
                currentRoot = newNode;
            }else{
                // recurse (and get closer to the base case)

                console.log('IN ORDER ------ currentRoot.data: ' + currentRoot.data);
                this.insertRecursive(currentRoot, data);
                console.log('REVERSE ORDER ------ currentRoot.data: ' + currentRoot.data);
            }
        }else{
            // get node to the left
            currentRoot = currentRoot.left;

            if(currentRoot == null){
                // base case
                currentRoot = newNode;
            }else{
                // recurse (and get closer to the base case)

                console.log('IN ORDER ------ currentRoot.data: ' + currentRoot.data);
                this.insertRecursive(currentRoot, data);
                console.log('REVERSE ORDER ------ currentRoot.data: ' + currentRoot.data);
            }
        }
    }
};

//-------------------------------- example of output:
/*

tree.insertRecursive(tree.root, 200);
IN ORDER ------ currentRoot.data: 15
IN ORDER ------ currentRoot.data: 20
IN ORDER ------ currentRoot.data: 25
IN ORDER ------ currentRoot.data: 30
IN ORDER ------ currentRoot.data: 35
REVERSE ORDER ------ currentRoot.data: 35
REVERSE ORDER ------ currentRoot.data: 30
REVERSE ORDER ------ currentRoot.data: 25
REVERSE ORDER ------ currentRoot.data: 20
REVERSE ORDER ------ currentRoot.data: 15

*/
