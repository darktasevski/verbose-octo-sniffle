(function () {
  'use strict';

  function log(message) {
    console.log(message);
  }

  //pass in reference to fx
  setTimeout(log, 1000);

  //passin in function expression (annonymous fx)
  setTimeout(function () {
    log('woo!');
  }, 1000);

  function pulse() {
    console.log('boom, boom');
    counter += 1;

    //stops interval after 5 times
    if (counter === 5) {
      clearInterval(interval);
    }
  }

  //executes pulse every 1s, set counter to 0
  var interval = setInterval(pulse, 1000),    //comma to declare multiple variables
  counter = 0;









}());
