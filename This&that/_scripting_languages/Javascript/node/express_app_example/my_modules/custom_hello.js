// custom_hello.js (module)

var hello = function(){
  return "hello from my module!";
};

module.exports = hello; // make module's function public! so others can use it
