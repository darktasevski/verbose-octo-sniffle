# Introduction
Jenkins installation guide.

## Env
* Ubuntu 16.04 LTS

## Installation
```
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

## What does this package do?
* Jenkins will be launched as a daemon up on start. See /etc/init.d/jenkins for more details.
* The 'jenkins' user is created to run this service.
* Log file will be placed in /var/log/jenkins/jenkins.log. Check this file if you are troubleshooting Jenkins.
* /etc/default/jenkins will capture configuration parameters for the launch like e.g JENKINS_HOME
* By default, Jenkins listen on port 8080. Access this port with your browser to start configuration.

## Setting up an Nginx Proxy for port 80 -> 8080
### Install Nginx
```
sudo apt -y install nginx
```

### Remove default configuration.
```
cd /etc/nginx/sites-available
sudo rm default ../sites-enabled/default
```

### Create new configuration for Jenkins. 
This example uses cat, but you can use your favorite text editor. Make sure to replace 'ci.yourcompany.com' with your domain name.
Note: Sometimes your permissions (umask, etc) might be setup such that this won't work. Create the file somewhere else then copy it into place if you run into that problem.
```
sudo cat > jenkins
upstream app_server {
    server 127.0.0.1:8080 fail_timeout=0;
}

server {
    listen 80;
    listen [::]:80 default ipv6only=on;
    server_name ci.yourcompany.com;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;

        if (!-f $request_filename) {
            proxy_pass http://app_server;
            break;
        }
    }
}
^D # Hit CTRL + D to finish writing the file
```

### Link your configuration from sites-available to sites-enabled:
```
sudo ln -s /etc/nginx/sites-available/jenkins /etc/nginx/sites-enabled/
```

### Restart Nginx
```
sudo service nginx restart
```

## Jenkins settings
After installing Jenkins, go to <strong>http://localhos:8080</strong> and it will prompt to get intial password from 
<strong>/var/lib/jenkins/secrets/initialAdminPassword</strong>

Go through it and it will prompt you to install recommended plugins:
* Folders
* OWASP Markup Formatter
* build timeout
* Credentials Binding
* Timestamper
* Workspace Cleanup
* Ant
* Gradle
* Pipeline
* Github Organization
* Pipe Stage View
* Subversion
* SSH Slaves
* Matrix Authorization Stragegy
* PAM Authentication
* LDAP
* Email Extension
* Mailer

Network proxy may be necessary during installing them.

When this step completes, it will prompt you to create first admin user.

When everything goes fine, you can either go to <strong>http://localhost</strong> or <strong>https://localhost:8080</strong>
