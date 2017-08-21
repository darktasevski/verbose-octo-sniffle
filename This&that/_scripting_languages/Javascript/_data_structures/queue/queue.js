// queue

function Node(data){
    this.data = data;
    this.next = null;
}

function Queue(){
    this.head = null;
    this.tail = null;
    this.size = 0;

    this.enqueue = function(data){
        node = new Node(data);

        if(this.tail){
            this.tail.next = node;
            this.tail = node;
        }else{
            this.head = node;
            this.tail = node;
        }

        this.size++;
    };

    this.dequeue = function(){
        if(this.head){
            node = this.head;
            if(this.head.next){
                // has at least 2 nodes
                this.head = node.next;
            }else{
                // has only 1 node
                this.head = node.next;
                this.tail = node.next;
            }

            this.size--;
            return node;
        }else{
            console.log('Queue is empty...');
        }
    };
    
    this.toString = function(){
        if(this.head){
            var str = '';
            currentNode = this.head
            while(currentNode){
                str += currentNode.data + ', ';
                currentNode = currentNode.next;
            }
            console.log(str);
        }else{
            console.log('Queue is empty...');
        }
    };
}

//
// API
//

queue = new Queue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);

queue.dequeue(); // node with data: 10

queue.toString(); // 20, 30, 40, 50, 

queue.size; // 4
