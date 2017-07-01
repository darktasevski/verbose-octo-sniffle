# Rails

###### New app
```bash
rails _3.2.13_ new myApp # specify a different rails version
rails new myApp --database=postgresql
rails new myApp -d mysql


# for VPNs
# XXX.XXX.XX.XX is for the IP
$ rails s -b XXX.XXX.XX.XX -p 3000 
```


###### Decorators
```
Decorators are classes that wrap an activeRecord instance, and provide more methods to be used in the view
```

###### Concers
```
Concerns are classes that wrap sharable code between controllers, or between models
```

###### cookies & sessions
```ruby
# in a controller

# https://www.theodinproject.com/courses/ruby-on-rails/lessons/sessions-cookies-and-authentication

#
# The full 'session' hash will be encrypted and added as a value to the cookie '_MyAppNameHere_session'.
#
session[:name] = "brian"                  # cookie: "_MyAppNameHere_session" content: an encrypted ruby hash?
session[:age] = 28                        # cookie: "_MyAppNameHere_session" content: an encrypted ruby hash?
session[:address] = "123 foobar st"       # cookie: "_MyAppNameHere_session" content: an encrypted ruby hash?
# session[:name] = nil # to remove it

#
# Unlike 'session', each call to cookies[:some_key] will create a new cookie
#
cookies[:brian_cookie] = "bar" # cookie: "brian_cookie", content: bar
# cookies[:brian_cookie] = nil # to remove it

```

###### Tasks
```bash
rails db:migrate RAILS_ENV=test
```

###### Generators
```bash
rails g model ChatRoom title:string user:references

#
# Add user_name to users table and also add an index on that column
#
rails g migration AddUserNameToUsers user_name:string:index

rails g migration RemoveUserNameFromUsers user_name:string  # string, decimal, references, text
```

###### Controllers
```ruby
# make this method available to the view.
helper_method :some_method_in_the_controller
```

```ruby
# flash.keep

def index
    # Will persist all flash values.
    flash.keep
 
    # You can also use a key to keep only some kind of value.
    # flash.keep(:notice)
    redirect_to users_url
end
```

###### routes
```
users     GET    /users(.:format)                                  users#index
          POST   /users(.:format)                                  users#create
new_user  GET    /users/new(.:format)                              users#new
edit_user GET    /users/:id/edit(.:format)                         users#edit
user      GET    /users/:id(.:format)                              users#show
          PATCH  /users/:id(.:format)                              users#update
          PUT    /users/:id(.:format)                              users#update
          DELETE /users/:id(.:format)                              users#destroy
*_path
*_url

users_url # => http://localhost:3000/users
users_path  # => /users
```

```ruby
# routes.rb
resources :messages do
  collection do
    get 'oldest1'  # oldest1_messages_path
    post 'latest1'  # latest1_messages_path
  end

  member do
    get 'oldest2'  # oldest2_message_path
    post 'latest2'  # latest2_message_path
  end
end


#           Prefix Verb   URI Pattern                     Controller#Action
# oldest1_messages GET    /messages/oldest1(.:format)     messages#oldest1
# latest1_messages POST   /messages/latest1(.:format)     messages#latest1
#  oldest2_message GET    /messages/:id/oldest2(.:format) messages#oldest2
#  latest2_message POST   /messages/:id/latest2(.:format) messages#latest2
```

###### ActiveRecord
```
user.friend_ids # get friend ids
```

```
class User < ApplicationRecord
    self.table_name = "dudes"
    self.primary_key = 'dude_pk'
end
```

```
.joins will just joins the tables and brings selected fields in return. if you call associations on joins query result, it will fire database queries again

:includes will eager load the included associations and add them in memory. :includes loads all the included tables attributes. If you call associations on include query result, it will not fire any queries
```

###### Forms
```erb
<!-- checkboxes -->
<%= hidden_field_tag "product[categoryids][]", nil %>
<% Category.all.each do |category| %>
    <%= check_box_tag "product[categoryids][]", category.id, @products.category_ids.include?(category.id), id: dom_id(category) %>
    <%= label_tag dom_id(category), category.name %>
<% end %>
```


###### Flash
```ruby
# message will persist to the next action and should be used when redirecting to another action via the ‘redirect_to’ method.
flash[:notice] 

# message will be displayed in the view your are rendering via the ‘render’ method.
flash.now[:notice]

# keeps flash for another request (use when redirecting)
flash.keep # keep all values
flash.keep(:notice) # keep only the :notice value
```

###### Bundler
```bash
# Use `bundle show [gemname]` to see where a bundled gem is installed.
bundle show rspec
#=> /Users/brianspinos777/.rbenv/versions/2.2.3/lib/ruby/gems/2.2.0/gems/rspec-3.5.0
```

###### Ruby
```ruby
# blocks
def manage_user(msg, &block)

    puts msg
    # give the block a variable to work with.
    user = {name: 'brian', age: 28}
    block.call(user)
end

manage_user('Hello!') do |u|
    # Hello!
    puts u[:name].upcase # BRIAN
    puts u[:age] * 100 # 2800
end
```

###### Did you know?
```
files in the 'app' folder are auto-loaded!
```


###### Research
```
cokies.signed['user.id']
cokies.signed['user.expires_at']

env['warden']

session[:user_id] = user.id
session[:user_id] = nil

```
