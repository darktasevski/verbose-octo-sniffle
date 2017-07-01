# Servers

## SimpleHTTPServer

Run a simple http server in any directory on mac: `$ python -m SimpleHTTPServer [port number]`

Example: `$ python -m SimpleHTTPServer 8005`

## PostgreSQL Server

*PG::ConnectionBad*
```Unix
Started GET "/" for 127.0.0.1 at 2017-06-28 10:31:13 -0500
could not connect to server: No such file or directory
	Is the server running locally and accepting
	connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
 excluded from capture: DSN not set

PG::ConnectionBad (could not connect to server: No such file or directory
	Is the server running locally and accepting
	connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
):
```

Starting the server: `pg_ctl` - [utility to initialize, start, stop, or control a PostgreSQL server](https://www.postgresql.org/docs/9.5/static/app-pg-ctl.html).

Example: `$ pg_ctl start [-D datadir] [-l filename]`
* get path to postgres via `$ which postgres` => `/usr/local/var/postgres`
* `-D datadir`: Specifies the file system location of the database files.
* `-l filename`: Append the server log output to filename.
If you don't specify this, logs will be outputted to the console.

```Unix
$ pg_ctl -D /usr/local/var/postgres -l logfile start
```

## Downloading Remote Serve SQL

1. SSH into the remote server: `$ ssh mike@11.111.11.11`

2. Copy the application's database host, name, username, and password via vi or cat:

`$ cat /var/www/path/to/application/shared/config/database.yml`

*Example:*
```yml
production:
  host: database_host
  adapter: postgresql
  encoding: unicode
  database: database_name
  pool: 5
  username: database_username
  password: database_password
```

3. After you have set the variables, `pg_dump` the database. When prompted, paste the database password:

```Unix
$ pg_dump -c -f file_name.sql -d database_name -h database_location -U database_username -W
database_password
```

4. `tar` the `.sql` file and delete (`rm`) it:

```Unix
$ tar czvf file_name.sql.tgz [file_name].sql
$ rm file_name.sql
```

Why are the flags `c`, `z`, `v`, `f`?

* `-c`: Create a new archive containing the specified items.
* `-z`: Compress the resulting archive (i.e., (un)z̲ip).
* `-v`: Produce verbose output.
* `-f`: Read the archive from or write the archive to the specified file.

Print your current working directory so you know how to access the file when you complete a secure copy (scp):

`$ pwd`

In many cases, this will be: `/home/mike/`

5. Exit the remove database and copy the sql tgz file to your local machine:

`$ scp mike@app_url:path_to_file/file_name.sql.tgz .`

Example: `$ scp mike@11.111.11.11:/home/mike/file_name.sql.tgz .`

6. Unzip, extract, and print file names (i.e., verbosely) via: `$ tar xzvf file_name.sql.tgz`

Why `z`, `x`, `v`, `f`?

* `-x`: means ex̲tract files from the archive.
* `-z`: Compress the resulting archive (i.e., (un)z̲ip).
* `-v`: Produce verbose output.
* `-f`: Read the archive from or write the archive to the specified file.

7. Load the sql file into your local database:

`$ psql -d name_of_local_database < path_to_file.sql`

_You may need to update the database due to any outstanding migrations if you have any locally:_

```Unix
$ bundle exec rake db:migrate
```
