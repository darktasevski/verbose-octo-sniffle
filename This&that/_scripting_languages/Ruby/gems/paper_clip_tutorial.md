# Paperclip
https://github.com/thoughtbot/paperclip

# Overview
   - basicaly paperclip adds some fields to your model
    - it should save the file to s3
    - and keep metadata in the fields added to your model
    - it has some methods that you can add to your model:

```ruby
    has_attached_file :avatar, hash_of_options_like_style_and_stuff
    validates_attachment_content_type
    validates_attachment_size
    before_post_process :custom_method1
    before_image_post_process :custom_method2
    # and more
```

# install imagemagick, if you dont have it

```bash
$ brew install imagemagick
$ brew install gs
```
```ruby
# config/initializers/paperclip.rb
# Paperclip configuration
Paperclip.options[:command_path] = '/usr/local/bin'
PAPERCLIP_STORAGE_OPTIONS = { storage: :filesystem }

```



# gemfile
```ruby
gem 'paperclip', '4.2.0'
```

#model
```ruby
class User < ActiveRecord::Base
  attr_accessible :avatar
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
end
```

#migration
```bash
$ rails g migration add_avatar_to_users
```

```ruby
class AddAvatarToUsers < ActiveRecord::Migration
  def self.up
    add_attachment :users, :avatar
  end

  def self.down
    remove_attachment :users, :avatar
  end
end
```

```bash
$ rake db:migrate  
# it will add 4 fields to the model, prefixed with avatar_*

$ User # take a look at the new attributes
...
   :avatar_file_name => :string,
:avatar_content_type => :string,
   :avatar_file_size => :integer,
  :avatar_updated_at => :datetime
...
```

# add to view form (edit and new)
```html
<%= form_for @user, :url => users_path, :html => { :multipart => true } do |form| %>
  <%= form.file_field :avatar %>
<% end %>

<!--     ... OR ...   -->
<%= form_for(@user, :html => { :multipart => true }) do |f| %>
...
<%= f.file_field :avatar %>
...
```

# on the users_controller#create
```ruby
# @user = User.new(params[:user])
@user = User.create( params[:user] )
```

# view helpers
```html
    <%= image_tag @user.avatar.url %>
    <%= image_tag @user.avatar.url(:medium) %>
    <%= image_tag @user.avatar.url(:thumb) %>
```
# other helpers
```ruby
User.last.avatar.url # the URL of s3
User.last.avatar.path # just the s3 path, so you can get that file
```


# Questions

### how to change storage to local?
- go to `paperclip.rb`
