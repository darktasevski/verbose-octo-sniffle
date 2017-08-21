// Doublely linked list

function Node(data){
    this.data = data;
    this.prev = null;
    this.next = null;
}

function DLList(){
    this.head = null;
    this.tail = null;
    this.size = 0;
}

DLList.prototype.addHead = function(data){
    node = new Node(data);

    if(this.head){
        // has head
        var oldHead = this.head;
        this.head = node;
        this.head.next = oldHead;
        oldHead.prev = node;

    }else{
        // no head
        this.head = node;
        this.tail = node;
    }

    this.size++;
};

DLList.prototype.addTail = function(data){
    node = new Node(data);

    if(this.tail){
        // has tail
        var oldTail = this.tail;
        oldTail.next = node;
        node.prev = oldTail;
        this.tail = node;
    }else{
        // no tail
        this.head = node;
        this.tail = node;
    }

    this.size++;
};

DLList.prototype.removeHead = function(){
    if(this.head){
        // has head
        if(this.head.next){
            // has at least 2 nodes
            var newHead = this.head.next;
            this.head = newHead;
            newHead.prev = null;
        }else{
            // has only 1 node
            this.head = null;
            this.tail = null;
        }

        this.size--;
    }else{
        // no head
        console.log('List is empty...');
    }
};

DLList.prototype.removeTail = function(){
    if(this.tail){
        //has tail
        if(this.tail.prev){
            // has at leat 2 nodes
            var newTail = this.tail.prev;
            this.tail = newTail;
            newTail.next = null;
        }else{
            // has 1 node
            this.head = null;
            this.tail = null;
        }

        this.size--;
    }else{
        //no tail
        console.log('List is empty...');
    }
};

DLList.prototype.findByPosition = function(position){
    //...
};

DLList.prototype.removeByPosition = function(position){
    //...
};

DLList.prototype.findByData = function(data){
    //...
};

DLList.prototype.removeByData = function(data){
    //...
};

DLList.prototype.toString = function(){
    if(this.head){
        // has head
        var currentNode = this.head;
        var str = "";
        while(currentNode){
            str += currentNode.data + ", ";
            currentNode = currentNode.next;
        }

        console.log(str);
    }else{
        // no head
        console.log('List is empty...');
    }
};

//--------------------------------------------------
var list = new DLList();

list.addTail(10); // 10
list.addTail(20); // 10, 20
list.addTail(30); // 10, 20, 30
list.addTail(40); // 10, 20, 30, 40
list.addTail(50); // 10, 20, 30, 40, 50
list.addTail(60); // 10, 20, 30, 40, 50, 60
list.addTail(70); // 10, 20, 30, 40, 50, 60, 70

list.removeHead(); // 20, 30, 40, 50, 60, 70
list.addHead(100); // 100, 20, 30, 40, 50, 60, 70
list.removeTail(); // 100, 20, 30, 40, 50, 60

list.toString(); // 100, 20, 30, 40, 50, 60
list.size; // 6









