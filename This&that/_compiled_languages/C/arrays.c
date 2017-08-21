#include <stdio.h>

/*
 * Gotchas!
 * - `->` has higher precedence
 * - 0 and '\0' are NULL
 * - do NOT dereference a null pointer!  (int * x; *x;)
 * - 
 * - 
 * - 
 */

int main()
{
    // int array
    int myNums[] = {1, 2, 3, 0}; // the last item needs to be null (for loops of unknown size)
    myNums[0] = 100; // changing the first element of the array
    
    // char array (string)
    char myString[] = {'a', 'n', 'a', '\0'}; // the last item needs to be null (for loops of unknown size)
    myString[0] = 'x'; // changing the first element of the array
    
    // pointer array
    int num1 = 10;
    int num2 = 20;
    int num3 = 30;
    int num4 = 40;
    int * num1_p = &num1;
    int * num2_p = &num2;
    int * num3_p = &num3;
    int * num4_p = &num4;
    int * myRefNums[] = {num1_p, num2_p, num3_p, num4_p, 0}; // the last item needs to be null (for loops of unknown size)
    myRefNums[0] = num4_p;


    int i;
    //-------------------------------------------------------
    printf("\n");
    i = 0;
    for(i = 0; i < 3; i++){
        printf("myNums[%d]: %d\n", i, myNums[i]);
    }

    printf("\n");
    i = 0;
    while(myNums[i]){
        printf("myNums[%d]: %d\n", i, myNums[i]);
        i++;
    }

    //-------------------------------------------------------
    printf("\n");
    i = 0;
    for(i = 0; i < 3; i++){
        printf("myString[%d]: %c\n", i, myString[i]);
    }

    printf("\n");
    i = 0;
    while(myString[i]){
        printf("myString[%d]: %c\n", i, myString[i]);
        i++;
    }

    //-------------------------------------------------------
    printf("\n");
    i = 0;
    for(i = 0; i < 3; i++){
        printf("myRefNums[%d]: %d\n", i, *myRefNums[i]);
    }

    printf("\n");
    i = 0;
    while(myRefNums[i]){ 
        printf("myRefNums[%d]: %d\n", i, *myRefNums[i]);
        i++;
    }
    
    printf("\n");
    int ** temp; // myRefNums is an array of pointers (so a pointer to pointer)
    temp = myRefNums; 
    while(*temp){ 
        printf("myRefNums: %d\n", **temp);
        temp++; // because myRefNums++ does not work (array is not an lvalue)
    }

    //-------------------------------------------------------
    return 0;
}
