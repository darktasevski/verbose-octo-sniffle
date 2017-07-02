# python    2  and 3 ?
# file.py

# $ python --version # 2.7.10
# $ python   # ctrl + D  # to exit
# $ python file.py
# '#!/usr/bin/python' # you know how to use this!


foo_bar = 2 * 3

import math
math.ceil(foo_bar)

'string'
"string"

fn = 'brian' + 'spinos'


print('hello')

print('hello', 'there') #=> 'hello there'

str(my_num)  # to string

print(12, 'is my age') #=> '12 is my age'


len(foo)  #=> length
'hello'[1:3] #=> 'el'
'hello'[:3] #=> 'hel'
'hello'[1:] #=> 'ello'


7 // 2 #=> 3  # lower boundry, no floats



if 1 < 3 or 4 == 4:
    print('yeah')
elif 2 < 6
    print('wha?')
else:
    print('no')




name = input('what is your name?')




#----------------------------------------

foo = [1,2,3,4]  # list (array)
foo[0] # get first item


my_dictionary = {"name":"brian", "id":123, 456:"ssn"} # dictionary (hash)

my_dictionary['name'] # brian

my_dictionary.items()

del my_dictionary['name']
my_dictionary.get('name')

#---------------------------------------- for loop:
for needle in haystack:
    print(needle)


#----------------------------------------
import random
x = random.random()
x = random.choice([1,2,3,4,5])
x = random.randint(1,100) # range

x = range(3)  # [0,1,2]
x = range(start, stop, step)

#----------------------------------------
$ pip install requests # http
import requests

x = requests.get('http://foo.com/users')
x.json()

#----------------------------------------
while x != 3:
    print(x)
    x = x + 1

#---------------------------------------- function
def foo(x, y):
    print(x,y)
    return x

foo(123) # calling the function
#---------------------------------------- files

x = open(foo.txt, 'w')  # 'w'  'r' 'a'
x.write('hello\n')
x.write('brian\n')
x.close()

x = open('foo.txt', 'r')
print(x.read())  # .readline()
x.close()

#----------------------------------------
x = []
x.append(1)
x.append(2)
x.append(3)
x.remove(3)  # del x[index]
#=> [1,2]

#---------------------------------------- exceptions

try:
    # code...
except ValueError as err:  # ValueError is a reserved word
    print(err)


#---------------------------------------- create module
# in the same folder, create a file:  foo.py
# write functions there
# in the other file:
import foo
foo.func1(x) # use the module!

#---------------------------------------- OOP

class Employee:
   'Common base class for all employees'  # description, Employee.__doc__
   empCount = 0  # class variable, Employee.empCount

   def __init__(self, name, salary):
      self.name = name
      self.salary = salary
      Employee.empCount += 1

   def displayCount(self):
     print "Total Employee %d" % Employee.empCount

   def displayEmployee(self):
      print "Name : ", self.name,  ", Salary: ", self.salary


x = Employee("Zara", 2000)
x.displayEmployee()
Employee.empCount
x.foo = 'bar' # you can add attributes!
del x.foo  # and delete too!
#----------------------------------------

