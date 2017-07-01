# Introduction
Guide to install docker on Fedora Linux.

## Environments
* Fedora Workstation 25
* (Optional) Behind Proxy server

## Install docker
1. Install docker via remote repository
```
$ sudo dnf -y install dnf-plugins-core

$ sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo

$ sudo dnf config-manager --set-enabled docker-ce-edge    

$ sudo dnf makecache fast

$ sudo dnf install docker-ce -y

```

2. Check and start docker is installed

```
$ docker --version
$ sudo systemctl start docker
$ sudo systemctl status docker
```

## Configure docker
1. Add current user to docker group.
```
$ sudo usermod -aG docker $USER
```

2. (Optional) Add docker proxy if you're behind a proxy server.
```
$ mkdir -p /etc/systemd/system/docker.service.d
```

If you're behind a http proxy server:
```
$ sudo touch /etc/systemd/system/docker.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://child-prc.intel.com:913/" "NO_PROXY=localhost,127.0.0.1"
```

If you're behind a https proxy server:
```
$ sudo touch /etc/systemd/system/docker.service.d/https-proxy.conf

[Service]
Environment="HTTPS_PROXY=https://child-prc.intel.com:913/" "NO_PROXY=localhost,127.0.0.1"
```

Reload the configuration and restart docker.
```
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
$ systemctl show --property=Environment docker
```

Now reboot the system and start docker service:
```
$ systemctl start docker
```

## Run docker "Hello World"
```
$ sudo docker run hello-world
```

## Install docker-compose
```
$ sudo pip install docker-compose
```

If you're behind a proxy server, use
```
$ sudo pip --proxy <proxy server:port> install docker-compose
```
