let arr = [2,12,0,100, 3, 1000, 5];

function larger(num1, num2) {
  if (num1 >= num2) {
    return num1;
  }
  else if (num1 < num2) {
    return num2;
  }
}

// console.log(larger(5,3));


//use rest parameter in largest. has to accept both array and numbers

function largest(arr) {
   let largest = arr[0];
// console.log(arr[0].length);
  for (var i = 0; i < arr.length; i++) {
    largest = larger(largest, arr[i])
  }
   return largest;
}

// console.log(largest(5,3));
// console.log(largest(arr));

function largest2(...arr) {
  var arg = arr;

  //flatten the array of arguments
  if (arr.length === 1) {
    arg = [].concat.apply([], arr);
  }


  var largest = arg[0];
  for (var i = 1; i < arg.length; i++) {
    largest = larger(largest, arg[i]);
  }
  return largest;
}
console.log(largest2(arr));
console.log(largest2( [1,3,5,7,0]));
console.log(largest2( 5,3,1  ));
