// http://eloquentjavascript.net/03_functions.html#p_hlBZoLuLCG

function printZeroWithPaddedLabel(number, label) {
  var numberString = String(number);
  while (numberString.length < 3)
    numberString = "0" + numberString;
  console.log(numberString + " " + label);
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroWithPaddedLabel(cows, "Cows");
  printZeroWithPaddedLabel(chickens, "Chickens");
  printZeroWithPaddedLabel(pigs, "Pigs");
}

printFarmInventory(7, 11, 3);
// 007 Cows
// 011 Chickens
// 003 Pigs
printFarmInventory(7, 11, 333);
// 007 Cows
// 011 Chickens
// 333 Pigs
