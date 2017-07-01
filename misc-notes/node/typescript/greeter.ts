// function greeter(person) {
//     return "Hello, " + person;
// }

// var user = "Jane User";
// console.log(greeter(user));

// function greeter(person: string) {
//     return "Hello, " + person;
// }

// var user = [1, 2, 3];
// console.log(greeter(user));

// interface Person {
//     firstName: string;
//     lastName: string;
// }

// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// var user = {firstName: "Jane", lastName: "User"};
// console.log(greeter(user));

class Student {
    fullName: string;

    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jane", "M.", "User");
console.log(greeter(user));