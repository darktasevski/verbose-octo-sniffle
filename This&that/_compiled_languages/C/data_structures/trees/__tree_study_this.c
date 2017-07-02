#include <stdio.h>
#include <stdlib.h>

//
// Tree
//

typedef struct Node{
    int key;
    int value;
    struct Node * left;
    struct Node * right;
} Node;

typedef struct Tree{
    int size;
    Node * root;
} Tree;

/**
 * 
 */
Node * createNode(int key, int value){
    Node * node = (Node *)malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    node->right = NULL;
    node->left = NULL;
    
    return node;
}

void printNode(Node * node, char * msg){
    if(node != NULL){
        printf("  %s --> Node: (key: %d, value: %d) \n\n", msg, node->key, node->value);
    }else{
        printf("  --> Node: (key: %d, value: %d) \n\n", 0, 0);
    }
}

/**
 * 
 */
Tree * createTree(){
    Tree * tree = (Tree *)malloc(sizeof(Tree));
    tree->size = 0;
    tree->root = NULL;
    
    return tree;
}

/**
 *  WOW!!!!!!!!!!!!!!!!1111
 */
void insertIterative(Tree ** tree, int key, int value){
    
    Tree * t = *tree; // for `t->root` access
    
    Node * currentNode = t->root; // this is the way to do a currentNode from root!

    // Node ** root = &(t->root); // *root = createNode(key, value); // would work
    
    Node * newNode = createNode(key, value);
    
    if( t->root == NULL ){
        t->root = newNode;
        return;
    }
    
    while(1){
        if( key > currentNode->key){
            if(currentNode->right == NULL){
                currentNode->right = newNode;
                return;
            }else{
                 currentNode = currentNode->right;
            }
        }else{
            if(currentNode->left == NULL){
                currentNode->left = newNode;
                return;
            }else{
                currentNode = currentNode->left;
            }
        }
    }

}

/**
 *  WOW!!!!!!!!!!!!!!!!2222
 */
void insertIterativeInNode(Node ** root, int key, int value){
    
    Node * currentNode = *root; // this is the way to do a currentNode from root!
    
    Node * newNode = createNode(key, value);
    
    if( *root == NULL ){
        *root = newNode; // correct way to assign a double pointer
        return;
    }
    
    while(1){
        if( key > currentNode->key){
            if(currentNode->right == NULL){
                currentNode->right = newNode;
                return;
            }else{
                 currentNode = currentNode->right;
            }
        }else{
            if(currentNode->left == NULL){
                currentNode->left = newNode;
                return;
            }else{
                currentNode = currentNode->left;
            }
        }
    }

}

void insertRec(Node ** node, int key, int value){

    /**
     * An alias, so we can write `currentNode->right`,
     * instead of `(*node)->right`,
     */
    Node * currentNode = *node;
    
    if( *node == NULL ){
        *node = createNode(key, value);;
        return;
    }

    if(key < currentNode->key){
        insertRec( &currentNode->left, key, value);
    }else if(key > currentNode->key){
        insertRec( &(currentNode->right) , key, value);
    }

}

 
/**
 * 
 */
void insert(Tree ** tree, int key, int value){
    // ALL WORK
    insertIterative(tree, key, value);
    // insertIterativeInNode( &(*tree)->root, key, value);
    // insertRec( &(*tree)->root, key, value);
}


/**
 * 
 */
void inOrderRec(Node * node){
    if(node != NULL){
        inOrderRec(node->left);
        printNode(node, "");
        inOrderRec(node->right);
    }
}

/**
 * 
 */
void inOrder(Tree * tree){
    inOrderRec(tree->root);
}

int main()
{
    Tree * tree = createTree();
    
    insert(&tree, 1, 100);
    insert(&tree, 2, 200);
    insert(&tree, 3, 300);
    insert(&tree, 4, 400);
    insert(&tree, 5, 500);
    insert(&tree, 6, 600);
    
    inOrder(tree);
    
    return 0;
}

