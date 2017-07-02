# ActionCable


```bash
rails new ActionCableApp
cd ActionCableApp
rails g scaffold Message user content
rails db:migrate
```


```bash
brew services start redis
# brew services stop redis
```



```ruby
# development.rb
config.action_cable.mount_path = '/websocketier'
```

```erb
<!-- application.html.erb -->
<%= action_cable_meta_tag %>
<%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
```


```coffeescript
# cable.js

#...
App.cable = ActionCable.createConsumer($('meta[name=action-cable-url]').attr('content'));
#...
```


```bash
rails g channel chat
```




```ruby
# chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chat"  # <----------------------
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
```




```ruby
# messages_controller.rb
def create2
  @message = Message.new(message_params)
  if @message.save
    ActionCable.server.broadcast "chat", {
      message: MessagesController.render(
        partial: 'message',
        locals: {message: @message}
      ).squish
    }
  end
end
```


```coffeescript
# chat.coffee
App.chat = App.cable.subscriptions.create "ChatChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $('.messages').prepend(data['message'])
```




```erb
# views/messages/_message.html.erb
<p><%= message.user %> says:</p>
<p><%= message.content %></p>
<hr>
```


```ruby
# routes.rb
resources :messages do
  collection do # collection, member
    # get 'create2'
    post 'create2' # create2_messages_path create2_messages_url
  end
end
```


```erb
<!-- messages/index.html.erb -->
<hr>
<%= form_for(@message, url: create2_messages_path, remote: true) do |f| %>
  <div class="field">
    <%= f.label :user %>
    <%= f.text_field :user %>
  </div>

  <div class="field">
    <%= f.label :content %>
    <%= f.text_field :content %>
  </div>

  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>

<h1>Messages:</h1>
<div class="messages"></div>
```

