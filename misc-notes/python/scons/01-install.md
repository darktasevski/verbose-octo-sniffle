# Guide for installing SCons

## Prerequisites:
* Python 2.x, SCons is written in Python 2. Python 3 is not supported.

## Package installation
### Yum package manager
```
$ sudo yum install scons
```

### Apt-get package manager
```
$ sudo apt-get install scons
```

## Build with source code
```
$ wget http://prdownloads.sourceforge.net/scons/scons-2.5.0.tar.gz
$ tar -xvf scons-2.5.0
$ sudo python setup.py install
```

## Notice:
Failed to install scons via pip

## Hello World demo
### File list in the demo directory
* hello.c
* SConstruct

### Content
hello.c
```
#include    <stdio.h>

int main(void) {
    printf("Hello World!\n");

    return 0;
}

```

SConstruct
```
Program('hello.c')
```

### Build and run
```
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
