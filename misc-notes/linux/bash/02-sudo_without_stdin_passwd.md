# How to make 'sudo' grab the password from a file?
## Answer
sudo doesn't read password from stdin by default. From sudo manpage:
>      -S The -S (stdin) option causes sudo to read the password from the standard input instead of the terminal device.
>
>        The password must be followed by a newline character.

So you should run:
```
sudo -S apt-get update <~/passwd.txt
```
