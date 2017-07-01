# npm set proxy server configuration
You may easily fail to install some node 3rd-party packages when your network
is not good. In many cases, you need to config your proxy server for npm
command line.

## npm config usage
You can use the following configuration to set proxy server for npm:

```
$ npm config set proxy http://<HTTP_PROXY_SERVER>:<HTTP_PORT>
$ npm config set https-proxy https://<HTTPS_PROXY_SERVER>:<HTTPS_PORT>
```

## Examples
In Intel, we use the following configuration for npm

```
$ npm config set proxy http://child-prc.intel.com:913
$ npm config set https-proxy http://child-prc.intel.com:913
```

## Reference
[How to setup Node.js and Npm behind a corporate web proxy?](http://jjasonclark.com/how-to-setup-node-behind-web-proxy/)
