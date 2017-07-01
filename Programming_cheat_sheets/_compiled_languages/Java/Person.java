/**
 * File name: Main.java
 *
 * Compile:
 *     $ javac Main.java
 *
 * Run program:
 *     $ java Main
 *
 */
public class Main{

    /**
     * We need a static class for it to be instantiated in the `main` function
     * of the `Main` class
     */
    static class Person{

        //
        // Instance variables
        //

        private String name;  
        private String age;  
        private String address;  
  
        /*
         * Constructor
         */
        public Person(String name){
            this.name = name;
            System.out.println("Name chosen is: " + name);
        }

        //
        // Getters and setters
        //

        public void setName(String name){
            this.name = name;
            System.out.println("Name Set to: " + name);
        }

        public String getName(){
            // System.out.println(this.name);
            return this.name;
        }

    }

    public static void main(String[] args){

        Person brian = new Person("Brian"); 
        // Name chosen is: brian

        brian.setName("Erich");
        String name = brian.getName();
        System.out.println("Name: " + name);

        /** 
         * You can access instance variables as follows as well 
         * but its better to use a method (encapsulation)
         */
        // System.out.println("Name: " + brian.name); // Name: Erich

    }
}

/*

// OUTPUT:

Name chosen is: Brian
Name Set to: Erich
Name: Erich

*/
