#include <stdio.h>
#include <stdlib.h>

//------------------------------------------------------- Node
typedef struct node{
    int data;
    struct node * right;
    struct node * left;
    int height;
} Node;

//------------------------------------------------------- function declarations
void insert(Node ** root, int data);
void printInOrder(Node * root);
void printPreOrder(Node * root);
void printPostOrder(Node * root);
Node * search(Node * node, int value);
Node * Delete(Node * node, int data);
Node * findMin(Node * node);

//------------------------------------------------------- main
int main(){
    Node * root = NULL;
    Node ** pointerToRoot = &root;
    insert(pointerToRoot, 1);
    insert(pointerToRoot, 2);
    insert(pointerToRoot, 3);
    insert(pointerToRoot, 4);
    insert(pointerToRoot, 44);
    insert(pointerToRoot, 45);
    insert(pointerToRoot, 14);
    insert(pointerToRoot, 13);

    printInOrder(root);

    search(root, 2);


    Delete(root, 2);

    printInOrder(root);

    return 0;
}

//------------------------------------------------------- insert
void insert(Node ** pointerToRoot, int data){
    // Node * root = *pointerToRoot;
    // create a node
    Node * newNode = (Node *)malloc(sizeof(Node));
    newNode->data = data;
    newNode->right = NULL;
    newNode->left = NULL;

    // attach to root:
    if(*pointerToRoot == NULL){
        *pointerToRoot = newNode;
    } else {
        if(newNode->data >= (*pointerToRoot)->data){
            insert( &(*pointerToRoot)->right, data );
        } else {
            insert( &(*pointerToRoot)->left, data );
        }
    }
}

//------------------------------------------------------- print
void printPostOrder(Node * root){
    if(root == NULL){
        //printf("Tree is empty.\n");
    } else {
        printPostOrder(root->left);
        printPostOrder(root->right);
        printf("%d\n", root->data);
    }
}


//------------------------------------------------------- print
void printInOrder(Node * root){
    if(root == NULL){
        //printf("Tree is empty.\n");
    } else {
        printInOrder(root->left);
        printf("%d\n", root->data);
        printInOrder(root->right);
    }
}

//------------------------------------------------------- print
void printPreOrder(Node * root){
    if(root == NULL){
        //printf("Tree is empty.\n");
    } else {
        printf("%d\n", root->data);
        printPreOrder(root->left);
        printPreOrder(root->right);
    }
}


//------------------------------------------------------- print
Node * search(Node * node, int value){
    if (node == NULL){
        printf("Not found.\n");
        return NULL;
    }

    if (node->data == value){
        printf("Node %d found.\n", node->data);
        return node;
    }


    Node * result;
    if (value >= node->data){
        result = search(node->right, value);
        return result;
    } else {
        result = search(node->left, value);
        return result;
    }
    return NULL; // search didn't find anything
}


//------------------------------------------------------- Delete and find_min
Node * Delete(Node * node, int data){
    if(node == NULL){
        printf("node not found\n");
        return node;
    } else if(data > node->data){
        node->right = Delete(node->right, data);
    } else if(data < node->data){
        node->left = Delete(node->left, data);
    } else {
        if(node->left == NULL && node->right == NULL){   // case 1: no child
            printf("Deleted %d\n", node->data);
            free(node);
        } else if(node->left == NULL){ // case 2: one child
            Node * temp = node;
            node = node->right;
            printf("Deleted %d\n", temp->data);
            free(temp);
        } else if(node->right == NULL){ // case 2: one child
            Node * temp = node;
            node = node->left;
            printf("Deleted %d\n", temp->data);
            free(temp);
        } else {  // case 3: two child
            Node * temp = findMin(node->right);
            node->data = temp->data;
            node->right = Delete(node->right, temp->data);
            printf("Deleted %d\n", node->data);
        }
    }
    return node;
}

Node * findMin(Node * node){
    return node->left;

    if(node->left != NULL)
        findMin(node->left);
}

//-------------------------------------------------------------- AVL stuff

// A utility function to get height of the tree
int height(struct node *N){
    if (N == NULL)
        return 0;
    return N->height;
}

// A utility function to get maximum of two integers
int max(int a, int b){
    return (a > b)? a : b;
}

/* Helper function that allocates a new node with the given data and
    NULL left and right pointers. */
struct node* newNode(int data)
{
    struct node* node = (struct node*)
                        malloc(sizeof(struct node));
    node->data   = data;
    node->left   = NULL;
    node->right  = NULL;
    node->height = 1;  // new node is initially added at leaf
    return(node);
}

// A utility function to right rotate subtree rooted with y
// See the diagram given above.
struct node *rightRotate(struct node *y)
{
    struct node *x = y->left;
    struct node *T2 = x->right;

    // Perform rotation
    x->right = y;
    y->left = T2;

    // Update heights
    y->height = max(height(y->left), height(y->right))+1;
    x->height = max(height(x->left), height(x->right))+1;

    // Return new root
    return x;
}

// A utility function to left rotate subtree rooted with x
// See the diagram given above.
struct node *leftRotate(struct node *x)
{
    struct node *y = x->right;
    struct node *T2 = y->left;

    // Perform rotation
    y->left = x;
    x->right = T2;

    //  Update heights
    x->height = max(height(x->left), height(x->right))+1;
    y->height = max(height(y->left), height(y->right))+1;

    // Return new root
    return y;
}

// Get Balance factor of node N
int getBalance(struct node *N)
{
    if (N == NULL)
        return 0;
    return height(N->left) - height(N->right);
}

struct node* insert(struct node* node, int data)
{
    /* 1.  Perform the normal BST rotation */
    if (node == NULL)
        return(newNode(data));

    if (data < node->data)
        node->left  = insert(node->left, data);
    else
        node->right = insert(node->right, data);

    /* 2. Update height of this ancestor node */
    node->height = max(height(node->left), height(node->right)) + 1;

    /* 3. Get the balance factor of this ancestor node to check whether
       this node became unbalanced */
    int balance = getBalance(node);

    // If this node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && data < node->left->data)
        return rightRotate(node);

    // Right Right Case
    if (balance < -1 && data > node->right->data)
        return leftRotate(node);

    // Left Right Case
    if (balance > 1 && data > node->left->data)
    {
        node->left =  leftRotate(node->left);
        return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && data < node->right->data)
    {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    /* return the (unchanged) node pointer */
    return node;
}

// A utility function to print preorder traversal of the tree.
// The function also prints height of every node
void preOrder(struct node *root)
{
    if(root != NULL)
    {
        printf("%d ", root->data);
        preOrder(root->left);
        preOrder(root->right);
    }
}

