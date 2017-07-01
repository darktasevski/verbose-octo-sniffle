### rails 5

```bash
$ rails new blogger

$ cd blogger
```



### rspec

```ruby
group :development, :test do
  gem 'rspec-rails', '~> 3.5'
  gem 'rails-controller-testing'
end
```


```bash
$ bundle install

$ rails generate rspec:install # a dependency for rails 5

$ rails g scaffold user name address age:integer  # it will generate the test files!

$ rails db:migrate

$ bundle exec rspec   

```

```ruby
# in users_controller_spec.rb:
#...

before :each do
    @request.host = 'localhost:3000' # to avoid the host.test
  end

#...

let(:valid_attributes) {
    # skip("Add a hash of attributes valid for your model")
    {name: 'brian', address: '123 foobar st', age: 28}
  }

  let(:invalid_attributes) {
    # skip("Add a hash of attributes invalid for your model")
    {name: '', address: '123 foobar st', age: 28}
  }

  # ...

 context "with valid params" do
      let(:new_attributes) {
        # skip("Add a hash of attributes valid for your model")
        {name: 'brian', address: '123 foo',  age: 28}
      }

      it "updates the requested user" do
        user = User.create! valid_attributes
        put :update, params: {id: user.to_param, user: new_attributes}, session: valid_session
        user.reload
        # skip("Add assertions for updated state")
        expect(assigns(:user)).to eq(user)
      end

#...
```

```ruby
#-----------------------------------------in user.rb

class User < ApplicationRecord
    validates :name, presence: true
end

#----------------------------------------- user_spec.rb NOT users_spec.rb!!!

require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it "orders by last name" do
    user1 = User.create!(name: "Andy", address: "Lindeman")
    user2 = User.create!(name: "David", address: "Chelimsky")

    expect(User.all).to eq([user1, user2])
  end


end

#-----------------------------------------
```

