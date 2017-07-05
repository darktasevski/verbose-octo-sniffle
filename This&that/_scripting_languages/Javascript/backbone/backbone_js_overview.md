# backbone overview:

# Model

```
Model class
  urlRoot: ''
  defaults: {}
  


```

```
Model instance
  {attr:value, ...}

x.get('attr')
x.set({attr: value})
x.save()
x.url = '/url'
x.fetch()
x.destroy()
x.toJSON()


```

# View

```
View class
  initialize: function
    event listeners
  tagName: ''
  id: ''
  className: ''
  events: {'event', 'function'}
  event handlers
  render: function
  template: _.template(...)  

```

```
View instance
  model: model_instance

x.render()
x.$el.html()  

```








# collections

```
Collection class
  initialize: function
    event listeners
  event handlers
  model: MODEL_CLASS
  url: '/url'  
  

```


```
Collection instance
  x.length
  x.add(model_instance1)
  x.at(index)
  x.get(id)
  x.remove(model_instance1)

  x.reset(array_of_model_instances)

  x.forEach(function(model_instance){})
  x.map(function(model_instance){})
  x.filter(function(model_instance){})
  // more functions by the undescore library!

```


# Collection view

- just a view instance
- we pass to it a collection instance

```
View class
  initialize: function
    event listeners
  event handlers
  render: function

```


```
View instance
  collection: collection_instance

x.render()
console.log(x.el)

x.add(model_instance)

```



# events

- defined in Model class, model instance, Collection class

```
model_instance.on('event', function)

model_instance.trigger('event')

model_instance.trigger('event', {silent: true})

model_instance.off('event')


```




# Routers

- it maps URLs to actions

```
Router instance
  routes: {'url/:param': 'action', ... }
  action1: function
  action2: function  


x.navigate('url/url', {trigger: true})
// or links
<a href='#todos/1'>show</a>
```





# how to add a link


```
Model class
  <event-listener>: function


```

```
View class
  template: _.template('')
  events: {'click a': 'event-listener'}
  event-listener: function
    this.model.event-listener
  render: function  

```























