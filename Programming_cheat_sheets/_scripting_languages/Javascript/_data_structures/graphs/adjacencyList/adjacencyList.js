/**
 * Graph
 * adjacency list implementation
 */
function Node(value, weight){
    var self = this;

    //
    // public
    //

    self.value = value;
    self.weight = weight;
    self.next = null;
}

function AdjList(value){
    var self = this;

    //
    // public
    //
    
    self.head = null;
    self.tail = null;

    self.find = find;
    self.remove = remove;
    self.add = add;
    self.print = print;

    //
    // private
    //

    function find(){
        //...
    }

    function remove(){
        //...
    }

    function add(){
        //...
    }

    function print(){
        //...
    }
}

function Graph(size){
    var self = this;
    
    //
    // private attributes
    //
    
    var _size = size;
    var _array = [];

    //
    // public attributes
    //
    self.add = add;
    self.remove = remove;
    self.print = print;
    
    //
    // Initialization
    //

    init(size);

    //
    // private functions
    //

    /**
     * Constructor
     * create an array of empty AdjLists
     */
    function init(size){
        for(var i = 0; i < _size; i++){
            _array[i] = new AdjList();
        }
    }

    /**
     * 
     */
    function add(x, y, w){
        var newNode = new Node(y, w),
            list = _array[x],
            currentNode = list.head,
            prevNode = null;

        if(currentNode == null){
             // the list is empty
            list.head = newNode;
            list.tail = newNode;
            return; // beacause the list was empty, and we added a node... we are finished!
        }

        // check it the node already exists in the list
        while(currentNode !== null){
            prevNode = currentNode;

            if(currentNode.value == y){
                return; // because the node is already there.
            }
            currentNode = currentNode.next;            
        }
        prevNode.next = newNode; // prevNode.next (because the currentNode was null, so the prevNode should be valid! )
        list.tail = newNode;
    }
    
    /**
     * 
     */
    function remove(x, y){
        var list = _array[x],
            currentNode = list.head,
            prevNode = null;

        // empty list
        if(currentNode == null){
            return; // beacause the list was empty, the node is not there, we are finished!
        }

        // list with a single element
        if(currentNode.next == null){
            delete currentNode;
            list.head = null;
            list.tail = null;

            return;
        }


        // search for the node
        while(currentNode !== null){
            prevNode = currentNode;

            if(currentNode.value == y){
                // remove node
                prevNode.next = currentNode.next;
                delete currentNode;

                return; // when we remove the node, we are done.
            }
            currentNode = currentNode.next;
        }
    }
    
    /**
     * 
     */
    function print(){
        for(var i = 0; i < _size; i++){
            // _array[i].print();
            var list = _array[i];
            var currentNode = list.head;
            var row = '';

            row += '(' + i + ') -> ';
            while(currentNode){
                row += currentNode.value + ' -> ';
                currentNode = currentNode.next;
            }

            console.log(row);
        }
    }
}


var graph = new Graph(10);

graph.add(1,2,100);
graph.add(1,3,200);
graph.add(1,4,300);
graph.add(1,5,400);
graph.add(2,3,500);

graph.remove(2,3);

graph.print();

/*
output:

(0) -> 
(1) -> 2 -> 3 -> 4 -> 5 -> 
(2) -> 
(3) -> 
(4) -> 
(5) -> 
(6) -> 
(7) -> 
(8) -> 
(9) -> 

*/

