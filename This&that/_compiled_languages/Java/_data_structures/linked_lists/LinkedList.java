// Java linked list

// $ javac LinkedList.java # ???
// $ java -Xmx128M -Xms16M LinkedList # ???

public class LinkedList{

    public class Node{
        String key;
        String value;
        Node next;

        public Node(String key, String value){
            this.key = key;
            this.value = value;
            this.next = null;
        }
    }

    public class List{
        Node head;
        Node tail;

        public List(){
            this.head = null;
            this.tail = null;
        }

        public void append(String key, String value){
            Node newNode = new Node(key, value);

            if(this.head == null){
                this.head = newNode;
                this.tail = newNode;
            }else{
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }

        public void prepend(String key, String value){
            Node newNode = new Node(key, value);

            if(this.head == null){
                this.head = newNode;
                this.tail = newNode;
            }else{
                Node oldHead = this.head;
                newNode.next = oldHead;
                this.head = newNode;
            }
        }

        public void remove(String key){
            Node currentNode = this.head;
            Node prev = null;

            /**
             * Case #1: if there is a head node and it has the key to be deleted,
             * set the head to point to the next node (removing the head from the linked list!)
             */
            if(currentNode != null && currentNode.key == key){
                this.head = currentNode.next;
                return;
            }

            /**
             * Case #2: Its not the head.
             * while the node does not have the key, keep traversing
             */
            while(currentNode != null && currentNode.key != key){
                prev = currentNode;
                currentNode = currentNode.next;
            }

            /**
             * If key was not present in linked list (since we reached the end of the list)
             */
            if(currentNode == null) return;
     
            /**
             * Else, if we found the node, remove it!
             */
            prev.next = currentNode.next;
            // currentNode = currentNode.next; // could we do this instead?
        }

        public void display(){
            Node currentNode = this.head;

            while(currentNode != null){
                System.out.println(currentNode.value);
                currentNode = currentNode.next;
            }

            System.out.println("");
        }
    }
    
    public void start(){
        List list = new List();
        list.append("name", "brian");
        list.append("age", "27");
        list.prepend("address", "foobar");
        list.display(); // foobar brian 27
        list.remove("name"); 
        list.display(); // foobar 27
    }

    /**
     * Main function
     */
    public static void main(String[] args){
        LinkedList linkedList = new LinkedList();
        linkedList.start();
    }
}
