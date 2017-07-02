
# start by running these commands:
$ npm install bower # to create the node_modules folder
$ bower install # to create the bower_components folder

# bower tutorial
#
#
# - you need to have node.js, npm, and git installed
# - after installing a package, you need to include the files in your HTML
#    - example:
#    <script src="bower_components/jquery/dist/jquery.min.js"></script>
#    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.css">
#

$ npm install -g bower # install bower globally
$ npm install bower # install bower locally as a node_module
$ bower # shows a list of commands
$ bower init # creates the bower.json file (it will show you the the bower.json file before you save it!)
$ bower install # it installs what is in your bower.js file
$ bower install foo # installs the foo package
$ bower install jquery
$ bower install jquery --save # installs, and saves in your bower.json file as a dependency
$ bower search <package-name>
$ bower install git://github.com/example-user/example-package.git
$ bower list # shows what packages you have in your project
$ bower update <package-name>
$ bower install <package-name>#<version>
$ bower install bootstrap


# the `.bowerrc` file  (things you can do)
# like specify where you want the `bower_components` folder
{
  "directory": "src/components"
}