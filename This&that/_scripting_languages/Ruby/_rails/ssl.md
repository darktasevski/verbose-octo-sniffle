# SSL


[RailsCast SSL](http://railscasts.com/episodes/357-adding-ssl?autoplay=true)

[Pow Website](http://pow.cx/)

###### Using Pow and Nginx

###### About Pow
```
Pow is a web server created by the company '37signals'
its makes it easy to assign host names to multiple rails apps
example:
  http://railsApp1.dev
  http://railsApp2.dev
  http://railsApp3.dev
```


```bash
curl get.pow.cx | sh # install pow
# To uninstall Pow, `curl get.pow.cx/uninstall.sh | sh`
# to restart pow
launchctl stop cx.pow.powd

cd ~/.pow

# The name of the symlink (BootstrapApp) determines the hostname you use (BootstrapApp.dev) 
# to access the application it points to (~/Desktop/RailsApps/bootstrapApp/BootstrapApp)
#
# will be available:
# http://BootstrapApp.dev
# http://www.bootstrapapp.dev
#
# to be used by another computer on your local network, use LAN IP address.
# P.S. make sure the LAN IP works on you computer first, make sure its correct.
#      and make sure you have accessed the URL in your computer (it seems that Pow has a timeout limit set)
# http://bootstrapapp.192.168.0.2.xip.io
# http://www.bootstrapapp.192.168.0.2.xip.io
#
ln -s ~/Desktop/RailsApps/bootstrapApp/BootstrapApp . # symlink your app's root folder
```


```bash
# stop Pow (use both commands):
launchctl unload ~/Library/LaunchAgents/cx.pow.powd.plist
sudo launchctl unload ~/Library/LaunchDaemons/cx.pow.firewall.plist

# start Pow (use both commands):
launchctl load ~/Library/LaunchAgents/cx.pow.powd.plist
sudo launchctl load ~/Library/LaunchDaemons/cx.pow.firewall.plist
```


```bash
# install nginx
brew install nginx

cd /usr/local/etc/nginx

# generates server.key and server.csr files
openssl req -new -nodes -keyout server.key -out server.csr # create certificates

# generate certificate file (server.crt) using the previously created files 
# from the previous command above
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

# edit the nginx config file, see railscast video on SSL on how to do this
subl nginx.conf

# test it
sudo nginx -t

# start nginx
sudo nginx 

# stop nginx
sudo nginx -s stop 


# now go to the broser  
# use safari browser (and click 'continue')
# DONT USE chrome and firefox, because they do not seem to have a 'one time' option
https://BootstrapApp.dev # will be available!



# to restart your app, after app config changes:
touch tmp/restart.txt
```
