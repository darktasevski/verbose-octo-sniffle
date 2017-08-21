# Introduction
This guide gives you a detailed steps to setup Apache Cordova development environment setup.

## Software environment:
* Ubuntu Linux 16.04 LTS x86_64
* OpenJDK-8
* Behind a proxy server

## Setup steps
* Install Node.js

  Download node tarball from [nodejs.org](https://nodejs.org). Here we take version <strong>v7.5.0</strong> as an example, any place we use this version you can replace to another version.
  ```
  $ tar -xvf node-v7.5.0.tar.xz
  $ cd node-v7.5.0
  $ ./configure
  $ make -j 8
  $ sudo make Install
  $ node -v
  v7.5.0
  ```

* [Android SDK for Linux](https://developer.android.com/studio/index.html#downloads)

  Unzip the Android SDK for Linux and update latest tools, SDKs and APIs.
  Add Android SDK to the <code>PATH</code> environment variable.
  ```
  export ANDROID_HOME="/home/banana/devel/android/android-sdk-linux"
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  export PATH=$PATH:$ANDROID_HOME/build-tools/25.0.2
  ```

* Install Cordova-cli
  ```
  $ sudo -E npm install cordova -g
  $ cordova -v
  6.5.0
  ```

  <strong>Note</strong>: for the first time launch cordova command, it will ask you whether send statistics information: choose <code>no</code>

* Create and build a cordova project
  ```
  $ cordova create myApp org.apache.cordova.myApp myApp
  Creating a new cordova project.
  $ cd myApp/
  $ ls
  config.xml  hooks  platforms  plugins  www
  $ cordova platform add android --save
  $ cordova build android --verbose
  ANDROID_HOME=/home/banana/devel/android/android-sdk-linux
  JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
  Subproject Path: CordovaLib
  Downloading https://services.gradle.org/distributions/gradle-2.14.1-all.zip

    Exception in thread "main" java.lang.RuntimeException: java.net.ConnectException: Connection timed out (Connection timed out)
        at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:78)
        at org.gradle.wrapper.Install.createDist(Install.java:47)
        at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:129)
        at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:48)
    Caused by: java.net.ConnectException: Connection timed out (Connection timed out)
        at java.net.PlainSocketImpl.socketConnect(Native Method)
        at java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:350)
        at java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:206)
        at java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:188)
        at java.net.SocksSocketImpl.connect(SocksSocketImpl.java:392)
        at java.net.Socket.connect(Socket.java:589)
        at sun.security.ssl.SSLSocketImpl.connect(SSLSocketImpl.java:668)
        at sun.security.ssl.BaseSSLSocketImpl.connect(BaseSSLSocketImpl.java:173)
        at sun.net.NetworkClient.doConnect(NetworkClient.java:180)
        at sun.net.www.http.HttpClient.openServer(HttpClient.java:432)
        at sun.net.www.http.HttpClient.openServer(HttpClient.java:527)
        at sun.net.www.protocol.https.HttpsClient.<init>(HttpsClient.java:264)
        at sun.net.www.protocol.https.HttpsClient.New(HttpsClient.java:367)
        at sun.net.www.protocol.https.AbstractDelegateHttpsURLConnection.getNewHttpClient(AbstractDelegateHttpsURLConnection.java:191)
        at sun.net.www.protocol.http.HttpURLConnection.plainConnect0(HttpURLConnection.java:1138)
        at sun.net.www.protocol.http.HttpURLConnection.plainConnect(HttpURLConnection.java:1032)
        at sun.net.www.protocol.https.AbstractDelegateHttpsURLConnection.connect(AbstractDelegateHttpsURLConnection.java:177)
        at sun.net.www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1546)
        at sun.net.www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1474)
        at sun.net.www.protocol.https.HttpsURLConnectionImpl.getInputStream(HttpsURLConnectionImpl.java:254)
        at org.gradle.wrapper.Download.downloadInternal(Download.java:59)
        at org.gradle.wrapper.Download.download(Download.java:45)
        at org.gradle.wrapper.Install$1.call(Install.java:60)
        at org.gradle.wrapper.Install$1.call(Install.java:47)
        at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:65)
        ... 3 more
    Error: /home/banana/Workspace/ApacheCordova/myApp/platforms/android/gradlew: Command failed with exit code 1 Error output:
    Exception in thread "main" java.lang.RuntimeException: java.net.ConnectException: Connection timed out (Connection timed out)
        at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:78)
        at org.gradle.wrapper.Install.createDist(Install.java:47)
        at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:129)
        at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:48)
    Caused by: java.net.ConnectException: Connection timed out (Connection timed out)
        at java.net.PlainSocketImpl.socketConnect(Native Method)
        at java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:350)
        at java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:206)
        at java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:188)
        at java.net.SocksSocketImpl.connect(SocksSocketImpl.java:392)
        at java.net.Socket.connect(Socket.java:589)
        at sun.security.ssl.SSLSocketImpl.connect(SSLSocketImpl.java:668)
        at sun.security.ssl.BaseSSLSocketImpl.connect(BaseSSLSocketImpl.java:173)
        at sun.net.NetworkClient.doConnect(NetworkClient.java:180)
        at sun.net.www.http.HttpClient.openServer(HttpClient.java:432)
        at sun.net.www.http.HttpClient.openServer(HttpClient.java:527)
        at sun.net.www.protocol.https.HttpsClient.<init>(HttpsClient.java:264)
        at sun.net.www.protocol.https.HttpsClient.New(HttpsClient.java:367)
        at sun.net.www.protocol.https.AbstractDelegateHttpsURLConnection.getNewHttpClient(AbstractDelegateHttpsURLConnection.java:191)
        at sun.net.www.protocol.http.HttpURLConnection.plainConnect0(HttpURLConnection.java:1138)
        at sun.net.www.protocol.http.HttpURLConnection.plainConnect(HttpURLConnection.java:1032)
        at sun.net.www.protocol.https.AbstractDelegateHttpsURLConnection.connect(AbstractDelegateHttpsURLConnection.java:177)
        at sun.net.www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1546)
        at sun.net.www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1474)
        at sun.net.www.protocol.https.HttpsURLConnectionImpl.getInputStream(HttpsURLConnectionImpl.java:254)
        at org.gradle.wrapper.Download.downloadInternal(Download.java:59)
        at org.gradle.wrapper.Download.download(Download.java:45)
        at org.gradle.wrapper.Install$1.call(Install.java:60)
        at org.gradle.wrapper.Install$1.call(Install.java:47)
        at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:65)
        ... 3 more
        at ChildProcess.whenDone (/home/banana/Workspace/ApacheCordova/myApp/platforms/android/cordova/node_modules/cordova-common/src/superspawn.js:169:23)
        at emitTwo (events.js:106:13)
        at ChildProcess.emit (events.js:192:7)
        at maybeClose (internal/child_process.js:890:16)
        at Socket.<anonymous> (internal/child_process.js:334:11)
        at emitOne (events.js:96:13)
        at Socket.emit (events.js:189:7)
        at Pipe._handle.close [as _onclose] (net.js:501:12)
  ```

  Solution: Add proxy to <code>JAVA_OPTS</code> environment variable
  ```
  export JAVA_OPTS="-Dhttp.proxyHost=child-prc.intel.com -Dhttp.proxyPort=913 -Dhttps.proxyHost=child-prc.intel.com -Dhttps.proxyPort=913"
  ```

  It will download Gradle and a lot of packages. Rebuild it, if everything OK, an apk will finally generated
  ```
  ...
  BUILD SUCCESSFUL

  Total time: 8 mins 3.166 secs

  Built the following apk(s): 
	/home/banana/Workspace/ApacheCordova/myApp/platforms/android/build/outputs/apk/android-debug.apk
  ```

