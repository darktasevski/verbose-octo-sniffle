/*
 * graph
 *
 * https://www.syncano.io/blog/data-structures-in-javascript/
 *
 * it can be represented as a edge list, 
 * or adjancecy matrix ?
 *
 * vertex is a node
 *
 * edge is a connection between nodes 
 *
 * directed and undirected graphs
 *
 * degree of a node: number of connection of the node
 *
 * adjencency list or adjacency matrix https://www.youtube.com/watch?v=WtfGRS1BsBI
 *
 * adj list - array of linkd lists
 * adj matrix - 2D array
 *
 * self loops
 *
 * DFS BFS(needs a Queue)
 *
 */
function AdjListNode(dest){
    this.dest = dest;
    this.next = null;
}

function AdjList(){
    this.head = null;
}

function Graph(n){
    this.nodeCOunt = 0;
    this.ajdLists = [];

    this.count = n;
    this.adjLists = [];

    for(var i = 0; i < n; i++){
        var adjList = new AdjList();
        adjList.head = null;
        this.ajdLists[i] = adjList;
    }

    this.newNode = function(dest){
        var new_node = new AdjListNode();
        new_node.dest = dest;
        new_node.next = null;
        return new_node;
    };

    this.addEdge = function(src, dest){
        var new_node = this.newNode(dest);
        new_node.next = this.ajdLists[src].head;
        this.ajdLists[src].head = new_node;

        // Since this is undirected, add an edge from dest to src also
        new_node = this.newNode(src);
        new_node.next = this.ajdLists[dest].head;
        this.ajdLists[dest].head = new_node;
    };

    this.printGraph = function(){
        this.ajdLists.forEach(function(v, index){
            var current_vertex = v.head;
            console.log("Adjacency list of vertex " + index + ":");
            var str = "HEAD(" + index + ")";
            while(current_vertex){
                str += " -> " + current_vertex.dest;
                current_vertex = current_vertex.next;
            }
            console.log(str + '\n');
        }); 
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

/* output: 

Adjacency list of vertex 0:
HEAD(0) -> 4 -> 1

Adjacency list of vertex 1:
HEAD(1) -> 4 -> 3 -> 2 -> 0

Adjacency list of vertex 2:
HEAD(2) -> 3 -> 1

Adjacency list of vertex 3:
HEAD(3) -> 4 -> 2 -> 1

Adjacency list of vertex 4:
HEAD(4) -> 3 -> 1 -> 0

*/
