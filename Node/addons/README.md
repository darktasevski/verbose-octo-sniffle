# NodeJS C++ addon Hello World demo
## Build a NodeJS C++ binding addon and run it.
Take advantage of the V8 JavaScript to write a module in C++
and then load it in NodeJS envrionment.

## Install node-gyp
After install NodeJS, run
```
$ sudo npm install node-gyp -g --verbose
```
Make sure you set your **NODE_PATH** environment variable to the
**/usr/local/lib/node_modules**

## Build and run the NodeJS Hello World demo
```
$ git clone https://github.com/qiuzhong/misc-notes.git
$ cd misc-notes/node/addons/src
$ node-gyp configure
```

For the first time to run **node-gyp configure** command, it will download the
NodeJS header files to **~/.node-gyp/NodeJS VERSION/**, these header files are
used to support the c++ addons compilation.

Here is the confgure log
```
gyp info it worked if it ends with ok
gyp info using node-gyp@3.3.1
gyp info using node@4.4.5 | linux | x64
gyp http GET https://nodejs.org/download/release/v4.4.5/node-v4.4.5-headers.tar.gz
gyp http 200 https://nodejs.org/download/release/v4.4.5/node-v4.4.5-headers.tar.gz
gyp http GET https://nodejs.org/download/release/v4.4.5/SHASUMS256.txt
gyp http 200 https://nodejs.org/download/release/v4.4.5/SHASUMS256.txt
gyp info spawn /usr/bin/python2
gyp info spawn args [ '/usr/local/lib/node_modules/node-gyp/gyp/gyp_main.py',
gyp info spawn args   'binding.gyp',
gyp info spawn args   '-f',
gyp info spawn args   'make',
gyp info spawn args   '-I',
gyp info spawn args   '/home/andersqiu/00-workspace/github/qiuzhong/misc-notes/node/addons/src/build/config.gypi',
gyp info spawn args   '-I',
gyp info spawn args   '/usr/local/lib/node_modules/node-gyp/addon.gypi',
gyp info spawn args   '-I',
gyp info spawn args   '/home/andersqiu/.node-gyp/4.4.5/include/node/common.gypi',
gyp info spawn args   '-Dlibrary=shared_library',
gyp info spawn args   '-Dvisibility=default',
gyp info spawn args   '-Dnode_root_dir=/home/andersqiu/.node-gyp/4.4.5',
gyp info spawn args   '-Dnode_gyp_dir=/usr/local/lib/node_modules/node-gyp',
gyp info spawn args   '-Dnode_lib_file=node.lib',
gyp info spawn args   '-Dmodule_root_dir=/home/andersqiu/00-workspace/github/qiuzhong/misc-notes/node/addons/src',
gyp info spawn args   '--depth=.',
gyp info spawn args   '--no-parallel',
gyp info spawn args   '--generator-output',
gyp info spawn args   'build',
gyp info spawn args   '-Goutput_dir=.' ]
gyp info ok
```

Build the C++ addon
```
$ node-gyp build
gyp info it worked if it ends with ok
gyp info using node-gyp@3.3.1
gyp info using node@4.4.5 | linux | x64
gyp info spawn make
make: Entering directory '/home/andersqiu/00-workspace/github/qiuzhong/misc-notes/node/addons/src/build'
gyp info spawn args [ 'BUILDTYPE=Release', '-C', 'build' ]
  CXX(target) Release/obj.target/hello/hello.o
  SOLINK_MODULE(target) Release/obj.target/hello.node
  COPY Release/hello.node
make: Leaving directory '/home/andersqiu/00-workspace/github/qiuzhong/misc-notes/node/addons/src/build'
gyp info ok
```

Run the JavaScript module that loads the C++ addon
```
$ ls
binding.gyp  build  hello.cc  hello_test.js
$ node hello_test.js
Hello World!
```
