// pointers

#include <stdio.h> // for printf()

/*
 * Gotchas!
 * - `->` has higher precedence
 * - 0 and '\0' are NULL
 * - do NOT dereference a null pointer!  (int * x; *x;)
 * - 
 * - 
 * - 
 */

int main(){
    
    // pointers
    int num = 10;
    
    // always initialize pointers (they could be pointing to some random data...)
    int * num_p = &num; // pointers always take addresses
    
    // NEVER direference a NULL pointer
    int * nullPtr = 0;
    // printf("%d \n", *nullPtr); // ERROR: segmentation fault
    
    
    // dereference a pointer (get the value it's pointing to):
    printf("%d\n", *num_p);
    
    // walk through memory using a pointer:
    printf("%d\n", *(num_p + 1) ); // it can be any offset
    
    //------------------------------------------------------------------------------------------------------

    int myNum = 10;
    int * pointer = &myNum; // a pointer receives an address of an int, not a string, not an int...
    printf("%d\n", *pointer);

    char * name = "brian";  // in C a string IS a char pointer! (use double quotes!)
    printf("%s\n", name);

    char address[] = "123 foobar st";  // in C a char array is the same as a char pointer (an array variable is the same as a pointer variable!)
    printf("%s\n", address);  // since an array variable is the same as an array variable, we dont need the asterisk!


    name = address;
    printf("%s\n", name); // "123 foobar st"

    //---------------------------------------------- this does NOT work (an array can NOT be a left value, only array[someIndex] )
    // address = name;
    // printf("%s\n", address); // "123 foobar st"

    return 0;
}
