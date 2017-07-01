
function insertionSort(array){
    for (var i = 0; i < array.length; i++) {
        var k = array[i];
        for (var j = i; j > 0 && k < array[j - 1]; j--)
            array[j] = array[j - 1];
        array[j] = k;
    }
    return array;
}

var array = [5,4,6,3,7,2,8,1,9,0];
console.log(insertionSort(array)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
