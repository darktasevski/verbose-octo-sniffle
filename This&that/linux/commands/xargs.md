### xargs is the 'forEach' of linux!

```bash
$ ls | xargs grep "test"  # the results of the `ls` command will be an array passed to `xargs` 

# OUTPUT:
# brian.txt:this is a test
# erich.txt:dont test me
# sandra.txt:foo test
# rich.txt:bar test

# it outputs the lines of the files that have the word "test" in them, case sensitive
```
