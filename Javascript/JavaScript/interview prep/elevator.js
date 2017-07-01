function solution(weight, destination, maxFloors, maxCap, maxWeight) {
    // write your code in JavaScript (Node.js 6.4.0)

    //O(N*logN + M) time
    //O(N + M) space

    let stops = 0;
    let elevator = {
      'maxCap': maxCap,
      'maxWeight': maxWeight,
      'currentWeight': 0,
      'currentCap': 0,
      'toFloor': new Set(),
    };

    while (destination.length > 0) {
      
      //add people to elevator
      for (var i = 0; i < destination.length; i++) {
        if (weight[i] + elevator.currentWeight < elevator.maxWeight && elevator.currentCap < elevator.maxCap) {
          elevator.currentWeight += weight[i];``
          elevator.currentCap += 1;

          elevator.toFloor.add(destination[i]);
        }
      }

      //remove people from Q
      for (var j = 0; j < elevator.currentCap; j++) {
        destination.shift();
        weight.shift();
      }

      //remove people from elevator, add to stops
      elevator.toFloor.forEach(floor => {
        stops += 1;
        elevator.toFloor.delete(floor);
      })

      //go back to ground floor
      stops += 1;
      //reset elevator cap
      elevator.maxCap = maxCap;
      elevator.maxWeight = maxWeight;
      elevator.currentCap = 0;
      elevator.currentWeight = 0;
    }
  return stops;
}

// console.log(solution([2, 3, 5], [60, 80, 40], 5, 2, 200));               //5
console.log(solution([40, 40, 100, 80, 20], [3, 3, 2, 2, 3], 3, 5, 200));   //6
// console.log(solution([], [], 3, 5, 200));