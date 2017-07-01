/** 
 * Graphs
 *
 * representations: adjacency matrix , and adjacency list
 *
 * This is an inderected graph
 *      ex: graph.array[x][y] === graph.array[y][x]
 */
function AdjMatrix(size){
    var self = this;
    var _size = size;
    var _array = [];

    //
    // public
    //
    
    self.add = add;
    self.remove = remove;
    self.print = print;

    init(size);

    //
    // private
    //

    /**
     * initialize the 2D array will null values
     */
    function init(size){
        for(var i = 0; i < size; i++){
            _array[i] = [];
            for(var j = 0; j < size; j++){
                _array[i][j] = null;
            }
        }
    }

    /**
     * add a connection between 2 nodes, an edge.
     * x (first node index)
     * y (second node index)
     * w (weight of the edge between the two nodes)
     */
    function add(x, y, w){
        _array[x][y] = w;
        _array[y][x] = w;
    }

    /**
     * remove the connection between two nodes, by setting the edge's weight to null.
     */
    function remove(x, y){
        _array[x][y] = null;
        _array[y][x] = null;
    }

    /**
     * print the graph's 2D array.
     */
    function print(){
        var row = '';
        for(var i = 0; i < _size; i++){
            for(var j = 0; j < _size; j++){
                if(_array[i][j]){
                    row += '| ' + _array[i][j] + ' ';
                }else{
                    row += '|  ';
                }
            }
            console.log(row + ' |');
            row = '';
        }
    }

}

var graph = new AdjMatrix(10);

graph.add(1,2,100);
graph.add(1,3,200);
graph.add(1,4,300);
graph.add(1,5,400);
graph.add(2,3,500);

graph.remove(2,3);

graph.print();

/*
output:

|  |  |  |  |  |  |  |  |  |   |
|  |  | 100 | 200 | 300 | 400 |  |  |  |   |
|  | 100 |  |  |  |  |  |  |  |   |
|  | 200 |  |  |  |  |  |  |  |   |
|  | 300 |  |  |  |  |  |  |  |   |
|  | 400 |  |  |  |  |  |  |  |   |
|  |  |  |  |  |  |  |  |  |   |
|  |  |  |  |  |  |  |  |  |   |
|  |  |  |  |  |  |  |  |  |   |
|  |  |  |  |  |  |  |  |  |   |

*/
