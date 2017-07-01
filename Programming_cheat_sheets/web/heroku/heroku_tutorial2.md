# HEROKU TUTORIAL

# commands (not sure its in order)
```bash
$ heroku accounts
$ heroku accounts:set zoogle
$ ssh-add identity.heroku.zoogle  # private key ???
$ heroku keys:add # then you can choose wich key to upload to heroku
$ heroku create --region eu
$ RAILS_ENV=production bundle exec rake assets:precompile
$ heroku addons:add heroku-postgresql
$ RAILS_ENV=production rake db:create db:schema:load
$ git push heroku master
$ heroku run rake db:reset
$ heroku run rake db:migrate
$ heroku restart
$ heroku logs
```

# Other commands
```bash
$ git remote -v
$ git remote remove heroku
$ heroku keys
$ git remote add heroku git@heroku.com:afternoon-harbor-7316.git
$ rake assets:precompile # ???
$ heroku info --app <app> # check the region attribute
$ heroku git:remote -a safe-island-2159 # it adds a heroku remote to git ???
```
# Gemfile
```ruby
# You need:
#  - to specify the RUBY version
#  - switch from sqlite3 to pg
#  - add gem 'rails_12factor'

source 'https://rubygems.org'

gem 'rails', '3.2.13'
ruby '2.0.0'

gem 'thin'

group :production do
  gem 'pg'
  gem 'rails_12factor'
end

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'
gem 'devise'
gem 'pry'
```
# procfile
```bash
# dont hardcode the port...
web: bundle exec rails server thin -p $PORT -e $RACK_ENV
```

# database.yml
```yaml
# REMOVE THESE COMMENTS ########################
# database.yml
# development: postgres
###############################################
development:
  adapter: postgresql
  database: hm_europe_app_socialize_development
  username: brianspinos777
  host: localhost

test:
  adapter: postgresql
  database: hm_europe_app_socialize_test
  username: brianspinos777
  host: localhost

production:
  adapter: postgresql
  database: hm_europe_app_socialize_production
  username: brianspinos777
  host: localhost
```

# github app

https://github.com/brianspinos777/europe_app

# other useful websites:

http://guides.railsgirls.com/heroku/

http://railsapps.github.io/rails-heroku-tutorial.html

https://help.github.com/articles/generating-ssh-keys

# app path

`/Users/brianspinos777/Sites/zoogle/socialize`

# the URL

http://safe-island-2159.herokuapp.com/users/sign_in
