# https://github.com/otcshare/iotivity-node/issues/

## 131
Tried on Ubuntu 16.04 LTS with node v7.5.0 and it worked.

However, the [build-script](https://github.com/otcshare/iotivity-node/blob/master/build-scripts/build-csdk.js#L107) assumes the build of iotivity-native succeeds at the first time.  If  directory <strong>iotivity-native</strong> exists but the build fails, <code>node-gyp rebuild</code> will not try building the iotivity-native. 


## 132

Installing iotivity-node on Windows 10 can easily fail when using default git EOL configration.

There are some [patches](https://github.com/otcshare/iotivity-node/tree/master/patches) need to apply before building the iotivity-native. These patches and iotivity-native code must use Unix style EOL format(LF). On Windows, if the git checks out the code with default EOL(CRLF), applying the patches will fail, then the build will fail, see [issue#110](https://github.com/otcshare/iotivity-node/issues/118)

To avoid build error, this git EOL configuration should be described explictly in README.

There are two cases of git clients on Windows to avoid this issue:
* Git for Windows: choose <strong>Checkout as-is, commit Unix-style line endings</strong> during the installation.
* Git Shell: it's from Github for Windows and does not provde git EOL setting options during the installation. <code>git config core.eol lf</code> can be a temporary workaround.
