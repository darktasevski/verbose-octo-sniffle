// recursion

function rec(val){

    if(val > 10){  // base case
        return;
    }else{
        console.log('foo ' + val);  // ascending order
        rec(val + 1);  // a process to get closer to the base case
        console.log('bar ' + val);  // descending order
    }

}

rec(0);