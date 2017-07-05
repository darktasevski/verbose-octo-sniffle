#
# This is an example of a makefile
#
# 1. create a file called `makefile`
# 2. use TABS and not 4 spaces
# 3. from the folder which the makefile resides,
#    run: $ make
#    it will execute the code in the first TAG
#    run: $ make foo
#    it will execute the code in the 'foo' TAG
#

all:
  echo "hello from makefile!"

foo:
  echo "this is another set of commands..."
