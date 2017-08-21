# rspec tutorial

https://github.com/jnicklas/capybara # capybara syntax and documentation <---

https://www.relishapp.com/rspec/rspec-rails/docs/upgrade

http://www.opinionatedprogrammer.com/2011/02/capybara-and-selenium-with-rspec-and-rails-3/

### documentation https://github.com/rspec/rspec-rails


# Dont forget the test database


### Installation
```ruby
# Gemfile
group :development, :test do
    gem 'rspec-rails', '~> 3.0'
    gem "capybara"
    gem 'selenium-webdriver', '~> 2.44.0' # you need firefox browser
end

```

```bash
$ bundle
$ rails generate rspec:install

```

# The new version of rspec adds 1 new file: /spec/rails_helper.rb

```ruby
# add this to /spec/rails_helper.rb
#...
config.include Capybara::DSL # so rspec can work with capybara
config.include Capybara::RSpecMatchers
#...
```

# add the features folder to /spec for capybara compliance


- make sure your database.yml is clean, without __TOO MUCH__ ruby comments

```
# you need to migrate the test environment

# $ bundle exec rake db:drop RAILS_ENV=test
$ bundle exec rake db:create RAILS_ENV=test
$ bundle exec rake db:schema:load RAILS_ENV=test
```


### for awesome output, with color and verbose output:
```
# in the .rspec file put:

--color
--format documentation
# it could be —format progress
```



# Example:

```ruby
# /spec/features/signin_spec.rb
require 'rails_helper' # <==============================================
# bundle exec rspec spec/features/signin_spec.rb

describe "the signin process", :type => :feature do
    before :all do
        User.create(email: 'test@test.com', password: 'password123', password_confirmation: 'password123')
    end

    it "signs me in", js: true do
        # visit '/sessions/new'
        visit '/users/sign_in'
        expect(page).to have_content 'Log in'
        fill_in 'Email', :with => 'test@test.com'
        fill_in 'Password', :with => 'password123'
        click_on 'Log in'
        expect(page).to have_content 'Logged in as test@test.com.'
        expect(page).to have_content 'Signed in successfully'
        # Signed out successfully.
        # Signed in successfully. 
    end
end

```





# what you can nest
```
- in describe/context/feature
  - let(:foo) {Foo.new}
  - let!(:foo) {Foo.new}
  - subject(:bar) {Bar.new}
  - it/scenario block
  - describe/context/feature block
  - its(:some_method)...
  - scenario block


- with let(:foo) -> it instanciates the Object (only once of course) when you call the variable -> foo


- "let"s are avaiable in deep describe/context/feature blocks, not in it/scenario blocks

- dont rely on ids, they always increment... even after the test, so set them!!!

- let <-- lazy evaluation, just evaluates when you call it.
- let! <---- is instantiated before every example

# Capybara: "feature" is equivalent to describe/context, and scenario equivalent to it / example.
```


# Tips

 - repeat scenarions,
 - add __IDs__ to factories (so you can delete/update resources, and it will not effect the next scenario!)
 - the `let!` and `let` is encapsulated in the `context`, not in the `it/scenario` block
 - the `let!` and `let` goes directly under the `context`, then use `scenarios`

### Example
```
describe/context/feature
    let!/let # use ids in factories


    describe/context/feature
        let!/let # use ids in factories
        it/scenario
        it/scenario
        it/scenario
        it/scenario
    describe/context/feature
        let!/let # use ids in factories
        it/scenario
        it/scenario
        it/scenario
        it/scenario
    describe/context/feature
        let!/let # use ids in factories
        it/scenario
        it/scenario
        it/scenario
        it/scenario

```


# Code example
```ruby
  let!(:company_settings){ FactoryGirl.create(:company_settings, locations_counter: 0, id: 1) }
  let!(:patient_setting){ FactoryGirl.create(:patient_setting, :name => "", :name_short => "", :related_field => "diagnosis_codes", id: 1) }
  let!(:super_admin){ FactoryGirl.create(:super_admin, first_name: "Brian", last_name: "Spinos", email: "brian_spinos@hotmail.com", id: 1) }
  let!(:sign_in){ sign_in_with super_admin.username, super_admin.password }
```


```ruby
require "spec_helper"
# bundle exec rspec spec/features/foo/bar_spec.rb
# rails server -e test -p 3001 -P tmp/pids/test_server.pid
feature "foobar", port: 3001, js: true do
  let!(:company_settings){ FactoryGirl.create(:company_settings, locations_counter: 0, id: 1) }
  let!(:patient_setting){ FactoryGirl.create(:patient_setting, :name => "", :name_short => "", :related_field => "diagnosis_codes", id: 1) }
  let!(:super_admin){ FactoryGirl.create(:super_admin, first_name: "Brian", last_name: "Spinos", email: "brian_spinos@hotmail.com", id: 1) }
  let!(:sign_in){ sign_in_with super_admin.username, super_admin.password }

  context "with bar-quux" do
    let!(:report) {FactoryGirl.create(:report, id: 1)}
    let!(:patient1) {FactoryGirl.create(:patient, first_name: "patient1", id: 1)}
    let!(:assign_report_fields) {report.report_fields << ReportField.find(9,11,31)} # first and last name, and MR
    let!(:format_date) do # e.g.: format_date(Time.zone.now - 1.week) #=> "08/15/2014"
      def format_date(date)
        date.strftime("%m/%d/%Y")
      end
    end
    scenario "bar" do
      # update report
      start_date = format_date(Time.zone.now - 3.week)
      end_date = format_date(Time.zone.now - 1.week)
      report.update_attributes(custom_start_date: start_date, custom_end_date: end_date)

      visit "/reports/1"
      binding.pry
      page.should have_content "patient1"
      page.should_not have_content "patient2"

    end

  end # of context "with bar-quux"
end # of feature
```
