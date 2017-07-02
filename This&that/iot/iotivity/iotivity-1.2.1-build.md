# Introduction
Build iotivity 1.2.1 record

## Steps
```
$ tar -xvf iotivity-1.2.1.tar.gz
$ cd iotivity-1.2.1/
$ scons --help
scons: Reading SConscript files ...
Reading linux configuration script
Checking for POSIX Thread Support...yes

*********************************** Error: ****************************************
* Please download cbor using the following command:                               *
*   $ git clone https://github.com/01org/tinycbor.git extlibs/tinycbor/tinycbor -b v0.4 *
***********************************************************************************

$ git clone https://github.com/01org/tinycbor.git extlibs/tinycbor/tinycbor -b v0.4

$ sudo apt-get install sqlite3-dev libcurl4-openssl-dev

$ scons VERBOSE=True TARGET_ARCH=x86_64 RELEASE=False logger octbstack connectivity_abstraction coap c_common ocsrm routingmanager
```