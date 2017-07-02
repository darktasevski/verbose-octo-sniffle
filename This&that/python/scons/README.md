# Notes for SCons build tool
## Run the demo
```
$ git clone https://github.com/qiuzhong/misc-notes.git
$ cd misc-notes/python/scons/helloworld/
$ scons
scons: Reading SConscript files ...
scons: done reading SConscript files.
scons: Building targets ...
gcc -o hello.o -c hello.c
gcc -o hello hello.o
scons: done building targets.

$ ./hello
Hello World!
```
