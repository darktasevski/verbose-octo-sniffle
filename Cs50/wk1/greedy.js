function greedy(amt) {
  var money = amt * 100;
  var count = 0;
  while (money >= 25) {
    money -= 25;
    count++
  }
  while (money >= 10) {
    money -= 10;
    count++;
  }
  while (money >= 5) {
    money -= 5;
    count++;
  }
  while (money >= 1) {
    money -= 1;
    count++
  }
  return count;
}

greedy(0.41);

// make a function that tells you the number of coins returned in pocket change
