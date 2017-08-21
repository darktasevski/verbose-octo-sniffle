# rspec_tutorial2.md







capybara

https://github.com/jnicklas/capybara

sign in user:
http://stackoverflow.com/questions/8996246/rspec-integration-test-with-devise-throws-nomethoderror-error




# RSpec
- key words: testing test specifications spec examples tdd bdd  rspec



- tests are called specs, or specifications

- `.should` , your assertion is called an "expectation"

- the actual `.should`, and `.should_not` are called __modifier__, followed by a matcher (`<`, `>`, `<=`, `>=`, `==`)

# other matchers are:

```ruby
zombie.should have(1).tweets


be_false
be_true
be <
match(/your-regex-here/)
include(element_of_an_array_brian)
have(777).weapons
have_at_least(777).weapons
have_at_most(777).weapons

# the "change" matcher:
expect { zombie.save }.to change { Zombie.count}.by(1)
expect { zombie.save }.to change { Zombie.count}.from(1)
expect { zombie.save }.to change { Zombie.count}.from(1).to(5) # you can chain them
expect { zombie.save }.to change { Zombie.count}.to(1)
expect {zombie.make_decision!}.to raise_error(Zombie::NotSmartEnoughError)

expect {<object>.<some method>}.to raise_error(<some error>)

# …and many more matchers...
```


```ruby
zombie.hungry?.should be_true    -->  zombie.should be_hungry
```



```ruby
# now I need to create the file?
touch spec/models/zombie_spec.rb

```



# creating the class in a ruby project
```ruby
# spec/lib/zombie_spec.rb   <---- <name_of_spec>_spec.rb
require "spec_helper"
require "zombie"   <---- if its a ruby project
describe "A Zombie" do
  # your examples (tests) go here
end
```


### to run all tests within the `/spec` folder:
```bash
$ rspec

# to run a specific directory:
$ rspec spec/models/


# running a specific test:
$ rspec spec/models/zombie_spec.rb

# running a specific test and a line number!!!:
$ rspec spec/models/zombie_spec.rb:4

# for ruby project???
$ rspec spec/lib/zombie_spec.rb

```



# model spec for rails:
```ruby
require 'spec_helper'
describe Zombie do
  it 'is invalid without a name' do
    zombie = Zombie.new
    zombie.should_not be_valid
  end
end
```

# simple example:

```ruby
require 'spec_helper'

describe Tweet do
it 'can set status'
tweet = Tweet.new(status: "nom nom nom")
tweet.status.should == "nom nom nom"
end

```


#in the spec folder create:
- a folder named: `models`
- a folder named: `controllers`
- a folder named: `requests`
- a folder named: `features` for capybara
- a folder named: `views`
- a folder named: `routing`
- a folder named: `helpers`
- a folder named: `support`  __* check codeschool spec video 4 @ 2:00__

> for the models and controllers files in those folders, use the same name of the files but with `_spec.rb` at the end!

# examples:
```ruby
# spec/controllers/apps_controller_spec.rb
require "spec_helper"

describe AppsController do

  describe "the GET index" do
    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
    end
  end

  describe "the templete/view stuff" do
    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end
end
```

# spec/models/app_spec.rb
```ruby
require 'spec_helper'

describe App do
  it 'is invalid without a name' do
    app = App.new   # you can instantiate models in the test!!!
    app.should_not respond_to(:name)
  end
  it { should respond_to(:name) }  # RSPEC is smart enough to output nice messages with this
  it { should respond_to(:status) }  
  it { should respond_to(:error) }  
  it { should respond_to(:done) }  
  it { should respond_to(:run) }  
  it { should respond_to(:command_output) }  
  it { should respond_to(:date) }  
  it { should respond_to(:custom_command) }  
end
```

# run the tests:
```
$ rspec # test everything!!!
$ rspec spec/<folder-to-test>
$ rspec spec/controllers
$ rspec spec/models

# if it fails use “bundle exec rspec”
```

# rails g rspec:model
- you can generate tests for:

```
- scaffold
- model
- controller
- helper
- view
- mailer
- observer
- integration

so…

$ rails g rspec:<any-of-the-above>
```

# "describe" and "context"

- are similar, its just for organizing the output text in the console










# # # # # # # # # # # # # # # # # # # # # # # # # #

> speficication: it means "a TEST"


# where the test files live:
```ruby
# spec/*/zombie_spec.rb
# inside the file, write this:

require "spec_helper"

describe "A Zombie" do   # its how we want it to behave
  # your tests (they are called examples...) go here
end


```


# describe "it"
```ruby
# examples of tests, they are called "EXAMPLES"

# spec/*/zombie_spec.rb
# inside the file, write this:

require "spec_helper"

describe "A Zombie" do   # its how we want it to behave
  # your tests (they are called examples...) go here
  it "is named Ash"
end
```



# running the test:
```
$ rspec spec/*/zombie_spec.rb
```



# describe class
```ruby
#lib/zombie.rb

class Zombie

end
```

```ruby
# spec/*/zombie_spec.rb
# inside the file, write this:

require "spec_helper"
require "zombie"

describe Zombie do   # its how we want it to behave
  # your tests (they are called examples...) go here
  it "is named Ash"
end

```

# an expectation
```ruby
#lib/zombie.rb
class Zombie
attr_accessor :name

def initialize
@name 'Ash'
end

end
```

```ruby
# spec/lib/zombie_spec.rb
# inside the file, write this:

require "spec_helper"
require "zombie"

describe Zombie do   # its how we want it to behave
# your tests (they are called examples...) go here
it "is named Ash" do                                    # its called an EXPECTATION
zombie = Zombie.new
zombie.name.should == 'Ash'
end
end
```


# another expectation
```ruby
#lib/zombie.rb
class Zombie
attr_accessor :name, :brains                 # write the test first, to fail, then make it work

def initialize
@name 'Ash'
@brains = 0
end

end
```

```ruby
# spec/lib/zombie_spec.rb
# inside the file, write this:

require "spec_helper"
require "zombie"

describe Zombie do   # its how we want it to behave
# your tests (they are called examples...) go here
it "is named Ash" do                                    # its called an EXPECTATION
zombie = Zombie.new
zombie.name.should == 'Ash'

it "has no brains" do
zombie = Zombie.new
zombie.brains.should < 1        # "<" is the "MATCHER"   # "should" is the "MODIFIER"
end

end
end
```
























# run tests:
```
$ rspec  # it runs all the '_spec.rb' files within /spec

$ rspec spec/models/   # running a specific directory

$ rspec spec/models/zombie_spec.rb   # running a specific test

$ rspec spec/models/zombie_spec.rb:4   # running a specific line in the file, it finds the closest...
```
# testing a model:
```ruby
# app/models/zombie.rb
class Zombie < ActiveRecord::Base
validates :name, presence: true
end




# spec/models/zombie_spec.rb
require 'spec_helper'
describe Zombie do
it 'is invalid without a name' do
zombie = Zombie.new
zombie.should_not be_valid
end
end



$ rspec spec/models/zombie_spec.rb
```



























# D.R.Y.
```ruby
# spec/models/zombie_spec.rb
describe Zombie do
it 'responds to name' do
zombie = Zombie.new
zombie.should respond_to(:name)
end
end

# the code above can be refactored like the below:

# spec/models/zombie_spec.rb
describe Zombie do
it 'responds to name' do
subject.should respond_to(:name) # subject = Zombie.new
end
end

# the code above can be refactored like the below:

# spec/models/zombie_spec.rb
describe Zombie do
it 'responds to name' do
should respond_to(:name)
end
end

# the code above can be refactored like the below:


# spec/models/zombie_spec.rb
describe Zombie do
it { should respond_to(:name) }  # RSPEC is smart enough to output nice messages with this
end

```




# "its"

```ruby
# spec/lib/zombie_spec.rb

describe Zombie do
it { subject.name.should == 'Ash' }  
end

# the code above can be refactored like the below:


# spec/lib/zombie_spec.rb

describe Zombie do
its(:name) { should == 'Ash' }  
end

```



# "its"

```ruby
# spec/lib/zombie_spec.rb

describe Zombie do
its(:name) { should == 'Ash' }  
its(:weapons) { should include(weapon) }  # where is the weapon variable ?????
its(:brain) { should be_nil }  
its('tweets.size') { should == 2 }  
end

```





# nesting examples:

```ruby
# spec/models/zombie_spec.rb

describe Zombie do
it 'craves brains when hungry'
it 'with a veggie preference still craves brains when hungry'
it 'with a veggie preference prefers vegan brains when hungry'
end

# the code above can be refactored like the below:


# spec/models/zombie_spec.rb

describe Zombie do
it 'craves brains when hungry'
describe 'with a veggie preference' do
it 'still craves brains when hungry'
it 'prefers vegan brains when hungry'
end
end

# the code above can be refactored like the below:


# spec/models/zombie_spec.rb

describe Zombie do
describe 'when hungry' do
it 'craves brains'
describe 'with a veggie preference' do
it 'still craves brains'
it 'prefers vegan brains'
end
end
end

# the code above can be refactored like the below:


# spec/models/zombie_spec.rb

describe Zombie do
context 'when hungry' do
it 'craves brains'
context 'with a veggie preference' do
it 'still craves brains'
it 'prefers vegan brains'
end
end
end

```

























# Rspec gotchas

https://relishapp.com/rspec/rspec-rails/docs/transactions

> key words: caveats caveat gotcha test all each before after database persist

- in the `before(:all)` block, the data or model persists in the test database
- you should use `after(:all)` block deleting the data or model
example:

```ruby
after(:all) do
@user.destroy    # use @variables between blocks!!!
end
```




























# login user capybara

```ruby
# spec_helper.rb
# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
require 'capybara/rspec'
require 'capybara/rails' # Brian added this recently (on january 6 12:29 pm)
include Devise::TestHelpers

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
# ## Mock Framework
#
# If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
#
# config.mock_with :mocha
# config.mock_with :flexmock
# config.mock_with :rr

# Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
#config.fixture_path = "#{::Rails.root}/spec/fixtures"

# If you're not using ActiveRecord, or you'd prefer not to run each of your
# examples within a transaction, remove the following line or assign false
# instead of true.
config.use_transactional_fixtures = true

# If true, the base class of anonymous controllers will be inferred
# automatically. This will be the default behavior in future versions of
# rspec-rails.
config.infer_base_class_for_anonymous_controllers = false

# Run specs in random order to surface order dependencies. If you find an
# order dependency and want to debug it, you can fix the order by providing
# the seed, which is printed after each run.
#     --seed 1234
config.order = "random"
config.include Warden::Test::Helpers, :type => :feature  # I need this for devise login
config.include ApplicationHelper
config.include FactoryGirl::Syntax::Methods
end
```





























> gems `turn` `rspec-rails` `capybara` `guard-rspec` `growl_notify`

```
rails g rspec:install

$ guard init rspec

$ guard

gem install rb-fsevent

rails g integration_test tasks

guard
```
