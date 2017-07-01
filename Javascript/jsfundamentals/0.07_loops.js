/* 
4 Types of Loops:
do while loop
while loop
for loop
for in loop
*/

// lcv - loop control variable

/* do while Loop: Guaranteed to run at least once.
lcv = 0

do {
	lcv = lcv + 1;
	// some code goes here
} while (true || false)

*/

/* Don't do an infinite loop!
Example of infinite loop (bad!):
do{
  lcv = 0;
  lcv = lcv + 1;
  console.log(lcv);
} while (lcv < 5)
*/

/* This runs exactly once:
do{
  lcv = 0
  lcv = lcv + 1 
  console.log(lcv)
} while (lcv > 6)
// 1
*/

console.log("do while loop that counts to 20 by 2's:");
// Create a do while loop that counts to 20 by 2's.
lcv = 0;
do {
	lcv += 2;
	console.log("lcv is now: " + lcv);
} while(lcv + 2 < 21)
/* lcv is now: 2
lcv is now: 4
lcv is now: 6
lcv is now: 8
lcv is now: 10
lcv is now: 12
lcv is now: 14
lcv is now: 16
lcv is now: 18
lcv is now: 20 */

console.log("do while loop that counts down from 10 to 0 by 1's:")
// Create a do while loop that counts down from 10 to 0.
lcv = 10;
do {
	console.log("lcv is now: " + lcv);
	lcv--;
} while(lcv > -1)
/*
lcv is now: 10
lcv is now: 9
lcv is now: 8
lcv is now: 7
lcv is now: 6
lcv is now: 5
lcv is now: 4
lcv is now: 3
lcv is now: 2
lcv is now: 1
lcv is now: 0
*/

console.log("while loop that counts to 50 by 5's:");

/* while loop:
lcv = 0;
while (true || false) {
	increment || decrement;
}
*/

var counting = 0;

while (counting < 50) {
	counting += 5;
	console.log(counting);

}
/* 
5
10
15
20
25
30
35
40
45
50 
*/

console.log("Count down from 10 to 1, then print \"Blast off!\"");
// Challenge: Create a countdown from 10 to 0, but instead of zero, 
// print "Blast off!"

var countdown = 11;

while (countdown > 0) {
	countdown--;
	if (countdown == 0) {
		console.log("Blast off!");
	} else {
	console.log(countdown);
	}
}
/*
10
9
8
7
6
5
4
3
2
1
Blast off!
*/

// for loop:

/*
for (lcv = 0; true or false expression ; increment || decrement) {
	// code goes here
}
*/

console.log("for loop:");

for (apples = 0; apples < 10; apples++) {
	console.log(apples);
}
/*
0
1
2
3
4
5
6
7
8
9
*/





