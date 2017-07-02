# Bootstrap

[Bootstrap doc](http://getbootstrap.com/)

[Bootstrap github doc](https://github.com/seyhunak/twitter-bootstrap-rails#installing-the-css-stylesheets)

[Inspinia theme](https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S)


```bash
rails new BootstrapApp
cd BootstrapApp
rails g scaffold user name email address
rails db:migrate
rails s
```


```ruby
gem 'twitter-bootstrap-rails'
```


```css
/* application.css */
body { padding-top: 10px; }
```

```erb
<!-- application.html.erb -->



<!-- ... -->



  <nav class="navbar navbar-default navbar-fixed-top navbar-inverse">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">


      <!-- <button type="button" class="btn btn-default navbar-btn">Sign in</button> -->


      <!-- <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link">Mark Otto</a></p> -->


      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
        <!-- Brand -->
        <img alt="Brand" height="20" src="https://bower.io/img/bower-logo.png">
      </a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="input-sm form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default btn-sm">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>








    <%= yield %>
    
    <!-- ... -->
    
```


```bash
bundle install
rails generate bootstrap:install static
rails s
```

