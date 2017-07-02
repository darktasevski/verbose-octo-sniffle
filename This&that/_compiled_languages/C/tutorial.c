#include <stdio.h>  // for printf(...)
#include <string.h>  // for strcpy(...)
#include <stdlib.h> // for malloc(...)

#define MY_CONSTATN 10;
const int daysInWeek  = 7;

//------------------------------------------------------------ function declaration
int max(int num1, int num2);
void changeValueOfIntPointer(int ** n);
void changeValueOfInt(int * n);

//------------------------------------------------------------ main function
int main() {
    char myName[50] = "brian spinos";
    printf("myName: %s \n", myName);  // brian spinos

    char firstName[] = "brian";
    printf("firstName[] : %s \n", firstName);  // brian

    int myNum = max(8, 12);
    printf("myNum from function: %i \n", myNum); // 12

    //--------------- pointers
    char * fullName = "brian joseph spinos";
    printf("full name: %s \n", fullName); // brian joseph spinos

    //--------------- change value of pointer:
    int x = 50;
    int * xp = &x;
    printf("before: %i\n", *xp); // 50
    changeValueOfIntPointer(&xp);
    printf("after: %i\n", *xp); // 100
    changeValueOfInt(&x);
    printf("after again: %i\n", *xp); // 150

    //--------------- function pointer:
    int (*p)(int, int);  // declaration of function pointer
    p = max;
    //--------------- calling a function pointer
    p(2,5);
    printf("the greates number is: %i\n", p(2,5));  // 5

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
void changeValueOfIntPointer(int ** n){
    int y = 100;
    *n = &y;
}

void changeValueOfInt(int * n){
    int y = 150;
    n = &y;
};

//------------------------------------------------------------ compile and run
// $ gcc c_tutorial.c -o c_tutorial
// $ ./c_tutorial
