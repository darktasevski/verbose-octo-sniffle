# Devise

[Devise github](https://github.com/plataformatec/devise)


```bash
rails new DeviseApp
cd DeviseApp
rails g scaffold user name address # dont put email yet, let devise do it
rails db:migrate

export GMAIL_USERNAME="example@gmail.com"
export GMAIL_PASSWORD="some_password_here"
```


```ruby
gem 'devise'
```

```bash
bundle install
rails generate devise:install
```


```
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

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

===============================================================================
```


```ruby
# development.rb
  
  
  # # Don't care if the mailer can't send.
  # config.action_mailer.raise_delivery_errors = false


  #
  # You need to unblock your email:
  #    https://www.google.com/settings/security/lesssecureapps
  #
  # This setting is not available for accounts with 2-Step Verification
  # enabled. Such accounts require an application-specific password for
  # less secure apps access
  #
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.default_url_options = {
    # this could be your IP for production?
    # this is used for links in the email
    # this could also be your domain, like example.com ?
    host:'localhost',

    # this could be port 80 for production?
    # this is used for links in the email
    port: '3000'
  }
  config.action_mailer.perform_deliveries = true
  config.action_mailer.default charset: "utf-8"
  config.action_mailer.smtp_settings = {
      address: "smtp.gmail.com",
      port: 587,
      authentication: :plain,
      user_name: ENV["GMAIL_USERNAME"],
      password: ENV["GMAIL_PASSWORD"],
      enable_starttls_auto: true
      # domain: 'localhost2:3002', # not sure if I need this
  }
```

```ruby
# routes.rb.

devise_for :users, controllers: {
  sessions: 'users/sessions'
}

root to: "users#index"
```



```erb
<!-- application.html.erb -->

    <% if user_signed_in? %>
      Logged in as <strong><%= current_user.email %></strong>.
      <%= link_to 'Edit profile', edit_user_registration_path %> |
      <%= link_to "Logout", destroy_user_session_path, method: :delete %>
    <% else %>
      <%= link_to "Sign up", new_user_registration_path %> |
      <%= link_to "Login", new_user_session_path %>
    <% end %>

```


```ruby
# application_controller.rb
before_action :authenticate_user!
```

```bash
rails generate devise user
rails db:migrate
rails g devise:views
rails generate devise:controllers users
rails s
```



