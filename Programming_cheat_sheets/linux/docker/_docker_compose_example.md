### Docker compose tutorial:

[docker compose tutorial youtube](http://www.youtube.com/watch?v=Uez88TWOECg)

[gettingstarted](https://docs.docker.com/compose/gettingstarted/)


```bash
# spin an NGINX container
# to serve as a reverse proxy
$ docker run -d -p 80:80 --name my_ngingx_container nginx # the go to http://localhost:80
```


### create files
```bash
$ touch Dockerfile Gemfile Gemfile.lock docker-compose.yml
```

### create a Dockerfile
```bash
FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
ADD . /myapp

```

### create a Gemfile
```ruby
source 'https://rubygems.org'
gem 'rails', '5.0.0.1'

```

### create a Gemfile.lock (empty)
```

```

### create a docker-compose.yml
```yaml
version: '2'
services:
  db:
    image: postgres
  my_rails_service:
    build: .
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```


### Create rails app:
```bash
# `my_rails_service` can be found in the docker-compose.yml file!
# this command creates the project locally also!
# will this also run the Dockerfile ???
$ docker-compose run my_rails_service rails new . --force --database=postgresql --skip-bundle
```

### Change the config/database.yml file locally
```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see rails configuration guide
  # http://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

  # changed by brian:
  username: postgres
  password:
  host: db

development:
  <<: *default
  database: myapp_development

```

### Build again, if you changed the local code: ???
```bash
$ docker-compose build
```

### Finally, you need to create the database. In another terminal, run:
```bash
$ docker-compose run my_rails_service rails db:create
```


### You can now boot the app with:
```bash
$ docker-compose up # go to http://localhost:3000
# $ docker-compose stop # to stop...
```


### Run commands on your container: # which will reflect locally!
```bash
$ docker-compose run my_rails_service rails g scaffold user firstname lastname address phone
$ docker-compose run my_rails_service rails db:migrate
# then go to http://localhost:3000/users
```

### Make local changes, then rebuild your project:
```bash
$ docker-compose stop # not sure if you need to do this...
# make changes
$ docker-compose up  # not sure if you need to do this...
```



### If you get an error like:
```bash
# - A server is already running. Check /myapp/tmp/pids/server.pid.
# Just delete the contents of that file!
# then run $ docker-compose up
```

### tear down project (destroy)
```bash
$ docker-compose down --volumes
# it will not destroy the local files
```




