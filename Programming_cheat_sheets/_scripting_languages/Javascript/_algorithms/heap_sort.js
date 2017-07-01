
function swap(data, i, j){
    var tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
}

 function heap_sort(array){
    put_array_in_heap_order(array);
    end = array.length - 1;
    while(end > 0){
        swap(array, 0, end);
        sift_element_down_heap(array, 0, end);
        end -= 1
    }
}

function put_array_in_heap_order(array){
    var i;
    i = array.length / 2 - 1;
    i = Math.floor(i);
    while (i >= 0){
        sift_element_down_heap(array, i, array.length);
        i -= 1;
    }
}

function sift_element_down_heap(heap, i, max){
    var i_big, c1, c2;
    while(i < max){
        i_big = i;
        c1 = 2*i + 1;
        c2 = c1 + 1;
        if (c1 < max && heap[c1] > heap[i_big])
            i_big = c1;
        if (c2 < max && heap[c2] > heap[i_big])
            i_big = c2;
        if (i_big == i) return;
        swap(heap,i, i_big);
        i = i_big;
    }
}

array = [5,4,6,3,7,2,8,1,9,0];
heap_sort(array);
console.log(array); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



