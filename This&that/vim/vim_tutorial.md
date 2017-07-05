# Vim

```bash
$ vi foo.txt # edit a file

i  # insert mode
ESC # not insert mode

# up, down, left, right   # use the arrows, duh!
w # go to the beginning of the next word (good for fast forward)
b # go to the beginning of the previous word (good for fast rewind)
ESC :123 # go to line number 123

1yy  # copy 1 line
p  # paste
1dd # delete 1 line

u  # undo
CTRL r  # re-do

ESC  /foo # pattern find, click enter the first time, then click "n" to find the next.
ESC :%s/foo/bar/g #replace all

ESC :e /path/to/file # go to another file

```

# goto's

```bash
  beginning of line: 0
  beginning of line and append: I
  end of line and append: A
  beginning of file: gg
  last line: G
  beginning of word in a line: w
  beginning of previous word: b
  line 34:    34G
  apend at end of file: GA
```

# cursor

```bash
  right:  l   3l
  left:   h    4h
  up:     k    10k
  down:   j    23j
```

# edit
```bash
  delete n character on left of cursor:  x   3x
  delete whole line: dd
  undo:     u   4u
  redo: ctrl + r
```

```bash
<ESC> :q	#Quit vim
<ESC> :q!	#Quit without saving changes i.e. discard changes
<ESC> :r #fileName	Read data from file called fileName
<ESC> :wq	#Write and quit (save and exit)
<ESC> :w #fileName	Write to file called fileName (save as)
<ESC> :w! #fileName	Overwrite to file called fileName (save as forcefully)
```
