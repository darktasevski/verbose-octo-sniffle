###### https://www.codecademy.com/articles/sql-commands?r=master


```bash
# start the server
$ mysqld
# to stop the SQL server  # ps aux | grep mysqld   # kill -9 <process-id>

$ mysql -u root -p
$ # press enter, there is no password...
$ show databases;
$ create database myDatabase;
$ drop database myDatabase;
$ use myDatabase;
$ show tables;

$ create table myTable(
    id int(11) unsigned auto_increment primary key not null,
    username varchar(25) not null,
    password varchar(25) not null,
    email varchar(40) not null
);

$ show tables;
$ drop table myTable;
$ describe myTable;
```





