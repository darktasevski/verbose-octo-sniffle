# polymorphic associations




```bash
$ rails g model Picture
```

```bash
$ rails g migration create_pictures
```
```ruby
class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string  :name
      t.integer :imageable_id
      t.string  :imageable_type
      t.timestamps
    end
  end
end
```


```bash
$ rake db:migrate
```

# Models

```ruby
class Picture < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true
end

class User < ActiveRecord::Base
  has_many :pictures, as: :imageable
end

class Employee < ActiveRecord::Base
  has_many :pictures, as: :imageable
end

class Product < ActiveRecord::Base
  has_many :pictures, as: :imageable
end
```


```ruby
@user.pictures
@employee.pictures
@product.pictures
@picture.imageable
```


# Now nested polymorphic associations
```javascript
//users.js.coffee

jQuery ->
  $('form').on 'click', '.remove_fields', (event) ->
    $(this).prev('input[type=hidden]').val('1')
    $(this).closest('fieldset').hide()
    event.preventDefault()

  $('form').on 'click', '.add_fields', (event) ->
    time = new Date().getTime()
    regexp = new RegExp($(this).data('id'), 'g')
    $(this).before($(this).data('fields').replace(regexp, time))
    event.preventDefault()

```

```ruby
#application helper

module ApplicationHelper
  def link_to_add_fields(name, f, association)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + "_fields", f: builder)
    end
    link_to(name, '#', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
  end
end
```

```ruby
class User < ActiveRecord::Base
  attr_accessible :user_stuff, :pictures_attributes
  has_many :pictures, as: :imageable
  accepts_nested_attributes_for :pictures, allow_destroy: true
end
```

```html
  <!-- pictures, use this -->
  <h1>PICTURES</h1><hr>
  <%= f.fields_for :pictures do |builder| %>
    <%= render 'picture_fields', f: builder %>
  <% end %>
  <%= link_to_add_fields "Add picture", f, :pictures %>
  <hr>
```

```ruby
class Picture < ActiveRecord::Base
  attr_accessible :picture_stuff, :imageable_id, :imageable_type  # use this, add attrs from Picture
  belongs_to :imageable, polymorphic: true
end
```


```ruby
# partial: _picture_fields.html.erb

<fieldset>
  <%= f.label :name, "Picture name" %>
  <%= f.text_field :name %>
  <%= f.hidden_field :_destroy %>
  <%= link_to "remove", '#', class: "remove_fields" %>
</fieldset>

```
