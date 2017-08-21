/**
 * Disjoint sets (also called union-find algorithm)
 * https://www.youtube.com/watch?v=gcmjC-OcWpI&index=14&list=PLlipSLnrfrUlclWAcvmyxcn6R7tzwALhM
 *
 * all elements start off with a -1 value
 * the rank of a root is only incremented if the two roots have the same rank
 * the rank is proportional to the height of the tree.
 */
function DisjointSet(size){

    //
    // public
    //
    var self = this,
        array, 
        size;

    self.union = union;
    self.find = find;
    self.display = display;
    self.init = init;

    init(size);

    //
    // private
    //
    
    function init(size){
        self.size = size;
        self.array = [];

        for(var index = 0; index < self.size; index++){
            self.array[index] = -1
        }
    }

    function union(x, y){
        var xP = find(x);
        var yP = find(y);
        
        if(xP == yP){
          return;
        }
        
        // remember that negative numbers indicate the rank
        if(self.array[xP] < self.array[yP]){ // in this case, xP has a greater rank!
            self.array[y] = xP;
        }else if(self.array[xP] > self.array[yP]){
            self.array[x] = yP;
        }else if(self.array[xP] == self.array[yP]){
            self.array[yP] = xP;
            self.array[xP] -= 1; // only in this case we increment the rank!
        } 
    }
    
    //
    // find the parent using path compression
    //
    function find(x){
        var parent = self.array[x];
        if(parent < 0){ // when its a negative value, indicating a 'rank'
            return x; // return the parent, not the rank...
        }
        
        // path compression 
        // all children in the path will point directly to the root of the tree
        self.array[x] = find(parent);
        return self.array[x];
    }

    function display(){
        for(var index = 0; index < self.size; index++){
            console.log(index + " [" + self.array[index] + "]");
        }
    }
}

//
// API
//

var set = new DisjointSet(10);

set.union(1,2)
set.union(2,3)
set.union(3,4)
set.union(4,5)

set.find(1) // 1 (in group with '1' as representative)
set.find(2) // 1 (in group with '1' as representative)
set.find(3) // 1 (in group with '1' as representative)
set.find(4) // 1 (in group with '1' as representative)
set.find(5) // 1 (in group with '1' as representative)

set.find(6) // 6 (in group with '6' as representative)
set.find(7) // 7 (in group with '7' as representative)
set.find(8) // 8 (in group with '8' as representative)
set.find(9) // 9 (in group with '9' as representative)

set.display();

// OUTPUT:
//
// 0 [-1]
// 1 [-2]
// 2 [1]
// 3 [1]
// 4 [1]
// 5 [1]
// 6 [-1]
// 7 [-1]
// 8 [-1]
// 9 [-1]
