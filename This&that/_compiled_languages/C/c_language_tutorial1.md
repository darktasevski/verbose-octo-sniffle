# c language

run code online http://www.tutorialspoint.com/compile_c_online.php

tutorial http://www.tutorialspoint.com/cprogramming/

---

http://cocoadevcentral.com/articles/000081.php

pointers: http://theocacao.com/document.page/234

arrays: http://theocacao.com/document.page/231

---

- in a C program you should have at least 3 files:
  - a header file, containing your structs and function declaration(not definition)
  - a .c  with your function definitions(not declarations)
  - a .c file with the 'main function'

  - $ gcc the_main_program.c my_functions.c -o test3  # no need to include the header file here, it should be in the the_main_program.c
  - $ ./test3




# valid variables:
```c
 // any uppercase or lowercase letters and underscore '_'
Foo
FOO
_
_bar
_BAR
_bar
__

a234234
A23423
Aaaa23423
```


# data types
```c
_Bool // 0 -> FALSE, and 1 -> TRUE
int  // number
float // number with decimals -> 123.44
double // double memory size of a float -> 324234234234234.23
char // single character
long int // huge number, no decimals

```


# strings (they are arrays of characters)
```c
// include spaces and an extra space for the ending character -> \0
char myName [13] = "brian spinos";

// [b][r][i][a][n][][s][p][i][n][o][s][\0]

```

# more strings
```c
char x[] = "brian";
printf(" %s \n", x);

```






# functions

```c
// declare a function (usually in a header file)
int   myFunction ( int value1, int value2 );

// define a function:
int myFunction (int value1, int value2)
{
  return value1 - value2;
}

// call a function

int myVariable = myFunction (8, 12);



```









- you need to declare functions outside of main , using a prototype
  (this is not function definition, which goes inside the main function )
    - example

```c

      // USE HEADER FILES !!!! <--------------------------------
      /* example of prototypes */
      int   difference ( int value1, int value2 );
      float changeDue  ( float amountPaid, float costOfItem );
```

- function definition:
```c
// This is called the function implementation.
int difference (int value1, int value2)
{
  return value1 - value2;
}

```



# run a c program from a file:
```bash
//Open Terminal and change to the directory which contains test2.c. Then, type "gcc test2.c -o test2" to compile.
$ gcc test2.c -o test2
//Type "./test2" to run the program.
$ ./test2
```




# interpolation
```c
int var1 = 3;
int var2 = 8;
printf ("First value: %i second value: %i", var1, var2);

/*

%i / %d   ->   int
%u        ->   unsigned int
%f        ->   float
%c        ->   char
%e        ->   scientific big number
%p        ->   pointers
%c        ->   char
%ld       ->   long int
%s        ->   character array
%x        ->   pointer address in hexadecimal?

*/
```




# Type Casting
```c
// Sometimes you need to convert a variable from one type to another

int multiply (int x, int y)
{
  return x * y;
}

int   trips           = 6;
float distance        = 4.874;
int   approxDistance  = (int)distance;  // <------  (int)distance is converting from float to int

int total = multiply ( trips, approxDistance );


// you can have a space between the type cast and the variable! example:
// (int)distance
// (int) distance
```

# more type casting

```c
int result = multiply (trips, (int)distance);
```


# type casting for function returns

```c
int multiply (int x, int y)
{
  return x * y;
}

float result;
result = (float) multiply (3, 6);
```


# Header File

```c
// math_functions.h
int   sum       (int x, int y);
float average   (float x, float y, float z);


```


```c

// math_functions.c    this file has the function definitions (so you can combine with other .c files with GCC)
int sum (int x, int y)
{
  return (x + y);
}

float average (float x, float y, float z)
{
  return (x + y + z) / 3;
}
```

```c
// test3.c
#include <stdio.h>           // <------------- C headers have angle brackets
#include "math_functions.h"  // <------------- my custom header has double quotes

main ()
{
  int   theSum     = sum (8, 12);
  float theAverage = average (16.9, 7.86, 3.4);

  printf ("the sum is: %i ", theSum);
  printf ("and the average is: %f \n", theAverage);
  printf ("average casted to an int is: %i \n", (int)theAverage);
}
```


# GCC combine two files

```bash
$ gcc test3.c math_functions.c -o test3
// Run the program by typing
$ ./test3

```


# Structs

```c
// its a structured groups of variables

typedef struct {
  int lengthInSeconds;
  int yearRecorded;
} Song;   //  <---------- creates a new type variable named: Song


// a field in a struct can be any type (even another struct).

// Once you define a struct, you can use it the same way you'd use int, float or char.




Song song1;

song1.lengthInSeconds =  213;
song1.yearRecorded    = 1994;

Song song2;

song2.lengthInSeconds =  248;
song2.yearRecorded    = 1998;



Song thirdSong  = { 223, 1997 };  // another way to create a struct instance? Im 99% sure...

```


```c
// you can put your structs and function declarations(not implementations) in a HEADER FILE

// song.h

typedef struct {
  int lengthInSeconds;
  int yearRecorded;
} Song;

Song  make_song    (int seconds, int year);
void  display_song (Song theSong);

```




# constants

```c
const float goldenRatio = 1.618;
const int   daysInWeek  = 7;

```



# arrays

```c
int myArray[5];
myArray[0] = 99;
myArray[1] = 120;
myArray[2] = 22;
myArray[3] = 8287;
myArray[4] = 0;

// you can have a space between the variable name and the square brackets!
```



# pointers explained simple

```c
// declare a basic int variable  
int number = 18;

// use the asterisk to _declare_ a pointer
int * numberPointer;    // int is the type of data stored at that address

// assign a value to the pointer
numberPointer  = &number;

// use the asterisk again, this time to _fetch_
// the value of the _target_ variable (number)

printf ("Value of target: %i", *numberPointer);

```




# pointers (example code)

```c

#include <stdio.h>

main ()
{
  // declare an int variable and an int pointer variable
  int  number;
  int* pointer;

  // set a value for 'number'
  number = 5;

  // now link 'pointer' to 'number' by putting the 'addressof'
  // operator (&) in front of the number variable
  pointer = &number;

  // print values of number and pointer
  // note the %p marker is used for pointer and &number
  printf( "value of number:  %i\n", number );
  printf( "value of &number: %p\n", &number );
  printf( "value of pointer: %p\n", pointer );

  // print value of pointer's target (number) using
  // the asterisk (*) operator
  printf( "value of pointer's _target_: %i\n", *pointer );  // <------------ use the * again on a pointer to show its value, and not the address. This is called dereferencing.
}

/*
This gives you something similar to this:

value of number:  5
value of &number: 0xbffffc5c
value of pointer: 0xbffffc5c
value of pointer's _target_: 5
*/

```


# pointer syntax

```c
// &x    ->    it means "address of the variable x"
// *y    ->    it means "value of the pointer y"


// all are valid
int* numberPointer;
int * numberPointer;
int *numberPointer; // this is the prefered!

```




# other c functions

```c
sizeof();
malloc(); // returns a pointer
free();  // frees used memory
calloc();
```
