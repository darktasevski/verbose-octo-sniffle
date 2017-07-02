// heap

function Heap(){
    var self = this;
    
    //
    // public variables
    //
    
    self.size = 0;
    self.array = [];
    
    //
    // public functions
    //
    
    self.parentIndex = parentIndex;
    self.rightChildIndex = rightChildIndex;
    self.leftChildIndex = leftChildIndex;
    self.isLeaf = isLeaf;
    self.isIndexInBounds = isIndexInBounds;
    self.siftUp = siftUp;
    self.siftDown = siftDown;
    self.push = push;
    self.pop = pop;
    self.peek = peek;
    
    //
    // private functions
    //

    function parentIndex(i){
        return Math.floor((i - 1) / 2);
    }

    function rightChildIndex(i){
        return i * 2 + 2;
    }

    function leftChildIndex(i){
        return i * 2 + 1;
    }

    function isLeaf(i){
        return i >= Math.floor(self.size / 2);
    }

    function isIndexInBounds(i){
        return 0 <= i && i < self.size; // there was a bug: return 0 <= i && i <= self.size;
    }

    function siftUp(i){
        pIndex = self.parentIndex(i);

        if( self.isIndexInBounds(pIndex) && self.array[i] < self.array[pIndex] ){
            // swap
            var temp = self.array[i];
            self.array[i] = self.array[pIndex];
            self.array[pIndex] = temp;

            self.siftUp(pIndex);
        } 
    }

    function siftDown(i){

        // check if there should be children
        // if its a leaf, there is no children
        if(self.isLeaf(i)){
            //console.log('array[' + i + '] -> ' + self.array[i] + ' is leaf');
            return;
        }

        var rightChildIndex = self.rightChildIndex(i);
        var leftChildIndex = self.leftChildIndex(i);
        var smallest = leftChildIndex;

        // check if there is a right child
        if( self.isIndexInBounds(rightChildIndex) &&  self.array[rightChildIndex] <  self.array[leftChildIndex]){
            smallest = rightChildIndex;
        }   

        if(self.array[i] > self.array[smallest]){
            // swap
            var temp = self.array[smallest];
            self.array[smallest] = self.array[i];
            self.array[i] = temp;

            self.siftDown(smallest);
        }
    }

    function push(data){
        // add to last index, siftUp

        //console.log('pushing ' + data + '...');

        var lastIndex = self.size;
        self.array[lastIndex] = data;
        self.siftUp(lastIndex);
        self.size++;

        //console.log(self.array);
    }

    function pop(){
        // swap first and last, size--, siftDown top, return the pop

        //console.log('poping...');
        
        if(self.size == 0){
            return;
        }

        var firstIndex = 0;
        var lastIndex = self.size - 1;
        var firstVal = self.array[firstIndex];

        // swap
        var temp = self.array[firstIndex];
        self.array[firstIndex] = self.array[lastIndex];
        self.array[lastIndex] = temp;
        self.array.pop();
        self.siftDown(firstIndex);
        self.size--; // this is the BUG ? this line should have gone before `self.siftDown(firstIndex);` not after...
        
        //console.log(self.array);

        return firstVal;
    }
    
    function peek(){
        return self.array[0];
    }

    function increaseKey(i){
        //...
    }

    function decreaseKey(i){
        //...
    }
}

//
// API
//

var heap = new Heap();

heap.push(3);
heap.push(4);
heap.push(7);

heap.pop(); // 3
heap.pop(); // 4
heap.pop(); // 7
heap.pop(); // undefined
