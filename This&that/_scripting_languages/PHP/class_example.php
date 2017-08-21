<?php
/*
---------------------------- Interfaces
    implements

---------------------------- Constant
    const foo = 'bar';

---------------------------- abstract class
    - cannot be instantiated, only inherited.
    - you need to implement the abstract functions in the child class

----------------------------  class variables
    - static (key word)
    MyClass::foo();

---------------------------- final function
    - child cannot override

---------------------------- inheritance
    extends


ParentClass::func();  # call parent function!  # or:  parent::foo();
self::myFunc();

MyClass::MyClass($name);  //


---------------------------- `use` keywork
    - use it when you dont want to type the full namespace behind your classes and functions...


*/
?>


<?php
// # file name:    '/my_file1.php'
// namespace foo\bar; # the code under this line will be under this namespace
//         # function foo1


// use another_namespace_here\bar as X;
// echo \foo\baz\MyFunction()

?>




<?php

// require_once('/my_file1.php');
// use \foo\bar;

// foo1("arg");

?>

<?php
//----------------------------------------------- php visibility:



    // public: accessible inside/outside of the class definition
    // protected: accessible inside the classes definition and its child class definitions
    // private: accessible inside the class definition only
    class Foo {
		
        private $fooPrivateField = "Foo private field\n";
        protected $fooProtectedField = "Foo protected field\n";
        public $fooPublicField = "Foo public field\n";
		
        private function fooPrivateMethod(){
            echo "Foo private function\n";
        }
        protected function fooProtectedMethod(){
            echo "Foo protected function\n";
        }
        public function fooPublicMethod(){
            echo "Foo public function\n";
        }
    }

    class Bar extends Foo{
		
        private $barPrivateField = "Bar private field\n";
        protected $barProtectedField = "Bar protected field\n";
        public $barPublicField = "Bar public field\n";
		
        private function barPrivateMethod(){
            echo "Bar private function\n";
        }
        protected function barProtectedMethod(){
            echo "Bar protected function\n";
        }
        public function barPublicMethod(){
            echo "Bar public function\n";
        }
        // to be used outside the class definition (it needs to be public)
        public function parentStuff(){
            //echo $this->fooPrivateField;  // undefined
            echo $this->fooProtectedField;
            echo $this->fooPublicField;
			
			// $this->fooPrivateMethod();  // fatal error
            $this->fooProtectedMethod();
            $this->fooPublicMethod();
        }
    }
	
    echo "----------------- bar\n";
    $bar = new Bar();

    //echo $bar->barPrivateField;      // fatal error
    //echo $bar->barProtectedField;    // fatal error
    echo $bar->barPublicField;

    //$bar->barPrivateMethod();        // fatal error
    //$bar->barProtectedMethod();    // fatal error
    $bar->barPublicMethod();

    echo "----------------- bar's parentStuff\n";
    $bar->parentStuff();

    echo "----------------- bar accessing Foo methods and fields\n";
    //$bar->fooPrivateMethod();     // fatal error
    //$bar->fooProtectedMethod();   // fatal error
    $bar->fooPublicMethod();

    // echo $bar->fooPrivateField; // Undefined 
    // echo $bar->fooProtectedField; // Cannot access protected property
    echo $bar->fooPublicField;

// output:

// ----------------- bar
// Bar public field
// Bar public function
// ----------------- bar's parentStuff
// Foo protected field
// Foo public field
// Foo protected function
// Foo public function
// ----------------- bar accessing Foo methods and fields
// Foo public function
// Foo public field


?>
