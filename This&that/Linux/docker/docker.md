# Docker

### Install docker:
```
https://docs.docker.com/docker-for-mac/
```


### Tutorial: 
```
https://docs.docker.com/compose/rails/
```

### write a test container:
$ docker run -d -p 80:80 --name webserver nginx # the go to http://localhost:80


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


### Gemfile
```ruby
source 'https://rubygems.org'
gem 'rails', '5.0.0.1'
```

```
$ touch Gemfile.lock
```



### docker-compose.yml
```
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



### build the project:
$ docker-compose run web rails new . --force --database=postgresql --skip-bundle

### if using linux:
$ sudo chown -R $USER:$USER .



### build again, if you changed the code:
$ docker-compose build


### config/database.yml
```
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
  
### You can now boot the app with:

$ docker-compose up
  
### Finally, you need to create the database. In another terminal, run:
$ docker-compose run web rails db:create


### see processes
```bash
# you have 'services' web and db ?
# so you can do: $ docker-compose -f docker-compose.yml run web pwd
# so you can do: $ docker-compose -f docker-compose.yml run db pwd

$ docker-compose -f docker-compose.yml ps
$ docker-compose -f docker-compose.yml run web rails g scaffold user name lastname address phone
$ docker-compose -f docker-compose.yml run web rails db:migrate RAILS_ENV=development
```
### re-run your app
```bash
$ docker-compose up # it will run with the `docker-compose.yml` file
```


### check the environment of our container
```bash
$ docker-compose -f docker-compose.yml run web rails -v                              
Rails 5.0.0.1
$ docker-compose -f docker-compose.yml run web ruby -v 
ruby 2.3.3p222 (2016-11-21 revision 56859) [x86_64-linux]
```





