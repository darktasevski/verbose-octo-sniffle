// http://eloquentjavascript.net/04_data.html#p_0r+HcrZzZJ

var anObject = {left: 1, right: 2};
console.log(anObject); //            ---> { left: 1, right: 2 }
console.log(anObject.left); //       ---> 1
delete anObject.left;
console.log(anObject); //            ---> { right: 2 }
console.log(anObject.left); //       ---> undefined
console.log("left" in anObject); //  ---> false
console.log("right" in anObject); // ---> true

anObject.left = undefined
console.log(anObject); //            ---> { right: 2, left: undefined }
console.log(anObject.left); //       ---> undefined
console.log("left" in anObject); //  ---> true
