// pointers with structs

#include <stdio.h> // for printf()
#include <stdlib.h> // for malloc()
#include <string.h> // for strcpy()

struct person_s{
    int age;
    char name[50];
    char * address;
};

typedef struct person_s Person;


int main(){

    // the variable `brian` is a Person pointer
    Person * brian = (Person *)malloc(sizeof(Person));

    brian->age = 27;
    strcpy(brian->name, "brian spinos");

    // does not work, because:
    // strcpy(char string[], char string[]);
    // and NOT:
    // strcpy(char *, char string[]);

    // strcpy(brian->address, "123 foobar Rd"); 

    brian->address = "123 foobar Rd";

    printf("My name is: %s\n", brian->name);
    printf("My age is: %d\n", brian->age);
    printf("My address is: %s\n", brian->address);
    return 0;
}
