#include <stdio.h>  // for printf(...)
#include <string.h>  // for strcpy(...)
#include <stdlib.h> // for malloc(...)

//------------------------------------------------------------ structs
typedef struct Person{
    int age;
    char * name;
    char * address;  //  usage:  person.address = "123 foobar st"; // it needs to be double quoted...
    char message[50];
    void (*greet)(char * name);  // function pointers
} Person;


//------------------------------------------------------------ function declaration
void showInfo(Person * person);
void changeNameOfPersonStruct(Person * person);
void changeNameOfPersonPointer(Person ** person);

void greet(char * name);

//------------------------------------------------------------ main function
int main(){
    //----------------- structs
    Person erich;
    erich.name = "erich";  //  strings needs to be double quotes
    erich.address = "345 barfoo Ave";
    erich.age = 25;
    strcpy(erich.message, "hello dude"); // this is how to assign char arrays
    showInfo(&erich);
    erich.greet = greet;  // assigning a function to the function pointer
    erich.greet("john");  // hello john!

    //----------------- struct pointers
    Person brian;
    Person * brian_p = &brian;
    brian_p->name = "brian";  // this is how to assign char pointers, a.k.a.: "strings"
    brian_p->address = "123 foobar st";
    brian_p->age = 27;
    strcpy(brian_p->message, "hello there"); // this is how to assign char arrays
    showInfo(brian_p);

    changeNameOfPersonStruct(&brian);
    showInfo(&brian);
    changeNameOfPersonPointer(&brian_p);
    showInfo(&brian);

    brian.greet = greet;  // assigning a function to the function pointer
    brian.greet("mark");  // hello mark!

    return 0;
}

//------------------------------------------------------------ function definitions

void showInfo(Person * person){ // parameter is an address of a struct
    printf("\nPerson\nName: %s\nAddress: %s\nAge: %i\nmessage: %s\n\n", person->name, person->address, person->age, person->message);
};

void changeNameOfPersonStruct(Person * person){ // parameter is an address of a struct
    person->name = "brian2";
};

void changeNameOfPersonPointer(Person ** person){ // parameter is an address of a pointer to a struct
    (*person)->name = "brian3";  // the `->` is executed first, so we need parenthesis!
    // (**person).name = "brian3";  // same as above
};

void greet(char * name){
    printf("hello %s!\n", name);
};

//------------------------------------------------------------ compile and run
// $ gcc c_tutorial.c -o c_tutorial
// $ ./c_tutorial


