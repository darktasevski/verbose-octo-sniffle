# Build and install NodeJS
The follow content aims to guide you to build and install nodejs on a Ubuntu Linux system.

## Pre-condition
* Ubuntu Linux
* gcc, requires gcc 4.8+ after nodejs 4.0

## Build and Install

```Bash
$ tar -xvf node-v4.4.0.tar.xz
$ cd node-v4.4.0
$ ./configure
$ make -j 8
$ sudo make install
```

After that, the node is installed at **/usr/local/bin** and all node builtin modules (**npm** for example) are installed at
**/usr/local/lib/node_modules** by default, when you install node 3rd-party modules via npm with **-g** option, it will also install these modules at 
**/usr/local/lib/node_modules**
