
#include <iostream>
#include <string> // string foo;
#include <cstring> // strcpy();

// You should include the class declaration and definitions in that file.
// #include "Person.h" 

using namespace std;

//
// Base class
//

class Human {

    public:

    string gender;
    int height;

    //
    // Constructor
    // in base class, the constructor parameters need to have a default value
    //
    Human(string gender = "", int height = 0);

    //
    // Methods
    //

    void setHeight(int height);
    int getHeight();

    private:

    char dna[100];
};


/**
* Contructor
* (constructor has no return type.)
*/
Human::Human(string gender, int height){
    this->gender = gender;
    this->height = height;
}


//
// Methods
//

int Human::getHeight(){
    return this->height;
}

void Human::setHeight(int height){
    this->height = height;
}

//
// Derived class
// C++ accepts multiple inheritance
//

class Person: public Human {

    public:

    string name;
    string address;
    int age;
    char foo[100];
    const char * bar;  // c++ does not like 'char *', it needs to be a 'const char *' ????

    //
    // Methods
    //
    
    // constructor
    Person(string name, int age); 

    // destructor 
    ~Person(); 

    void setName(string name);
    string getName();
    string sayName();
    
    protected:
    
    char baz[100];

    private:

    char password[100];
    char ssn[100];
}; // yes, we need a semicolon here.


/**
 * Contructor
 * (constructor has no return type.)
 */
Person::Person(string name, int age){
   this->name = name;
   this->age = age;
   cout << "A Person was created!" << endl;
}

Person::~Person(){
    // this->foo = 0;
    // this->bar = 0;
    cout << "Object is being deleted" << endl;
};

//
// Methods
//

string Person::getName(){
    return this->name;
}

void Person::setName(string name){
    this->name = name;
}

string Person::sayName(){
    string msg = "my name is ";
    msg += this->name;
    return msg;
}

//
// Main function
//

int main(){
  
    Person rick("Rick", 50);
    cout << rick.sayName() << endl; // my name is Rick
    rick.name = "Rick2";
    cout << rick.name << endl; // Rick2
    rick.setName("Rick3");
    cout << rick.name << endl; // Rick3
    
    // rick.foo = "hello";  //  does not work
    strcpy(rick.foo, "hello");
    rick.bar = "howdy";
    

    Person * brian = new Person("Brian", 28);
    cout << brian->sayName() << endl; // my name is Brian
    brian->name = "Brian2";
    cout << brian->name << endl; // Brian2
    brian->setName("Brian3");
    cout << brian->getName() << endl; // Brian3
    
    // brian->foo = "hello";  //  does not work
    strcpy(brian->foo, "hello");
    brian->bar = "howdy";

   return 0;
}
