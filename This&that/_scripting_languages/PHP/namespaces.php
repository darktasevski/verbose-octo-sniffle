<?php
require_once('lib1.php');
require_once('lib2.php');
require_once('lib3.php');

use App\Lib1 as L1;
use App\Lib2 as L2;
# lib 3 does not have a namespace.

L1\MyFunction();
L1\MyClass::WhoAmI();
echo L1\FOO;

L2\MyFunction();
L2\MyClass::WhoAmI();
echo L2\FOO;

MyFunction();
MyClass::WhoAmI();
echo FOO;
?>