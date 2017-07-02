function  is_type(input){
         return input instanceof String;
  }

let arr = [1,2,3];
let str = new String("string");
let mystr = 'string';

console.log(is_type(arr));
console.log(is_type(5));

console.log(is_type(str));     //returns TRUE
console.log(is_type(mystr));   //returns FALSE
