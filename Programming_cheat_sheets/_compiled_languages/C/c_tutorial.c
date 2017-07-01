#include <stdio.h>  // for printf(...)
#include <string.h>  // for strcpy(...)
#include <stdlib.h> // for malloc(...)

#define MY_CONSTATN 10;
const int daysInWeek  = 7;



//------------------------------------------------------------ memory

// - stack memory: it's an actual stack, functions push their local variables there,
//   and as soon as the function exits, the local variables are freed. If you use the "static" keyword
//   for the local variable, it will not be lost, but only available for that function.
//      - you can NOT resize an array allocated on the stack.
// - Heap memory: use it for your structs! And local variables that you want to become
//   global variables. You are responsible to free them.
//      - you CAN resize an array allocated on the HEAP.
// - Calloc() initializes all elements to ZERO, it takes two arguments: num, size
// - You should always use free() to deallocate memory that has been allocated with malloc()
//   or calloc(), as soon as you don't need it any more.

//------------------------------------------------------------

// - In C single quotes identify a single character, while double quotes create a string literal.
//   'a' is a single a character literal, while "a" is a string literal containing an 'a' and a null terminator

//------------------------------------------------------------ structs
typedef struct Person{
    int age;
    char name[50];
    // char * name;
} Person;

//------------------------------------------------------------ function declaration
int max(int num1, int num2);
void changer(Person * person);
void changer2(Person ** person);
void num_changer(int ** n);



//------------------------------------------------------------ main function
int main() {
    char myName [13] = "brian spinos";
    printf("myName: %s \n", myName);
    char firstName[] = "brian";
    printf("firstName[] :%s \n", firstName);


    Person brian;
    brian.age = 27;
    // brian.name = "brian j spinos";  // arrays are not assignable...
    strcpy(brian.name, "brian j spinos");
    printf("brian's name: %s (%i) \n", brian.name, brian.age);

    Person erich;
    erich.age = 25;
    // erich.name = "erich e spinos"; //arrays are not assignable...
    strcpy(erich.name, "erich e spinos");
    printf("erich's name: %s (%i) \n", erich.name, erich.age);


    int myVariable = max(8, 12);
    printf("myVariable from function: %i \n", myVariable);

    //------- pointers
    char * fullName = "brian joseph spinos";
    printf("full name: %s \n", fullName);

    //------- pointers to structs
    Person * brian_pointer = &brian;
    printf("brian pointer: %s \n", brian_pointer->name);


    //-------- changing pointer values:
    printf("test4 (should be brian): %s \n", brian.name);
    printf("%p\n", &brian);
    changer(&brian);
    printf("test3 (should be rick): %s \n", brian.name);
    printf("brian's name was changed to: %s \n", brian.name); // rick


    //----------- test 123
    printf("------------------------------- test 123\n");
    // printf("--bp %p\n", brian_pointer);
    // printf("-- %s\n", brian_pointer->name); //'rick'
    changer2(&brian_pointer);
    // printf("--bp %p\n", brian_pointer);
    printf("changing name to 'sandra' :  %s\n", brian_pointer->name); //'sandra'


    //----------- change value of pointer:
    int x = 50;
    int * xp = &x;
    printf("before: %i\n", *xp);
    num_changer(&xp);
    printf("after: %i\n", *xp);


    //--------------- function pointer:
    int (*p)(int, int);  // declaration of function pointer
    p = max;
    p(2,5);  // calling a function pointer
    printf("the greates number is: %i\n", p(2,5));

    return 0;
}



//------------------------------------------------------------ function implementation
/* function returning the max between two numbers */
int max(int num1, int num2) {

   /* local variable declaration */
   int result;

   if (num1 > num2)
      result = num1;
   else
      result = num2;

   return result;
}

//------------------------------------------------------------
void changer(Person * person){
    Person rick;
    rick.age = 50;
    strcpy(rick.name, "richard l spinos");
    *person = rick;
}

//------------------------------------------------------------
void changer2(Person ** person){
    // printf("--bp %p\n", *person);
    // printf("--r %s\n", (*person)->name); // 'richard l spinos'

    // Person sandra;  // sandra will be lost, when the function exits, we need to use malloc()
    // sandra.age = 50;
    // strcpy(sandra.name, "sandra c spinos");

    // Person * sandra_p = &sandra;  // when the function exits, this pointer will point to nothing, because sandra will be lost.
    // printf("--s %s\n", sandra_p->name); // 'sandra c spinos'
    // **person = *sandra_p;  // this works! (because **person already existed outisde this function, and we are assigning a Person directly!)
    // **person = sandra;    // this works! (same reason as above, just not using a dereferenced pointer)
    // *person = sandra_p; // does not work, why ??? (because the 'sandra' variable is lost after the function exits, we need to use malloc() so the memory can persist outside of the function)
    //------------------------------------------------------------
    Person * sandra  = malloc(sizeof(Person));  // that why we need to allocate memory outside of this function, using malloc(...);
    sandra->age = 50;
    strcpy(sandra->name, "sandra");
    *person = sandra;

}
//------------------------------------------------------------
void num_changer(int ** n){
    int y = 100;
    *n = &y;
}

//------------------------------------------------------------ compile and run
// $ gcc c_tutorial.c -o c_tutorial
// $ ./c_tutorial
