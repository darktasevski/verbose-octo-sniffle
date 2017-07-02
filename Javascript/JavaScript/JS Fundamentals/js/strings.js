(function() {
  'use strict';

  var testString = 'testing string';

  console.log(testString.length);


    //separator, limit (max size of array)
  console.log(testString.split('.'));

    //search string, index to start searching from
  console.log(testString.indexOf('t',1));

  console.log(testString.lastIndexOf('s'));

  console.log(testString.toUpperCase());

    //start at 4, return rest of the string
  console.log(testString.substring(4));

  console.log(testString.slice(0,4));

  console.log('       test      '.trim());


}());
