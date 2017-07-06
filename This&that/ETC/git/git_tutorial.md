# Git tutorial


# Git has the 3 trees:
  1. "working directory", "your folder, and files on your computer", "files on your filesystem"

  2. "index" - "stagging area", "your next commit being worked on", "proposed next commit snapshot"

  3. "HEAD" - your lattest commit, "last commit snapshot, next parent", "HEAD points to a branch, that points to a commit ???"


# Checkout command
  - git checkout is an easy way to “load” any saved snapshots onto your development machine.
  - the `$ git checkout` command operates on: files, commits and branches

```bash
    $ git checkout <commit> <file>  
    # This turns the <file> that resides in the working directory into an exact copy of the one from <commit> and adds it to the staging area.

    $ git checkout <commit/or tag>
    #  makes the entire working directory match that commit. This will put you in a detached HEAD state. and when you get back to the branch that your working,  you can use either git revert or git reset to undo any undesired changes.
    # Nothing you do in here will be saved in your repository

```
# Revert command
  - git revert is a “safe” way to undo changes
  - reverting is designed to safely undo a public commit,


```bash
$ git revert <commit>
  # example: git revert HEAD~3
  # example: git revert -n master~5..master~2

  # Generate a new commit that undoes all of the changes introduced in <commit>, and adds a new commit with the resulting content.

  # This requires your working tree to be clean (no modifications from the HEAD commit).
```

- Reverting should be used when you want to remove an entire commit from your project history.
- This can be useful, for example, if you’re tracking down a bug and find that it was introduced by a single commit.
- Instead of manually going in, fixing it, and committing a new snapshot, you can use git revert to automatically do all of this for you.



# Reset command  `dangerous`
  - you can think of git reset as the dangerous method!
  -  it’s one of the only Git commands that has the potential to lose your work.
  -  it should only be used to undo local changes—you should never reset snapshots that have been shared with other developers.
  - You should never use git reset <commit> when any snapshots after <commit> have been pushed to a public repository



# git reset
  - If you want to throw away all uncommitted changes in your working directory
  - Reset the staging area to match the most recent commit
  - but leave the working directory unchanged
  - This unstages all files without overwriting any changes, giving you the opportunity to re-build the staged snapshot from scratch.


```bash
$ git reset --soft <commit>
  # moves HEAD to that commit, does not change the index or working directory


$ git reset --mixed <commit> # same as "git reset <commit>"
  # moves HEAD to that commit, and CHANGES the index,  NOT the working directory
  # it unstages your changes

$ git reset <file>
  # same as "git reset --mixed HEAD file.txt"
  # its the reverse of "git add"
  # it unstages the file
  # just takes whatever file.txt looks like in HEAD and puts that in the Index.
  #  but leave the working directory unchanged.
  # This unstages a file without overwriting any changes.

$ git reset <commit> -- <file>
  # get the file from that commit and put it in the index



$ git reset --hard <commit>  # dangerous
  # moves HEAD to that commit, and CHANGES the index,  AND the working directory
  # This obliterates not only the uncommitted changes, but all commits after <commit>, as well.

$ git reset --hard # dangerous
  # Reset the staging area and the working directory to match the most recent commit.
  # this obliterates all uncommitted changes

$ git reset <commit>
  # Move the current branch tip backward to <commit>, reset the staging area to match, but leave the working directory alone
```

# Log
```bash
git log --oneline
```

# what is git reflog ???
