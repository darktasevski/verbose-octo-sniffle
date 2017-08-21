# git tutorial:

# https://www.atlassian.com/git/tutorials/
#-----------------------------------------------------------------------------------

-> Working Directory

-> INDEX (staging area)

-> HEAD is a pointer to the branch, and the branch is a pointer to a commit (the last commit)
    - commits are like nodes in a tree (there is the root node and it branches out)
    - when you are in detached mode, HEAD is pointing directly to a commit.
    
#----------------------------------------------------------------------------------- git normal  work-flow:
# ...modify a file...

$ git add <file> # add the file to the 'next proposed commit'
$ git commit -m 'my changes' # do the actual commit
$ git push # push your changes to the server

#----------------------------------------------------------------------------------- git add
# this command adds the file or folder changes to the 'next proposed commit' a.k.a. the 'staging area'
$ git add <file> # adds the file to staging area
$ git add <folder> # adds the folder to staging area
$ git add . # add all files to staging area

#----------------------------------------------------------------------------------- git checkout
$ git checkout <some-existing-branch> 
# go to that branch.


$ git checkout -- <file> 
# restores the file as it was in the last commit, and removes the file from the staging area
# same as `$ git checkout HEAD -- <file>`

#----------------------------------------------------------------------------------- git commit
$ git commit -m 'my message' # commit the stagging area

#----------------------------------------------------------------------------------- git reset

$ git reset <file> 
# unstages a file, so its not added to the next commit (but the working directory stays the same)
# reverse of $ git add <file>
# same as `$ git reset -- HEAD <file> `

$ git reset --soft <file> # THIS COMMAND DOES NOT EXIST

$ git reset --soft # this file does NOTHING  # same as `git reset --soft HEAD` ???

$ git reset # BE CAREFULL 
# unstages all files so they are NOT added to the next commit (but the working directory stays the same)
# reverse of `$ git add .`
# same as `$ git reset --mixed`

$ git reset --soft HEAD~1 
# reverse of `git commit`, 
# moves the HEAD and BRANCH pointer to the previous commit
# dont do this after you push
# it will put files back to the stagging area  
# the working directory stays intact!
# the INDEX (staging area) will reflect what is in the working directory (as files that need to be committed)
#
# HEAD will have the version1 of a file,
# INDEX (staging area) will have the version2 of a file,
# Working Directory will have the version2 of a file,

$ git reset --mixed HEAD~1  
# reverse of ( `git add` followed by `git commit` )
# --midex is the default option
# moves the HEAD and BRANCH pointer to the previous commit
# dont do this after you push
# the working directory stays intact! BUT:
# the INDEX (staging area) will reflect what is in HEAD~1  (so nothing will show up)
#
# HEAD will have the version1 of a file,
# INDEX (staging area) will have the version1 of a file,
# Working Directory will have the version2 of a file,

$ git reset --hard HEAD  # Dangerous!!!
# moves the HEAD and BRANCH pointer to the previous commit
# same as `$ git reset --hard`
# restores all files as they were in the last commit, and removes all the files from the staging area
# this command is usually followed by a `$ git clean -f` because GIT will only untrack files that are not in HEAD (GIT will not remove them automatically)
# Remember that resetting only affects tracked files,
# so a separate command is required for cleaning up untracked ones.
# Combined, these two commands let you return the working directory
# to the exact state of a particular commit.
# - NEW files are NOT affected by git reset --hard

# The git reset --hard and git clean -f commands are your best friends after you’ve
# made some embarrassing developments in your local repository and want to burn
# the evidence. Running both of them will make your working directory match
# the most recent commit, giving you a clean slate to work with.

$ git reset --hard HEAD~1  # Dangerous!!!
# 1. dont do this after you push !!!
# 2. moves the HEAD and BRANCH pointer to the previous commit, so if you have 5 commits, it will point to commit number 4
# 3. reverse of ( making changes followed by `git add` followed by `git commit` )
# 4. undo LAST COMMIT AND ALL CHANGES,
#     - if you really screwed and want to start again fresh
# 5. this command is usually followed by a `$ git clean -f` 
#     - because GIT will only untrack files that are not in HEAD~1 
#       (GIT will not remove them automatically)
# 6. Remember that resetting only affects tracked files,
#     - so a separate command is required for cleaning up untracked ones.
# 7. Combined, these two commands let you return the working directory
#    to the exact state of a particular commit.
# 8. NEW files are NOT affected by git reset --hard
#
# 9. the INDEX (staging area) will reflect what is in HEAD~1  (so nothing will show up)
# 10. the working directory will  reflect what is in HEAD~1  (and all changes will be LOST)
#
# HEAD will have the version1 of a file,
# INDEX (staging area) will have the version1 of a file,
# Working Directory will have the version1 of a file,

$ git reset --hard HEAD~2 # Dangerous!!!
# (moves HEAD back twice, so if you have 5 commits, it will point to commit number 3)
# undo last 2 commits # dont do this after you push
# - this command is usually followed by a `$ git clean -f` because GIT will only untrack files that are not in HEAD~2 (GIT will not remove them automatically)
# Remember that resetting only affects tracked files,
# so a separate command is required for cleaning up untracked ones.
# Combined, these two commands let you return the working directory
# to the exact state of a particular commit.
# - NEW files are NOT affected by git reset --hard

#----------------------------------------------------------------------------------- saving changes
$ git add <file> # adds the file to staging area

$ git add . # add all files to staging area

$ git commit -m 'my message' # commit the stagging area

$ git commit -a   # save all changes in tracked files of the working directory

$ git status # list which files are staged, unstaged, and untracked.

#----------------------------------------------------------------------------------- viewing old commits
$ git checkout master # a way to get back to the "current" state of the project.

$ git checkout <commit> <file>
# - Check out a previous version of a file.
#   This turns the <file> that resides in the working directory into an
#   exact copy of the one from <commit>
#   and adds it (the file version from the commit) to the staging area.
#   this does affect the current state of your project.
#   This previous file version from the <commit> of the file will
#   show up as a "Change to be committed"
# - You can re-commit the old version in a new snapshot as you would any
#   other file.
# - to undo this (to get back to the "current" state of your file), use: `$ git checkout HEAD <file>`

$ git checkout <commit>
# This makes your working directory match the exact state of the <commit>.
# You can use either a commit hash or a tag as the <commit> argument.
# You can look at files, compile the project, run tests, and even edit files
# without worrying about losing the current state of the project. Nothing you
# do in here will be saved in your repository. To continue developing, you need
# This will put you in a detached HEAD state.
# - to undo this (to get back to the "current" state of your project), use: `$ git checkout master`
# - Checking out an old commit is a read-only operation. It’s impossible to harm your
#   repository while viewing an old revision. The "current" state of your project remains
#   untouched in the master branch

#----------------------------------------------------------------------------------- undoing changes

$ git revert <commit>
# Generate a new commit that undoes all of the changes introduced in <commit>,
# then apply it to the current branch.

# The git revert command undoes a committed snapshot.
# But, instead of removing the commit from the project history,
# it figures out how to undo the changes introduced
# by the commit and appends a new commit with the resulting content.
# This prevents Git from losing history,
# which is important for the integrity of your revision history
# and for reliable collaboration.

# Reverting vs. Resetting
# It's important to understand that git revert undoes a single
# commit—it does not "revert" back to the previous state of a
# project by removing all subsequent commits. In Git, this is
# actually called a reset, not a revert.

#----------------------------------------------------------------------------------- diff

$ git diff # Shows what you changed, but haven't staged
$ git diff --cached # Shows what has been staged, but not committed

#----------------------------------------------------------------------------------- remove files

$ git remove <file>
# also $ git rm <file> ???

#----------------------------------------------------------------------------------- log
$ git log # Shows all of the previous commit messages in reverse order
$ git log --pretty=oneline # Shows commits on one line
$ git log --pretty=format:"%h : %an : %ar : %s"
# %h - Abbreviated Hash
# %an - Authors Name
# %ar - Date Changed
# %s - First Line of Comment

$ git log -p -2 # Shows the last 2 commit changes
$ git log --stat # Prints abbreviated stats
$ git log --since=1.weeks # Show only changes in the last week
$ git log --since="2014-04-12" # Show changes since this date
$ git log --author="Brian Spinos" # Changes made by author
$ git log --before="2014-04-13" # Changes made before this date

#----------------------------------------------------------------------------------- cleaning

$ git clean -n # Perform a "dry run" of git clean.
# This will show you which files are going to be removed without actually doing it.

$ git clean -f # Remove UNTRACKED files from the current directory
# CAREFUL, THIS IS NOT UNDOABLE!!!

#----------------------------------------------------------------------------------- branching
# new files are not affeted
# stagging changes are not affected when you change the branch

$ git branch  # list all branches
$ git checkout -b foo # create a new branch based on the current branch
$ git merge foo  # merge the foo branch in to the current branch

#----------------------------------------------------------------------------------- stashing
# gotcha:   - you only need to worry about new files (untracked files)
#           - you need to add new files to the staging area, you dont need to commit them 
#               - if you dont add the new files, GIT will not track them, and they will be lost
#           - changes to tracked files do not need to be added, 
#               - GIT is smart enough to keep track of those changes, so dont worry!
#           - GIT stash will keep track of the changes in the working directory and also in the staging area!
$ git stash # same as `$ git stash save`
# now go to the other branch an fix your bug... 
# then get back to the original state your project was with:  $ git stash pop
# dont forget to go to your original branch!

$ git stash pop  # it will pop the changes from the stash stack and apply it to your working directory and staging area
                 # usually the stash object will disapear if successfull, but if it generates conflicts, it will not be erased!
                 # same as `$ git stash apply; git stash drop` ???
                 # `$ git stash apply` is the same as `$ git stash apply stash{0}` # it applies the top stash in the stack of stashes
                 # `$ git stash drop` is the same as `$ git stash drop stash@{0}` # it drops the top stash in the stack of stashes

# show the list of stashes (the newest is on top?)
$ git stash list 

#----------------------------------------------------------------------------------- git rebase
# before you start rebasing, make sure you committed your changes and that your stagging area is clean!

$ git commit -m 'saving my work and cleaning the stagging area, before I rebase!'
$ git fetch # fetches your remote branch, if set
$ git rebase # rebases your remote brach, if set
# now or latter...
$ git push # push to the remote branch


# What rebase does:
#   1. moves your commits to a temp area
#   2. addds the remote branch's commits, one at a time
#   3. adds your commits one at a time

# usually you do a rebase with the remote branch, so you can 
# apply your changes on top of the most current version of the remote branch
# BUT you can rebase anything...
$ git fetch # fetch (but not merge) the changes of the remote branch
$ git rebase # it will rebase the remote branch

#--------------------------------- rebase local branches
$ git checkout branch2
$ git rebase master # master will be the base!

# now update the master branch (so other people can have access to your changes)
$ git checkout master
$ git merge branch2 # a fast-forward commit, it just moves the HEAD pointer!

#--------------------------------- conflicts:
$ git status # not currently on any branch... you are in the middle of a rebase
# ...fix the files with conflicts...
$ git add <fixed-file>
# do not commit, because you are not in a branch... you are in the middle of a rebase
$ git rebase --continue
# you could be doing this multiple times with the same conflict

#----------------------------------------------------------------------------------- cherry-pick
$ git cherry-pick <commit>
# adds the changes introduces in the <commit> into a new commit! ???


#----------------------------------------------------------------------------------- remotes
$ git remote # list of remotes
$ git remote show origin # information about the remote: list of local and remote branches branches, fetch and push URLs...
$ git remote show <your-remote>
$ git remote add origin2 https://github.com/brianspinos777/foo-bar.git  # origin is the name of the remote
$ git remote rm <remote-name> # removes the remote
$ git push -u <remote-name> <branch-name> # push a branch to a remote and make git remember the upstream.

#----------------------------------------------------------------------------------- remote branches
# Creating remote branches

$ git checkout -b shopping_cart
$ git push origin shopping_cart # this links local branch to the remote branch, and track it
$ git push # git knows to push to the origin/shopping_cart

$ git branch -r  # list remote branches

# if another person wants to work on your new remote branch:
$ git pull
$ git remote -v # list remote branches
$ git checkout shopping_cart # git will automatically track this branch!
$ git push # now, git knows to push to the origin/shopping_cart

$ git remote show origin # shows remote branches, and local branches configured for 'git pull' and 'git push'

# Delete remote branch

$ git push origin :shopping_cart # deletes only the remote branch
$ git branch -D shopping_cart # force delete branch

$ git remote prune origin  # if you run `git remote show origin`, and there are `stale` branches (meaning that someone deleted that remote branch), run this command to clean these references


#----------------------------------------------------------------------------------- tags
# They are a reference to a specific commit
$ git tag # list tags
$ git checkout <tag-name> # check out code at this commit
$ git tag -a <tag-name> -m "a message with the tag description" # create a new tag
$ git push --tags  # push the tags also

#----------------------------------------------------------------------------------- blame
# see who commited those changes to that file
$ git blame index.html --date short # you can see for each line: the commit SHA, the Author, the Date, the Line number, and the content of that line.

#----------------------------------------------------------------------------------- Aliases
$ git config --global alias.mylog "log --pretty=format: '%h %s [%an]' --graph"
$ git config --global alias.lol "log --graph --decorate --pretty=oneline --abbrev-commit --all"
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
