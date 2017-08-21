# Rspec

[Rspec github](https://github.com/rspec/rspec-rails)

[rspec doc?](https://relishapp.com/rspec/rspec-rails/docs)



```ruby
group :development, :test do
  gem 'rspec-rails', '~> 3.5'
end
```

```bash
bundle install
```


```bash
# create  .rspec
# create  spec
# create  spec/spec_helper.rb
# create  spec/rails_helper.rb
rails generate rspec:install


rails db:migrate RAILS_ENV=test

# run tests
bundle exec rspec .
```

```
# .rspec

--color
--format documentation # documentation progress
# --require spec_helper # I guess we dont need this, since its loaded in 'rails_helper'
--require rails_helper

```

```bash
# generate spec/models/widget_spec.rb
# The same generator pattern is available for all specs:
# scaffold
# model
# controller
# helper
# view
# mailer
# observer
# integration
# feature
# job
rails generate rspec:model widget
```




```bash
# Run only model specs
bundle exec rspec spec/models

# Run only specs for AccountsController
bundle exec rspec spec/controllers/accounts_controller_spec.rb

# Run only spec on line 8 of AccountsController
bundle exec rspec spec/controllers/accounts_controller_spec.rb:8
```
