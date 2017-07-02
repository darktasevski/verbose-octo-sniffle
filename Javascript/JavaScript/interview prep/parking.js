function solution(enter_time, exit_time) {

  // ENTRANCE_FEE = 2;
  // FIRST_HOUR = 3;
  // HOURLY_FEE = 4;

  // write your code in JavaScript (Node.js 6.4.0)

  // split up input into hours and minutes
  let enter = E.split(':');
  let leave = L.split(':');
  let timeParked = [leave[0] - enter[0], leave[1] - enter[1]];

  // total_cost
  let total = 0;

  // validation, sanitize input
  
  // if hour value is < 0, assume it's the next day and add 24hrs
  // we only want difference between values, so if it's negative, * -1 or abs
  // hour_difference
  if (timeParked[0] < 0) {
    timeParked[0] += 24;
  }

  // if minute value is < 0, assume we want abs value, so abs or * -1
  // add one to hour_difference

  // if both are zero, assume the user never parked, exit
  if (timeParked[0] === 0 && timeParked[1] === 0) {
    return total;
  }

  // else

  //entrance fee
  total += ENTRANCE_FEE;

  // if hour_difference > 1, add first_hour fee, reduce number 
  if (timeParked[0] > 0 || (timeParks[0] === 0 && timeParks[1] > 0 )) {
    total += 3;
    timeParked[0] -= 1;
    return total;
  }

  //every hour after that
  while (timeParked[0] > 0) {
    timeParked[0] -= 1;
    total += 4
  }
  // last partial hour 
  if (timeParked[1] > 0) {
    // partial_charge = minute_difference / 60 
    // total += 4 * partial_charge
    total += 4;
  }

  return total;
}

// console.log(solution('10:00', '13:21'));
console.log(solution('10:00', '10:21'));
// console.log(solution('00:00', '00:21'));
// console.log(solution('23:00', '00:21'));
// console.log(solution('23:00', '23:00'));
// console.log(solution('10:00', '12:00'));