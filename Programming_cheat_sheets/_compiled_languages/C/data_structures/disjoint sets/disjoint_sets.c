#include <stdio.h>
#include <stdlib.h>

//
// Disjoint Sets
//

typedef struct Set{
    int size;
    int capacity;
    int * array;
} Set;

Set * createSet(int capacity){
    Set * set = (Set *)malloc(sizeof(Set));
    set->size = 0;
    set->capacity = capacity;
    set->array = (int *)malloc(sizeof(int) * capacity);
    
    int i;
    
    // initialize array elements to -1
    for(i = 0; i < capacity; i++){
        set->array[i] = -1;
    }
    
    return set;
}

int find(Set ** set, int index){
    int parent = (*set)->array[index];

    /**
     * Recursion base case:
     *     - `parent` value is a negative number, it means it has no parent
     */
    if(parent < 0){
        return index;
    }
    
    // recursion
    (*set)->array[index] = find(set, parent);
    
    return (*set)->array[index];
}

void _union(Set ** set, int x, int y){
    int xP = find(set, x);
    int yP = find(set, y);
    
    if(xP == yP){
        return;
    }
    
    if( (*set)->array[xP] < (*set)->array[yP] ){
        (*set)->array[y] = xP;
    }else if( (*set)->array[xP] > (*set)->array[yP] ){
        (*set)->array[x] = yP;
    }else if( (*set)->array[xP] == (*set)->array[yP] ){
        (*set)->array[yP] = xP;
        (*set)->array[xP]--;
    }
}

void display(Set ** set){
    int i;
    
    for(i = 0; i < (*set)->capacity; i++){
        int val = (*set)->array[i];
        
        printf("%d [%d] \n", i, val);
    }
}

int main()
{
    Set * set = createSet(10);
    
    // union
    _union(&set, 5, 0);
    _union(&set, 5, 1);
    _union(&set, 5, 2);
    _union(&set, 5, 3);

    // find
    int x;

    x = find(&set, 1); // 5
    printf(" -> index 1 belongs to %d \n", x);

    x = find(&set, 2); // 5
    printf(" -> index 2 belongs to %d \n", x);

    x = find(&set, 3); // 5
    printf(" -> index 3 belongs to %d \n", x);

    //
    //
    //

    x = find(&set, 4); // 5
    printf(" -> index 4 belongs to %d \n", x);

    x = find(&set, 5); // 5
    printf(" -> index 5 belongs to %d \n", x);

    x = find(&set, 6); // 5
    printf(" -> index 6 belongs to %d \n", x);
    
    display(&set);
   

    return 0;
}


/*
// OUTPUT:

 -> index 1 belongs to 5 
 -> index 2 belongs to 5 
 -> index 3 belongs to 5 
 -> index 4 belongs to 4 
 -> index 5 belongs to 5 
 -> index 6 belongs to 6 
0 [5] 
1 [5] 
2 [5] 
3 [5] 
4 [-1] 
5 [-2] 
6 [-1] 
7 [-1] 
8 [-1] 
9 [-1] 

*/
