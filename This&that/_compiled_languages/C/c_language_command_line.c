#include <stdio.h>

#define MAX_LEN 80

int main (int argc, char *argv[])
{
  char a_word[MAX_LEN];

  printf ("Enter a word:");
  scanf ("%s", a_word);
  printf ("You entered: %s\n", a_word);
  return 0;
}
/*
$ cd ~/Desktop
$ gcc -G -Wall -pedantic -o hello hello.c
$ ./hello
*/
