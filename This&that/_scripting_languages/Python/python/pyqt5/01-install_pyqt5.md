# Install PyQt5 on Ubuntu Linux
## Prerequisites
* Ubuntu Linux 14.04 x86_64
* Python 3.5.1
* GCC 4.8.2

## Install SIP
To install PyQt5, you first need install SIP library on Ubuntu
```
$ wget http://sourceforge.net/projects/pyqt/files/sip/sip-4.18/sip-4.18.tar.gz
$ tar -xvf sip-4.18.tar.gz
$ cd sip-4.18
$ python3 configure.py
$ make
$ sudo make install
```

## Install PyQt5
