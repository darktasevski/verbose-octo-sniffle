# How to set proxy server for pip when installing Python packages?
## Usage
Mainly, you should specify the **--proxy** option

```
$ sudo pip --proxy <Your Proxy Server:Port> install <PackageName>
```

## Example
```
$ sudo pip --proxy child-prc.intel.com:913 install six
```
