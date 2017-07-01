/**
 * Quick-sort algorithm
 * https://www.youtube.com/watch?v=aQiWF4E8flQ
 * https://www.youtube.com/watch?v=COk73cpQbFQ
 *
 * quickSort can sort a specific section of an array, or the whole array.
 *
 *
 * How the algorithms works:  
 *      - most of the work is done in the partitioning function, 
 *        the 'wall' variable starts at the first index of the section of the array
 *        and you also have a 'curentIndex' variable, that will loop from the 
 *        first index of the section of the array until the last index of the section of the array,
 *        and if array[curentIndex]'s value is less than the pivot, array[wall] is 
 *        swapped with array[curentIndex] and wallIndex is incremented,
 *        so at the end, all elements less than the pivot are in the left, 
 *        and the elements greater than the pivot are in the left.
 *
 * array -> the array to be sorted
 * start -> the starting index of the array
 * end -> the end index of the array
 */
function quickSort(array, start, end){
    var pivotIndex;
    if(start < end){
        pivotIndex = partition(array, start, end);

        /**
         * recursively sort the left side and right side of the array, excluding the pivot,
         * since it is already in it's proper place.
         */
        quickSort(array, start, pivotIndex - 1);
        quickSort(array, pivotIndex + 1, end);
    }
}

/**
 * partition is an auxiliary function to the quickSort.
 * 
 * array -> the array to be partitioned
 * start -> the index to start
 * end -> the index to end
 */
function partition(array, start, end){
    var temp,
        i, 
        pivot = array[end], // The value of the pivot, used for comparison.
        wallIndex = start, // index
        currentIndex = start; // index
    
    for(i = start; i < end; i++){
        if(array[i] <= pivot){

            // swap
            temp = array[wallIndex];
            array[wallIndex] = array[i];
            array[i] = temp;

            wallIndex++; // Whatever is left from the wall is less than the pivot.
        }
    }

    // swap
    temp = array[wallIndex];
    array[wallIndex] = array[end];
    array[end] = temp;

    return wallIndex; // it's actually the pivotIndex now, because of the swap above
}

array = [5,4,6,3,7,2,8,1,9,0]

quickSort(array, 0, 9);

console.log(array); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]




