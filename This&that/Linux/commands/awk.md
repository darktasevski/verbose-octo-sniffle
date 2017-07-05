### Awk is the 'excel' of linux!

### brian.txt
```
name : brian : age : 21 : address : 456 foobar
name : brian : age : 22 : address : 456 foobar
name : brian : age : 23 : address : 456 foobar
name : brian : age : 24 : address : 456 foobar
name : brian : age : 25 : address : 456 foobar
name : erich : age : 26 : address : 123 foobar
name : rich : age : 40 : address : 789 foobar
```

### use a ':' delimeter, print columns 2 and 4, of the brian.txt file
```bash
$ awk -F: '{print $2  $4}' brian.txt 
```

### Output:
```
brian  21 
brian  22 
brian  23 
brian  24 
brian  25 
erich  26 
sandra  40 
```
