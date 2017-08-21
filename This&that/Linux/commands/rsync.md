### rsync


```bash
# sync  folders, the <src-folder> will be under the <dest-folder>
# so `$ rsync -r src_folder dest_folder ` will sync src_folder with dest_folder/src_folder
# $ rsync -r src_folder dest_folder 


# sync the server files with what is in your current computer.
$ rsync -r . root@111.222.333.444:/var/foo 
```
