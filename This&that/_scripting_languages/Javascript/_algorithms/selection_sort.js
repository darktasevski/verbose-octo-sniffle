function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
//An implementation of selection sort is pretty easy. Similar to bubble sort, it uses two loops to accomplish the task (ultimately resulting in the O(n2) complexity):

function selectionSort(items){

    var len = items.length,
        min;

    for (i=0; i < len; i++){

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (j=i+1; j < len; j++){
            if (items[j] < items[min]){
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min){
            swap(items, i, min);
        }
    }

    return items;
}

var array = [3,5,9,4,7,0,2,8,6,1];

console.log(selectionSort(array)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
