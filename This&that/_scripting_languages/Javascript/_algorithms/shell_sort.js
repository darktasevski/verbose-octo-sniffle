// http://rosettacode.org/wiki/Category:Sorting_Algorithms

function shellSort(array){
    for(var h = array.length; h = parseInt(h / 2); ){
        for(var i = h; i < array.length; i++){ // i will be the right side pair
            var k = array[i];
            for (var j = i; j >= h && k < array[j - h]; j -= h){
                array[j] = array[j - h];
            }
            array[j] = k;
        }
    }
    return array;
}

var array = [3,5,9,4,7,0,2,8,6,1];

console.log(shellSort(array)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
