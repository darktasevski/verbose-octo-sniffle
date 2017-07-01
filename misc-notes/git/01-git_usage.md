# Git basic usage
## Config the user information and editor
### Config the user email
    $ git config --global user.email "your_email@company.com"
#### Like this
    $ git config --global user.email "zhongx.qiu@intel.com"
### Config the user name
    $ git config --global user.name "your_name"
#### Like this
    $ git config --global user.name "Zhong Qiu"
### Config the editor
    $ git config --global core.editor "Your favorite text editor"
#### Like this
    $ git config --global core.editor "vim"

## Clone a repository
### You can clone a git repository via https or ssh:
    $ git clone https://github.com/<your_name>/<your_repo>.git
#### Like this:
    $ git clone https://github.com/qiuzhong/xwalk-test-suite-build.git

## Git set proxy server configuration
When use git, you can set the git proxy server by:

git config --global http.proxy http://<HTTP_PROXY_SERVER>:<HTTP_PROXY_PORT>
```
git config --global https.proxy https://<HTTPS_PROXY_SERVER>:<HTTPS_PROXY_PORT>
```

In Intel, we use the following proxy for git:

```
git config --global http.proxy http://child-prc.intel.com:913
git config --global https.proxy http://child-prc.intel.com:913
```

### Reference:
[Getting git to work with a proxy server](http://stackoverflow.com/questions/783811/getting-git-to-work-with-a-proxy-server)
