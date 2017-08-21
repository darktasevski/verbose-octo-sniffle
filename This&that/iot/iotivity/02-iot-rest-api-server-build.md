# Run iot-rest-api-server demo
## Prerequisite:
* Ubuntu Linux 14.04 or 16.04 (all pass)
* Be able to build iotivity framework, which means g++ 4.8+, boost C++ library
must be ready.
You can refer to [build iotivity](https://github.com/qiuzhong/misc-notes/blob/master/iot/iotivity/01-iotivity_intro.md)

## Install gulp and grunt
```
$ sudo npm install gulp-cli grunt-cli -g --verbose
$ git clone https://github.com/01org/iot-rest-api-server.git
$ cd iot-rest-api-server
$ npm install --verbose
```

Check **package.json**, the following modules will be installed via **npm install --verbose**
* gulp
* gulp-nodemon
* iotivity-node

For the **iotivity-node** module, which is installed via npm, imply that it must
be registered to the npm registry.

During install this module, it will download iotivity source code and then this
framework at **depbuild**, after that it will remove this directory.

After install the dependencies, run
```
$ gulp
[19:46:18] Using gulpfile ~/Work/github/otcshare/iot-rest-api-server/gulpfile.js
[19:46:18] Starting 'default'...
[19:46:18] Finished 'default' after 1.35 ms
[19:46:18] [nodemon] 1.9.2
[19:46:18] [nodemon] to restart at any time, enter `rs`
[19:46:18] [nodemon] watching: *.*
[19:46:18] [nodemon] starting `node index.js`
API server started on 2016-06-19T11:46:21.045Z [port: 8000, https: false]
...
```

You can send http requests like http://localhost:8000/api/system to check if the rest api server works well.
```
$ curl http://localhost:8000/api/system
{"hostname":"qiuzhong-dev","type":"Linux","platform":"linux","arch":"x64","release":"3.16.0-30-generic","uptime":2269503,"loadavg":[0.0625,0.20849609375,0.26416015625],"totalmem":8276443136,"freemem":1247506432,"cpus":[{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3600,"times":{"user":101059200,"nice":317900,"sys":187907400,"idle":22315022100,"irq":0}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3620,"times":{"user":106274900,"nice":217300,"sys":211283400,"idle":22290496600,"irq":0}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3642,"times":{"user":100632600,"nice":114200,"sys":217391000,"idle":22287915700,"irq":400}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3686,"times":{"user":98002200,"nice":228400,"sys":217496400,"idle":22296187400,"irq":0}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3600,"times":{"user":35196000,"nice":266400,"sys":28569400,"idle":22586132200,"irq":0}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3648,"times":{"user":38217100,"nice":208400,"sys":30399500,"idle":22582480100,"irq":0}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3595,"times":{"user":36138000,"nice":305700,"sys":30363000,"idle":22593076900,"irq":0}},{"model":"Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz","speed":3769,"times":{"user":38028400,"nice":352000,"sys":32302800,"idle":22555003900,"irq":0}}],"networkinterfaces":{"lo":[{"address":"127.0.0.1","netmask":"255.0.0.0","family":"IPv4","mac":"00:00:00:00:00:00","internal":true},{"address":"::1","netmask":"ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff","family":"IPv6","mac":"00:00:00:00:00:00","scopeid":0,"internal":true}],"eth0":[{"address":"10.239.52.130","netmask":"255.255.255.0","family":"IPv4","mac":"98:90:96:bb:da:d2","internal":false},{"address":"fe80::9a90:96ff:febb:dad2","netmask":"ffff:ffff:ffff:ffff::","family":"IPv6","mac":"98:90:96:bb:da:d2","scopeid":2,"internal":false}]}}
```

Launch your iotivity resource, and send oic resource request again.
```
$ cd iotivity/iotivity-1.1.0/out/linux/x86_64/release/resource/csdk/stack/samples/linux/SimpleClientServer
$ ./ocserver -o 0
$ curl http://localhost:8000/api/oic/res
$ [{"di":"64343661-3963-3266-2d32-6663392d3461","links":[{"href":"/oic/d","rt":"oic.d.tv","if":"oic.if.baseline"}]},{"di":"64343661-3963-3266-2d32-6663392d3461","links":[{"href":"/oic/p","rt":"oic.wk.p","if":"oic.if.baseline"}]},{"di":"64343661-3963-3266-2d32-6663392d3461","links":[{"href":"/a/light","rt":"core.light","if":"oic.if.baseline"}]}]
```
