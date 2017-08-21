# FactoryGirl

[documentation](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#configure-your-test-suite)

[factory_girl_rails Github](https://github.com/thoughtbot/factory_girl_rails)


```ruby
# Gemfile
group :development, :test do
  gem 'factory_girl_rails'
end
```


```ruby
# rails_helper.rb

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
```


###### create the folder for the factories

```
myApp/spec/factories/
```

```ruby
# myApp/spec/factories/users.rb (user factory)
FactoryGirl.define do
  factory :user do # This will guess the User class
    name "brian"
    email "brian@example.com"
    address "123 foobar st"
    # add_attribute(:date_of_birth){'10.16.1988'} # another syntax
  end
end
```


```ruby
# in your tests
user = FactoryGirl.create(:user, name: "brian", email: "brian@example.com")
```
