### rails chat app: (rails 5)

```bash
$ rails new my_chat_app
$ cd my_chat_app 
```


### gems
```ruby
gem 'devise'
gem 'bootstrap', '~> 4.0.0.alpha3'
gem 'redis', '~> 3.2'
```

```bash
$ bundle install

$ rails generate devise:install
$ rails generate devise User
$ rails generate devise:views
$ rails g model Message body:text user:references chat_room:references

$ rails g model ChatRoom title:string user:references
$ rails db:migrate
```




```ruby
#-------------------------- application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
end


#-------------------------- chat_room.rb
class ChatRoom < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy
end


#-------------------------- app/controllers/chat_rooms_controller.rb (create this new file)
class ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all
  end

  def new
    @chat_room = ChatRoom.new
  end

  def show
    @chat_room = ChatRoom.includes(:messages).find_by(id: params[:id])
    @message = Message.new
  end

  def create
    @chat_room = current_user.chat_rooms.build(chat_room_params)
    if @chat_room.save
      flash[:success] = 'Chat room added!'
      redirect_to chat_rooms_path
    else
      render 'new'
    end
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:title)
  end
end


#-------------------------- app/controllers/messages_controller.rb (create this new file)
class MessagesController < ApplicationController
end
```

```erb
#-------------------------- application.html.erb  (add this code) 
    <div id="user_nav">
    <% if user_signed_in? %>
    Logged in as <strong><%= current_user.email %></strong>.
    <%= link_to 'Edit profile', edit_user_registration_path %> |
    <%= link_to "Logout", destroy_user_session_path, method: :delete %>
    <% else %>
    <%= link_to "Sign up", new_user_registration_path %> |
    <%= link_to "Login", new_user_session_path %>
    <% end %>
    </div>

    <% flash.each do |name, msg| %>
    <%= content_tag :div, msg, id: "flash_#{name}" %>
    <% end %>



    <%= yield %> 
```

```coffeescript
#-------------------------- app/assets/javascripts/channels/rooms.coffee (create this new file)

jQuery(document).on 'turbolinks:load', ->
  messages = $('#messages')
  if $('#messages').length > 0
    messages_to_bottom = -> messages.scrollTop(messages.prop("scrollHeight"))

    messages_to_bottom()

    App.global_chat = App.cable.subscriptions.create {
        channel: "ChatRoomsChannel"
        chat_room_id: messages.data('chat-room-id')
      },
      connected: ->
        # Called when the subscription is ready for use on the server

      disconnected: ->
        # Called when the subscription has been terminated by the server

      received: (data) ->
        messages.append data['message']
        messages_to_bottom()

      send_message: (message, chat_room_id) ->
        @perform 'send_message', message: message, chat_room_id: chat_room_id

    $('#new_message').submit (e) ->
      $this = $(this)
      textarea = $this.find('#message_body')
      if $.trim(textarea.val()).length > 1
        App.global_chat.send_message textarea.val(), messages.data('chat-room-id')
        textarea.val('')
      e.preventDefault()
      return false
```

```erb
#-------------------------- app/views/chat_rooms/show.html.erb (create this new file)

<h1><%= @chat_room.title %></h1>

<p>@chat_room.messages <%= @chat_room.messages.count %></p>

<%= form_for @message, url: '#' do |f| %>
  <div class="form-group">
    <%= f.label :body %>
    <%= f.text_area :body, class: 'form-control' %>
    <small class="text-muted">From 2 to 1000 characters</small>
  </div>

  <%= f.submit "Post", class: 'btn btn-primary btn-lg' %>
<% end %>

<div id="messages" data-chat-room-id="<%= @chat_room.id %>">
  <%= render @chat_room.messages %>
</div>

#-------------------------- app/views/chat_rooms/index.html.erb

<h1>Chat rooms</h1>

<p class="lead"><%= link_to 'New chat room', new_chat_room_path, class: 'btn btn-primary' %></p>

<ul>
  <%= render @chat_rooms %>
</ul>

#-------------------------- app/views/chat_rooms/_chat_room.html.erb

<li><%= link_to "Enter #{chat_room.title}", chat_room_path(chat_room) %></li>






#-------------------------- app/views/chat_rooms/new.html.erb

<h1>Add chat room</h1>

<%= form_for @chat_room do |f| %>
  <div class="form-group">
    <%= f.label :title %>
    <%= f.text_field :title, autofocus: true, class: 'form-control' %>
  </div>

  <%= f.submit "Add!", class: 'btn btn-primary' %>
<% end %>





#-------------------------- app/views/messages/_message.html.erb

<div class="card">
  <div class="card-block">
    <div class="row">
      <div class="col-md-1">
        <%= gravatar_for message.user %>
      </div>
      <div class="col-md-11">
        <p class="card-text">
          <span class="text-muted"><%= message.user.name %> at <%= message.timestamp %> says</span><br>
          <%= message.body %>
        </p>
      </div>
    </div>
  </div>
</div>
```



```ruby
#-------------------------- app/channels/chat_rooms_channel.rb
class ChatRoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_rooms_#{params['chat_room_id']}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    current_user.messages.create!(body: data['message'], chat_room_id: data['chat_room_id'])
  end
end

#-------------------------- user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :chat_rooms, dependent: :destroy
  has_many :messages, dependent: :destroy

  def name
    email.split('@')[0]
  end
end



#-------------------------- message.rb
class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room, optional: true

  validates :body, presence: true, length: {minimum: 2, maximum: 1000}


  after_create_commit { MessageBroadcastJob.perform_later(self) }

  def timestamp
    created_at.strftime('%H:%M:%S %d %B %Y')
  end

end


#-------------------------- app/jobs/message_broadcast_job.rb
class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "chat_rooms_#{message.chat_room.id}_channel",
                                 message: render_message(message)
  end

  private

  def render_message(message)
    MessagesController.render partial: 'messages/message', locals: {message: message}
  end
end

#-------------------------- application_helper.rb
module ApplicationHelper
  def gravatar_for(user, opts = {})
    opts[:alt] = user.name
    image_tag "https://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(user.email)}?s=#{opts.delete(:size) { 40 }}",
              opts
  end
end
```


```css

#-------------------------- application.css (append contents) -> rename to application.css.scss

@import "bootstrap";


#messages {
  max-height: 450px;
  overflow-y: auto;
  .avatar {
    margin: 0.5rem;
  }
}

```


```ruby
#-------------------------- routes.rb
Rails.application.routes.draw do
  devise_for :users
  resources :chat_rooms, only: [:new, :create, :show, :index]

  root 'chat_rooms#index'

  mount ActionCable.server => '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```

```javascript
//-------------------------- application.js (append content)

//= require cable
```



```ruby
#-------------------------- app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.email
    end

    protected

    def find_verified_user # this checks whether a user is authenticated with devise
      if verified_user = env['warden'].user
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end

```



