/*

// The date object in javascript returns back the current date by default, but
// parameters can be passed into the object to store either future or past
// dates in a variable.

var myDate = new Date();
// stores the current date in the myDate variable
console.log(myDate);	// shows the present date and time

// Store past date and time:
var myPastDate = new Date(1545, 11, 2, 10, 30, 15);
/* 1st three #'s are YYYY, MM, DD, where MM is zero-index 0 through 11 - so 11 is actually 
December.
2nd three #'s are the time, where 10 is supposed to be 10 AM, 30 is 30 minutes after 
the hour, and 15 is 15 seconds after the minute.

console.log(myPastDate);	// 1545-12-02T15:30:15.000Z

// Store future date:
var myFutureDate = new Date(2515, 0, 31);
// Month 0 is actually January.
console.log(myFutureDate);	// 2515-01-31T05:00:00.000Z
*/

// Store 1/15/1985 in a birthday variable:
// Year 1985, month index 0 (January), day 15, at 11 AM, 15 min, 25 sec
var birthday = new Date(1985, 0, 15, 11, 15, 25);
var birthday2 = new Date(1985, 0, 15, 11, 15, 25);

console.log(birthday);		// 1985-01-15T16:15:25.000Z

// Get full year of birthday:
console.log(birthday.getFullYear());	// 1985

// Retrieve the month as a zero-index from 0 to 11:
console.log(birthday.getMonth());	// 0 because it's January

// Get the date of the month:
console.log(birthday.getDate());	// 15

// Get the day of the week (0 - 6, where 0 is Sunday and 6 is Saturday):
console.log(birthday.getDay());		// 2, which is Tuesday

// Get the hour of the date (0 - 23):
console.log(birthday.getHours());	// 11

// Get the # of milliseconds from birthday (15th Jan 1985) to 1st Jan 1970:
console.log(birthday.getTime());	// 474653725000
// .getTime() is useful for comparing dates, as shown below


if (birthday == birthday2){
	console.log("Birthdays are equal");
} else {
	console.log("Birthdays are not equal");
}
// "Birthdays are not equal" because even though the dates are the same, 
// their variable **names** are different.

if (birthday.getTime() == birthday2.getTime()){
		console.log("Birthdays are equal");
} else {
	console.log("Birthdays are not equal");
}
// "Birthdays are equal" because we've grabbed the number of milliseconds 
// from 1/1/1970 to 1/15/1985 and then compared the numbers, which are equal.







