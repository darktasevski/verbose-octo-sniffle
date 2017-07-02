#include<stdio.h>
#include<stdlib.h>
#include<limits.h>


//
// (7 / 2) == 3  (floor)
//


typedef struct Heap{
    int * array;
    int capacity;
    int size; // proposed next index
} Heap;


void siftUp(Heap ** heap, int i);
void siftDown(Heap ** heap, int i);


//
// functions
//


int getRightChildIndex(int i){ return (2 * i) + 2; }
int getLeftChildIndex(int i){ return (2 * i) + 1; }
int getParentIndex(int i){ return (i - 1) / 2; }


Heap * createHeap(int size){
    Heap * heap = (Heap *)malloc(sizeof(Heap));
    heap->capacity = size;
    heap->size = 0;
    heap->array = (int *)malloc(sizeof(int) * size);

    int i;

    for(i = 0; i < size; i++){
        heap->array[i] = -999;
    }

    return heap;
}


/**
 * add to last, sift up
 */
void push(Heap ** heap, int key){

    int lastIndex = (*heap)->size;

    (*heap)->array[lastIndex] = key;

    (*heap)->size++;

    siftUp(heap, lastIndex);
}


/**
 * swap top with bottom, sift down
 */
int pop(Heap ** heap){

    int lastIndex = (*heap)->size - 1; // the existing one, not the next after the last
    int firstIndex = 0;
    int valuePopep = (*heap)->array[firstIndex];

    // swap
    int temp = (*heap)->array[firstIndex];
    (*heap)->array[firstIndex] = (*heap)->array[lastIndex];
    (*heap)->array[lastIndex] = temp;

    (*heap)->size--;

    siftDown(heap, firstIndex); // that is actually the last index

    return valuePopep;
}


int peek(Heap ** heap){
    return (*heap)->array[0];
}


void siftUp(Heap ** heap, int i){

    int currentIndex = i;
    int parentIndex = getParentIndex(i);
    int firstIndex = 0;
    int lastIndex = (*heap)->size;

    if(currentIndex < 0){
        return;
    }

    int parentValue = (*heap)->array[parentIndex];
    int currentIndexValue = (*heap)->array[currentIndex];

    if(parentValue > currentIndexValue){
        // swap
        int temp = (*heap)->array[parentIndex];
        (*heap)->array[parentIndex] = (*heap)->array[currentIndex];
        (*heap)->array[currentIndex] = temp;

        siftUp(heap, parentIndex);
    }

}


void siftDown(Heap ** heap, int i){

    int currentIndex = i;
    int rightChildIndex = getRightChildIndex(i);
    int leftChildIndex = getLeftChildIndex(i);

    int currentIndexValue = (*heap)->array[i];
    int rightChildValue = (*heap)->array[rightChildIndex];
    int leftChildValue = (*heap)->array[leftChildIndex];

    // if currentIndex is not a leaf
    if( i < (*heap)->size / 2 ){

        // has right child?
        if( rightChildIndex < (*heap)->size ){
            // has right child

            if(rightChildValue < leftChildValue){
                // swap with right

                if( currentIndexValue > rightChildValue ){

                    // swap
                    int temp = (*heap)->array[currentIndex];
                    (*heap)->array[currentIndex] = (*heap)->array[rightChildIndex];
                    (*heap)->array[rightChildIndex] = temp;

                    siftDown(heap, rightChildIndex);
                }
            }else{
                // swap with left

                if( currentIndexValue > leftChildValue ){

                    // swap
                    int temp = (*heap)->array[currentIndex];
                    (*heap)->array[currentIndex] = (*heap)->array[leftChildIndex];
                    (*heap)->array[leftChildIndex] = temp;

                    siftDown(heap, leftChildIndex);
                }
            }
        }else{
            // no right child

            if( currentIndexValue > leftChildValue ){
                // swap

                // swap
                int temp = (*heap)->array[currentIndex];
                (*heap)->array[currentIndex] = (*heap)->array[leftChildIndex];
                (*heap)->array[leftChildIndex] = temp;

                siftDown(heap, leftChildIndex);
            }
        }
    }
}


int main(){

    Heap * heap = createHeap(5);

    int i;
    for(i = heap->capacity; i > 0; i--){
        push(&heap, i);
        printf("PUSH: %d (size: %d)\n\n", i, heap->size);
    }

    puts("======\n");

    for(i = 0; i < heap->capacity; i++){
        int x = pop(&heap);
        printf("POP: %d (size: %d)\n\n", x, heap->size);
    }

    return 0;
}



/* OUTPUT:

PUSH: 5 (size: 1)

PUSH: 4 (size: 2)

PUSH: 3 (size: 3)

PUSH: 2 (size: 4)

PUSH: 1 (size: 5)

======

POP: 1 (size: 4)

POP: 2 (size: 3)

POP: 3 (size: 2)

POP: 4 (size: 1)

POP: 5 (size: 0)

*/
