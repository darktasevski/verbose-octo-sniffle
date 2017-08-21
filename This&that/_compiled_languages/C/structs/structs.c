#include <stdio.h>   // for printf()
#include <stdlib.h>  // for malloc()
#include <string.h>  // for assigning strings to char * strcpy(field, val)

/*
    Gotchas: 
    - all function calls need to be inside the main function
    - forgeting to use printf with the proper format string can cause segmentation fault.
    - strcpy() is design to work with char arrays
    - assignments should go inside the main function
*/

typedef struct foo_s {
    char * name;
    int age;
    struct foo_s * foobar;
} foo_t;

typedef struct person_s {
    char * name;
    int age;
    struct person_s * friend;
    foo_t * dude;  // person_t * wouldnt work, since its not completely declared...
} person_t;



int main()
{
    //------------------------------------------------------------
    person_t ana;  
    ana.name = "ana";
    // strcpy( ana.name, "ana"); // see gotcha
    printf("%s\n", ana.name);

    //------------------------------------------------------------
    struct person_s erich = {"erich", 25, NULL, NULL};
    struct person_s * erich_p = &erich;
    printf("%s\n", erich.name);
    printf("%s\n", erich_p->name);

    //------------------------------------------------------------
    person_t brian = {"brian", 27, NULL, NULL};
    person_t * brian_p = &brian;
    printf("%s\n", brian.name);
    printf("%s\n", brian_p->name);

    //------------------------------------------------------------
    // malloc - for unknown sizes, and read and write abilities
    //          also to persist variables when functions finish
    person_t sandra = {"sandra", 30, NULL, NULL};
    person_t * sandra_p = (person_t *) malloc(sizeof(person_t));
    sandra_p = &sandra;
    sandra.age = 31;
    printf("%s\n", (*sandra_p).name);
    printf("%s\n", sandra_p->name);
    printf("%d\n", (*sandra_p).age);  // see Gotcha above
    printf("%d\n", sandra_p->age);

    //------------------------------------------------------------
    return 0;
}

