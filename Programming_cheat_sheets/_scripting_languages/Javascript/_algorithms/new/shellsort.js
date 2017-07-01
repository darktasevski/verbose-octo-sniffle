function shellsort(array){
    var interval = Math.floor(array.length / 2);

    /**
     * we cant do `interval >= 0` because when `Math.floor(interval / 2)` reaches zero, it will loop forever
     */
    while(interval > 0){

        /**
         * (i + interval <= array.length - 1) is checking if the interval is in bounds
         */
        for(var i = 0; (i + interval <= array.length - 1); i++){

            if(array[i] > array[i + interval]){
                // swap
                var temp = array[i];
                array[i] = array[i + interval];
                array[i + interval] = temp;


                /**
                 * IF WE DID NEED TO SWAP, we need to check the pairs (plural) an interval away on the left side!
                 * here we will set the left pair an interval away to the left, to check if they need to swap.
                 */
                var j = i;
                var k = i - interval;

                /**
                 * Since K will be the left most element, we need to check if it is in bounds
                 */
                while(k >= 0){

                    if(array[k] > array[j]){
                        // swap
                        var temp = array[k];
                        array[k] = array[j];
                        array[j] = temp;
                    }

                    /**
                     * Now we continue to set the pair an interval away to the left
                     */
                    j -= interval;
                    k -= interval;
                }
            }
        }

        /**
         * Now we half the interval
         */
        interval = Math.floor(interval / 2);
    }

    return array;
}

shellsort([4,6,27,25,87,12,87,45,73,25,28,94,75,54,36,99,99,99,24,71,43,61,34]);
// [4, 6, 12, 24, 25, 25, 27, 28, 34, 36, 43, 45, 54, 61, 71, 73, 75, 87, 87, 94, 99, 99, 99]
