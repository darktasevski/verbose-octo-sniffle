/**
 * Heap (working!)
 * http://opendatastructures.org/ods-python-screen.pdf (chapter 10 - HEAPS)
 *
 * implemented as an array, but represented as a tree
 */
function Heap(){
    var self = this;
    self.array = [];
    self.parent = parent;
    self.leftChild = leftChild;
    self.rightChild = rightChild;
    self.siftUp = siftUp;
    self.siftDown = siftDown;

    self.push = push;
    self.pop = pop;
    self.peek = peek;

    function parent(i){
        return Math.floor((i - 1)/ 2);
    }

    function leftChild(i){
        return i * 2 + 1;
    }

    function rightChild(i){
        return i * 2 + 2;
    }

    function siftUp(i){

        // smaller values should bubble uo!

        if(i == 0){
            return;
        }

        var temp;

        
        if(self.array[parent(i)] < self.array[i]){

            console.log('-------------------------------------- parent is less');
            console.log('parent val: ' + self.array[parent(i)]);
            console.log('i val: ' + self.array[i]);

            return;
        }

        console.log('-------------------------------------- parent is greater');
        console.log('parent val: ' + self.array[parent(i)]);
        console.log('i val: ' + self.array[i]);

        // swap
        temp = self.array[parent(i)];
        self.array[parent(i)] = self.array[i];
        self.array[i] = temp;

        siftUp(parent(i));
    }

    function siftDown(i){

        // only if greater than ZERO index
        while(i >= 0){ 
            smallestChildIndex = -1; // there could not be children, so this would be an out of bound index, which will be checked

            // this is the highest index child, lets see if it is IN the heap bounds
            rightIndex = self.rightChild(i); 
            
            if(
                rightIndex < self.array.length && 
                self.array[rightIndex] < self.array[i]
            ){
                leftIndex = self.leftChild(i) // if the right child is IN the heap bounds, then we can assume the left child is also!
                
                // now lets compare the two children!
                if(self.array[leftIndex] < self.array[rightIndex]){
                    smallestChildIndex = leftIndex
                }else{
                    smallestChildIndex = rightIndex
                }
            }else{
                // the right child is not in the heap bounds, lets check the left child
                leftIndex = self.leftChild(i)
                if(leftIndex < self.array.length && self.array[leftIndex] < self.array[i]){
                    // the only option, since the right child is out of bounds
                    smallestChildIndex = leftIndex
                }
            }

            if(smallestChildIndex >= 0){
                //swap

                temp = self.array[smallestChildIndex];
                self.array[smallestChildIndex] = self.array[i]
                self.array[i] = temp
            }
            i = smallestChildIndex
        }
    }

    function siftDown__OLD(i){
        // greater elements should sink down

        console.log('------------- self.array.length: ' + self.array.length);
        console.log('i: ' + i);

        // stop condition: (if i is a leaf)
        // Math.floor(self.array.length / 2) is the first leaf index
        if(i >= Math.floor(self.array.length / 2) ){ 
            console.log('------------- leaf index: ' + i);
            return;
        }



        var leftChildVal = self.array[leftChild(i)];
        var rightChildVal = self.array[rightChild(i)];




        console.log('------------------ siftDown left child: ');
        console.log(leftChild(i) + '[' + leftChildVal + ']');

        console.log('------------------ siftDown right child: ');
        console.log(rightChild(i) + '[' + rightChildVal + ']');

        if(leftChildVal < rightChildVal){


            // // stop condition:
            // if(leftChild(i) > (self.array.length - 1)/ 2){ 
            //     return;
            // }


            // swap
            if(self.array[i] > self.array[leftChild(i)]){
                console.log('SWAPING: >' + self.array[i] + ' and ' + self.array[leftChild(i)]);
                temp = self.array[i];
                self.array[i] = self.array[leftChild(i)];
                self.array[leftChild(i)] = temp;

                siftDown(leftChild(i));
            }
            
        }else{

            // // stop condition:
            // if(rightChild(i) > (self.array.length - 1)/ 2){ 
            //     return;
            // }

            // swap
            if(self.array[i] > self.array[rightChild(i)]){
                console.log('SWAPING: >' + self.array[i] + ' and ' + self.array[rightChild(i)]);
                temp = self.array[i];
                self.array[i] = self.array[rightChild(i)];
                self.array[rightChild(i)] = temp;

                siftDown(rightChild(i));
            }
        }
    }

    function push(data){
        // insertion: push it to the end of array and buble up
        var nextIndex = self.array.length;
        self.array[nextIndex] = data;
        

        siftUp(nextIndex);
    }

    function pop(){

        if(self.array.length == 0){
            return;
        }

        // deletion: swap root with last, bubble down
        var lastIndex = self.array.length - 1;
        var firstElement = self.array[0];

        console.log('----------------------- before swap');
        console.log('first: 0[' + firstElement + ']');
        console.log('last: ' + lastIndex + '[' + self.array[lastIndex] + ']');

        // swap
        var temp = self.array[0];
        self.array[0] = self.array[lastIndex];
        self.array[lastIndex] = temp;

        console.log('----------------------- after swap');
        console.log('first: 0[' + self.array[0] + ']');
        console.log('last: ' + lastIndex + '[' + self.array[lastIndex] + ']');


        self.array.pop();

        siftDown(0);

        return firstElement;
    }

    function peek(){
        return self.array[0];
    }
}


var heap = new Heap();



// for(var i = 100; i >= 0; i--){
//     // console.log('---i: ' + i);
//     heap.push(i);
// }

// for(var i = 100; i >= 0; i--){
//     console.log('==================================== ');
//     console.log('array length: ' + heap.array.length);
//     console.log('i: ' + i);
//     x = heap.pop();
//     console.log('val popped: ' + x);
    
// }




heap.push(57);
heap.push(52);
heap.push(53);
heap.push(54);
heap.push(46);
heap.push(43);
heap.push(44);
heap.push(48);
heap.push(32);
heap.push(38);
heap.push(34);
heap.push(36);
heap.push(21);
heap.push(29);
heap.push(22);
heap.push(28);
heap.push(13);
heap.push(17);
heap.push(14);
heap.push(15);

heap.pop(); // 13


heap.push(10);
heap.push(8);
heap.push(5);
heap.push(3);
heap.push(9);



heap.pop(); // 3


// heap.push(3);
// heap.push(4);
// heap.push(7);

//       0
//   1       2
// 3   4   5   6 



//    7
// 4      


