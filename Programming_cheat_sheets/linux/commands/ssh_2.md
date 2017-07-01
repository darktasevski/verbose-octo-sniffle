# SSH tutorial


[tutorial](https://www.cyberciti.biz/faq/how-to-set-up-ssh-keys-on-linux-unix/)


```bash
# not tested yet:
cat ~/.ssh/id_rsa.pub | ssh root@192.168.99.99 'cat >> .ssh/authorized_keys'
```


```bash

#
# Paste contents of your public keys into this file, on the server you want to access:
# each .pub key should go into a separate line
# this is basically a list of 'public keys' that can access the current machine. 
#
~/.ssh/authorized_keys

#
# This is basically a list of machines accessed by the user of the current machine.
#
~/.ssh/known_hosts

#
# Create a key pair (if you dont have one)
#
# -t rsa                             -> Specifies the type of key to create. The possible values are “rsa1” for protocol version 1 and 
#                                       “dsa”, “ecdsa”, “ed25519”, or “rsa” for protocol version 2.
# -b 4096                            -> Specifies the number of bits in the key to create
# -f ~/.ssh/vps-cloud.web-server.key -> Specifies the filename of the key file.
# -C "My web-server key"             -> Set a new comment.
#
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -f ~/.ssh/vps-cloud.web-server.key -C "My web-server key"

#
# Copy the client's public key to the server
# Your public key will be added to ~/.ssh/authorized_keys file in the server
# (Or just copy your public key to the remote server in the ~/.ssh/authorized_keys file)
#
ssh-copy-id -i ~/.ssh/id_rsa.pub user_in_server@server_ip

# sign in to server through ssh
ssh user_in_server@server_ip 


```
