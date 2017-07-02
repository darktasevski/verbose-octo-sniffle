# Fix the issue when pip version is too low
## Error information
When you get a low version pip and install a Python package, you may get the
error information:
```
$ sudo pip --proxy child-prc.intel.com:913 install six
Downloading/unpacking six
  Cannot fetch index base URL http://pypi.python.org/simple/
  Could not find any downloads that satisfy the requirement six
No distributions at all found for six
Storing complete log in ~/.pip/pip.log
```



## Solution
Update your pip, since pip does not work, you can use pip to upgrade it.
You need to download pip tar package and unzip it and run:
```
$ tar -vxf pip-8.1.2-tar.gz
$ sudo python setup.py install
```
