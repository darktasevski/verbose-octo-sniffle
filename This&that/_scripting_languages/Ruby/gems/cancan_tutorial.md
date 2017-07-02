# Cancan tutorial

https://github.com/ryanb/cancan

https://github.com/ryanb/cancan/wiki/defining-abilities

```ruby
# Gemfile
gem "cancan"
```

```bash
$ bundle
$ rails g cancan:ability
```

## In the Controller

- use `load_and_authorize_resource`

```ruby
class ArticlesController < ApplicationController
  load_and_authorize_resource

  def show
    # @article is already loaded and authorized
  end
end


# ApplicationController:
class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end
end

```





## In the View:

```ruby
<% if can? :update, @article %>
  <%= link_to "Edit", edit_article_path(@article) %>
<% end %>


<% if cannot? :update, @article %>
  <%= link_to "Edit", edit_article_path(@article) %>
<% end %>
```

