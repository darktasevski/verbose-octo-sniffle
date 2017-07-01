//
// Class example
//

class Person {
    var name: String
    var age: Int
    var address: String
    
    /**
     * constructor
     */
    init(name: String, age: Int, address: String){
        self.name = name
        self.age = age
        self.address = address
    }
    
    func getName() -> String {
        return self.name
    }
    
    func setName(name: String){
        self.name = name
    }

    func multiply(x: Int, y: Int) -> Int {
        return x * y
    }
}

//
// Usage:
//

let brian = Person(name: "Brian", age: 27, address: "123 4th Ave.")

print(brian.name) // Brian

print("Age: \(brian.age)") // Age: 27

brian.setName(name: "Erich")
brian.name = "Rick" // this also works!
print("Name changed to: \(brian.name)") // Name changed to: Rick

print( brian.multiply(x: 10, y: 2) ) // 20
