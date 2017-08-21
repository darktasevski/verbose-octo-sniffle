// doubly linked list (still needs testing)

function Node(key, value){
    
    //
    // public
    //

    var self = this;

    self.key = key;
    self.value = value;
    self.next = null;
    self.prev = null;
}

function DoublyLinkedList(){

    //
    // public
    //

    var self = this;

    self.head = null;
    self.tail = null;
    self.size = 0;

    self.add = add;
    self.remove = remove;
    self.display = display;

    function add(key, value){
        var newNode = new Node(key, value);
        var currentNode = self.head;

        self.size++;

        // if list is empty
        if(self.head == null){
            self.head = newNode;
            self.tail = newNode;
        }else{
            // else, find the last node, following the head node
            while(currentNode.next !== null){
                currentNode = currentNode.next;
            }

            currentNode.next = newNode;
            newNode.prev = currentNode;

            self.tail = newNode;
        }
    }

    function remove(value){
        var currentNode = self.head;

        // if list is empty:
        if(self.head == null){
            console.log("List is empty");
            return null;
        }else{
            // else, if list has only 1 node
            if(currentNode.next == null){
                if(self.head.value == value){
                    self.head = null;
                    self.tail = null;
                    self.size--;

                    return true;
                }else{
                    console.log("Value not found.");
                    return null;
                }
            }else{
                // here, list has 2+ nodes
                while(currentNode.value !== value){
                    currentNode = currentNode.next;
                }

                if(currentNode == null){
                    console.log("Node not found");
                    return null;
                }

                nodeA = currentNode.prev;
                nodeB = currentNode;
                nodeC = currentNode.next;

                nodeA.next = nodeC;
                nodeC.prev = nodeA;

                delete nodeB;

                self.size--;

                return true;

            }
        }
    }

    function display(){
        var currentNode = self.head;

        while(currentNode !== null){
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }


}


//
// API
//

var list = new DoublyLinkedList();


list.add("name", 'Brian');
list.add("name", 'Erich');
list.add("name", 'rick');
list.add("name", 'sandra');

list.remove('Erich')

list.display(); // Brian, rick, sandra

list.size; // 3
