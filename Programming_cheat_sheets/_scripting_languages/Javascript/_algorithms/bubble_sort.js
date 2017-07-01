

function bubbleSort(array){
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < array.length - 1; i++){
            if (array[i] > array[i + 1]){
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    }while(swapped);
    return array;
}

array = [5,4,6,3,7,2,8,1,9,0];
console.log(bubbleSort(array)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
