# Sending emails


[HTML emails](https://www.youtube.com/watch?v=6htGDLfVGpQ)


[Receiving emails in you rails app](http://railscasts.com/episodes/313-receiving-email-with-mailman?autoplay=true)


```bash
rails new EmailApp
cd EmailApp
rails g scaffold user name address email
rails db:migrate
rails g mailer user_mailer signup_confirmation

export GMAIL_USERNAME="example@gmail.com"
export GMAIL_PASSWORD="some_password_here"

rails s
```



```ruby
class UserMailer < ApplicationMailer
    default from: "foo@foo.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.signup_confirmation.subject
  #
  def signup_confirmation(user)
    @greeting = "Hi"
    @user = user

    mail to: user.email, subject: "My Subject here"
  end
end
```


```ruby
# controller
UserMailer.signup_confirmation(@user.email).deliver
```


```erb
<p><%= @user.name %>,</p>
<p>Thank you for signing up.</p>
<p><%= link_to "User Profile", user_url(@user) %></p>
<p style="color: red;">test</p>
```


```ruby
  # development.rb
  
  
  # # Don't care if the mailer can't send.
  # config.action_mailer.raise_delivery_errors = false


  #
  # You need to unblock your email:
  #    https://www.google.com/settings/security/lesssecureapps
  #
  # This setting is not available for accounts with 2-Step Verification
  # enabled. Such accounts require an application-specific password for
  # less secure apps access
  #
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.default_url_options = {
    # this could be your IP for production?
    # this is used for links in the email
    # this could also be your domain, like example.com ?
    host:'localhost',

    # this could be port 80 for production?
    # this is used for links in the email
    port: '3000'
  }
  config.action_mailer.perform_deliveries = true
  config.action_mailer.default charset: "utf-8"
  config.action_mailer.smtp_settings = {
      address: "smtp.gmail.com",
      port: 587,
      authentication: :plain,
      user_name: ENV["GMAIL_USERNAME"],
      password: ENV["GMAIL_PASSWORD"],
      enable_starttls_auto: true
      # domain: 'localhost2:3002', # not sure if I need this
  }
```
