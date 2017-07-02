# SSH

```bash
# ssh is used to login into another machine.
# ssh <user>@<machine_or_IP>
ssh brian@computer.com
ssh brianspinos777@98.247.120.193
# it will ask for the password

# go into a specific folder (not sure if it works)
ssh brian@computer.com:~/some_folder


# how to exit from ssh
$ exit
```


# key pair

```bash

# http://sshkeychain.sourceforge.net/mirrors/SSH-with-Keys-HOWTO/SSH-with-Keys-HOWTO-4.html

############################### symetric keys ############################
# The public key can decrypt what was encrypted by the private key and,  #
# the private key can decrypt what was encrypted by the public key.      #
##########################################################################

# public key and private key (I guess you can change their names)
# id_rsa - that is you password/file
id_rsa

# the public key, wich goes to the server you want to enter into:
id_rsa.pub



~/.ssh # this is where the magic happens!

# generate the key pair, in the ~/.ssh folder:
# it will ask you to choose a name for the file, you can just press enter
# it will ask you to create a 'passphrase', you can just press enter
$ ssh-keygen -C "this is a comment, its usualy an email address..."


# copy contents of the public key to the server:
# you public key should go in the server you want to access,
# in the ~/.ssh/authorized_keys file of the server you want to access!
$ cat id_rsa.pub | pbcopy


# paste contents of your public keys into this file, on the server you want to access:
# each .pub key should go into a separate line
# this is basically a list of 'user public keys' that can access the machine. 
~/.ssh/authorized_keys

# this is basically a list of machines accessed by the user of this machine
~/.ssh/known_hosts



# P.S.: you private key stays on your computer, 
# and your public key goes in the computer you want to access, in the ~/.ssh/authorized_keys file.

# The ~/.ssh/known_hosts file lets the client authenticate the server, 
# to check that it isn't connecting to an impersonator. 
# The ~/.ssh/authorized_keys file lets the server authenticate the user.

```




```bash

# In Unix, ssh-agent is a background program that handles passwords for SSH private keys. 
# The ssh-add command prompts the user for a private key password and adds it to the list 
# maintained by ssh-agent. Once you add a password to ssh-agent, you will not be prompted 
# for it when using SSH or scp to connect to hosts with your public key.
#
# The public part of the key loaded into the agent must be put on the target system 
# in ~/.ssh/authorized_keys; see How do I set up SSH public-key authentication to connect 
# to a remote system?
#
# To use ssh-agent and ssh-add, follow the steps below:
#
# At the Unix prompt, enter:
$ eval `ssh-agent`
# Make sure you use the backquote (`), located under the tilde (~), rather than the single quote (').
#
# Enter the command:
$ ssh-add
# Enter your private key password.
# When you log out, enter the command:
$ kill $SSH_AGENT_PID
# To run this command automatically when you log out, place it in your .logout file 
# (if you are using csh or tcsh) or your .bash_logout file (if you are using bash).

```
