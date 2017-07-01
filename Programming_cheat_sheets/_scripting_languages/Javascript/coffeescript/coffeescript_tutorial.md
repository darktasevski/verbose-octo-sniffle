# coffeescript

```coffee
name = (e) ->
  alert $(@).color   # substitute 'this' for '@'
  # no semi-colons
  # optional parentethis # just on functions like:   getIt()
```








```coffee
 $('.drink li').hover(function() {
   $(this).find('span').show();
 }, function() {
   $(this).find('span').hide();
 });


$('.drink li').hover( 
  ->
    $(@).find('span').show() 
  ->
    $(@).find('span').hide()
)
```


# If statement

```coffee
alert('High Caffeine Level') if caffeineLevel > 5
```

# no ternary operators






# If else statement

```coffee
if caffeineLevel > 5 
  alert('Too High')
else
  alert('OK')
```



# unless statement

```coffee
unless coffeeReady
  alert 'Please wait 5 more minutes.'
```






# chaining
```coffee
if lowLevel < newLevel < highLevel
  alert 'ok'
else
  alert 'abnormal caffeine level'

```

# switch statement
```coffee
message = switch newLevel
  when 1 then 'Out of bed yet?'
  when 2 then 'Good morning!'
  else 'You should stop while you can'
 ```





# check a function

```coffee

if level?
  checkLevel?(level)
else
  resetLevel?()

```

# array

```coffee
[1..10]
```



# objects literals

```coffee
coffee = 
  name: 'Russian' 
  level: 2 
  isRussian: -> true

```




























