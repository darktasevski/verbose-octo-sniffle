# Guide for install BuildBot
In this example, we make the client host the same as the master.

## Create a virtual Python environment(optional)
```
$ virtualenv sandbox
$ cd sandbox
$ source bin/activate
```

## Install SQLAchemy dependency
```
$ pip --proxy=<proxyServer:proxyPort> install sqlalchemy==0.7.10
```

## Install Buildbot
BuildBot dependes on Twisted, which needs the Python header files to compile some C code files while instaling Twisted, so you have to install the Python development package:
```
$ sudo apt-get install python-dev
```

Then you can use **pip** to install buildbot
```
$ pip --proxy=<proxyServer:proxyPort> install buildbot
```

## Master host
### Create a master host
```
$ buildbot create-master master
$ mv -fv master/master.cfg.sample master/master.cfg
```

Start it
```
$ buildbot start master
```

It may require a while to start the master end, and you may get this information:
> Following twistd.log until startup finished..
>
> The buildmaster took more than 10 seconds to start, so we were unable to
confirm that it started correctly. Please 'tail twistd.log' and look for a
line that says 'BuildMaster is Running' to verify correct startup.

You can check if the master started successfully, via the command:
```
$ tail -f master/twistd.log
2016-06-30 12:20:53+0800 [-] added builder runtests with tags None
2016-06-30 12:20:53+0800 [-] PBServerFactory starting on 9989
2016-06-30 12:20:53+0800 [-] Starting factory <twisted.spread.pb.PBServerFactory instance at 0x7f1858121290>
2016-06-30 12:20:53+0800 [-] adding scheduler 'all'
2016-06-30 12:20:54+0800 [-] adding scheduler 'force'
2016-06-30 12:20:54+0800 [-] WebStatus using (/home/qiuzhong/Work/buildbot/master/public_html)
2016-06-30 12:20:54+0800 [-] RotateLogSite starting on 8010
2016-06-30 12:20:54+0800 [-] Starting factory <buildbot.status.web.baseweb.RotateLogSite instance at 0x7f18580d6050>
2016-06-30 12:20:54+0800 [-] Setting up http.log rotating 10 files of 10000000 bytes each
2016-06-30 12:20:54+0800 [-] BuildMaster is running
```

The information above show the master end started successfully.


## Client host
### Install slave package:
```
$ pip --proxy=<proxyServer:proxyPort> install buildbot-slave
```

### Create a slave
```
$ buildslave create-slave slave localhost:9989 example-slave pass
```

Start the slave:
```
$ buildslave start slave
Following twistd.log until startup finished..
The buildslave appears to have (re)started correctly.
$ cat slave/twistd.log
2016-06-30 12:30:43+0800 [-] Loading buildbot.tac...
2016-06-30 12:30:44+0800 [-] Loaded.
2016-06-30 12:30:44+0800 [-] twistd 16.2.0 (/home/qiuzhong/Work/buildbot/sandbox/bin/python2.7 2.7.6) starting up.
2016-06-30 12:30:44+0800 [-] reactor class: twisted.internet.epollreactor.EPollReactor.
2016-06-30 12:30:44+0800 [-] Starting BuildSlave -- version: 0.8.12
2016-06-30 12:30:44+0800 [-] recording hostname in twistd.hostname
2016-06-30 12:30:44+0800 [-] Starting factory <buildslave.bot.BotFactory instance at 0x7fb648515b90>
2016-06-30 12:30:44+0800 [-] Connecting to localhost:9989
2016-06-30 12:30:44+0800 [Broker,client] message from master: attached
2016-06-30 12:30:44+0800 [Broker,client] SlaveBuilder.remote_print(runtests): message from master: attached
2016-06-30 12:30:44+0800 [Broker,client] Connected to localhost:9989; slave is ready
2016-06-30 12:30:44+0800 [Broker,client] sending application-level keepalives every 600 seconds
```
