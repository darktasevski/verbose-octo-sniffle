arr = [1,2,3,4,5];

function logIfEven(num) {
  if (num %2 == 0) {
    console.log(num);
  }
}

arr.forEach(logIfEven);
