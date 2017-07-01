
/**
 * The keyword `using System;` means that the program is using the 'System' namespace, 
 * so you dont need to prepend everything with the namespace.
 */
using System;


/**
 * just as the name implies, its just a namespace
 */
namespace MyWorld { 

   // Enums
   enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
   // int foo = (int)Days.Sun; // 0
   // int bar = (int)Days.Mon; // 1 
   
   //
   // Interfaces
   //
   public interface AbilityInterface {
      void fly();
      void work();
      // void swap(ref int x, ref int y); // pass by reference
   }

   //
   // Base class
   //
   class Human {

      // Constants
      const double pi = 3.14159;   

      // Attributes:
      string name;

      // Array
      double[] balanceA = new double[10];
      // balanceA[0] = 4500.0; // not working ?
     
      double[] balanceB = { 10.0, 20.50, 30.0 };

      //
      // Methods
      //

      public void walk(){
         // Console.WriteLine("walking: {0} {1} {2}", foo, bar, baz);
         Console.WriteLine("Human walking...");
      } 

      public void details(){
         Console.WriteLine("Human: {0} {1} {2}", "foo", "bar", "baz");
      } 

      //
      // Casting
      //

      // double d = 123.45;
      // int x = (int)d;
   }

   //
   // derived class
   // (using inheritance and interface)
   //

   class Person : Human, AbilityInterface {

      // Attributes
      string name;
      string address;
      int age;

      // Constructor
      public Person(string name, int age){
         Console.WriteLine("Person created: {0}", name);
         this.name = name;
         this.age = age;
      }

      public void fly(){
         Console.WriteLine("Person flying...");
      }

      public void work(){
         Console.WriteLine("Person working...");
      }

      //
      // Getters and setters
      //

      public void setName(string name){
         this.name = name;
      }

      public string getName(){
         return this.name;
      }
   }

   //
   // Main class
   //
   class ExecuteThisStuff {

      // Main function
      static void Main(string[] args){

         Person brian = new Person("Brian", 28); // Person created: Brian
         brian.walk(); // Human walking...
         brian.fly(); // Person flying...
         brian.details(); // Human: foo bar baz

         brian.setName("Erich");
         string name = brian.getName();
         Console.WriteLine("New name: {0}", name); // New name: Erich
      }
   }
}

