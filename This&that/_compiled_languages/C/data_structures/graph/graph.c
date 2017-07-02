#include<stdio.h>
#include<stdlib.h>

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
            graph->array[i][j] = -1;  // OR *(*(graph->array+i)+j) = ++count

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
    if( graph->array[x][y] == -1 ){

        puts("NO");

        return 0;
    }else{

        puts("YES");

        return 1;
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


int main(){

    Graph * graph = createGraph(10);

    connect(&graph, 1, 1, 100);
    connect(&graph, 2, 2, 100);
    connect(&graph, 3, 3, 100);

    isConnected(graph, 1, 1);
    isConnected(graph, 2, 2);
    isConnected(graph, 3, 3);
    isConnected(graph, 4, 4);

    return 0;
}
