# Docker Notes

## Docker rep @

> https://hub.docker.com/u/rebeloml/

## Notes

* *RUN* to run a command 

* *&&* for when we want to run another command after

* *EXPOSE* to tell docker to allow specfied ports to be open to the outside(and to route them..)

## Install Docker CE on debian 8

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

* After installing add your user and any user that will need to use docker into the _docker_ group

`sudo adduser <username> <grouptoadd>`



