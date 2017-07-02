# Capybara with Selenium

[Documentation](https://github.com/teamcapybara/capybara)

```ruby
# Gemfile

group :development, :test do
  gem "capybara"
  gem 'selenium-webdriver'
end
```


```ruby
# rails_helper.rb

require 'capybara/rspec' # or require 'capybara/rails' ?

RSpec.configure do |config|

  Capybara.register_driver :selenium do |app|
    Capybara::Selenium::Driver.new(
      app,
      browser: :firefox,
      desired_capabilities: Selenium::WebDriver::Remote::Capabilities.firefox(marionette: false)
    )
  end

end

```



```ruby
# myApp/spec/requests/users_spec.rb

# test example

RSpec.describe "home page", :type => :request do

    before(:all) do
        Capybara.current_driver = :selenium
    end

    after(:all) do
        Capybara.use_default_driver
    end

  it "displays validation errors", js: true do
    user = FactoryGirl.create(:user, :name => "jdoe", :email => "secret")
    visit "/users/new"
    fill_in "Name", :with => ""
    fill_in "Email", :with => "brian@example.com"
    fill_in "Address", :with => "123 foobar st"
    click_button "Create User"
    expect(page).to have_selector("#error_explanation", text: "Name can't be blank")
  end
end

```
