# Iotivity Introduction
## What is iotivity?
Here is the explaination from iotivity official website:
> IoTivity is an open source software framework enabling seamless device-to-device connectivity to address the emerging needs of the Internet of Things.

## Get source code and build it
### Environments:
* Ubuntu Linux 14.04 x86_64
* GCC 4.8.2

### Get the source code
```
$ wget http://mirrors.kernel.org/iotivity/1.1.0/iotivity-1.1.0.tar.gz
```

From the URL, we know it's host on the Linux kernel website.

### Build
```
$ tar -xvf iotivity-1.1.0.tar.gz
$ cd iotivity-1.1.0/
```

iotivity is a project that built with SCons, so you can build it with the command
```
$ scons
```

And then you got the error:
```
*********************************** Error: ****************************************
* Please download cbor using the following command:                               *
*     $ git clone https://github.com/01org/tinycbor.git extlibs/tinycbor/tinycbor *
***********************************************************************************
```
It seems you need to download the dependency repo **tinycbor** to continue the build.
```
$ git clone https://github.com/01org/tinycbor.git extlibs/tinycbor/tinycbor
```

Read the **Readme.scons.txt** and follow the instruction to build iotivity on
Ubuntu Linux
Install build tools:
```
$ sudo apt-get install git-core scons ssh build-essential g++ doxygen valgrind
```
Install external libraries:
```
$ sudo apt-get install libboost-dev libboost-program-options-dev libboost-thread-dev uuid-dev libssl-dev libtool libglib2.0-dev
```

Now we can build **iotivity**
```
$ scons TARGET_OS=linux TARGET_TRANSPORT=IP
```
During the build, it will download other libraries like google test.

### Notes
For Ubuntu Linux 16.04, gcc version is 5.3.1, there is an error that stop the compiling.
> service/resource-container/src/BundleInfoInternal.cpp:35:
> error: Converting to 'bool' from 'nullptr_r' requires direct-intilialization.

To fix this issue, please change:
nullptr -> false at line 35 of that cpp source file.

## Run the simple example
Please open 2 terminals, one for the server and the other for the client

### Server
```
$ cd out/linux/x86_64/release/resource/csdk/stack/samples/linux/SimpleClientServer
```

See the usage
```
$ ./ocserver
54:27.053 INFO: ocserver: Usage : ocserver -o <0|1>
54:27.053 INFO: ocserver: -o 0 : Notify all observers
54:27.053 INFO: ocserver: -o 1 : Notify list of observers
```

Launch the server
```
$ ./ocserver -o 0
50:22.581 DEBUG: ocserver: OCServer is starting...
50:22.581 INFO: ocserver: Created Light resource with result: OC_STACK_OK
50:22.581 INFO: ocserver: Entering ocserver main loop...
50:22.581 INFO: ocserver: Will send out presence in 10 seconds
50:33.581 INFO: ocserver: Created /a/fan for presence notification
50:34.581 INFO: ocserver: Created /a/led for presence notification
50:39.581 INFO: ocserver: Deleted /a/fan for presence notification
50:39.581 INFO: ocserver: Deleted /a/led for presence notification
50:39.581 INFO: ocserver: ================ stopping presence
```

### Client
See the usage
```
$ 56:04.781 INFO: occlient: Usage : occlient -u <0|1> -t <1..17> -c <0|1>
56:04.781 INFO: occlient: -u <0|1> : Perform multicast/unicast discovery of resources
56:04.781 INFO: occlient: -c 0 : Use Default connectivity(IP)
56:04.781 INFO: occlient: -c 1 : IP Connectivity Type
56:04.781 INFO: occlient: -t 1  :  Discover Resources
56:04.781 INFO: occlient: -t 2  :  Discover Resources and Initiate Nonconfirmable Get Request
56:04.781 INFO: occlient: -t 3  :  Discover Resources and Initiate Nonconfirmable Get Request with query filter.
56:04.781 INFO: occlient: -t 4  :  Discover Resources and Initiate Nonconfirmable Put Requests
56:04.781 INFO: occlient: -t 5  :  Discover Resources and Initiate Nonconfirmable Post Requests
56:04.781 INFO: occlient: -t 6  :  Discover Resources and Initiate Nonconfirmable Delete Requests
56:04.781 INFO: occlient: -t 7  :  Discover Resources and Initiate Nonconfirmable Observe Requests
56:04.781 INFO: occlient: -t 8  :  Discover Resources and Initiate Nonconfirmable Get Request for a resource which is unavailable
56:04.781 INFO: occlient: -t 9  :  Discover Resources and Initiate Confirmable Get Request
56:04.781 INFO: occlient: -t 10 :  Discover Resources and Initiate Confirmable Post Request
56:04.781 INFO: occlient: -t 11 :  Discover Resources and Initiate Confirmable Delete Requests
56:04.781 INFO: occlient: -t 12 :  Discover Resources and Initiate Confirmable Observe Requests and cancel with Low QoS
56:04.781 INFO: occlient: -t 13 :  Discover Resources and Initiate Nonconfirmable presence
56:04.781 INFO: occlient: -t 14 :  Discover Resources and Initiate Nonconfirmable presence with filter
56:04.781 INFO: occlient: -t 15 :  Discover Resources and Initiate Nonconfirmable presence with 2 filters
56:04.781 INFO: occlient: -t 16 :  Discover Resources and Initiate Nonconfirmable multicast presence.
56:04.781 INFO: occlient: -t 17 :  Discover Resources and Initiate Nonconfirmable Observe Requests then cancel immediately with High QOS
56:04.781 INFO: occlient: -t 18 :  Discover Resources and Initiate Nonconfirmable Get Request and add  vendor specific header options
56:04.781 INFO: occlient: -t 19 :  Discover Platform
56:04.781 INFO: occlient: -t 20 :  Discover Devices
```

Launch the client to discover resources
```
$ ./occlient -c 0 -t 1
56:56.861 INFO: occlient: Entering occlient main loop...
56:58.865 INFO: occlient: Callback Context for DISCOVER query recvd successfully
56:58.865 INFO: occlient: StackResult: OC_STACK_OK
56:58.865 INFO: occlient: Discovered on IP
56:58.865 INFO: occlient: Device =============> Discovered @ fe80::9a90:96ff:febb:dad2:34679
56:58.865 INFO: PayloadLog: Payload Type: Discovery
56:58.865 INFO: PayloadLog: 	SID: cf6728cb-94e4-4524-839e-e9f6e4ddd5b2
56:58.865 INFO: PayloadLog: 	Interface:
56:58.865 INFO: PayloadLog: 		oic.if.ll
56:58.865 INFO: PayloadLog: 	Resource #1
56:58.865 INFO: PayloadLog: 	URI:/oic/d
56:58.865 INFO: PayloadLog: 	Resource Types:
56:58.865 INFO: PayloadLog: 		oic.d.tv
56:58.865 INFO: PayloadLog: 	Interfaces:
56:58.865 INFO: PayloadLog: 		oic.if.baseline
56:58.865 INFO: PayloadLog: 		oic.if.r
56:58.865 INFO: PayloadLog: 	Bitmap: 1
56:58.865 INFO: PayloadLog: 	Secure?: false
56:58.865 INFO: PayloadLog: 	Port: 0
56:58.865 INFO: PayloadLog:
56:58.865 INFO: PayloadLog: 	Resource #2
56:58.865 INFO: PayloadLog: 	URI:/oic/p
56:58.865 INFO: PayloadLog: 	Resource Types:
56:58.865 INFO: PayloadLog: 		oic.wk.p
56:58.865 INFO: PayloadLog: 	Interfaces:
56:58.865 INFO: PayloadLog: 		oic.if.baseline
56:58.865 INFO: PayloadLog: 		oic.if.r
56:58.865 INFO: PayloadLog: 	Bitmap: 1
56:58.865 INFO: PayloadLog: 	Secure?: false
56:58.865 INFO: PayloadLog: 	Port: 0
56:58.865 INFO: PayloadLog:
56:58.865 INFO: PayloadLog: 	Resource #3
56:58.865 INFO: PayloadLog: 	URI:/a/light
56:58.865 INFO: PayloadLog: 	Resource Types:
56:58.865 INFO: PayloadLog: 		core.light
56:58.865 INFO: PayloadLog: 	Interfaces:
56:58.865 INFO: PayloadLog: 		oic.if.baseline
56:58.865 INFO: PayloadLog: 		oc.mi.def
56:58.865 INFO: PayloadLog: 	Bitmap: 3
56:58.865 INFO: PayloadLog: 	Secure?: false
56:58.865 INFO: PayloadLog: 	Port: 0
56:58.865 INFO: PayloadLog:
56:58.865 INFO: occlient: Usage : occlient -u <0|1> -t <1..17> -c <0|1>
56:58.865 INFO: occlient: -u <0|1> : Perform multicast/unicast discovery of resources
56:58.865 INFO: occlient: -c 0 : Use Default connectivity(IP)
56:58.865 INFO: occlient: -c 1 : IP Connectivity Type
56:58.865 INFO: occlient: -t 1  :  Discover Resources
56:58.865 INFO: occlient: -t 2  :  Discover Resources and Initiate Nonconfirmable Get Request
56:58.865 INFO: occlient: -t 3  :  Discover Resources and Initiate Nonconfirmable Get Request with query filter.
56:58.865 INFO: occlient: -t 4  :  Discover Resources and Initiate Nonconfirmable Put Requests
56:58.865 INFO: occlient: -t 5  :  Discover Resources and Initiate Nonconfirmable Post Requests
56:58.865 INFO: occlient: -t 6  :  Discover Resources and Initiate Nonconfirmable Delete Requests
56:58.865 INFO: occlient: -t 7  :  Discover Resources and Initiate Nonconfirmable Observe Requests
56:58.865 INFO: occlient: -t 8  :  Discover Resources and Initiate Nonconfirmable Get Request for a resource which is unavailable
56:58.865 INFO: occlient: -t 9  :  Discover Resources and Initiate Confirmable Get Request
56:58.865 INFO: occlient: -t 10 :  Discover Resources and Initiate Confirmable Post Request
56:58.865 INFO: occlient: -t 11 :  Discover Resources and Initiate Confirmable Delete Requests
56:58.865 INFO: occlient: -t 12 :  Discover Resources and Initiate Confirmable Observe Requests and cancel with Low QoS
56:58.865 INFO: occlient: -t 13 :  Discover Resources and Initiate Nonconfirmable presence
56:58.865 INFO: occlient: -t 14 :  Discover Resources and Initiate Nonconfirmable presence with filter
56:58.865 INFO: occlient: -t 15 :  Discover Resources and Initiate Nonconfirmable presence with 2 filters
56:58.865 INFO: occlient: -t 16 :  Discover Resources and Initiate Nonconfirmable multicast presence.
56:58.865 INFO: occlient: -t 17 :  Discover Resources and Initiate Nonconfirmable Observe Requests then cancel immediately with High QOS
56:58.865 INFO: occlient: -t 18 :  Discover Resources and Initiate Nonconfirmable Get Request and add  vendor specific header options
56:58.865 INFO: occlient: -t 19 :  Discover Platform
56:58.865 INFO: occlient: -t 20 :  Discover Devices
```
