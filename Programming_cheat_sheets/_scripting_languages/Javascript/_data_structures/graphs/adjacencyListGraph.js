/**
 * adjacency list implementation:
 * http://www.geeksforgeeks.org/graph-and-its-representations/
 *
 * representations: adjancency list, or matrix 
 */

function AdjListNode(dest){
    this.dest = dest;
    this.next = null;
}

function AdjList(){
    this.head = null;
}

function Graph(size){
    this.size = size;
    this.array = [];

    for(var i = 0; i < this.size; i++){
        this.array[i] = new AdjList();
    }

    this.addEdge = function(src, dest){
        var newNode = new AdjListNode(dest);
        newNode.next = this.array[src].head;
        this.array[src].head = newNode;
     
        // Since graph is undirected, add an edge from dest to src also
        newNode = new AdjListNode(src);
        newNode.next = this.array[dest].head;
        this.array[dest].head = newNode;
    };

    this.printGraph = function(){
        for(var v=0; v<this.size; v++){
            var pCrawl = this.array[v].head;
            console.log("\n Adjacency list of vertex %d\n head ", v);
            while(pCrawl){
                console.log("-> " + pCrawl.dest);
                pCrawl = pCrawl.next;
            }
            console.log("\n");
        }
    };
}


var graph = new Graph(5);

graph.addEdge(0,1);
graph.addEdge(0,4);
graph.addEdge(1,2);
graph.addEdge(1,3);
graph.addEdge(1,4);
graph.addEdge(2,3);
graph.addEdge(3,4);

graph.printGraph();

/* OUTPUT:

 Adjacency list of vertex 0
 head 
-> 4
-> 1



 Adjacency list of vertex 1
 head 
-> 4
-> 3
-> 2
-> 0



 Adjacency list of vertex 2
 head 
-> 3
-> 1



 Adjacency list of vertex 3
 head 
-> 4
-> 2
-> 1



 Adjacency list of vertex 4
 head 
-> 3
-> 1
-> 0

*/
