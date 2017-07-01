

function radix_sort(array){
    // Figure out the number of binary digits we're dealing with
    var k = Math.max.apply(null, array.map(function(i) {
        return Math.ceil(Math.log(i)/Math.log(2));
    }));

    for (var d = 0; d < k; ++d) {
        for (var i = 0, p = 0, b = 1 << d, n = array.length; i < n; ++i) {
            var o = array[i];
            if ((o & b) == 0) {
                // this number is a 0 for this digit
                // move it to the front of the list
                array.splice(p++, 0, array.splice(i, 1)[0]);
            }
        }
    }
    return array;
}

var array = [5,4,6,3,7,2,8,1,9,0];


console.log(radix_sort(array));  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]