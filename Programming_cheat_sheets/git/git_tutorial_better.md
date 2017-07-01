# GIT (a better tutorial)


# TIPS
- you should change a commit that you have already pushed, changing history is bad...

- If your `git push` is rejected, do a `git pull`, followed by a `git push`



```bash
$ git commit --all   # add new and modified files to the stagging area
```

- comits are added to the top of the timeline!


```bash
$ git reset HEAD <file>  # unstage file (reverse of git add)


$ git checkout -- <file> # blow away all changes since last commit


$ git reset --soft HEAD^  # reverse of `git commit`, it will put files back to the stagging area  
# dont do this after you push


$ git commit --amend -m "new commit message"  # add to the last commit  # dont do this after you push

$ git reset --hard HEAD^  # undo LAST COMMIT ADD ALL CHANGES, if you really screwed and want to start again fresh 
# dont do this after you push

$ git reset --hard HEAD^^ # undo last 2 commits 
# dont do this after you push
```


# Remotes
```bash
$ git remote add origin https://github.com/brianspinos777/foo-bar.git  # origin is the name of the remote

$ git remote -v  # list the remotes
```

# pushing to remote
```bash
$ git push -u origin master  # the -u is for the next time you will only need to do a `git push`


$ git pull
```


# Remove remote
```bash
$ git remote rm <name>
```

# push to remote
```bash
$ git push -u <name> <branch>
```

```bash
$ git clone <ssh-address> <custom-name-for-folder>

$ git branch cat # create new branch

$ git checkout cat # go to that branch

$ git merge <branch>  # merge <branch> to the current branch


$ git branch -d cat  # delete cat branch
```

# fast-forward merge
- it happens when you create  branch2, added commits to  branch2, and then came back to branch1 and merged branch2, its easy for GIT!

# recursive merge
- it happens when you create branch2, and add some commits, then go back to branch1 and add some commits, then you merge branch2, (git will create an empty commit, that means: from that point, the two branches became one!) (git will send you to vi and you can change the name of the commit, followed by a `:qw` to exit `vi`)


```bash
$ git checkout -b admin  # creates a branch and goes to it

$ git fetch  # updates origin/master local branch (and all remote local copies, it does not merge with your current branch)

$ git pull # is the same as `git fetch` followed by `git merge origin/master`
```


> if I do a `git pull` and I have some local commits, and the repository also has new commits, git will send me o `vi` and do a __recursive merge__ and you can change the name of the commit (its a __merge commit__ that is empty), followed by a `:qw` to exit `vi`)



# git pull conflicts
- when doing a `git pull` it could also bring changes that conflict with your files
- you need o manually edit your files
- then `git commit <file>` your changes




# creating remote branches

```bash
$ git checkout -b shopping_cart
$ git push origin shopping_cart # this links local branch to the remote branch, and track it
$ git push # git knows to push to the origin/shopping_cart

$ git branch -r  # list remote branches

# if another person wants to work on your new remote branch:
$ git pull
$ git remote -v # list remote branches
$ git checkout shopping_cart # git will automatically track this branch!
$ git push # now, git knows to push to the origin/shopping_cart

```

```bash
$ git remote show origin # shows remote branches, and local branches configured for 'git pull' and 'git push'

```


# Delete remote branch
```bash
$ git push origin :shopping_cart # deletes only the remote branch

```


```bash
$ git branch -D shopping_cart # force delete branch

```



```bash
$ git remote prune origin  # if you run `git remote show origin`, and there are `stale` branches (meaning that someone deleted that remote branch), run this command to clean these references

```


# TAGS

- they are a reference to a specific commit


```bash
$ git tag # list tags
$ git checkout <tag-name> # check out code at this commit
$ git tag -a <tag-name> -m "a message with the tag description" # create a new tag
$ git push --tags  # push the tags also


```



# Rebase
- its best __NOT__ to use it if the branch has many commits
- the solution for `merge commits` !!!
- it basically places the __remote commits__ before your local commits!

```bash
# instead of doing `git pull` and `git push`,
# do `git fetch` and `git rebase`


# GIT REBASE DOES 3 THINGS:
# 1. move all changes to master which are not in origin/master to a temporary area
# 2. run all of origin/master commits, one at a time
# 3. run all commits in the temporary area on top of master, one at a time # <------ THERE COULD BE A CONFLICT HERE, just manually fix the file (and `git add <file>`), then run `git rebase --continue`, at this point you could also abort the whole process of rebasing, going back to what it was before rebasing, like this: `git rebase --abort`


# more REBASE EXPLANATION:
#  - its basically setting aside your new commits, placing the commits of the other branch, then putting back your new commits on top of them
#  - its like if your new commits happened after the commits of the other branch
#  - there could be conflicts only when your new commits are being placed on top of the commits of the other branch (its like saying: your new commits generated a conflict), you just manually fix the files and `git add` them, then do a `git rebase --continue`
#
#
#

```


# Rebase local branch

```bash
$ git checkout branch2
$ git rebase branch 1  # it will add the branch1 commits under the branch2 commits

$ git checkout branch1
$ git merge branch2

```



# git log


```bash
$ git config --global color.ui true
$ git log --oneline -p  # for short SHAs and show patches (diffs)
$ git log --oneline --stat # stats of insertions and deletions for each file
$ git log --oneline --graph
$ git log --until=1.minute.ago
$ git log --since=1.day.ago
$ git log --since=1.hour.ago
$ git log --since=1.month.ago --until=2.weeks.ago
$ git log --since=2000-01-01 --until=2012-12-21

$ git log --pretty=oneline
$ git log --pretty=format:"%h %ad- %s [%an]"

# %ad author date
# %an author name
# %h SHA hash
# %s subject
# %d ref names
```



# Git diff

```bash
$ git diff HEAD^ # parent of last commit
$ git diff HEAD^^ # grandparent of last commit

$ git diff HEAD~5 # 5 commits ago
$ git diff HEAD^..HEAD # second most recent vs. most recent
$ git diff <SHA1> <SHA2>
$ git diff <branch1> <branch2>
$ git diff --since=1.week.ago --until=1.minute.ago
```


# Git blame
- see who commited those changes to that file



```bash
$ git blame index.html --date short # you can see for each line: the commit SHA, the Author, the Date, the Line number, and the content of that line.

```


# exclude files

- use the `.gitignore` file

```bash
# .gitignore file

logs/*.log  # ignore these log files in this log folder

# commit the .gitignore file!
```

# removing files

```bash
$ git rm <file>  # it stagges the DELETION of that file, and deletes the file from the file system

```

# untracking files

- when you dont want to delete the file, just untrack it!
```bash
$ git rm --cached <file> # it will untrack the file, but not delete from the file system

```

# configurations

```bash
$ git config --global user.name "Brian Spinos"
$ git config --global user.email "brianspinos777@hotmail.com"



$ git config --global core.editor emacs
$ git config --global merge.toll opendiff # osx only

$ git config user.email "brianspinos777@hotmail.com" # current repo

$ git config --list

$ git config user.email # shows its value

```


# Aliases

```bash
$ git config --global alias.mylog "log --pretty=format: '%h %s [%an]' --graph"


$ git config --global alias.lol "log --graph --decorate --pretty=oneline --abbrev-commit --all"

$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
```
