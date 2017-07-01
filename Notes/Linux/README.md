# Linux Notes

#### Quick reference

---
## Assorted Commands

`Arandr` - application to configure multiple screens on debian based systems(and others?)

---
## SCP command

* SCP copy a folder to remote server

    * `scp -r foo your_username@remotehost.edu:/some/remote/directory/bar`

* SCP copy file with port

    * `scp -P 2264 foobar.txt your_username@remotehost.edu:/some/remote/directory`

## SendEmail

* website:

> http://caspian.dotconf.net/menu/Software/SendEmail/

`sendEmail -o tls=no -f <EMAIL FROM> -t <EMAIL TO> -s <SMTP SERVER> -xu <SERVER LOGIN> -xp <PASSWORD> -u <SUBJECT> -m <MESSAGE TO SEND>`

## Getting IP address only for an interface

* I was working on an Android app and had the need to get the ipaddress of an interface and came up with the following grep/awk command..

`ifconfig eth0 | grep 'inet addr:' | awk -F ':' '{print $2}' | awk -F ' ' '{print $1}'`

## Adding a user the generic linux way

`useradd`

* `-m` create home
* `-G` assign extra groups

example:
`useradd -m -G www-data,video,users,tty username`

## Blocking tty jumping while in X

* Append the lines bellow to `/etc/X11/xorg.conf` it will block any attempt at jumping

```
Section "ServerFlags"
    Option "DontVTSwitch" "true"
EndSection
```

## Quick and easy way to change a user password from a shell script

`echo "username:password" | chpasswd`

## Lessons from `echo`

* `-e` will allow me to `echo` any escaped chars (`echo -e "Hello\\nWorld" == Hello \n World`)

* when needing to `echo` out a shell script the `#!/bin/bash` will cause issues due to the `!` so we can use the following command before said `echo`
    * `set +o histexpand`

## `BASH` configuration(s)

* When wanting to start X as soon as `bash` starts we can use the following lines by appending them to the `.bash_profile` file.
```
if [ -z "$DISPLAY" ] && [ -n "$XDG_VTNR" ] && [ "$XDG_VTNR" -eq 1 ]; then
  exec startx
fi
```

## `xinitrc`

* nothing much to be said except that remember that we can write entire shell script loops into this file..
