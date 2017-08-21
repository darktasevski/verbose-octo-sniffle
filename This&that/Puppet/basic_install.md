## Puppet is one of the leading platform for automatically delivering, 
operating and securing your infrastructure. In this scenario we are installing 
a master and an agent respectively named puppet-master and puppet-agent. 
The following is based on the open source project and both master and agent are Debian 8.0.

### How to setup the master. 
Define the hostname in /etc/hosts and /etc/hostname ( for example puppet-master ). 

Install the ntp server with:

```
sudo apt-get install ntp 
```

and add the repositories by downloading: 

```
wget https://apt.puppetlabs.com/puppetlabs-release-pc1-jessie.deb 
```

and running..

```
sudo dpkg -i puppetlabs-release-pc1-jessie.deb
```

Update your repositories with `sudo apt-get update`
 
Install the server with `sudo apt-get install puppetserver`

Start the service with `sudo service puppetserver start`

Depending on the hardware you're running the master, you might want to change the memory allocation.
Do so by changing **/etc/default/puppetserver** on the line that reads 

Modify this if you'd like to change the memory allocation, enable JMX, etc *JAVA_ARGS="-Xms2g -Xmx2g -XX:MaxPermSize=256m"* ( the 2g stands fro 2gb; change it accordignly where 512m will be 512Mb and so on ). 
Start the service with 
> sudo /opt/puppetlabs/bin/puppet resource service puppet ensure=running enable=true.

### Install an agent.
 
Define the hostname in **/etc/hosts** and **/etc/hostname** ( for example puppet-agent ) unless previously defined. 

Install the ntp server with sudo apt-get install ntp and add the repositories by downloading 

```
wget https://apt.puppetlabs.com/puppetlabs-release-pc1-jessie.deb 
```

and running 

```
sudo dpkg -i puppetlabs-release-pc1-jessie.deb
```

Update your repositories with `sudo apt-get update`

Install puppet agent with `sudo apt-get install puppet-agent` 

Start the service with `sudo service puppetserver start` 

Add the **FQDN** of the server to the `puppet.conf` file ( puppet-agent.localdomain ) 

Start the agent `service sudo /opt/puppetlabs/bin/puppet agent --enable` 

Trigger the first sync `sudo /opt/puppetlabs/bin/puppet agent --test`

At this stage, the master should have knowledge of the agent and `sudo /opt/puppetlabs/bin/puppet cert list` should return the certificate of the agent ; accept the certificate `sudo /opt/puppetlabs/bin/puppet cert sign puppet-agent.localdomain`
 
To revoke certificates use `sudo /opt/puppetlabs/bin/puppet cert clean hostname`

On your agent , you can now display the details feeded back to the puppet server with /opt/puppetlabs/bin/facter (facter is the tool that gather the agent system details ).

On your server create a new manifest file `sudo nano /etc/puppetlabs/code/environments/production/manifests/site.pp` this will be the file where we will define the required configuration.

From this point on, the agent will sync ( every 30 mins by default ) with the master to both provide status and fetch the manifest . To force the sync, sudo /opt/puppetlabs/bin/puppet agent --test.

To test the setup, open the manifest `sudo nano /etc/puppetlabs/code/environments/production/manifests/site.pp` 
on the master and add the following file {'/tmp/hello': ensure => present, mode => '0644', content => "Hello from the master\n", } ; force the sync on the agent with sudo /opt/puppetlabs/bin/puppet agent --test. Now on the agent you should have a newly created file called hello ( inside the tmp folder ) with a string saying "Hello from the master".

The manifest as it is, will target all the agents connected to the master.

To target specific agents, use the following: 

```
node 'hostname1', 'hostname2' {file {'/tmp/hello': ensure => present, 
mode => '0644', 
content => "Hello from the master\n", 
} }. 
```

The following will apply to all agents: 

```
node default { file {'/tmp/hello': 
ensure => present, 
mode => '0644', 
content => "Hello from the master\n", 
} }.
```

To install a module ( in this example the Apache one ), run 
`sudo /opt/puppetlabs/bin/puppet module install puppetlabs-apache` on the **master** ( this will install the puppet module for apache from the Forge ) . 

Add the required actions to the manifest 

`sudo nano /etc/puppetlabs/code/environments/production/manifests/site.pp`

the list of available instructions can be found on the Forge. In this specific example, we will enable a new Virtual host for test.example.com on port 8080 that roots on /var/www/test .

``` 
node default { class {'apache' :} 
apache::vhost { 'test.example.com': 
port => '8080', docroot => '/var/www/test', docroot_owner => 'www-data', docroot_group => 'www-data', } }.
```

On the agent run a force sync and you should now have your new folder setup ( www-data as the owner ) and ready to be used.
