# twitter boostrap

https://github.com/seyhunak/twitter-bootstrap-rails
http://bootstrapdocs.com/v2.3.2/docs/

# Easy way
```
# gem "twitter-bootstrap-rails" # Gemfile
$ bundle install
$ rails generate bootstrap:install static
```



# hard way

```
# Gemfile
# twitter bootstrap
gem "therubyracer"
gem "less-rails" #Sprockets (what Rails 3.1 uses for its asset pipeline) supports LESS
gem "twitter-bootstrap-rails"
```

```bash
$ bundle install
$ rails generate bootstrap:install less
```


## message after `$ bundle install`

```
# Post-install message from twitter-bootstrap-rails:
# Important: You may need to add a javascript runtime to your Gemfile in order for bootstrap's LESS files to compile to CSS.
#
# **********************************************
#
# ExecJS supports these runtimes:
#
# therubyracer - Google V8 embedded within Ruby
#
# therubyrhino - Mozilla Rhino embedded within JRuby
#
# Node.js
#
# Apple JavaScriptCore - Included with Mac OS X
#
# Microsoft Windows Script Host (JScript)
#
# **********************************************

```
