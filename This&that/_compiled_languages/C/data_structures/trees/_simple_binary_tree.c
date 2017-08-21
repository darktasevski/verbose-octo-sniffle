#include<stdlib.h>
#include<stdio.h>

//
// Binary tree data structure
//

typedef struct Node {
    int key;
    int value;
    struct Node * right;
    struct Node * left;
} Node;


typedef struct Tree{
    int size; // not used yet...
    Node * root;
} Tree;

//
// function declarations (so we can implement the functions in any order!)
//

Tree * createTree();
Node * createNode(int key, int value);
Node * searchRecursive(Node ** node, int key);
Node * search(Tree ** tree, int key);
Node * searchIterative(Node ** node, int key);
void printNode(Node * node, char * msg);
void insertRecursive(Node ** node, int key, int value);
void insertIterative(Tree ** tree, Node ** node, int key, int value);
void insert(Tree ** tree, int key, int value);
void preOrder(Node * node);
void inOrder(Node * node);
void inOrderTree(Tree * tree);
void postOrder(Node * node);
void deleteNode(Node ** node);
void deleteTree(Tree ** tree);

//
// implementations
//

Node * createNode(int key, int value){
    Node * node = (Node *)malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    node->right = NULL;
    node->left = NULL;
    
    return node;
}

Tree * createTree(){
    Tree * tree = (Tree *)malloc(sizeof(Tree));
    tree->size = 0;
    tree->root = NULL;
    
    return tree;
}

void printNode(Node * node, char * msg){
    if(node != NULL){
        printf("    %s --> Node: (key: %d, value: %d) \n\n", msg, node->key, node->value);
    }else{
        printf("    Node Not Found --> Node: (key: %d, value: %d) \n\n", 0, 0);
    }
}

void insert(Tree ** tree, int key, int value){

    /**
     * An alias, so we can write `t->size`,
     * instead of `(*tree)->size`,
     */
    Tree * t = *tree;

    // insertRecursive( &(t->root), key, value );
    insertIterative(tree,  &(t->root), key, value );
}

void insertRecursive(Node ** node, int key, int value){

    /**
     * An alias, so we can write `currentNode->right`,
     * instead of `(*node)->right`,
     */
    Node * currentNode = *node;
    
    if( *node == NULL ){
        Node * temp = createNode(key, value);
        *node = temp;
        return;
    }

    if(key < currentNode->key){
        insertRecursive( &currentNode->left, key, value);
    }else if(key > currentNode->key){
        // insertRecursive( &(currentNode->right) , key, value);
        insertRecursive( &(currentNode->right) , key, value);
    }

}

void insertIterative(Tree ** tree, Node ** node, int key, int value){

    /**
     * An alias, so we can write `t->size`,
     * instead of `(*tree)->size`,
     */
    Tree * t = *tree;

    /**
     * An alias, so we can write `currentNode->right`,
     * instead of `(*node)->right`,
     */
    Node * currentNode = *node;


    Node * newNode = createNode(key, value);
    
    if( currentNode == NULL ){
        currentNode = newNode;
        t->root = currentNode;
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

void preOrder(Node * node){
    if(node != NULL){
        printNode(node, "");
        preOrder(node->left);
        preOrder(node->right);
    }
}

void inOrder(Node * node){
    if(node != NULL){
        inOrder(node->left);
        printNode(node, "");
        inOrder(node->right);
    }
}

void inOrderTree(Tree * tree){
    inOrder(tree->root);
}

void postOrder(Node * node){
    if(node != NULL){
        postOrder(node->left);
        postOrder(node->right);
        printNode(node, "");
    }
}

void deleteNode(Node ** node){

    /**
     * An alias, so we can write `currentNode->right`,
     * instead of `(*node)->right`,
     */
    Node * currentNode = *node;

    if(currentNode != NULL){
        deleteNode( &(currentNode->left) );
        deleteNode( &(currentNode->right) );

        printNode(currentNode, "FREE");

        currentNode->key = 0;
        currentNode->value = 0;
        currentNode->left = NULL;
        currentNode->right = NULL;

        free(currentNode);
    }
}

void deleteTree(Tree ** tree){

    /**
     * An alias, so we can write `t->size`,
     * instead of `(*tree)->size`,
     */
    Tree * t = *tree;

    deleteNode( &(t->root) );
}

Node * search(Tree ** tree, int key){

    /**
     * An alias, so we can write `t->size`,
     * instead of `(*tree)->size`,
     */
    Tree * t = *tree;

    // return searchRecursive( &(t->root), key);
    return searchIterative( &(t->root), key);
}

Node * searchIterative(Node ** node, int key){

    /**
     * An alias, so we can write `currentNode->right`,
     * instead of `(*node)->right`,
     */
    Node * currentNode = *node;

    if( currentNode == NULL ){
        return NULL;
    }

    while(currentNode != NULL){
        if(key == currentNode->key){
            return currentNode;
        }

        if(key > currentNode->key){
            currentNode = currentNode->right;
        }else{
            currentNode = currentNode->left;
        }
    }
}

Node * searchRecursive(Node ** node, int key){

    /**
     * An alias, so we can write `currentNode->right`,
     * instead of `(*node)->right`,
     */
    Node * currentNode = *node;

    if( currentNode == NULL ){
        return NULL;
    }

    if(key < currentNode->key){
        searchRecursive( &(currentNode->left), key );
    }else if(key > currentNode->key){
        searchRecursive( &(currentNode->right), key );
    }else if(key == currentNode->key){
        return *node;
    }
}

void main(){

    Tree * tree = createTree();

    insert(&tree, 6, 60);
    insert(&tree, 3, 30);
    insert(&tree, 8, 80);
    insert(&tree, 2, 20);
    insert(&tree, 7, 70);
    insert(&tree, 4, 40);
    insert(&tree, 1, 10);
    insert(&tree, 5, 50);
    insert(&tree, 9, 90);

    printf("In Order Display\n");
    inOrderTree(tree);

    printf("Pre Order Display\n");
    preOrder(tree->root);

    printf("Post Order Display\n");
    postOrder(tree->root);

    Node * resultA = search(&tree, 4);
    printNode(resultA, "Result:");

    Node * resultB = search(&tree, 10000);
    printNode(resultB, "Result:");

    deleteTree(&tree);

    printf("In Order Display\n");
    inOrderTree(tree);

}
