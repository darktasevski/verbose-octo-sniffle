<?php
//------------------------------------------------------ parent class
class Mamal{
    var $foo;
    var $bar = "bar here\n";
    // public|protected|private $field1;

    function Mamal($name){ // same as: `function __construct($name){`
        $this->name = $name;
    }

    function __destruct(){ // calle when instance is set to `null`
        echo "Goodbye!\n";
    }

    function getName(){
        echo "My name is $this->name!\n";
    }
    function setName($name){
        $this->name = $name;
    }

    function baz(){
        echo "hello from parent\n";
    }

    final function payBills(){
        // child cannot override this!
        echo "children cannot change me!";
    }
}
//------------------------------------------------------ child class
class Dog extends Mamal implements Feed{
    const MyConstant = "HERE IS A CONSTAT!!!\n";
    static $myClassName = "This is a Dog Class\n";

    // If the class itself is being defined final then it cannot be extended.

    // self  // a pointer to this class
    // $this  // a pointer to this instance

    function Dog($name){
        Mamal::Mamal($name);  // calling the parent constructor
    }

    function baz(){  // overriding parent function!
        echo "hello from child\n";
    }

    function eat(){
        echo $name . "$this->name is eating...\n";
    }

    function showConstant(){
        echo Dog::MyConstant;
    }
}
//------------------------------------------------------ interface
interface Feed{
    function eat();
}

//------------------------------------------------------ abstract class
// this class cannot be instantiated, only inherited!
abstract class MyAbstractClass {
   abstract function myAbstractFunction();
}



$dog = new Dog("Buddy");  // you can omit the parenthesis is the constructor doesnt need them...
$dog->getName();
$dog->setName("brian");
$dog->getName();
$dog->baz();
$dog->eat();
$dog->showConstant();
echo Dog::$myClassName;
$dog = null; // calls destructor









?>