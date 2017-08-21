#include<stdio.h>
#include<stdlib.h>

//
// POINTER STUDY
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
        printf("  %s --> Node: NULL \n\n", msg);
    }
}

int main() {
    
    //
    // Changing a Node by using other pointers.
    //
    // We can do that by either reaching the Node pointer, or the actual Node struct!
    //
    Node * root = NULL;
    printNode(root, "root");
    
    
    /**
     * If we have access to the a variable with VALUE: 'address of our Node struct',
     * which is the case of `root`, we can reassign it!
     */
    Node * newNode2 = createNode(2, 200);
    root = newNode2;
    printNode(root, "was root changed to 2? YES"); // YES
    
    
    /**
     * If we have access to the a variable with VALUE: 'address of our Node struct',
     * which is the case of `root`, we can reassign it like this:
     *     root = newNode3;
     */
    Node * newNode3 = createNode(3, 30);
    root = newNode3;
    printNode(root, "was root changed to 3? YES"); // YES
    
    
    /**
     * If we have access to the a variable with VALUE: 'address of our Node struct',
     * which is the case of `root`, we can reassign it like this also:
     *     *root = *newNode4;
     */
    Node * newNode4 = createNode(4, 400);
    *root = *newNode4;
    printNode(root, "was root changed to 4? YES"); // YES
    
    
    /**
     * `root5 = root1` means that root5 gets the the VALUE of root, 
     * which is the ADDRESS of the Node struct
     * 
     * `root5 = newNode5` means that root5 gets the VALUE of newNode5,
     * which is the ADDRESS of ANOTHER Node struct,
     * so this does NOT change root, 
     * it only makes root5 point to something else.
     * 
     */
    Node * root5 = root;
    Node * newNode5 = createNode(5, 500);
    root5 = newNode5;
    printNode(root, "was root changed to 5? NO ----------------------------"); // NO
    
    
    /**
     * CHANGING THE NODE STRUCT DIRECTLY:
     * 
     * Making root6 'point to' root1
     * we cannot reasign root by using root6,
     *     so if we do `*root6`, we get the address of the Node struct
     *     and we can reassign the Node Struct!
     *     
     */
    Node * root6 = root;
    Node * newNode6 = createNode(6, 600);
    *root6 = *newNode6;
    printNode(root, "was root changed to 6? YES"); // YES
    
    
    /**
     * CHANGING THE NODE POINTER
     * 
     * We need to hold the address of root,
     * for that, we need a double pointer: 
     *     Node ** root7 = &root;
     * to reassign root, we need to 'GO' to root, by doing: `*root7`
     * now we can reasign root by doing: `*root7 = createNode(7, 700);`
     */
    Node ** root7 = &root;
    Node * newNode7 = createNode(7, 700);
    *root7 = newNode7;
    printNode(root, "was root changed to 7? YES"); // YES
    
    
    /**
     * If we have access to the a variable with VALUE: 'address of our Node struct',
     * which is the case of `root`, and `root8`, we can reassign `root` through `root8` like this also:
     *     *root8 = *newNode8;
     */
    Node * root8 = &(*root);
    Node * newNode8 = createNode(8, 800);
    *root8 = *newNode8;
    printNode(root, "was root changed to 8? YES"); // YES


    return 0;
}



/* OUTPUT:

  root --> Node: NULL 

  was root changed to 2? YES --> Node: (key: 2, value: 200) 

  was root changed to 3? YES --> Node: (key: 3, value: 30) 

  was root changed to 4? YES --> Node: (key: 4, value: 400) 

  was root changed to 5? NO ---------------------------- --> Node: (key: 4, value: 400) 

  was root changed to 6? YES --> Node: (key: 6, value: 600) 

  was root changed to 7? YES --> Node: (key: 7, value: 700) 

  was root changed to 8? YES --> Node: (key: 8, value: 800) 
  
*/
