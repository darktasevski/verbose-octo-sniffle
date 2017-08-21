// // var dirArray = ["NORTH","WEST","SOUTH","EAST"];
// var dirArray = ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]
// function reduceDirections(dArray) {
//   reducer = false
//   for (var i = dArray.length -1; i >= 0; i--) {
//     switch(dArray[i]) {
//       case "NORTH":
//         retArray = innerReducer(dArray, i, "SOUTH")
//         dArray = retArray.newArray
//         i = retArray.newIndex
//       break
//       case "SOUTH":
//         retArray = innerReducer(dArray, i, "NORTH")
//         dArray = retArray.newArray
//         i = retArray.newIndex
//       break
//       case "EAST":
//         retArray = innerReducer(dArray, i, "WEST")
//         dArray = retArray.newArray
//         i = retArray.newIndex
//       break
//       case "WEST":
//         retArray = innerReducer(dArray, i, "EAST")
//         dArray = retArray.newArray
//         i = retArray.newIndex
//       break  
//     }
//   }
//   if(reducer) {
//     reduceDirections(dArray)
//   }
//   return dArray
// }


// function innerReducer(dArray, i, direction) {
//   if (dArray[i - 1] == direction) {
//     dArray.splice(i, 1)
//     dArray.splice(i - 1, 1)
//     i--
//     reducer = true
//   }
//   return {
//     newArray: dArray,
//     newIndex:i
//   }
// }
// console.log(new Date());
// dirArray = reduceDirections(dirArray);
// console.log(dirArray)
// console.log(new Date());



// var dirArray = ["NORTH","WEST","SOUTH","EAST"];
var dirArray = ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]

function reduceDirections(dArray) {
  reducer = false
  for (var i = dArray.length - 1; i >= 0; i--) {
    switch (dArray[i]) {
      case "NORTH":
        retArray = innerReducer(dArray, i, "SOUTH")
        dArray = retArray.newArray
        i = retArray.newIndex
        break
      case "SOUTH":
        retArray = innerReducer(dArray, i, "NORTH")
        dArray = retArray.newArray
        i = retArray.newIndex
        break
      case "EAST":
        retArray = innerReducer(dArray, i, "WEST")
        dArray = retArray.newArray
        i = retArray.newIndex
        break
      case "WEST":
        retArray = innerReducer(dArray, i, "EAST")
        dArray = retArray.newArray
        i = retArray.newIndex
        break
    }
  }
  if (reducer) {
    reduceDirections(dArray)
  }
  return dArray
}


function innerReducer(dArray, i, direction) {
  if (dArray[i - 1] == direction) {
    dArray.splice(i, 1)
    dArray.splice(i - 1, 1)
    i--
    reducer = true
  }
  return {
    newArray: dArray,
    newIndex: i
  }
}
dirArray = reduceDirections(dirArray);
console.log(dirArray)