#!/bin/bash

username="xwalk"
hostip="10.239.115.13"
public_key="id_rsa.pub"

scp $username@$hostip:~/.ssh/$public_key /tmp/
cat /tmp/$public_key >> ~/.ssh/authorized_keys
