#
# Person class
#
class Person:
    "This is the documentation for the person class"

    # Class variable
    personCount = 0 
    
    # Constructor
    def __init__(self, name, age):
        self.name = name 
        self.age = age 
        Person.personCount += 1 
    
    def set_name(self, name):
        self.name = name

    def get_name(self):
        return self.name

    def sayHello(self):
        print("hello there! my name is: " + self.name)
        
    def sayAge(self):
        print("I am " + str(self.age) + " years old.")

#
# API
#

brian = Person("Brian Spinos", 28)
brian.sayHello()
brian.sayAge()
brian.set_name("Ryan")
print( brian.get_name() )


erich = Person("erich Spinos", 25)
erich.sayHello()
erich.sayAge()
brian.set_name("Derik")
print( brian.get_name() )


print(Person.personCount) # 2
print(Person.__doc__) # 'This is the documentation for the person class'


