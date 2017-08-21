// pointers explained in js





// variables
var foo = {value: 10, address: '0x1111111', type: 'int'} // int foo = 10;
var bar = {value: 20, address: '0x2222222', type: 'int'} // int bar = 20;


foo.address // &foo; (used for any type of variable)
bar.address // &foo; (used for any type of variable)


// pointers
var myPointer = {value: null, adress: '0x3333333', type: 'int pointer'} // int * myPointer;

myPointer.value = foo.address // myPointer = &foo;

myPointer.value // *myPointer;  (only used for pointers)
myPointer.address // &myPointer; (used for any type of variable)


// double pointers:
var doublePointer = {value: null, adress: '0x4444444', type: 'pointer to int pointer'} // int ** doublePointer;

doublePointer.value = myPointer.address  // doublePointer = &myPointer;


// strings
var name = {value: null, adress: '0x5555555', type: 'char pointer'}  // char * name;
name.value = string(['b','r','i','a','n','\0'])  // name = "brian";


var lastName = {value: null, adress: '0x6666666', type: 'char array', size: 50}  // char lastName[50];
lastName.value = string(['b','r','i','a','n','\0']) // lastName = "brian";









function string(array){
    chars = [];
    address = 10000000;
    array.forEach(function(letter){
        chars.push({value: letter, adress: address, type: 'char'});
        address++;
    });
    return chars[0].address;
}

