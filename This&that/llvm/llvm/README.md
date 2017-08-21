# LLVM hello world demo

## Prerequisites:
* Ubuntu Linux 16.04 x86_64

## Install LLVM and clang
```
$ sudo apt-get install llvm clang
$ which llvm-as
/usr/bin/llvm-as
$ which llc
/usr/bin/llc
```

## Run the demo
```
$ git clone https://github.com/qiuzhong/misc-notes.git
$ cd misc-notes/llvm/llvm/helloworld
$ make
$ ./hello
Hello World!
```
