# AWSS S3 Tutorial

[Heroku's paperclip article](https://devcenter.heroku.com/articles/paperclip-s3)


[Store images locally](http://stackoverflow.com/questions/8131835/store-images-locally-for-development-s3-for-production-rails-paperclip)



- Create a bucket at: https://console.aws.amazon.com/s3/home?region=us-west-2




```bash
$ rails g migration add_avatar_url_to_users avatar_url:string

```


```bash
$ heroku config:set S3_BUCKET_NAME=your_bucket_name
$ heroku config:set AWS_ACCESS_KEY_ID=your_access_key_id
$ heroku config:set AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

```bash
# test it out
$ foreman run rails runner "puts ENV['S3_BUCKET']" # should be the name of your bucket...
```


```ruby
# config/initializers/paperclip.rb
Paperclip::Attachment.default_options[:s3_host_name] = 's3-us-west-2.amazonaws.com' 
# so you can see the images after uploading them

```

```ruby
# TIP: add :bucket => 'the-vine' to config/environments/production.rb and config/environments/development.rb

# paperclip
config.paperclip_defaults = {
    :storage => :s3,
    :s3_credentials => {
        :bucket => ENV['S3_BUCKET_NAME'],
        :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
        :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    }, 
    bucket: ENV['S3_BUCKET_NAME']
}


```


```ruby
# Gemfile
gem 'paperclip'
gem 'aws-sdk'
```

---------------------------------------

https://devcenter.heroku.com/articles/s3

https://devcenter.heroku.com/articles/direct-to-s3-image-uploads-in-rails



# CORS <- so you can use javascript to upload to s3

- go to you S3 sonsole and got to the bucket, permissions, Add CORS configuration


---------------------------------------

Access Key ID (example):

AKIAXAB9QQKTC3B5RHHD

Secret Access Key (example):

GUwzzD8L3geYssDDX5UoleBatwGf123O/JEnj4kS
