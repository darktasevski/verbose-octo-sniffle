// http://eloquentjavascript.net/03_functions.html#p_NB82EwGY1X

function printFarmInventory(cows, chickens) {
  var cowString = String(cows);
  while (cowString.length < 3)
    cowString = '0' + cowString;
  console.log(cowString + " Cows");
  var chickenString = String(chickens);
  while (chickenString.length < 3)
    chickenString = "0" + chickenString;
  console.log(chickenString + " Chickens");
}

printFarmInventory(7, 11);
// 007 Cows
// 011 Chickens
