# How to install cocoapods?
## Introduction
* RubyGems is a package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries (in a self-contained format called a "gem"), a tool designed to easily manage the installation of gems, and a server for distributing them.
* CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects.

## Precondition
* Mac OS X 10.11
* Xcode 7.3

## Install CocoaPods
```
$ sudo gem install cocoapods -V
```

Here, **-V** option indicates that the installation will print detailed information during the procedure.

To install a specific version of cocoapods, use
```
$ sudo gem install cocoapods -v 0.39.0 -V
```

**-v** option indicates to install a specific version.

### Common install issues:
* You find the installation hangs

  You probably need a proxy for gem but you use a **sudo** command to lift the permission but this proxy configuration is not recognized in **/etc/sudoers**
  Add the following line to the sudoers file
  ```
  Defaults env_keep += "http_proxy https_proxy"
  ```

* Failed to install cocoapods with the error log:

  > ERROR: While executing gem ... (Errno::EPERM)
  >
  > Operation not permitted - /usr/bin/pod

  In that case, you can fix it via the command:
  ```
  $ sudo gem install -n /usr/local/bin cocoapods
  ```

## Check RubyGems and CocoaPods
```
$ gem --version
2.6.4
$ pod --version
0.39.0
```

## Notice:
Currently if you use cocoapods 1.0.1, you may fail to create an iOS project with the error log:
```
$ crosswalk-app create org.xwalk.foo
+ Copying app template from ...pp/xwalk/ios/crosswalk-app-tools/app-template
+ Loading 'ios' platform backend
+ Clone project [done] Cloned.
*** ERROR: Analyzing dependencies
[!] The dependency `crosswalk-ios (from `../`)` is not used in any concrete target.

+ Logfiles at /var/folders/fb/hnqlw8qx04sf00vnthpk4f8h0000gn/T/crosswalk-app-tools-org.xwalk.foo
```

See bug [APPTOOLS-350](https://crosswalk-project.org/jira/browse/APPTOOLS-350)
for details.

The temporary workaround is to downgrade the cocoapods to 0.39.0
