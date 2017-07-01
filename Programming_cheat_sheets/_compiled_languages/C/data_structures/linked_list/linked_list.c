// linked list

// think of pointers as aliases!!!

#include <stdio.h>
#include <stdlib.h>
#include <string.h>


typedef struct node{
    int data;
    struct node * next;
} Node;


void insertInFront(Node ** pointerToHead, int x);
void print(Node * head);


int main(){
    // pointer to head
    Node * head = NULL;   // since this is a local variable, it will not be accessible in other functions. :()

    Node ** pointerToHead = &head;

    insertInFront(pointerToHead, 1);
    insertInFront(pointerToHead, 3);

    print(head);

    return 0;
}


// you need a pointer to your pointer, if you want to change
// the value of your pointer, and persist the change
void insertInFront(Node ** pointerToHead, int x){
    // create a new node with data:
    Node * newNode = (Node *)malloc(sizeof(Node));
    newNode->data = x;
    newNode->next = *pointerToHead;

    // update head:
    *pointerToHead = newNode;

}

// print function
void print(Node * head){   // head will be a local variable to this function
    printf("List is: ");

    //traverse
    while(head != NULL){
        printf(" %d", head->data);
        head = head->next;
    }

    printf("\n");
}

void print_recursive_in_order(){

}

void print_recursive_inverse(){

}


void delete_nth(){

}

void reverse_iterative(){

}


void reverse_recursive(){

}






