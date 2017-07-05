### run a simple rails app with docker


### Dockerfile
```bash
# start with the basic ruby image
FROM ruby:2.3.3

# install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs


RUN mkdir /myapp
WORKDIR /myapp

# copy over my local files to the container
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock

# install rails with bundler
RUN bundle install

# create a rails app
RUN rails new blog

# change working directory
WORKDIR /myapp/blog

# create a scaffold with rails
RUN rails g scaffold user name address phone age

# migrate the database
RUN rails db:migrate

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
EXPOSE 3000

# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
```

### Gemfile
```ruby
source 'https://rubygems.org'
gem 'rails', '5.0.0.1'
```

### Gemfile.lock (empty)
```

```

### commands
```bash
# create an image, based on the Dockerfile
$ docker build -t my_test_image .

# create a container, based on the image we created
# make sure no other containers are using port 3000
#   - $ docker ps # check the 'PORTS' column, if any container is using port 3000
#   - $ docker stop <CONTAINER_ID_OR_NAME> # stop any containers that are using port 3000
$ docker run --name my_test_container -itP -p 3000:3000 my_test_image # now go to http://localhost:3000/users

# CTRL + P + Q  # to quit the container (without stopping it)

$ docker start  my_test_container  # to restart a previously stopped container (it takes a couple seconds...)
$ docker stop  my_test_container  # to stop a previously running container
```
