#include <stdio.h>
#include <stdlib.h>

//
// Queue
//

typedef struct Node{
    int key;
    int value;
    struct Node * next;
} Node;

typedef struct Queue{
    int size;
    Node * head;
    Node * tail;
} Queue;

/**
 * 
 */
Node * createNode(int key, int value){
    Node * node = (Node *)malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    node->next = NULL;
    
    return node;
}

/**
 * 
 */
Queue * createQueue(){
    Queue * queue = (Queue *)malloc(sizeof(Queue));
    queue->size = 0;
    queue->head = NULL;
    queue->tail = NULL;
    
    return queue;
}

/**
 * 
 */
void push(Queue ** queue, int key, int value){
    Node * node = createNode(key, value);

    /**
     * An alias, so we can write `q->size`,
     * instead of `(*queue)->size`,
     */
    Queue * q = *queue;

    if( q->size == 0){
        q->head = node; 
        q->tail = node; 
        q->size++;
    }else if( q->size > 0 ){
        q->tail->next = node; 
        q->tail = node; 
        q->size++;
    }
}

/**
 * 
 */
Node * pop(Queue ** queue){

    /**
     * An alias, so we can write `q->size`,
     * instead of `(*queue)->size`,
     */
    Queue * q = *queue;

    if( q->size == 0 ){
        return NULL;
    }else if( q->size > 0 ){
        Node * head = q->head;
        q->head = q->head->next;

        return head;
    }
}

/**
 * 
 */
Node * peek(Queue * queue){
    return queue->head;
}

/**
 * 
 */
void display(Queue ** queue){
    Node * currentNode = (*queue)->head;

    while(currentNode != NULL){
        printf("Node: (key: %d, value: %d) \n", currentNode->key, currentNode->value);
        currentNode = currentNode->next;
    }
}

/**
 * 
 */
void deleteQueue(Queue ** queue){
    
    /**
     * An alias, so we can write `q->size`,
     * instead of `(*queue)->size`,
     */
    Queue * q = *queue;

    Node * currentNode = q->head;
    Node * temp;

    while(currentNode != NULL){
        temp = currentNode;
        
        printf("FREE: (key: %d, value: %d) \n", temp->key, temp->value);
        
        currentNode = currentNode->next;
        
        free(temp);
    }
}

int main()
{
    Queue * queue = createQueue();

    push(&queue, 1, 1000);
    push(&queue, 2, 2000);
    push(&queue, 3, 3000);
    push(&queue, 4, 4000);

    Node * n = pop(&queue);
    printf("POP: (key: %d, value: %d) \n", n->key, n->value);

    display(&queue);

    deleteQueue(&queue);
    
    return 0;
}

