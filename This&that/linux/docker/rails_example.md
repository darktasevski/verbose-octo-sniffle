### Hello World for docker and rails

### tutorial 
```
https://docs.docker.com/compose/rails/
```

```
- create a folder to work inside.
- write Dockerfile
- write docker-compose.yml
- write Gemfile
- write Gemfile.lock
```

### Dockerfile
```
FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
ADD . /myapp
```
### docker-compose.yml
```yaml
version: '2'
services:
  db:
    image: postgres
  web:
    build: .
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```

### Initial Gemfile
```ruby
source 'https://rubygems.org'
gem 'rails', '5.0.0.1'
```

### Gemfile.lock (empty)
```

```


### clean-up! 
```bash
# removes all containers that are not running
$ docker rm -fv $(docker ps -aq)
```

### run the docker-compose.yml
```bash
# this is the command that will create your rails app
$ docker-compose run web rails new . --force --database=postgresql --skip-bundle

$ sudo chown -R $USER:$USER . # for linux (I did not test this)
```

### build the app
```bash
# This command will also load the rails app in our local folder!
# run this when you change local files, or the Dockerfile
$ docker-compose build 
```

### change the database.yml file
```yaml
development: &default
  adapter: postgresql
  encoding: unicode
  database: myapp_development
  pool: 5
  username: postgres
  password:
  host: db

test:
  <<: *default
  database: myapp_test
```

### to boot the app
```bash
$ docker-compose up 
```

### Create the database
```bash
# in another terminal, make sure you are in the correct folder
$ docker-compose run web rails db:create
```

### go to http://localhost:3000
