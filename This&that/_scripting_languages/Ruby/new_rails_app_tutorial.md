# a new rails app   4:21pm - 5:38pm


- use devise
- postgress
- heroku
- git
- awesome_print


# GITHUB
- create produce_manager repo

```bash
$ git remote add origin git@github.com:brianspinos777/produce_manager.git  # origin is the name of the remote

$ git remote -v  # list the remotes

$ git push -u origin master  # the -u is for the next time you will only need to do a `git push`
```





# HEROKU










```bash
$ rails _3.2.13_ new produce_manager

$ cd produce_manager

$ bundle

$ rails g scaffold user first_name last_name

$ rake db:migrate

$ git init

$ git add .

$ git commit "first commit"

$ rbenv local 2.1.5

```


```ruby
# /Gemfile


source 'https://rubygems.org'
ruby '2.1.5'

gem 'rails', '3.2.19'




# unicorn gems # https://devcenter.heroku.com/articles/rails-unicorn
gem 'unicorn'
gem 'rack-timeout'

# gem 'thin'


# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

# gem 'sqlite3'
gem 'pg'
gem 'rails_12factor'


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'
gem 'devise'
#gem 'paperclip', '4.2.0'
gem "cancan"
gem "twitter-bootstrap-rails"
#gem 'rails-i18n', '~> 3.0.0'
gem 'event-calendar', :require => 'event_calendar'
#gem 'aws-sdk', '~> 1.5.7' # file upload to s3
#gem "haml-rails"
gem 'chart-js-rails'

group :development do
  gem "better_errors"
  gem "binding_of_caller" # for REPL in 'better_errors'
  gem 'awesome_print', :require => 'ap' 
  gem 'brakeman', :require => false # check app security, usage: brakeman <app_path>
end

group :development, :test do
  gem 'rspec-rails', '~> 3.0'
  gem "capybara"
  gem 'selenium-webdriver', '~> 2.44.0' # do I need it ?????
  gem 'pry'
  gem 'timecop' # to test stuff in time
end

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'

```



```bash
$ bundle

```





```yaml
# development: postgres
development:
  adapter: postgresql
  database: produce_manager_development
  username: brianspinos777
  host: localhost

  # Warning: The database defined as "test" will be erased and
  # re-generated from your development database when you run "rake".
  # Do not set this db to the same as development or production.
  test:
    adapter: postgresql
    database: produce_manager_test
    username: brianspinos777
    host: localhost

    production:
      adapter: postgresql
      database: produce_manager_production
      username: brianspinos777
      host: localhost


```


```bash

# delete: public/index.html
# routes:     root :to => 'users#index'

$ bundle

$ rake db:create
$ rake db:migrate
$ rails generate devise:install

#  ActiveRecord::Migration.remove_column :table_name, :column_name
```



```ruby
# in development.rb
  config.action_mailer.raise_delivery_errors = false # it was true
  config.action_mailer.default_url_options = { host: 'localhost:3000' }
```


```bash
$ rails generate devise User

$ rake db:migrate

$ rails generate devise:views


# devise locale is in: config/locales/devise.en.yml
```



```ruby
# use before_filter in all controllers you want authentication
class UsersController < ApplicationController
before_filter :authenticate_user!
  # crud actions
end

```

```bash
# add devise controllers
 $ bash <(curl -s https://raw.githubusercontent.com/foohey/cdc/master/cdc.sh)

```

```bash

$ bundle install
$ rails generate bootstrap:install static

```


# cancan

- use `load_and_authorize_resource`

```ruby
class ArticlesController < ApplicationController
  load_and_authorize_resource

  def show
    # @article is already loaded and authorized
  end
end


# ApplicationController:
class ApplicationController < ActionController::Base
  protect_from_forgery

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end
  
end

```


```ruby
# ability.rb


class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    user ||= User.new # guest user (not logged in)
    if user.admin?
      can :manage, :all
    else
      can :read, :all
    end
    #
    # The first argument to `can` is the action you are giving the user 
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. 
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities
  end
end


```




# Roles


```bash
$ rails g model Role name
$ rails g model UserRole role:references user:references

```


```ruby
# role.rb
class Role < ActiveRecord::Base
  has_many :user_roles
  has_many :users, through: :user_roles
  attr_accessible :name
  validates :name, uniqueness: true
end


#user_role.rb
class UserRole < ActiveRecord::Base
  attr_accessible :role_id, :user_id
  belongs_to :user
  belongs_to :role
end
# this is a join table


# user.rb
class User < ActiveRecord::Base

  #---------------------------------------------------------- Devise
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  attr_accessible :first_name, :last_name
  #----------------------------------------------------------

  has_many :user_roles
  has_many :roles, through: :user_roles

  def admin?
  	roles.include? Role.find_by_name "super_admin"
  end
end



# seeds.rb
Role.create(name: "super_admin")

```

```bash
$ rake db:migrate

```









