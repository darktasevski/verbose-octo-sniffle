### bash tutorial:


## variables
```bash
foo="brian"
echo $foo

# variable syntax:
foo
_foo
Foo
FOO
```

# functions
```bash
# evaluate code:
$(ls)  # $(some_command)

eval "echo brian"

#------------------------------
# fill in variable with user input:
read VARIABLE


#------------------------------

call_me(){
  first_name=$1
  last_name=$2
  echo "hello Mr. ${last_name}, or would you prefer to be called ${first_name} ???"
}

# call the function with a parameter:
  call_me brian spinos
```

# More functions

```bash
# source <file>
source path/to/file # evaluates the file

# export <variable>
foo=hello
export foo #  the export command marks an environment variable to be exported with any newly forked child processes

export -p #list env variables

```



# loop
```bash
# multiple lines
for foo in $(ls)
  do echo $foo
done

# one liner:
for x in 1 2 3 4 5; do echo $x; done

```

# interpolation
```bash
echo "hello ${USER}"
```

# if statement
```bash

if [ "foo" = "bar" ]
  then
    echo "they are equal"
  else
    echo "they are not equal"
fi
```


# arrays ???
```bash
  # INDEX ARE ZERO BASE
  # http://www.thegeekstuff.com/2010/06/bash-array-tutorial/

  names=(brian ana erich sandra rick)
  echo "${names[@]}"          # returns all names
  echo "${names[2]}"          # returns 'erich'

  my_array[my_index]=my_value
  echo ${my_array[my_index]}      # returns 'my_value'


  Names[0]='Debian'
  Names[1]='Red hat'
  Names[2]='Ubuntu'
  Names[3]='Suse'
  Names[age]='25'
  Names[foo]='bar'

  echo ${Names[1]}
  echo ${Names[bar]}    # if index does not exist, it will resturn the last index declared...

  # declare an array:
  declare -a Names=('Debian2' 'Red hat2' 'Red hat2' 'Suse2' 'Fedora2');
  echo ${Names[@]}    # returns all elements
  echo ${#Names[@]}   # return the number of elements
  echo ${#Names[0]}   # returns the number of characters in the element of index '0'
  echo ${Names[@]:3:2}   # returns the element with index '3' and return 2 elements (also counting the element of index '3')
  echo ${Names[2]:0:3}     # with offset
```



# heredoc
```bash
cat <<foobar


      ...
        sdfsdfsdf
           sdfsdfs
               dfsdf
                  sdfsdf
                     ...



foobar

```

# inject code result in file:
```bash

cat > file123.txt <<EOF
$(echo brian)
EOF
```

# Stuff to cover:

```bash
export foo
...

reserved words
```














# Custom commands with options
```bash
my_command(){
  for ((i=1;i<=$#;i++));
  do
  #-------------------------------------------------
  if [ ${!i} = "-f" ] || [ ${!i} = "--file" ];
  then
    ((i++))
    var1=${!i};
    echo "-f or --file is ${var1}";
  #-------------------------------------------------
  elif [ ${!i} = "-n" ] || [ ${!i} = "--name" ];
  then
    ((i++))
    var2=${!i};
    echo "-n or --name is ${var2}";
  #-------------------------------------------------  
  else
    echo "whaaat?";
  fi
  #-------------------------------------------------
done;
}

my_command --name "sandra"


```
