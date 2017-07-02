# Introduction
Guide to build custom Intel-RefKit image

## Env
* Ubuntu Linux 16.04 LTS

## Steps:
```
$ sudo apt install texinfo gawk chrpath
```

```
$ git clone --recursive https://github.com/intel/intel-iot-refkit.git
$ cd intel-iot-refkit
$ refkit-init-build-env

build$ vim conf/local.conf
``` 
Use development configuration.

```
$ bitbake -k refkit-image-gateway
```