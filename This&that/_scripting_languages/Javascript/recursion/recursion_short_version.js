function countToTen(n){
    if(n > 10){ // base case
        return;
    }
    
    console.log(n); // in order
    
    countToTen(n + 1); // get closer to base case and recurse
    
    console.log(n); // reverse order
}


countToTen(0);

//-------------------------------- output:
/*
0
1
2
3
4
5
6
7
8
9
10
10
9
8
7
6
5
4
3
2
1
0



*/
