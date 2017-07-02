Ruby Fundamentals
=================

### 10,000 ft View ###

Focused on helping developers be productive and happy.

- Thoroughly object oriented
- Dynamic typing and duck typing (polymorphism w/o inheritance)
- Multi paradigm
- Reflection
- Metaprogramming
- Bytecode interpreted

### Installers ###

In addition to the [official installers](https://www.ruby-lang.org/en/):

Windows: http://rubyinstallers.org

Mac/Linux: http://rvm.io

### IRB ###

```
> irb
```

Executes arbitrary Ruby code. Use the up/down arrows to go through history. The result of the last evaluated expression is stored in the underscore (_).

## Variables, Methods and Scope ##

Variables can be created as they are needed and do not require any special declaration syntax. The can be assigned values of different types during the program execution.

```ruby
count = 10
puts count.class

count = "abc"
puts count.class

put count.public_methods
```

The `nil` value is similar to `null` in other languages, and can be tested for using the `.nil?` method.

```ruby
count = nil
puts count.nil?
```

The question mark isn't special syntax, it's part of the method name. In Ruby, methods can end in question marks and exclamation points. Question marks are used for methods that return true/false values, and exclamation points are used when methods do something dangerous or unexpected - such as modifying a variable in place instead of returning a new variable.

```ruby
value = " abc "
puts value.strip
puts value

puts value.strip!
puts value
```

You usually only create exclamation point methods when a safe one already exists.

Method definitions start with the keyword `def` - followed by a method name and optional parameters - and end with the keyword `end`. While methods are typically indented, whitespace doesn't matter (unless it's inside of a string).

```ruby
def double(val)
	val * 2
end
```

Methods return the result of the last evaluated expression, so there is no need for explicit `return` statements. Like Perl and JavaScript, not only can methods can return a value at any time, but they can return values of different types.

The parameters to a method call do not need to be surrounded by parentheses unless you are providing a list of values. These are equivalent expressions:

```ruby
double("abc")
double "abc"
```

> Some methods are used more like keywords in Ruby, such as `puts`.

Methods provide scope. Global variables are prefixed with a dollar sign ($).

## Flow Control, Operators, Comments ##

