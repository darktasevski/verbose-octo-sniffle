function mergeSort(array){
    if (array.length < 2) return array; // if the array has 1 element, it is already sorted!

    var mid_index = Math.floor(array.length /2); // calculate mid_index
    var left_array = mergeSort(array.slice(0,mid_index));  // get left side of the array
    var right_array = mergeSort(array.slice(mid_index));  // get right side of the array

    return merge(left_array, right_array);
}

function merge(left_array, right_array){
    var result = [];
    while(left_array.length >0 && right_array.length >0){
        result.push(left_array[0] < right_array[0] ? left_array.shift() : right_array.shift());
    }
    return result.concat(left_array.length? left_array : right_array);
}

var array = [3,5,9,4,7,0,2,8,6,1];
console.log(mergeSort(array)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]