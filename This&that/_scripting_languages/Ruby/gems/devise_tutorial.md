# Devise tutorial

```bash
$ mkdir devise_app
$ cd devise_app
$ rails _3.2.13_ new socialize
$ cd socialize
$ bundle
$ rails g scaffold user first_name last_name
$ rake db:migrate

# delete: public/index.html
# routes:     root :to => 'users#index'
```

## now add devise:

```bash
# gem 'devise' # to Gemfile

$ rails generate devise:install

# read the instructions:
  # in development.rb
  config.action_mailer.raise_delivery_errors = false # it was true
  config.action_mailer.default_url_options = { host: 'localhost:3000' }

# add flash logic to layout/application.html.erb

$ rails generate devise User

$ rake db:migrate

$ rails generate devise:views
```

# controllers
```ruby
# use before_filter in all controllers you want authentication
class UsersController < ApplicationController
before_filter :authenticate_user!
  # crud actions
end
```

# NOTES

- locale is in: config/locales/devise.en.yml

```bash
$ rails generate devise:views
# add everything in 'app/views/devise/...'


$ rake routes | grep devise
```

- devise has a controller corresponding for each of devise's modules in the user.rb

### the `devise_for` method
```ruby
# path_names: configure different path names to overwrite defaults `:sign_in`, `:sign_out`, `:sign_up`, `:password`, `:confirmation`, `:unlock`.


  devise_for :users, path_names: {
    sign_in: 'login', sign_out: 'logout',
    password: 'secret', confirmation: 'verification',
    registration: 'register', edit: 'edit/profile'
  }

# controllers: the controller which should be used. All routes by default points to Devise controllers.
# However, if you want them to point to custom controller, you should do:

devise_for :users, controllers: { sessions: "users/sessions" }
```

### add devise controllers to your app

```bash
 $ bash <(curl -s https://raw.githubusercontent.com/foohey/cdc/master/cdc.sh)
   # it will ask you where to scope it under, example: app/controllers/users/foo_controller.rb
   # ask which modules you want

# you can choose wich controller to use with devise
  # inform devise in the reoutes:
     devise_for :users, controllers: { sessions: "users/sessions" }
  # then that controller needs to inherit from its corresponding devise controller
```







# extra stuff

```
Brians-MacBook-Air:socialize brianspinos777$ rails generate devise:install
create  config/initializers/devise.rb
create  config/locales/devise.en.yml
===============================================================================

Some setup you must do manually if you haven't yet:

1. Ensure you have defined default url options in your environments files. Here
is an example of default_url_options appropriate for a development environment
in config/environments/development.rb:

config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

In production, :host should be set to the actual host of your application.

2. Ensure you have defined root_url to *something* in your config/routes.rb.
For example:

root to: "home#index"

3. Ensure you have flash messages in app/views/layouts/application.html.erb.
For example:

<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>

4. If you are deploying on Heroku with Rails 3.2 only, you may want to set:

config.assets.initialize_on_precompile = false

On config/application.rb forcing your application to not access the DB
or load models when precompiling your assets.

5. You can copy Devise views (for customization) to your app by running:

rails g devise:views

===============================================================================
```


# flash logic:
```html
<!-- app/views/layouts/application.html.erb  -->
<!DOCTYPE html>
<html>
<head>
<title>Socialize</title>
<%= stylesheet_link_tag    "application", :media => "all" %>
<%= javascript_include_tag "application" %>
<%= csrf_meta_tags %>
</head>
<body>
<div id="user_nav">
<% if user_signed_in? %>
Logged in as <strong><%= current_user.email %></strong>.
<%= link_to 'Edit profile', edit_user_registration_path %> |
<%= link_to "Logout", destroy_user_session_path, method: :delete %>
<% else %>
<%= link_to "Sign up", new_user_registration_path %> |
<%= link_to "Login", new_user_session_path %>
<% end %>
</div>

<% flash.each do |name, msg| %>
<%= content_tag :div, msg, id: "flash_#{name}" %>
<% end %>

<%= yield %>

</body>
</html>



```
