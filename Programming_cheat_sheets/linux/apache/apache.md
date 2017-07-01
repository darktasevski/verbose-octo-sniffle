### Apache

```bash
# add HTML content to that file
$ touch /var/www/index.html 


# configuration file:
$ cat /etc/apache2/httpd.conf
$ cat /etc/apache2/users/brianspinos777.conf
# DocumentRoot "/Library/WebServer/Documents"

# start apache
$ sudo apachectl start

# stop apache
$ sudo apachectl stop

# go to http://localhost
# It works!

# where that html file is:
$ cat /Library/WebServer/Documents/index.html
```
