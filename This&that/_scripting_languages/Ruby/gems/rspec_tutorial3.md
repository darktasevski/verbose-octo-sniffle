# RSPEC matchers:

```ruby
zombie.name.should == 'Ash'
zombie.alive.should == false
zombie.alive.should be_false
zombie.rotting.should == true
zombie.alive.should be_true
zombie.height.should > 5
zombie.height.should be < 1
zombie.height.should >= 5
zombie.height.should_not == 5
zombie.hungry?.should == true
zombie.hungry?.should be_true
zombie.should be_hungry   #  be_<your-method>
tweet.status.length.should be <= 140
```

# more matchers:
```ruby
zombie.name.should match(/Ash Clone \d/)

describe Zombie do
  it 'include tweets' do
  tweet1 = Tweet.new(status: 'lalala')
  tweet2 = Tweet.new(status: 'foooobar')
  zombie = Zombie.new(name: 'Ash', tweets: [tweet1, tweet2])
  zombie.tweets.should include(tweet1)
  zombie.tweets.should include(tweet2)
  end
end

describe Zombie do
  it 'starts with two weapons' do
  zombie = Zombie.new(name: 'Ash')
  #zombie.weapons.count.should == 2  
  zombie.should have(2).weapons # better way!!!
  end
end


# have(4)
# have_at_least(5)
# have_at_most(6)


```
# matchers: "change"
```ruby
describe Zombie do
  it 'changes the number of Zombies' do
  zombie = Zombie.new(name: 'Ash')
  expect {zombie.save }.to change { Zombie.count }.by(1)
  end
end


# by(2)
# from(3)
# to(4)
# .from(1).to(5)
```

# test if method raises specific exception:
```ruby
describe Zombie do
  it 'raises an error if saved without a name' do
  zombie = Zombie.new
  expect { zombie.save! }.to raise_error(
    ActiveRecord::RecordInvalid
  )
  end
end


  # to
  # not_to
  # to_not
```
# more matchres:
```ruby
  respond_to(<method_name>)
  be_within(<range>).of(<expected>)
  exist
  satisfy { <block> }
  be_kind_of(<class>)
  be_an_instance_of(<class>)

  # examples of the above:
  @zombie.should respond_to(hungry?)
  @zombie.should be_within(0.1).of(33.3)
  @zombie.should exist
  @zombie.should satisfy {|zombie| zombie.hungry?} # should be true to pass...

  @hungry_zombie.should be_kind_of(Zombie) # HungryZombie < Zombie

  @status.should be_an_instance_of(String)

```
