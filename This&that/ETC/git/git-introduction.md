Git Introduction
================

Git is an open source distributed version control system (DVCS) created by [Linus Torvalds](http://en.wikipedia.org/wiki/Linus_Torvalds) in 2005 for the Linux kernal, and is written in Perl and C.

**Triva**: The [source code for Git](https://github.com/git/git) is hosted on a GitHub site. 

>Using GitHub? See a [cheat-sheet here](https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf)

##Installation##

Download and install from [http://git-scm.com/](http://git-scm.com/).

##Configuration##
Git can be configured 3 different ways:

###System-Level###

    git config --system

Stored in `/etc/gitconfig` or `[git install path]\etc\gitconfig`

###User-Level###

	git config --global

Stored in `~/.gitconfig` or `c:\users\[name]\.gitconfig`

###Repository-Level###

	gif config

Stored in `.git/config` in each repository.

###Command Line: View Configuration###
Use the --list command line option along with the configuration level scope you want to see:

	git config --[scope] --list

Omit the `--[scope]` argument if you are in a repository and want to see repository level configuration.

###Command Line: Set/Unset Configuration###
Set configuration settings using:

	git config --[scope] [config-key] "[config-value]"

Remove configuration settings using:

	git config --[scope] --unset [config-key]

For example:

	git config --global user.name "Scott Offen"
	git config --global user.email "scott.offen@imail2.org"
	git config --global core.editor "'c:/program files/sublime text 2/sublime_text.exe' -w"
	git config --global help.autocorrect 20 # value in 10ths of a second
	git config --global color.ui auto
	git config --global core.autocrlf true|false|input # input is convert on check-in only

Configuration settings are hierarchical in nature. System level settings are overridden by global level settings, which are then overridden by repository level settings.

##Working Locally##
All commands should be run in the directory that contains the repository.

**Important Tip:** Some commands show paginated output. You can break out of these commands at any time by pressing the letter `q` on your keyboard.

###Create a Local Repository###
Turn a local directory into a git repository:

	git init

This will create the `.git` directory and the repository metadata.

###Check for changes###
Check for changes to the files in the repository:

	git status

###Adding Files###
Stage new files to be added to the repository:

	git add [file name]

Or stage all updated files (that git knows about, doesn't include ones not being tracked by the repository yet):

	git add -u

If you want to stage both untracked files and updated files:

	git add -A

###Commit Changes###
Commit staged changes

	git commit

Automatically launches your core.editor to create a commit message. You can also provide the commit message in line using:

	git commit -m "Commit message goes here"

Git commits are identifed using a [SHA-1 hash](http://en.wikipedia.org/wiki/SHA-1), for example: `c877678022f49f682b76e039db89d6626f0effeb`. When you want to reference a particular commit, you can use this hash, or just the first 5 or 6 characters of the hash.

If you want to bypass the adding step, you can tell git to commit everything that has changed that it knows about:

	git commit -am "Commit message"

###View Change History###
View history of changes to the repository, listed in reverse chronological order.

	git log

To see a condensed version of the change history, use the `--online` option.

	git log --online

###View Differences Between Commits###
You can see differences between commits using the diff command, specifying the commit that occurred earlier, followed by the commit that occurred later.

	git diff [sha-earlier]..[sha-later] 

You can specify using the SHA-1 hash, or by referencing the `HEAD`, which is the most current commit, and adding the tilde (`~`) and a number indicating how many commits back from the head you want to go.

	git diff HEAD~1..HEAD
	git diff HEAD~1.. # omit the HEAD and git will assume it for you!

###Staging Changes As Multiple Commits##
If you have multiple changes that you want to commit separately, you can stage them separately.

	git add [updated file 1]
	# commit
	git add [updated file 2]
	# commit

This allows you to break your commits up into logical units.

###Deleting and Renaming Files###
You can do this by simply deleting/renaming files from the repository and then stage the changes using:

	git add -u

###Undoing Changes to the Working Copy###
*git reset --[soft|mixed|hard] [SHA|HEAD~#]*

When you modify a file in your repository, the change is initially unstaged. In order to commit it, you must stage it — that is, add it to the index — using `git add`. When you make a commit, the changes that are committed are those that have been added to the index.

`git reset` changes, at minimum, where your current branch is pointing. The difference between `--mixed` and `--soft` is whether or not your index is also modified.

So, if we're on branch master with this series of commits:

    - A - B - C (master)

`HEAD` points to `C` and the index matches `C`.

####git reset --soft###

When we run `git reset --soft B`, `master` (and thus `HEAD`) now points to `B`, but the index still has the changes from `C`; `git status` will show them as staged. If we run `git commit` at this point, we'll get a new commit with the same changes as `C`.

####git reset --mixed####
Starting from here again:

	- A - B - C (master)

Let's do `git reset --mixed B`. Once again, `master` and `HEAD` point to `B`, but this time the index is also modified to match `B`. If we run `git commit` at this point, nothing will happen since the index matches `HEAD`. We still have the changes in the working directory, but since they're not in the index, `git status` shows them as unstaged. To commit them, you would `git add` and then commit as usual.

####git reset --hard####
Note that `--hard` is the same as `--mixed` (it changes your `HEAD` and index), except that `--hard` *also modifies your working directory*. Using our example of:

	- A - B - C (master)

If we're at `C` and run `git reset --hard B`, then the changes added in `C`, as well as any uncommitted changes you have, will be removed, and the files in your working copy will match commit `B`. Since you can permanently lose changes this way, you should always run `git status` before doing a hard reset to make sure your working directory is clean or that you're okay with losing your uncommitted changes.

Source: [http://stackoverflow.com/a/3528483](http://stackoverflow.com/a/3528483)

###Clean the Working Copy###
Remove unwanted files from your repository using the clean command.

	git clean -n # Notifies you of what it would do
	git clean -f # Actually removes the unwanted files

###Using .gitignore###
Specify files that you don't want added to the repository by adding lines to the `.gitignore` file, located in the root of your directory. The `.gitignore` files does get added to the repository.

Each line should contain a pattern/path (from the root of the repository) that should be ignored when running `git status`.

##Working Remotely##

If you are working behind a firewall and the remote repository is outside the local network, you might have problems reaching the remote repository. [Cntlm might solve this problem for you](http://scottoffen.com/2013/12/16/remote-git-repos-behind-a-proxy/ "Shameless plug for my website!"). 

###Clone a Remote Repository###
You can clone any repository that you have a URL for, and git has a number of transfer protocols you can use. For now, I'll use HTTP/HTTPS.

	git clone https://github.com/scottoffen/common-perl.git

This creates a directory named `common-perl`, initializes a `.git` directory inside it, pulls down all the data for that repository, and checks out a working copy of the latest version. If you go into the new `common-perl` directory, you’ll see the project files in there, ready to be worked on or used. If you want to clone the repository into a directory named something other than `common-perl`, you can specify that as the next command-line option:

	git clone https://github.com/scottoffen/common-perl.git common-perl\code

That command does the same thing as the previous one, but the target directory is located at `common-perl\code`.

###Repository Statistics###
See a graph view of the repository statistics.

	git log --oneline --graph

Authors, and commit messages and number of commits only can be viewed using `shortlog`.

	git shortlog

We can add flags to `-s`how summary information only, order by `-n`umber of commits (decreasing) and include `-e`mail address.

	git shortlog -sne

*Github graphs also provide some great repository statistics.*

You can see a specific change log using `show` and a reference to the change (SHA-1|HEAD~#).

	git show HEAD

The `remote` command show you where your source came from. Used with the `-v`erbose flag, it shows you the full URLs.

	git remote -v

These might be different, as you can be fetching using a different protocol than you are to push.

	git remote add origin [url]
	git fetch vs git fetch origin



You can see your current branch use `branch`, and add the `-r`emote flag to see remote branches.

	git branch
	git branch -r

Tags

	git tag

###Fetch###

	git fetch vs git fetch origin 

###Merge###

	git merge origin/master

Fast forward?

###Pull###

	git pull
	# is a synonym for:
	git fetch; git merge origin/master

Upstream?

	git branch --set-upstream master origin/master

The act of cloning sets the upstream for you.

###Pushing to Remote Repositories###
If your local branch is ahead of the remote branch, you can move your changes into the branch. 

	git push

You'll be prompted for a username and password for the remote unless you already provided it, or if you are using the SSH protocol.

	git remote

###Creating and Verifying Tags###
You can create a stable point in your code using a tag. The tag will point to a specific commit, and the state of the repository at that point.

	git tag 1.0
	git tag -a 1.1 # with annotation
	git tag -s 1.2 # signed, automatically requies annotation

Always tags at HEAD (?) and you can branch from that point.

By default, git will not push tags.  You have to tell it to.

	git push --tags
