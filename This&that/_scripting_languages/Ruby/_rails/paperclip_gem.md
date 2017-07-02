# Paperclip gem


###### Issue
```
I am not able to save .docx files, try this:
https://stackoverflow.com/questions/10808734/paperclip-uploads-for-office-files-docx-pptx-are-being-downloaded-as-zip-files
https://technet.microsoft.com/en-us/library/ee309278(v=office.12).aspx
```

[Github for paperclip](https://github.com/thoughtbot/paperclip)

[heroku's tutorial](https://devcenter.heroku.com/articles/paperclip-s3)

[Find your keys](https://www.cloudberrylab.com/blog/how-to-find-your-aws-access-key-id-and-secret-access-key-and-register-with-cloudberry-s3-explorer/)

[Get bucket identifier by region](http://docs.aws.amazon.com/general/latest/gr/rande.html)

[AWS website](https://aws.amazon.com/)


```bash
rails new FileUploadApp
cd FileUploadApp
rails g scaffold user name email address
rails db:migrate
```

```
gem "paperclip", "~> 5.0.0"
gem 'aws-sdk'
# gem 'aws-sdk', '~> 2.3' # for heroku ???
```

```bash
bundle install
```


```ruby
# development.rb
  config.paperclip_defaults = {
    storage: :s3,
    s3_credentials: {
      bucket: ENV['S3_BUCKET_NAME'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      s3_region: ENV['AWS_REGION'],
    }
  }
```




```ruby
# create file: config/initializers/paperclip.rb
Paperclip::Attachment.default_options[:url] = ':s3_domain_url'
Paperclip::Attachment.default_options[:path] = '/:class/:attachment/:id_partition/:style/:filename'

#
# If you are seeing the following error:
#    “The bucket you are attempting to access must be addressed using the
#     specified endpoint. Please send all future requests to this endpoint.”
#     Try setting the specified endpoint with the s3_host_name config var.
#
#Paperclip::Attachment.default_options[:s3_host_name] = 's3-us-west-2.amazonaws.com'
```


```bash
export S3_BUCKET_NAME="my.bucket.name"
export AWS_ACCESS_KEY_ID="access_key_here"
export AWS_SECRET_ACCESS_KEY="secret_key_here"
export AWS_REGION="us-west-2"
```

```ruby
#
# ImageMagick does not accept .docx files... why?
#

class User < ActiveRecord::Base
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
    validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

    #
    # How to check the mime type of a file:
    # $ file -b --mime-type  foo.docx
    #
    # => application/vnd.openxmlformats-officedocument.wordprocessingml.document
    #
    # validates_attachment_content_type :avatar, content_type: [
    #       "application/pdf",
    #       "application/zip",
    #       "application/x-zip",
    #       "application/x-zip-compressed",
    #       "application/octet-stream",
    #       "application/vnd.ms-office",
    #       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    #       "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    #       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    #       "application/pdf",
    #       "text/plain",
    #       "image/jpg",
    #       "image/png",
    #       "image/jpeg",
    #       /\Aimage\/.*\Z/
    # ]
end
```


```bash
rails g paperclip user avatar
rails db:migrate
```


```erb
<!--
View form (make sure you just dont copy and paste, but integrate it in the existing `form_for`)
-->
<%= form_for(user, html: { multipart: true }) do |f| %>
<!-- ... -->
<div class="field">
    <%= f.label :avatar %>
    <%= f.file_field :avatar %>
  </div>
```


```ruby
# controller
def create
  @user = User.create( user_params )  # .create
end

private

# Use strong_parameters for attribute whitelisting
# Be sure to update your create() and update() controller methods.

def user_params
  params.require(:user).permit(:avatar)
end
```


```erb
<!-- show form -->
<%= image_tag @user.avatar.url(:thumb) %>
```
