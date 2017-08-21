#include <stdio.h>
#include <stdlib.h>
//-------------------------------------------------------------------------------- resources:
// http://www.learn-c.org/en/Linked_lists

//-------------------------------------------------------------------------------- Gotchas:
// error: request for member 'data' is something not a structure or union  *head->data;
//    FIX: (*head)->data;

// think of pointers as Ruby's @variables
//-------------------------------------------------------------------------------- structs
typedef struct node
{
    int data;
    struct node * next;
}Node;

typedef struct linkedList
{
    Node * head;
}LinkedList;

//-------------------------------------------------------------------------------- fn declarations
LinkedList * createLinkedList(int data);
void append(Node * head, int data);
void prepend(Node ** head, int data); // we need a double pointer because we will change it!
void printList(Node * head);
int removeFirst(Node ** head);  // we need a double pointer, since we will return it.
int removeLast(Node * head);
void removeByIndex(Node * head);
void removeFirstByValue(Node * head);

//-------------------------------------------------------------------------------- fn implementation
LinkedList * createLinkedList(int data)
{
    LinkedList * linkedList = (LinkedList *)malloc(sizeof(LinkedList));
    Node * node = (Node *)malloc(sizeof(Node));
    node->data = data;
    linkedList->head = node;
    return linkedList;
};

void append(Node * head, int data)
{
   Node * currentNode = head;
   // go to the next node only if there is one!
    while(currentNode->next != NULL) // get last node
    {  
        currentNode = currentNode->next;
    };
    currentNode->next = (Node *)malloc(sizeof(Node));
    currentNode->next->data = data;
    currentNode->next->next = NULL;
};

void prepend(Node ** head, int data)
{
    // first create the newNode
    Node * newNode = (Node *)malloc(sizeof(Node));
    newNode->data = data;
    
    // then make head the next node of the new node
    newNode->next = *head;
    // then change what head point to!
    *head = newNode;
};

void printList(Node * head)
{
    printf("linkedList -> ");
    Node * currentNode = head;
    while(currentNode != NULL) // while you have a valid node, print it!
    {
        printf("%d -> ", currentNode->data);
        currentNode = currentNode->next;
    }
    printf("NULL\n");
};

/**
 * 1. Take the next item that the head points to and save it
 * 2. Free the head item
 * 3. Set the head to be the next item that we've stored on the side
 */
int removeFirst(Node ** head)
{
    Node * secondNode = (*head)->next;
    int value = (*head)->data;
    free(*head);
    *head = secondNode;
    return value;
};

/**
 * 1. go to the node before the last, and delete the next
 * 2. to go to the node before the last, use: currentNode->next->next != NULL
 */
int removeLast(Node * head)
{
    // what if List has 0 or 1 node ???






    Node * currentNode = head;
    // go to the node before the last node:
    while(currentNode->next->next != NULL)
    {
        currentNode = currentNode->next;
    }
    int value = currentNode->next->data;
    free(currentNode->next);
    currentNode->next = NULL;
    return value;

};

void removeByIndex(Node * head)
{

};

void removeFirstByValue(Node * head)
{

};

//-------------------------------------------------------------------------------- main fn
int main()
{
    LinkedList * linkedList = createLinkedList(4);
    append(linkedList->head, 5);
    append(linkedList->head, 6);
    append(linkedList->head, 7);
    append(linkedList->head, 8);
    prepend(&linkedList->head, 3);
    int val1 = removeFirst(&linkedList->head);
    printf("first: %d\n", val1);

    int val2 = removeLast(linkedList->head);
    printf("last: %d\n", val2);


    printList(linkedList->head);
    return 0;
}


