# Heroku tutorial

https://devcenter.heroku.com/articles/getting-started-with-ruby#start-a-console

https://devcenter.heroku.com/articles/getting-started-with-ruby#introduction

- Download Heroku tool belt


```bash    
$ heroku # check if you have the executable

$ Heroku login

$ heroku create --http-git  # create an app in heroku
# with a named app:   $ heroku create foobar

$ git push heroku master  # push your app to heroku

$ heroku ps:scale web=1 # do I need to do this?

$ heroku open # open on the browser

$ heroku logs --tail # check logs
```

```bash    
# ./Procfile file
web: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
```

# Dynos
### Think of a dyno as a lightweight container that runs the command specified in the Procfile.

```bash    
$ heroku ps # check how many dynos are running
# === web (1X): `bundle exec unicorn -p $PORT -c ./config/unicorn.rb` web.1: up 2014/07/07 12:42:34 (~ 23m ago)


# scale
$ heroku ps:scale web=2
$ heroku ps:scale web=1



# start your app locally with foreman (it comes with th heroku toolbelt)
$ foreman start web


# push to heroku
$ git push heroku master


# restart server
$ heroku restart
```


