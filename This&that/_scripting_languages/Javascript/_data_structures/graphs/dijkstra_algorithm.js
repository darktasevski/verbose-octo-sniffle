// Dijkstra's algorithm

// distFromSrcArray is the distance array: index is the element ID, and value is the actual distance
// wasVisitedArray is the visited array:  index is the id of the element, value is a boolean

var GraphSize = 9; // do we need to know the graph size?

// find the index in the distFromSrcArray with the minimum distance
function getMinDistance(distFromSrcArray, wasVisitedArray){
	var min = Infinity,
        min_index = null;  // min_index = -100000 (old code)

    for(var v = 0; v < GraphSize; v++){
    	// if node not visited and its distance in less than the current minimum
    	if(wasVisitedArray[v] == false && distFromSrcArray[v] <= min){
    		min = distFromSrcArray[v]  // set new minimum
            min_index = v // set current index with minimum distance
    	}
    }

    return min_index;
}

// print the distances from the nodes to the source
function printSolution(distFromSrcArray){
	console.log("Vertex Distance from Source\n");
	for(var i = 0; i < GraphSize; i++){
		console.log(i + "\t\t" + distFromSrcArray[i]);
    }
}

function dijkstra(graph, src){
	var distFromSrcArray = [],
        wasVisitedArray = [];

    // initialization:
    for(var i = 0; i < GraphSize; i++){
    	distFromSrcArray[i] = Infinity; // set all distances to INFINITY
        wasVisitedArray[i] = false; // indentify nodes as NOT visited
    }

    // Distance of source node from itself is always 0
    distFromSrcArray[src] = 0;

    // Find shortest path for all vertices
    // -1 because it excludes the source node ???
    for(var count = 0; count < (GraphSize -1); count++){
    	// Pick node with the minimum distance to source, from the set of vertices not yet processed.
        // u is always equal to src in first iteration.
        var u = getMinDistance(distFromSrcArray, wasVisitedArray);

        // Mark the picked node as processed
        wasVisitedArray[u] = true;

        // Update distFromSrcArray value of the adjacent (neighbour) nodes of the picked node.
    	for(var v = 0; v < GraphSize; v++){
    		// Update distFromSrcArray[v] (distance of v) only IF: 
            // - is not in wasVisitedArray, 
            // - there is an edge from u to v, 
            // - and total weight of path from src to v through u is smaller than current value of distFromSrcArray[v]
            if(
            	!wasVisitedArray[v] && 
            	graph[u][v] != 0 && 
            	distFromSrcArray[u] != Infinity && 
            	distFromSrcArray[u] + graph[u][v] < distFromSrcArray[v]
            ){
                distFromSrcArray[v] = distFromSrcArray[u] + graph[u][v];
            }
    	}
    }
    
    // print the constructed distFromSrcArray
    printSolution(distFromSrcArray);
}

// Let us create the example graph discussed above */
var graph = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 0, 10, 0, 2, 0, 0],
    [0, 0, 0, 14, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0]
];

dijkstra(graph, 0);

/* 
output:

Vertex Distance from Source
0        0
1        4
2        12
3        19
4        21
5        11
6        9
7        8
8        14
*/
