/** 
 * Dijkstra (working)
 * http://www.gitta.info/Accessibiliti/en/html/Dijkstra_learningObject1.html
 */
function Graph(size){
    
    //
    // public
    //
    
    var self = this;
    self.size = size;
    self.graph = [];
    self.dist = [];
    self.prev = [];
    self.next = [];
    self.visited = [];
    self.dijkstra = dijkstra;
    self.print = print;
    self.srcToNode = srcToNode;
    self.nodeTosrc = nodeTosrc;
    self.addEdge = addEdge;
    self.displayGraph = displayGraph;
    self.init = init;
    
    //
    // initialization
    //
    
    self.init();
    
    //
    // private
    //

    function init(){
        for(var i = 0; i < self.size; i++){
            self.graph[i] = [];
            for(var j = 0; j < self.size; j++){
                self.graph[i][j] = 0;
            }
        }
    }

    function dijkstra(src){
        for(var v = 0; v < self.size; v++){
            self.dist[v] = Infinity;
            self.prev[v] = undefined;
            self.visited[v] = false;
        }

        self.dist[src] = 0;

        for(var count = 0; count < self.size; count++){

            // src -> is the fixed node, from where we want to know the distances of other nodes.
            // u -> is the currentNode being processed, its the src only in the first iteration.
            // v -> is the neighborForCurrentNode 

          
            // u is always equal to src in first iteration.
            var u = getNodeWithSmallestDist();

            self.visited[u] = true;

            for(var v = 0; v < self.size; v++){
                var alt = self.dist[u] + self.graph[u][v];

                if(
                    alt < self.dist[v] && 
                    self.visited[v] == false &&
                    self.graph[u][v] != 0 && // if there is an edge between the nodes
                    self.dist[u] != Infinity
                ){
                    self.dist[v] = alt;
                    self.prev[v] = u;
                    self.next[u] = v;
                }
            }
        }
        // return self.prev;
    }

    function getNodeWithSmallestDist(){
        var min = Infinity,
            minIndex = null;

        for(var v = 0; v < self.size; v++){
            if(
                self.visited[v] == false && 
                self.dist[v] <= min
            ){
                min = self.dist[v];  // set new minimum
                minIndex = v; // set current index with minimum dist  
            }
        }

        return minIndex;
    }

    function print(){
        for(var i = 0; i < self.size; i++){
            console.log(i + ' ' + self.dist[i]);
        }
    }

    function srcToNode(i){
        var current = i;
        while(self.next[current] !== undefined){
            console.log(current);
            current = self.next[current];
        }
        console.log(current); // last node
    }

    function nodeTosrc(i){
        var current = i;
        while(self.prev[current] !== undefined){
            console.log(current);
            current = self.prev[current];
        }

        console.log(current); // last node
    }

    function addEdge(x, y, w){
        self.graph[x][y] = w;
    }

    function displayGraph(){
        console.log(graph.graph);
    }
}

//
// API
//

var graph = new Graph(9);

graph.addEdge(0,1, 100);
graph.addEdge(1,2, 100);
graph.addEdge(2,3, 100);
graph.addEdge(3,4, 100);
graph.addEdge(4,5, 100);
graph.addEdge(5,6, 8);
graph.addEdge(6,7, 100);
graph.addEdge(0,6, 100);
graph.addEdge(7,8, 100);

graph.dijkstra(0);
graph.srcToNode(0); // 0 -> 6 -> 7 -> 8

