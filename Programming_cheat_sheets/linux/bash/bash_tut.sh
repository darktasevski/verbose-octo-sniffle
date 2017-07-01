#!/bin/bash

# http://www.newthinktank.com/2016/06/shell-scripting-tutorial/

# commentss

echo "hello world"  # print to the screen

# The variable name starts with a letter or _ and then can also contain numbers
# The shell treats all variables as strings
# global variable
myVariable="hello"  # no space around the equals sign!

declare -r FOO=5 # Declare a constant

# Use arithmetic expansion for adding
result=$((var1 + var2))

# interpolation:
echo "5 + 4 = $var3"


# heredoc
cat << END
This text
prints on
many lines
END


#---------------- functions
# A function that receives 2 values and prints a sum
getSum(){
    # Attributes are retrieved by referring to $1, $2, etc.
 	local num3=$1
 	local num4=$2
 		
 	# Sum values
 	local sum=$((num3+num4))
 		
 	# Pass values back with echo
 	echo $sum
}
 	
 num1=5
 num2=6
 	
 # You pass atributes by separating them with a space
 # Surround function call with $() to get the return value
 sum=$(getSum num1 num2)
 echo "The sum is $sum"
 
 #----------------------- if statement
 
# You place your condition with in []
# Include a space after [ and before ]
# Integer Comparisons: eq, ne, le, lt, ge, gt
if [ $age -ge 16 ]; then
  	echo "You can drive"
  	
# Check another condition
elif [ $age -eq 15 ]; then
    echo "You can drive next year"
  		
# Executed by default
else
    echo "You can't drive"
 	  
# Closes the if statement
fi
 	
