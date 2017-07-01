// jshint esversion: 6

function hammerTime(time) {
  window.setTimeout(function(){
    alert(`${time} is hammertime!`);
  }, 5000);         //time delay is right here (5s)
}

hammerTime('STOP');
hamerTime(5);
//ASYNC with closure
//
