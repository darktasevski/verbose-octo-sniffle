# git stash

- why? when you are in the middle of working with something, and you need to stop right away and work with something else

- so you can store them in a temporary area!

- then when you are done with the emergency, you can apply back your changes and resume your work!!!


### GOTCHAS

- if the `$ git stash pop` has a conflict, it will not drop the stash! for your safety!!!
- if there is a conflict here, you need to resolve the conflicts, and manually drop the stash
- `$ git stash pop` same as `$ git stash apply; git stash drop`


- can’t unapply stash? even worse - unapply untracked files?
- can’t show untracked files in the stash


### save



```bash

# saves modified files only!!!
# after the stash, it restores the state from the last commit (so it moves those files to a temp area)
$ git stash save  # same as $ git stash # does not include untracked files # it saves both the staged and unstaged files
$ git stash save "my message"  # does not include untracked files # it saves both the staged and unstaged files
$ git stash save --include-untracked # to show the untracked files in the stash, use: `git show stash@{0}^3 --name-only` 
$ git stash save --keep-index # the staged files will not be stashed # only the unstaged files will be stashed # does not include untracked files
$ git stash save -u "message" # save with uncommited files too

# now run:
$ git diff
$ git status
# they should be clean...
```


- now you can checkout another branch!

```bash
$ git checkout master
$ git pull

# now you can make changes
# make commits
# and push!

```


- now you can go back to what you were doing!

```bash
$ git checkout branch1
$ git stash apply

# now you can go back to what you were doing!

```


### list stashes

- the `$ git stash show` command is to look at a specific stash
- the `$ git stash list` command is to look at all stashes

```bash
$ git stash list --stat # or any option of $git log \<option\>
$ git stash show stash@{0}
$ git stash show # of the resent stash
$ git stash show # or any option of $git log \<option\>
$ git stash show stash@{0} -p  # show what is in that stash
$ git stash show stash@{0} --name-only  # show names of files it will change!
$ git stash list

# output example:
# WIP - means: work in progress
# branch23 - was the branch you were in, when you stashed
# 8ad99a8 - is the last commit before you stashed (because a stash is NOT a commit)
# stash@{0} - is a reference to that stash

# stash@{0}: WIP on branch23: 8ad99a8 add buttons.

```



### apply a stash
- you need to have a clean state, before applying stashes
```bash
$ git stash apply stash@{0} # 0 is the default, same as $ git stash apply

# after stashing, the stash is NOT deleted
```


### Drop a stash

```bash
# drop a specific stash, only delete if if you are sure you dont want it!, if you applied it to a branch, then you can delete the stash(it will not delete it from your branch, because it will be already applied!)
$ git stash drop stash@{0} # 0 is the default, same as $ git stash drop


```


## new branch for the stash
```bash
$ git stash branch foobar stash@{0}

# it creates the branch!!!
# it drops the stash automatically!!!
# now you can commit!
$ git commit -am "message"
```


### clear all stashes (dangerous)

```bash
$ git stash clear
```



