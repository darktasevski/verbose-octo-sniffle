# cucumber

[Documentation](https://github.com/cucumber/cucumber-rails)

[Blog](https://semaphoreci.com/community/tutorials/introduction-to-writing-acceptance-tests-with-cucumber)



```
You need Firefox 4 to be installed
```


```ruby
# Gemfile
group :test do
  # we need the :require => false, so rails does snot complain
  gem 'cucumber-rails', :require => false
  
  # we need this for javascript testing
  # and it needs to be version 2.53.4
  gem 'selenium-webdriver', '2.53.4' 
end
```



```ruby
# rails_helper.rb

# require 'capybara/cucumber' # I am not sure we need this, It breaks factory girl

# `require 'capybara/cucumber'` raises this exception, when used with rspec?: 
# bundler: failed to load command: rspec (/Users/brianspinos777/.rbenv/versions/2.2.3/bin/rspec)
# NoMethodError: undefined method `World' for main:Object

```


```bash
#     create  config/cucumber.yml
#     create  script/cucumber
#      chmod  script/cucumber
#     create  features/step_definitions
#     create  features/step_definitions/.gitkeep
#     create  features/support
#     create  features/support/env.rb
#      exist  lib/tasks
#     create  lib/tasks/cucumber.rake
#       gsub  config/database.yml
#       gsub  config/database.yml
#      force  config/database.yml
rails generate cucumber:install
```



###### Step definitions
```ruby
# myApp/features/step_definitions/my_steps.rb

Given /^I have users named (.+)$/ do |names|
  names.split(', ').each do |name|
    User.create!(name: name)
  end
end

Given /^I have no users$/ do
  User.delete_all
end

Then /^I should have ([0-9]+) users?$/ do |count|
  User.count.should == count.to_i
end


#---------- By Brian

When(/^I go to the list of users$/) do
  visit users_path
end



Then(/^I should see "([^"]*)"$/) do |arg1|
  # page.html.should =~ /#{arg1}/
  expect(page).to have_content(arg1)
end

# Given(/^I am on the "([^"]*)"$/) do |arg1|
#   visit path_to arg1
# end

Given(/^I am on the list of new users$/) do
  visit new_user_path
end

When(/^I follow "([^"]*)"$/) do |arg1|
  path_to arg1
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |arg1, arg2|
  # puts page.body # for debugging!
  fill_in arg1, with: arg2
end

When(/^I press "([^"]*)"$/) do |arg1|
  click_button arg1
end
```



###### Support
```ruby
# myApp/features/support/my_support.rb

module MyModule
def path_to(page_name)
  case page_name

  when /the homepage/
    root_path
  when /the list of users/
    users_path

  when /the list of new users/
    users_path

  when /New User/
    new_user_path

  # Add more page name => path mappings here

  else
    raise "Can't find mapping from \"#{page_name}\" to a path."
  end
end
end


# https://github.com/cucumber/cucumber/wiki/A-Whole-New-World
World(MyModule)


```



###### The actual test
```gherkin
# myApp/features/my_test.feature

Feature: Manage Users
  In order to make a blog
  As an author
  I want to create and manage users

  Scenario: Users List
    Given I have users named Brian, Erich
    When I go to the list of users
    Then I should see "Brian"
    And I should see "Erich"

  # use this on top of the feature key-word if you need
  # to open the browser and test javascript
  @javascript
  Scenario: create user
    Given I am on the list of new users
    When I fill in "Name" with "Dude"
    And I fill in "Email" with "dude@example.com"
    And I fill in "Address" with "345 Foobar St"
    And I press "Create User"
    Then I should see "User was successfully created."
    And I should see "Dude"
    And I should see "dude@example.com"
    And I should see "345 Foobar St"
    And I should have 1 user    
```



```bash
# run cucumber tests:

# The -s option is to hide the steps definition location
# use bundle exec, or else it could raise some errors
bundle exec cucumber -s

```

