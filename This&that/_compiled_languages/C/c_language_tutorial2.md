# C language tutorial


- case sensitive


### comments

```c
/*
multi-line comment
*/

// single line comment
```


### pointers (example 1)

```c
char y;
char x;
char *p; // declare a pointer variable

x = 'hello';
p = &x; // the address of x (p here is already a pointer variable, that was declared above, and does not require to repeat the asterisk)
y = *p; // 'hello' (the asterisk on p gets the value of what is stored in that address)

```

### pointers (example 2)

```c
char y;
char x = 'hello';
char *p = &x; // declare a pointer variable with a value of 'the address of x'


y = p; // the address of x (p here is already a pointer variable, that was declared above, and does not require to repeat the asterisk)
y = *p; // 'hello' (the asterisk on p gets the value of what is stored in that address)
```

### functions

```c
/* syntax:  <return-type> <function-name>( parameter list)
            {
            body
            }
*/

/* function that returns the max between two numbers */
int max(int num1, int num2)
{
  /* local variable declaration*/
  int result;
  if(num1 > num2)
    result = num1;
  else
    result = num2;
  return result;
}


```


### include a library


```c
#include <stdio.h>
//  the rest of the code
```



### calling a function

```c
printf("hello, world\n");
```



### a program


```c
#include <stdio.h>

int main ()
{
  printf("hello brian");
  return 0; // ???
}
/*
$ cd ~/Desktop
$ gcc -G -Wall -pedantic -o hello hello.c
$ ./hello
*/









```


### constant


```c
#define MAX_LEN 80

#define MYNAME "brian spinos"
```



### array (specify size)

```c
int x[] = {1, 2, 3, 4, 5}

// same as
int x[5] = {1, 2, 3, 4, 5}


// access an element

int y = x[2]
```
