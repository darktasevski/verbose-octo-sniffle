# Eclipse Che notes


## Eclipse Che start command

`docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=IP_ADDRESS -v /home/user/cd:/data eclipse/che start`

## Eclipse Che stop command

`docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=IP_ADDRESS -v /home/user/cd:/data eclipse/che stop`


## Eclipse Che update commands

* first run..

`docker pull eclipse/che`

* then run.. (this will upgrade and start che)

`docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=IP_ADDRESS -v /home/user/cd:/data eclipse/che upgrade`

## Eclipse Che Environment commands and settings

### Eclipse Che & Maven/Java

* Build settings for *Maven* that creates a JAR file

```
Working Directory: ${current.project.path}
Command Line: clean install
Preview URL: http://${server.port.6080}
```

* For *Maven* to create a JAR file with a manifest add all the contants of the <build> tag example in _pom.xml_ and change your main class & package.

## Eclipse che install on debian 8

* First step is to install docker. If the server does not allow _sudo_ for regular users remove the _sudo_ and install as root.

`sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`

* Add the GPG key..

`curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -`

* Verify key..

`sudo apt-key fingerprint 0EBFCD88`

* Add repository

`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"`

* And then..

```
sudo apt-get update

sudo apt-get install docker-ce
```

* Adter installing add your user and any user that will need to use docker into the _docker_ group

`sudo adduser <username> <grouptoadd>`

* First start..

`docker pull eclipse/che`

`docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=IP_ADDRESS -v /home/user/cd:/data eclipse/che start`

***

##### References..

```
https://eclipse.org/che/docs/setup/managing/index.html
```

```
https://eclipse.org/che/docs/setup/getting-started/index.html
```

```
https://docs.docker.com/engine/installation/linux/debian/#install-docker-ce
```
