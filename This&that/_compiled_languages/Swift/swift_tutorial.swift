import Cocoa


var myString = "Hello, World!"

print(myString)

//---------------------------------------------------------------- classes
class Person {
   var age: Int

   init(age: Int) {
      self.age = age
   }

   func greet(c: Int) -> Int {
        return 100 - c
    }
}



//---------------------------------------------------------------- instantiation
let brian = Person(age: 27)
print("brian is \(brian.age)")
print("brian: \(brian.greet(10))")





// $ xcrun swift swift_tutorial.swift

// OR...

// $ swiftc swift_tutorial.swift -o swift_tutorial
// ./swift_tutorial