# gem tutorial

http://guides.rubyonrails.org/v3.2.19/engines.html

- all controllers, views, models, assets, , helpers, routes... are namespace under your gems module, in this case: `MyScheduler`

- this gem will have its own namespace found in `/lib/my_scheduler/engine.rb`

```bash
$ rails plugin new my_scheduler --mountable # create an engine (which is a mountable plugin, hence the option name)
```

# when adding this gem to your rails app:

```ruby
# in your rails app, not this gem:
# in the Gemfile:
gem 'my_scheduler', :path => "/path/to/my_scheduler"
# OR
gem 'my_scheduler', :path => "vendor/engines/my_scheduler"
```
# change gemspec file
```ruby
# add your email and stuff
```

# create your scaffold
```bash
$ rails generate scaffold scheduled_job task_name:string enabled:boolean interval:string run_at:string status:string started_at:datetime

$ rake db:migrate # at the root of your new gem!

$ cd test/dummy/ # this is your gem host APP
$ rails server
# http://localhost:3000/my_scheduler/scheduled_jobs # this is in the dummy app, of the gem
```

# if you want the scaffold css (optional)
```html
<!-- app/views/layouts/my_scheduler/application.html.erb -->

<%= stylesheet_link_tag "scaffold" %>
```

# how to use the console:
```bash
# go to the dummy app of the gem:
$ cd test/dummy/ # this is your gem host APP
$ rails console
$ MyScheduler::ScheduledJob # remember that your gem stuff is namespaced
$ ScheduledJob # this will not work
```
# add a root path to your gem:
```ruby
root :to => "scheduled_jobs#index"
# http://localhost:3002/my_scheduler/  # of course, still in the dummy app
```

# mount/atach you gem to a real rails App, like MyApp
```ruby
# in myapp config/routes.rb file:
mount MyScheduler::Engine, :at => "scheduled_jobs"  
# Devise gem does this! it provides the 'devise_for' method! cool!
# then in myApp you can go to http://localhost:3000/scheduled_jobs
# I imagine it will go to the gem's root path...
```

# now you need to copy your new gem's migrations to the HOST APP:
```bash
# in the host app, run:
$ rake my_scheduler:install:migrations
# This command, when run for the first time will *COPY* over all the migrations from the engine, that is in the host app's gemfile

# the tables are also namespaced with 'my_scheduler_' : --> my_scheduler_scheduled_jobs

# now from the host app:
$ rake db:migrate
```

# in your gem, you have access to resources from the host app
```ruby
# I can do '<%= User.count %>' in the gem's view... it works

# remember that User.count will be the HOST app User.count
# for your gem's rescource, you need to namespace it: MyScheduler::User

# but I dont have access to the HOST APP's application controller from the gem
```

---


# links between host app and gem:
```html
# NOT SURE ABOUT THIS, I NEVER TRIED IT:

<%= link_to "Blog posts", blorgh.posts_path %>
<%= link_to "Home", main_app.root_path %>
```


# how to add gems to your gem

```ruby
# in the gemspec file:

s.add_dependency "awesome_print" # you need to restart your console to use it! in the dummy app
```
