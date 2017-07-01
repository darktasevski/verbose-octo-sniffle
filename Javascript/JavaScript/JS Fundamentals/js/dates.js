(function() {
  'use strict';

  var now = new Date();     //current time
  console.log(now);
  console.log(typeof Date());   //string

  var partyTime = new Date(9532187513);
  console.log(partyTime);

  var dob = new Date('january 1 1990');
  console.log(dob);   //defaults to midnight when not specified

  var notADate = new Date('my name is Kai');
  console.log(notADate);    //invalid date

  var specialDate = new Date('2013, 6 13');
  console.log(specialDate);

  console.log(specialDate.getDate());
  console.log(specialDate.getMonth());
  console.log(specialDate.getFullYear());
  console.log(specialDate.getYear());   //deprecated (b/c it only returns the last 2 digits of the year)

  console.log(specialDate.getUTCDate());
  console.log(specialDate.getDay());

  console.log(specialDate.toString());    //converter
  console.log(specialDate.toUTCString());    //converter
  console.log(specialDate.toDateString());    //converter
  console.log(specialDate.toTimeString());    //converter
  console.log(specialDate.toLocaleString());    //  6/13/2013 12:00:00 AM
  









}());
