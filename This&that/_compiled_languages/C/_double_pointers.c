#include <stdio.h>
#include <stdlib.h>

typedef struct Node{
    int data;
    struct Node * next;
} Node;

void change(Node **node, int data){
    Node * n = (Node *)malloc(sizeof(Node));
    n->data = data;
    *node = n;
}

void noChange(Node *node, int data){
    Node * n = (Node *)malloc(sizeof(Node));
    n->data = data;
    node = n;
}

int main()
{
    Node * x = (Node *)malloc(sizeof(Node));
    x->data = 5;
    printf("x->data: %d\n", x->data); // 5
    noChange(x, 10);
    printf("x->data: %d\n", x->data); // 5
    change(&x, 10);
    printf("x->data: %d\n", x->data); // 10

    return 0;
}

