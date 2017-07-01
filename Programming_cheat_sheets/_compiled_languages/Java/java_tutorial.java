// needs to be finished

// use the Person.java to compile and run, this is just a sandbox


public class Person extends Animal implements Runner {  // file name needs to be Person.java
    // you can nest classes in java!


   int personAge;  // instance variable ?

   public Person(String name){
      // This constructor has one parameter, name.
      System.out.println("Name chosen is :" + name );
      double[] myList = {1.9, 2.9, 3.4, 3.5}; // array
      this.name = name; // assignment of instance variable
   }

   public void setAge( int age ){
       personAge = age;
   }

   public int getAge( ){
       System.out.println("Person's age is :" + personAge );
       return personAge;
   }

   public static void main(String []args){
      /* Object creation */
      Person myPerson = new Person( "tommy" );

      /* Call class method to set person's age */
      myPerson.setAge( 2 );

      /* Call another class method to get person's age */
      myPerson.getAge( );

      myPerson.name; // instance variable

      /* You can access instance variable as follows as well */
      System.out.println("Variable Value :" + myPerson.personAge );
   }
}






//
for (int i = 0; i < 10; i++){
    // code...
}






double[] myList = {1.9, 2.9, 3.4, 3.5};
// Print all the array elements
for (double element: myList) {
    System.out.println(element);
}





// modifiers
public // visible outside the class

private // visible only inside the class

protected // Visible to the package and all subclasses

static // for creating class methods and class variables

final // modifier for finalizing the implementations of classes, methods, and variables. (constant?, unchangable)

abstract // modifier for creating abstract classes and methods.

synchronized // and volatile modifiers, which are used for threads.



// interfaces
public interface NameOfInterface
{
    //Any number of final, static fields
    //Any number of abstract method declarations
    public void eat();
    public void travel();
}






// compile
$ javac Person.java
// run
$ java Person


