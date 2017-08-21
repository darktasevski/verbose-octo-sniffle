# Postgres CLI

```bash
# Start Postgres server
psql

# list of databases (it's a lowercase L)
\l    

# Create a database
create database my_database;

# Delete database
drop database my_database;

# Create a user
create role brian_spinos;  
Grant all privileges on my_database to brian_spinos; # not sure about this


# use that DB (so you can run sql queries)
\c MyApp_development;  

# List tables
\d 

# Describe table schema
\d+ my_table;  

# Describe table schema, including table size on disk!
\d+

# restart the ID's (primary keys will start from 1)
truncate my_table; 

# show current database and user
\c
#=> You are now connected to database "my_database" as user "dude".

# Quit psql
\q

```
