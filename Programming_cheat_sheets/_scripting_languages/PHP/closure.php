<?php

// Create a user
$user = "Brian";

echo "Hello $user"; // "Hello Brian"

// Create a Closure
$greeting = function() use (&$user){
    $user = $user . "2"; // access to another scope!
    echo "Hello $user";
};
  
// Greet the user
$greeting(); // "Hello Brian2"

// Proof that another scope was changed:
echo "Hello $user"; // "Hello Brian2"

?>
