// stack 

function Node(data){
    this.data = data;
    this.next = null;
}

function Stack(){
    this.top = null;
    this.size = 0;

    this.push = function(data){
        if(this.top == null){
            this.top = new Node(data);
        }else{
            var node = new Node(data);
            var oldTop = this.top; // save top node

            this.top = node; // set the new top node
            this.top.next = oldTop;  // set the new top node to point to the old top node
            
            this.size++; // increment the size of the stack
        }
    };

    this.pop = function(){
        if(this.top){
            oldTop = this.top; // save top node
            this.top = this.top.next; // make the next node the top node
            this.size--; // decrement the size of the stack
            return oldTop; // return the oldTop node
        }else{
            console.log('The stack is empty...');
        }
    };

    this.peek = function(){
        return this.top;
    };

    this.toString = function(){
        if(this.top == null){
            console.log('The stack is empty...');
        }else{
            var str = '';
            currentNode = this.top;
            while(currentNode){
                str += currentNode.data + ', ';
                currentNode = currentNode.next;
            }
            console.log(str);
        }
    };

    this.isEmpty = function(){
        return this.top == null;
    };
}

//
// API
//

stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);

stack.pop();

stack.toString(); // 30, 20, 10

stack.peek(); // node with data: 30

stack.isEmpty(); // false

