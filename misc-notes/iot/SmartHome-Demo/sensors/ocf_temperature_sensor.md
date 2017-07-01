# Introduction
Guide to setup the OCF temperature sensor as an OCF server.

## Environments
* Intel NUC
* Ubuntu 16.10
* iot-rest-api-server installed (Copy from iot-refkit image#119)
* iotivity-node (Copy from iot-refkit image#119)

## Steps
Please follow up the [README](https://github.com/01org/SmartHome-Demo/blob/master/sensors/ocf_temperature_sensor/README.md)
And make sure iot-rest-api-server is launched

## Test result
After the Arduino 101 board is connected to the Ubuntu host.
```
# cat /sys/kernel/debug/bluetooth/6lowpan_control
ea:46:7a:95:bf:8f (type 2)
# ifconfig
bt0: flags=4177<UP,POINTOPOINT,RUNNING,MULTICAST>  mtu 1280
        inet6 fe80::3613:e8ff:fe27:cedb  prefixlen 64  scopeid 0x20<link>
        unspec 34-13-E8-FF-FE-27-CE-DB-00-00-00-00-00-00-00-00  txqueuelen 1  (UNSPEC)
        RX packets 3  bytes 654 (654.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 43  bytes 2050 (2.0 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
# ifconfig
bt0: flags=4177<UP,POINTOPOINT,RUNNING,MULTICAST>  mtu 1280
        inet6 fe80::3613:e8ff:fe27:cedb  prefixlen 64  scopeid 0x20<link>
        unspec 34-13-E8-FF-FE-27-CE-DB-00-00-00-00-00-00-00-00  txqueuelen 1  (UNSPEC)
        RX packets 3  bytes 654 (654.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 43  bytes 2050 (2.0 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

...
```

```
# curl --noproxy "*" http://127.0.0.1:8000/api/oic/res
[{"di":"fc3759ed-4a12-46f9-a4d3-02b12f681f5c","links":[{"href":"/oic/sec/doxm","rt":"oic.r.doxm","if":"oic.if.baseline"}]},{"di":"fc3759ed-4a12-46f9-a4d3-02b12f681f5c","links":[{"href":"/oic/sec/pstat","rt":"oic.r.pstat","if":"oic.if.baseline"}]},{"di":"fc3759ed-4a12-46f9-a4d3-02b12f681f5c","links":[{"href":"/oic/d","rt":"oic.wk.d","if":"oic.if.baseline"}]},{"di":"fc3759ed-4a12-46f9-a4d3-02b12f681f5c","links":[{"href":"/oic/p","rt":"oic.wk.p","if":"oic.if.baseline"}]},{"di":"c1da5609-37db-4609-64db-560911dc5609","links":[{"href":"/oic/p","rt":"oic.wk.p","if":"oic.if.r"}]},{"di":"c1da5609-37db-4609-64db-560911dc5609","links":[{"href":"/oic/d","rt":"oic.d.thermostat","if":"oic.if.r"}]},{"di":"c1da5609-37db-4609-64db-560911dc5609","links":[{"href":"/a/temperature","rt":"oic.r.temperature","if":"oic.if.r"}]}]
# curl --noproxy "*" http://127.0.0.1:8000/api/oic/a/temperature?di=c1da5609-37db-4609-64db-560911dc5609
{"temperature":120.0809048,"units":"F","range":"-40, 257"}
```

## Notice
In my test, the Ubuntu host often disconnects to the Arduino 101 board. So try to connect it again.
