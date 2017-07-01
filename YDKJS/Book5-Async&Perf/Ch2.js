/**
 * Chapter 2: Callbacks
*/

// What is the order of operations?
doA(function() {
  doB(); 
  doC(function() {
    doD();
  })
  doE();
})
doF();

// Order of operations:
doA()
doF()
doB()
doC()
doE()
doD()