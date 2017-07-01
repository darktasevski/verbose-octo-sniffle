//
// DIJKSTRA ALGORITHM
//

#include<stdio.h>
#include<stdlib.h>


#define INFINITY 100000
#define TRUE 1
#define FALSE 0
#define NOT_CONNECTED_VALUE -1


typedef struct Graph{
    int size;
    int ** array; // 2D array
} Graph;


Graph * createGraph(int size){
    Graph * graph = (Graph *)malloc(sizeof(Graph));
    graph->size = size;

    //
    // allocate space for 2D array
    //

    int i, j;

    graph->array = (int **)malloc(sizeof(int *) * size);

    for(i = 0; i < size; i++){
        graph->array[i] = (int *)malloc(sizeof(int) * size);
    }

    //
    // initialize 2D array
    //


    // Note that graph->array[i][j] is same as *(*(graph->array+i)+j)

    for(i = 0; i <  size; i++)
        for(j = 0; j < size; j++)
            graph->array[i][j] = NOT_CONNECTED_VALUE;  // OR *(*(graph->array+i)+j) = ++count

    // for(i = 0; i <  size; i++)
    //     for(j = 0; j < size; j++)
    //         printf("%d ", graph->array[i][j]);

    return graph;
}


void connect(Graph ** graph, int x, int y, int weight){
    (*graph)->array[x][y] = weight;
    (*graph)->array[y][x] = weight;
}

/**
 * isConnected is a function that returns:
 * 1 -> if connected
 * 0 -> if NOT connected
 */
int isConnected(Graph * graph, int x, int y){
    if( graph->array[x][y] == NOT_CONNECTED_VALUE ){
        puts("NO");
        return TRUE;
    }else{
        puts("YES");
        return FALSE;
    }
}

// void printGraph(Graph * graph){
//     graph->array[][];

//     char * row;
//     int i;
//     for(i = 0; i <  size; i++){
//         row
//     }

//     printf("");
// }


/**
 * This should have been a minHeap...
 */
int minDistance(Graph ** graph, int * dist, int * visited){

    int size = (*graph)->size;
    int currentMinValue = INFINITY;
    int indexWithMinDist = -1; // start with an invalid index!

    // Loop through the nodes
    int i;
    for(i = 0; i < size; i++){
        if(visited[i] == FALSE && dist[i] <= currentMinValue){
            currentMinValue = dist[i];
            indexWithMinDist = i;
        }
    }

    return indexWithMinDist;
}


void printSolution(Graph ** graph, int * dist){
    printf("Node Distance from Source\n");

    int size = (*graph)->size;
    int i;
    for(i = 0; i < size; i++){
        printf("%d \t\t %d\n", i, dist[i]);
    }
}

void dijkstra(Graph ** graph, int src){

    int size = (*graph)->size;
    int dist[size];
    int visited[size];

    // Initialize dist and visited arrays
    int i;
    for(i = 0; i < size; i++){
        dist[i] = INFINITY;
        visited[i] = FALSE;
    }

    // Distance of src from itself is always 0
    dist[src] = 0;

    for(i = 0; i < size; i++){
        int currentNode = minDistance(graph, dist, visited);

        printf("CURRENT NODE: (i: %d, dist: %d, visited: %d) \n", currentNode, dist[currentNode], visited[currentNode]);
        visited[currentNode] = TRUE;
        printf("CURRENT NODE: (i: %d, dist: %d, visited: %d) \n", currentNode, dist[currentNode], visited[currentNode]);

        int currentNeighbor;
        for(currentNeighbor = 0; currentNeighbor < size; currentNeighbor++){
            if(
                dist[currentNode] != INFINITY &&
                (*graph)->array[currentNode][currentNeighbor] != NOT_CONNECTED_VALUE &&
                visited[currentNeighbor] == FALSE &&
                dist[currentNode] + (*graph)->array[currentNode][currentNeighbor] < dist[currentNeighbor]
            ){
                printf("\t\tCURRENT NEIGHBOR: (i: %d, dist: %d, visited: %d) \n", currentNeighbor, dist[currentNeighbor], visited[currentNeighbor]);
                dist[currentNeighbor] = dist[currentNode] + (*graph)->array[currentNode][currentNeighbor];
                printf("\t\tCURRENT NEIGHBOR: (i: %d, dist: %d, visited: %d) \n", currentNeighbor, dist[currentNeighbor], visited[currentNeighbor]);
            }
        }
    }

    printSolution(graph, dist);
}


int main(){

    Graph * graph = createGraph(3);

    connect(&graph, 0, 1, 10);
    connect(&graph, 0, 2, 100);
    connect(&graph, 1, 2, 10);

    // isConnected(graph, 1, 1);
    // isConnected(graph, 2, 2);
    // isConnected(graph, 3, 3);
    // isConnected(graph, 4, 4);

    dijkstra(&graph, 0);

    return 0;
}


/* OUTPUT:

CURRENT NODE: (i: 0, dist: 0, visited: 0)
CURRENT NODE: (i: 0, dist: 0, visited: 1)
        CURRENT NEIGHBOR: (i: 1, dist: 100000, visited: 0)
        CURRENT NEIGHBOR: (i: 1, dist: 10, visited: 0)
        CURRENT NEIGHBOR: (i: 2, dist: 100000, visited: 0)
        CURRENT NEIGHBOR: (i: 2, dist: 100, visited: 0)
CURRENT NODE: (i: 1, dist: 10, visited: 0)
CURRENT NODE: (i: 1, dist: 10, visited: 1)
        CURRENT NEIGHBOR: (i: 2, dist: 100, visited: 0)
        CURRENT NEIGHBOR: (i: 2, dist: 20, visited: 0)
CURRENT NODE: (i: 2, dist: 20, visited: 0)
CURRENT NODE: (i: 2, dist: 20, visited: 1)
Node Distance from Source
0        0
1        10
2        20

*/
