# Rbenv

###### add this to ~/.bash_profile
```bash
# Initialize rbenv
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
```

```bash
# Run this command after you install a new version of Ruby, or install a gem that provides commands.
$ rbenv rehash


# list all available versions:
$ rbenv install -l

# install a Ruby version:
$ rbenv install 2.0.0-p247

# set local version
$ rbenv local 1.9.3-p327


$ rbenv local --unset

# set global version
$ rbenv global 1.8.7-p352

# the current ruby version
$ rbenv version

```
