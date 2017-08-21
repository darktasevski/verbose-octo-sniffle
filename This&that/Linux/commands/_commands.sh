# see file type
file foo.txt 

# see file tymime type
file --mime foo.txt 

# see file size
du -h foo.txt 

# see free space
df -h  

# login into another machine.
$ ssh root@111.222.333.444 

# login into another machine and execute a command.
$ ssh root@111.222.333.444 "ls -la" 

# secure copy from another computer to your current computer.
$ scp -r root@111.222.333.444:/var/foo .  
$ scp -r root@111.222.333.444:/home/rails/rails_project /Users/brianspinos777/Desktop/FileSharingApp

# sync the server files with what is in your current computer.
$ rsync -r . root@111.222.333.444:/var/foo 

# creates a symlink (pointer to a file/folder) so you can treat the symlink just as the normal file/folder
$ ln -s foo foo_pointer 
