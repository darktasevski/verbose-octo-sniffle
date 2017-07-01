# Sublime

### how to use the `subl` command

```bash
# As you can see the /usr/local/bin path is included by default on OS X.

# The /usr/local/bin is in the load path by default on OS X, 
# so it's a much better place to symlink (create a symbolic link — or shortcut) 
# that will allow you to run the subl utility from your Terminal app.

$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
```

```bash
# you probably dont need this:
# ~/.bash_profile
# export EDITOR='subl -w'

```
