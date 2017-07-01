// http://eloquentjavascript.net/03_functions.html#p_/zEyox400N

function zeroPad(number, width) {
  var string = String(number);
  while (string.length < width)
    string = "0" + string;
  return string;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(zeroPad(cows, 3) + " Cows");
  console.log(zeroPad(chickens, 3) + " Chickens");
  console.log(zeroPad(pigs, 3) + " Pigs");
}

printFarmInventory(7, 16, 3);
// 007 Cows
// 011 Chickens
// 003 Pigs
printFarmInventory(7, 16, 333);
// 007 Cows
// 011 Chickens
// 333 Pigs
