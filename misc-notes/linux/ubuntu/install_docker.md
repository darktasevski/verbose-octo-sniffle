# Introduction
This is a guide for installing docker on Ubuntu

## Environments
* Ubuntu 16.04 LTS
* Host behind a proxy server

## Recorded steps:
### Install recommended extra packages
```
$ sudo apt-get update

$ sudo apt-get install -y --no-install-recommends \
    linux-image-extra-$(uname -r) \
    linux-image-extra-virtual
```

### Install docker detailed steps
#### Set up the repository
* Install packages to allow apt to use a repository over HTTPS:
    ```
    $ sudo apt-get install -y --no-install-recommends \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common
    ```

* Add Docker’s official GPG key:
    ```
    $ curl -fsSL https://apt.dockerproject.org/gpg | sudo apt-key add -
    ```

    Verify that the key ID is 58118E89F3A912897C070ADBF76221572C52609D.
    ```
    $ apt-key fingerprint 58118E89F3A912897C070ADBF76221572C52609D
    pub   4096R/2C52609D 2015-07-14
          Key fingerprint = 5811 8E89 F3A9 1289 7C07  0ADB F762 2157 2C52 609D
    uid                  Docker Release Tool (releasedocker) <docker@docker.com>


    ```

* Use the following command to set up the stable repository.
    ```
    $ sudo add-apt-repository \
           "deb https://apt.dockerproject.org/repo/ \
           ubuntu-$(lsb_release -cs) \
           main"
    ```

#### Install Docker
* Update the apt package index.
    ```
    $ sudo apt-get update
    ```

* nstall the latest version of Docker, or go to the next step to install a specific version. Any existing installation of Docker is replaced.
    Use this command to install the latest version of Docker:
    ```
    $ sudo apt-get -y install docker-engine
    ```

* On production systems, you should install a specific version of Docker instead of always using the latest. This output is truncated. List the available versions.
    ```
    $ apt-cache madison docker-engine
    $ docker-engine | 1.13.0-0~ubuntu-xenial | https://apt.dockerproject.org/repo ubuntu-xenial/main amd64 Packages
    docker-engine | 1.12.6-0~ubuntu-xenial | https://apt.dockerproject.org/repo ubuntu-xenial/main amd64 Packages
    docker-engine | 1.12.5-0~ubuntu-xenial | https://apt.dockerproject.org/repo ubuntu-xenial/main amd64 Packages
    docker-engine | 1.12.4-0~ubuntu-xenial | https://apt.dockerproject.org/repo ubuntu-xenial/main amd64 Packages
    ```

* Verify that docker is installed correctly by running the hello-world image.
    ```
    $ sudo docker run hello-world
    Unable to find image 'hello-world:latest' locally
    docker: Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers).
    See 'docker run --help'.

    ```

Troubleshooting:
* Try to edit <strong>/etc/default/docker</strong>, add a line
    ```
    # If you need Docker to use an HTTP proxy, it can also be specified here.
    #export http_proxy="http://127.0.0.1:3128/"
    export http_proxy="http://child-prc.intel.com:913"
    ```
    Then 
    ```
    $ sudo systemctl restart docker
    ```

    Not fixed.

* Add <code>export https_proxy="http://child-prc.intel.com:913"</code> in <strong>/etc/default/docker</strong> and restart docker service.
    
    Not fixed.

* Run with <code>sudo -E</code>
    
    Not fixed

* Create docker user and add it to docker group
    ```
    $ sudo groupadd docker
    [sudo] password for qiuzhong: 
    groupadd: group 'docker' already exists

    $ sudo usermod -aG docker $USER

    $ docker run hello-world
    docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.26/containers/create: dial unix /var/run/docker.sock: connect: permission denied.
    See 'docker run --help'.

    ```
    Logout and run 
    ```
    $ docker run hello-world
    Unable to find image 'hello-world:latest' locally
    docker: Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers).
    See 'docker run --help'.

    ```
    Permission issue has been fixed. Connection issue still remains.

* Try this:
    Uncomment <strong>/etc/default/docker</strong>
    ```
    $ sudo  mkdir -p /etc/systemd/system/docker.service.d
    $ sudo touch /etc/systemd/system/docker.service.d/http-proxy.conf
    [Service]
    Environment="HTTP_PROXY=http://child-prc.intel.com:913/" "NO_PROXY=localhost,127.0.0.1"

    $ sudo systemctl daemon-reload
    $ systemctl show --property=Environment docker
    Environment=HTTP_PROXY=http://child-prc.intel.com:913/ NO_PROXY=localhost,127.0.0.1

    $ sudo systemctl restart docker
    ```
    It Works!!!