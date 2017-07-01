Bower Fundamentals
==================

Bower is a tool that helps you manage third-party client-side libraries for your web-based project via Git.

# Bower Basics #

## Installing Bower ##

1. Install Node
2. Install Git for Windows
	- Run Git from the Windows Command Prompt
3. `npm install bower -g`

## Common Tasks ##

Run all of these inside your project directory. A `bower_components` directory will be created, and the desired libraries will be found in subfolders.

### Installing A Package ###
```
$ bower install [package]
```

### Uninstalling Packages ###

```
$ bower uninstall [package]
```

### Get A List Of Versions For A Package ###

```
$ bower info [package]
```

### Installing Specific Versions ###

```
$ bower uninstall [package]#[version]
```

### Updating Packages ###

```
$ bower update
```

>This will update all packages in your project. To only update a specific package, use `bower install [package]`.

### Listing Installed Packages ###

```
$ bower list
```

### Searching Bower Registry ###

```
$ bower search [search term]
```

> Or go to http://bower.io/search

# Bower Configuration #

All Bower configurations are held in two files.

## [bower.json](http://bower.io/docs/creating-packages/) ##
This file works much the same as Node's **`package.json`**. It keeps track of the packages installed into your project. This makes it easy to reinstall them at any time. It is also used for when you want to publish your own package by give Bower all the information it needs to install your package correctly.

You can create this file for your project easily.

```
$ bower init
```

If you have already installed some components, you may be prompted to bring those in as dependencies.

To add files to your project **and** add them to `bower.json`, the command is the same as for npm.

```
$ bower install [package] --save
$ bower uninstall [package] --save

$ bower install [package] --save-dev
$ bower uninstall [package] --save-dev
```

## .bowerrs ##
The **`.bowerrc`** file lets us customize the install directory of our packages. It should be located as a peer to the `bowers.json` file.

```javascript
{
	"directory" : "relative/path/to/folder"
}
```

# Advanced Topics #

## Bower Cache ##

As you install packages, Bower creates a cache of them. That way, if you ever ask Bower to install the same package later on, it can just pull it from the cache. Bower will still validate that the cached copy is the most up to date. There are two commands for working with the Bower cache.

**See everything the the Bower cache**

```
$ bower cache list
```

**Clear the Bower cache**

```
$ bower cache clean
```

When you try to install a package, Bower first checks to see if it is in the cache. If it is, then it validated the version and installs the cached version into your project. You can also install in offline mode, forcing Bower to use only the packages that are in it's cache.

```
$ bower install [package] -o
```

## Package Installation Commands ##

Install a package from a local github repository:

```
$ bower install [path]
```

Install a single file (instead of the entire package) from a URL:

```
$bower install [fully qualified url to a file]
```

Don't install the development dependencies:

```
$ bower install --production
```

Install a package into a particular folder:

```
$ bower install [folder-name]=[package]
```

## Bower Help ##

Get command line help about the Bower command line interface.

```
$ bower help
$ bower help [command]
```

## Bower Info ##

Displays the `bower.json` file for a give package and version.

```
$ bower info [package]#[version]
```

## Bower Lookup ##

Shows you the git URL for a specific package.

```
$ bower lookup [package]
```

## Bower Prune ##

Remove extraneous bower packages (anything that is installed but not listed as a dependency or is used as a dependency).

```
$ bower prune
```

## Bower CLI Flags ##

Remove verbose messages during an operation and only notifies that the operation completed.

```
$ bower install [package] -q
```

Remove all messages during an operation.

```
$ bower install [package] -s
```

Pipe package installation details to a file.

```
$ bower install [package] -j > [filename]
```

# Publishing #


## Create A New Package ##

1. Create a new project folder
2. Run `bower init` in the project folder
3. Create the main script(s) in the project
4. Create the repository on GitHub
	- Create a new repository. Copy the url to the [repository].git file
	- Run `git init` in the project folder.
	- Optionally create a `README.md` and `.gitignore` file and commit them to the local repository
	- Add the remote `git remote add origin [url to .git file on github]`
	- Push the changes `git push -u origin master`
	- Tag the repository with the version number `git tag 0.0.1`
	- Push the tag `git push --tags`
5. Register the package with Bower `bower register [package name] [url to .git file on github]`
6. Run `bower info` to verify the package has been registered correctly

## Maintain A Package ##

1. Make changes to code as desired and commit the changes to the repository
2. Update the version number in `bower.json` and commit the file
3. Add a new tag for the new version number
4. Run `bower.info` to verify that Bower is aware of the updated version
