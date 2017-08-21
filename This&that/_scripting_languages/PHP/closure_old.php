<?php

class Person{
    private $name;
    private $lastName;
    
    function Person($name){
        $this->name = $name;
        $this->lastName = 'Spinos';
    }
    
    function getName(){
        return $this->name;
    }
    
    function getClosure($varForTheClosure){
        return function() use($varForTheClosure){ // to use parameters with a closure
            return "\nI have access to name: $this->name, and: $varForTheClosure";
        };
    }
}


$brian = new Person('brian');
echo $brian->getName();


$varForTheClosure = 'outside world';
$myClosure = $brian->getClosure($varForTheClosure);

$brian = null; // delete brian object

echo $myClosure();

// echo $brian->getName(); // error (because the object was deleted! but the closure still has access to it!)


?>
