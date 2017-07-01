// Im not sure if its right

Node * avlInsert(Node * root, int data){
    if(root == NULL) return new Node(data);
    if(data <= root->data){
        root->left = insert(root->left, data);
    } else {
        root.right = insert(root->right, data);
    }

    // ----------------------------------------------AVL balance
    int balance = height(root.left) - height(root.right);
    if(balance > 1){
        if height(root->left->left) >= height(root->left->right){
            // LL
            return rotateRight(root);
        } else {
            // LR
            root->left = rotateLeft(root.left);
            return rotateRight(root);
        }
    }

    if(balance < -1){
        if height(root->right->right) >= height(root->right->left){
            // RR
            return rotateLeft(root);
        } else {
            // RL
            root->right = rotateRight(root.right);
            return rotateLeft(root);
        }
    }
    //--------------------------------------------------------
    root.height = 1 + max(root->left, root->right);
    return root;

}