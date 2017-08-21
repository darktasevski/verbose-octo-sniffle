// recursion:
function foo(n){

    /** 
     * if base case: 
     *  1. do something
     *  2. return
     */
    if(n == 10){
        console.log('=== got: ' + n);
        return;
    }

    /** 
     * if NOT base case: 
     *  1. do something
     *  2. get closer to base case
     *  3. recurse!
     *
     *  - if you decide to do something after the recursive function call, 
     *    the result will be in reverse order!
     *
     */
    console.log('in order: ' + n);
    n++;
    foo(n);
    console.log('reverse order: ' + n);
};

foo(1);



/* output:

in order: 1
in order: 2
in order: 3
in order: 4
in order: 5
in order: 6
in order: 7
in order: 8
in order: 9
=== got: 10
reverse order: 10
reverse order: 9
reverse order: 8
reverse order: 7
reverse order: 6
reverse order: 5
reverse order: 4
reverse order: 3
reverse order: 2

*/
