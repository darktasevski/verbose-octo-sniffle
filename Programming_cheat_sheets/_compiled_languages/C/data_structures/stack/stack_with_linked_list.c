#include <stdio.h>
#include <stdlib.h>

//
// Stack
//

typedef struct Node{
    int key;
    int value;
    struct Node * next;
} Node;

typedef struct Stack{
    Node * top;
    int size;
} Stack;

Node * createNode(int key, int value){
    Node * node = (Node *)malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    node->next = NULL;
    
    return node;
}

Stack * createStack(){
    Stack * stack = (Stack *)malloc(sizeof(Stack));
    stack->top = NULL;
    stack->size = 0;
    
    return stack;
}

void push(Stack ** stack, int key, int value){
    Node * node = createNode(key, value);

    /**
     * An alias, so we can write `s->size`,
     * instead of `(*stack)->size`,
     */
    Stack * s = *stack;
    
    if( s->size == 0){
        s->top = node;
        s->size++;
    } else if( s->size > 0){
        node->next = s->top;
        s->top = node;
        s->size++;
    }
}

Node * pop(Stack ** stack){

    /**
     * An alias, so we can write `s->size`,
     * instead of `(*stack)->size`,
     */
    Stack * s = *stack;

    if( s->size == 0 ){
        return NULL;
    } else if( s->size > 0 ){
        Node * node = s->top;
        s->top = s->top->next;
        s->size--;
        return node;
    }
}

Node * peek(Stack ** stack){
    return (*stack)->top;
}

void printStack(Stack ** stack){
    Node * currentNode = (*stack)->top;
    
    while(currentNode != NULL){
        printf("node: (key: %d, value: %d) \n", currentNode->key, currentNode->value);
        currentNode = currentNode->next;
    }
}


int main()
{
    Stack * stack = createStack();
    
    push(&stack, 1, 10);
    push(&stack, 2, 20);
    push(&stack, 3, 30);
    push(&stack, 4, 40);
    push(&stack, 5, 50);
    
    Node * x = pop(&stack);
    printf("Node poped: (key: %d value: %d) \n\n", x->key, x->value);
    
    Node * y = peek(&stack);
    printf("Node peeked: (key: %d value: %d) \n\n", y->key, y->value);
    
    printStack(&stack);
    
    return 0;
}
