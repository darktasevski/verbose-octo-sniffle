# Ruby blocks
  - remember that `puts` returns `nil`


```ruby
def foo
  yield "brian"
end

foo do |x|
  puts x # "brian"
end
```


```ruby
def foo
  puts "rick"
  yield
  puts "erich"
end

foo do
  puts  "brian" 
end

#=> rick brian erich
```

```ruby
def foo
  x = yield
  puts x
end

foo do
  puts  1 + 1     
end


#=> 2
```

```ruby
def foo
  value = yield 10
  puts value
end

foo do |x|
  x + 1 + 1     
end


#=> 12
```

```ruby
def foo(var2)
  var1 = yield 10
  puts var1 + var2
end

foo(100) do |x|
  x + 2
end

#=> 112
```

