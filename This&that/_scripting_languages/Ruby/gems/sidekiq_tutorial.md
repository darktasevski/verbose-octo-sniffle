# Sidekiq


```ruby
# routes.rb

# Required to monitor sidekiq
require "sidekiq/web"
mount Sidekiq::Web => "/sidekiq"
```

```ruby
# Gemfile  

gem "sidekiq", "~> 2.17.4" # Full-featured background processing framework
gem 'sinatra', require: false
gem 'slim'
```

```ruby
# app/workers/destroy_record_worker.rb

    # Worker to destroy a record
    # require 'sidekiq/worker_logger'

    class DestroyRecordWorker
      include Sidekiq::Worker
      # include Sidekiq::Status::Worker
      # sidekiq_options queue: "low"

      # Destroy in background a record
      def perform(name)
        puts "\n\n\n\n\n\n\n\n\nhello #{name}\n\n\n\n\n\n\n"
      end
    end
```

```bash
# in terminal:
   $ redis-server  # anywhere ???
   $ bundle exec sidekiq # in the root of your app, restart this server, if you change a worker
```
