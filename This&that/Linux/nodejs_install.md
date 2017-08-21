# Nodejs LTS (6.x) install for debian Linux 8


**I normally do this throught as root rather than sudo for spead sake when configuring on a server not a dev machine**

_curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -_

_sudo apt-get install nodejs_

_apt-get install build-essential_

**IF using ElementaryOS Loki**

- go: _sudo nano /etc/apt/sources.list.d/nodesource.list_ and change the distro name to xenial as the rep has no hook for loki


**If upgrading..**

_apt-get purge nodejs npm_
