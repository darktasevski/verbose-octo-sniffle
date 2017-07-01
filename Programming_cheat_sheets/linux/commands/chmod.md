### chmod changes the permission on a file

### usage:
```bash
$ chmod <user-permission><group-permission><other-users-permission> file

# r = 4
# w = 2
# x = 1

# example:
$ chmod 700 brian.txt # gives the user read, write, execute permission on the file
$ chmod 600 brian.txt # gives the user read, write permission on the file
$ chmod 500 brian.txt # gives the user read, execute permission on the file
$ chmod 400 brian.txt # gives the user read permission on the file
$ chmod 300 brian.txt # gives the user write, execute permission on the file
$ chmod 200 brian.txt # gives the user write permission on the file
$ chmod 100 brian.txt # gives the user execute permission on the file
$ chmod 000 brian.txt # gives the user NO permission on the file
```
