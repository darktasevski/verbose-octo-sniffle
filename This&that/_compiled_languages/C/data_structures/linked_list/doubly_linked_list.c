#include <stdio.h>
#include <stdlib.h>

//
// Doubly-linked list
//
 
typedef struct Node {
    int key;
    int value;
    struct Node * prev;
    struct Node * next;
}Node;

typedef struct DLL{
    Node * head;
    Node * tail;
    int size;
}DLL;

DLL * createDLL(){
    DLL * dll = (DLL *)malloc(sizeof(DLL));
    dll->size = 0;
    dll->head = NULL;
    dll->tail = NULL;
    
    return dll;
}

Node * createNode(int key, int value){
    Node * node = (Node *)malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    node->prev = NULL;
    node->next = NULL;
    
    return node;
}

/**
 * Add a node after the tail
 * we use `DLL ** dll` because we want to update the pointer inside the function,
 * and have the changes persisted, even when the function exits.
 * and to access members we need to do: `(*dll)->tail`, because the `->` has a 
 * higher precedence
 */
void append(DLL ** dll, int key, int value){

    Node * node = createNode(key, value);
    
    printf("Node created: (key: %d, value: %d)\n", node->key, node->value);
    
    if( (*dll)->size == 0 ){
        
        (*dll)->head = node;
        (*dll)->tail = node;
        (*dll)->size++;
        
    }else{
        node->prev = (*dll)->tail;
        (*dll)->tail->next = node;
        (*dll)->tail = node;
        (*dll)->size++;
        
        printf("size: %d \n", (*dll)->size);
    }
    
    return;
}

/**
 * Add a node before the head
 */
void prepend(DLL ** dll, int key, int value){
    
    Node * node = createNode(key, value);
    
    printf("Node created: (key: %d, value: %d)\n", node->key, node->value);
    
    if( (*dll)->size == 0 ){
        (*dll)->head = node;
        (*dll)->tail = node;
        (*dll)->size++;
    }else{
        node->next = (*dll)->head;
        (*dll)->head->prev = node;
        (*dll)->head = node;
        (*dll)->size++;
        
        printf("size: %d \n", (*dll)->size);
    }
    
    return;
}

void removeHead(DLL ** dll){
    if( (*dll)->size == 1 ){
        Node * head = (*dll)->head;
        free(head);
        (*dll)->head = NULL;
        (*dll)->size--;
    }
    
    if( (*dll)->size > 1 ){
        Node * head = (*dll)->head;
        (*dll)->head = (*dll)->head->next;
        free(head);
        (*dll)->head->prev = NULL;
        (*dll)->size--;
    }
    
    return;
}

void removeTail(DLL ** dll){
    if( (*dll)->size == 1 ){
        Node * tail = (*dll)->tail;
        free(tail);
        (*dll)->tail = NULL;
        (*dll)->size--;
        
        printf("aaa \n");
    }
    
    if( (*dll)->size > 1 ){
        Node * tail = (*dll)->tail;
        (*dll)->tail = (*dll)->tail->prev;
        free(tail);
        (*dll)->tail->next = NULL;
        (*dll)->size--;
        
        printf("bbb \n");
    }
    
    return;
}

void insertAfterPosition(int position, DLL ** dll, int key, int value){
    if(position > (*dll)->size || position < 1){
        printf("ERROR: position not in range, DLL size is: %d \n", (*dll)->size);
        return;
    }
    
    Node * node = createNode(key, value);
    
    Node * currentNode = (*dll)->head;
    
    // reach the node at position #
    // iteration will be from 0 up to positio - 1
    int pos;
    position = position - 3;
    for(pos = 0; pos < position; pos++){
        currentNode = currentNode->next;
    }
    
    Node * nodeA = currentNode;
    Node * nodeB = node;
    Node * nodeC = currentNode->next;
    
    if(nodeC != NULL){
        nodeA->next = node;
        
        node->prev = nodeA;
        node->next = nodeC;
        
        nodeC->prev = node;
    }else{
        nodeA->next = node;
        
        node->prev = nodeA;
    }
    
}

void removeAt(int position, DLL ** dll){
    if(position > (*dll)->size || position < 1){
        printf("ERROR: position not in range, DLL size is: %d \n", (*dll)->size);
        return;
    }
    
    Node * currentNode = (*dll)->head;
    
    // reach the node at position #
    // iteration will be from 0 up to positio - 1
    int pos;
    for(pos = 1; pos < position; pos++){
        currentNode = currentNode->next;
    }

    Node * nodeA = currentNode->prev;
    Node * nodeB = currentNode;
    Node * nodeC = currentNode->next;
    
    if(nodeA != NULL){
        if(nodeC != NULL){
            // a b c
            nodeA->next = nodeC;
            nodeC->prev = nodeA;
            free(nodeB);
        }else{
            // a b _
            nodeA->next = NULL;
            free(nodeB);
        }
    }else{
        if(nodeC != NULL){
            // _ b c
            nodeC->prev = NULL;
            free(nodeB);
        }else{
            // _ b _
            free(nodeB);
        }
    }
}

void traverseDLL(DLL * dll){
    Node * currentNode = dll->head;
    
    printf("traverseDLL\n");
    
    while(currentNode != NULL){
        printf("    node: (key: %d, value: %d) \n", currentNode->key, currentNode->value);
        currentNode = currentNode->next;
    }
}

int main()
{
    DLL * dll = createDLL();
    
    append(&dll, 1, 1000);
    append(&dll, 2, 2000);
    append(&dll, 3, 3000);
    append(&dll, 4, 4000);
    append(&dll, 5, 5000);

    traverseDLL(dll); // 1 2 3 4 5
    
    removeTail(&dll);
    removeHead(&dll);
    
    traverseDLL(dll); // 2 3 4
    
    prepend(&dll, 7, 7000);
    prepend(&dll, 8, 8000);
    prepend(&dll, 9, 9000);
    
    traverseDLL(dll); // 9 8 7 2 3 4
    
    insertAfterPosition(1, &dll, 99, 9999);
    
    traverseDLL(dll); // 9 99 8 7 2 3 4
    
    removeAt(2, &dll);
    
    traverseDLL(dll); // 9 8 7 2 3 4

    return 0;
}
