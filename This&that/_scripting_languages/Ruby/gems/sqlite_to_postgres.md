# sqlite to postgres


```
# gem 'sqlite3'
gem 'pg'
```

## change database.yml to:

```yml

# development: postgres
development:
  adapter: postgresql
  database: socialize_development
  username: brianspinos777
  host: localhost

  # Warning: The database defined as "test" will be erased and
  # re-generated from your development database when you run "rake".
  # Do not set this db to the same as development or production.
  test:
    adapter: postgresql
    database: socialize_test
    username: brianspinos777
    host: localhost

    production:
      adapter: postgresql
      database: socialize_production
      username: brianspinos777
      host: localhost


```



```bash
$ rake db:create
$ rake db:migrate


#  ActiveRecord::Migration.remove_column :table_name, :column_name
```
