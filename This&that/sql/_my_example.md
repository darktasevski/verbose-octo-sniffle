### MySql

```bash
$ mysql.server start # start the server
$ mysql.server stop # stop the server


# not recomended
$ mysqld # start the server
$ ps aux | grep mysqld   # kill -9 my-process-id-here # to stop the SQL server

# to use mysql console, the server needs to be running...
# -p is a password flag, type your password, if there is no password, 
# use the -p tag with no parameters, like this:
$ mysql -u root -p 

$ quit # to quit the mysql console

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

# you can also create indexes on table columns

$ show tables;
$ drop table myTable;
$ describe myTable;

```

```sql

create database BrianTestDeleteMe;
use BrianTestDeleteMe;

create table users(
    id int(11) unsigned auto_increment primary key not null,
    username varchar(25) not null,
    password varchar(25) not null,
    email varchar(40) not null
);

create table houses(
    id int(11) unsigned auto_increment primary key not null,
    name varchar(25) not null,
    color varchar(25) not null,
    user_id int(11) unsigned
);

create table rooms(
    id int(11) unsigned auto_increment primary key not null,
    name varchar(25) not null,
    house_id int(11) unsigned
);

-- ------------------------------------------------------ USERS
-- other columns will receive `NULL` value
INSERT INTO users (username, password, email)
VALUES ("brian", "123456", "brian@hotmail.com");

INSERT INTO users (username, password, email)
VALUES ("erich", "123456", "erich@hotmail.com");

INSERT INTO users (username, password, email)
VALUES ("rick", "123456", "rick@hotmail.com");

INSERT INTO users (username, password, email)
VALUES ("sandra", "123456", "sandy@hotmail.com");

-- ------------------------------------------------------ HOUSES
INSERT INTO houses (name, color)
VALUES ("beach house", "white");

INSERT INTO houses (name, color)
VALUES ("city house", "yellow");

INSERT INTO houses (name, color)
VALUES ("farm house", "blue");

INSERT INTO houses (name, color)
VALUES ("old house", "brown");

-- ------------------------------------------------------ ROOMS
INSERT INTO rooms (name)
VALUES ("living room");

INSERT INTO rooms (name)
VALUES ("kids room");

INSERT INTO rooms (name)
VALUES ("master room");


-- ------------------------------------------------------ queries:

select * from users where users.username = "brian";
select email, password from users where users.username = "brian";
select email, username from users where users.username <> "brian";  -- 'not equal' operator
SELECT * FROM users WHERE username LIKE '%br%';
SELECT * FROM users WHERE id IN (1,3,6);
SELECT * FROM users WHERE id BETWEEN 2 AND 10;
SELECT username, password AS auth FROM users WHERE users.password = 123456;  -- aliasing password column name to 'auth'
SELECT DISTINCT email FROM users;  -- get unique emails

-- --------------------------- update
UPDATE users SET username="brian spinos", password="123" WHERE id=1;


UPDATE houses SET user_id=3 WHERE id=1;
UPDATE houses SET user_id=1 WHERE id=2;
UPDATE houses SET user_id=2 WHERE id=3;


-- --------------------------- delete
DELETE FROM users WHERE username='Alfreds Futterkiste' AND email='Maria Anders';


-- --------------------------- joins
SELECT users.id, users.username, houses.name, houses.id, houses.user_id
FROM users INNER JOIN houses ON users.id=houses.user_id;  -- returns only matched rows

SELECT users.id, users.username, houses.name, houses.id, houses.user_id
FROM users JOIN houses ON users.id=houses.user_id;  -- returns only matched rows (same as INNER JOIN)

-- returns all rows from from the second table (on the right side, in this case: 'houses'), 
-- even if there is not match from the first table
SELECT users.id, users.username, houses.name, houses.id, houses.user_id
FROM users RIGHT JOIN houses ON users.id=houses.user_id;  

-- returns all rows from from the first table (on the left side, in this case: 'users'), 
-- even if there is not match from the second table
SELECT users.id, users.username, houses.name, houses.id, houses.user_id
FROM users LEFT JOIN houses ON users.id=houses.user_id; 

-- --------------------------- the 'join table'

-- this relationship could be a 'has many' or 'has and belongs to many'
create table rooms_users(
    id int(11) unsigned auto_increment primary key not null,
    room_id int(11) unsigned not null,
    user_id int(11) unsigned not null
);

INSERT INTO rooms_users (room_id, user_id)
VALUES (1, 3);

INSERT INTO rooms_users (room_id, user_id)
VALUES (2, 1);

INSERT INTO rooms_users (room_id, user_id)
VALUES (3, 2);



select * from rooms where id IN (
    select room_id from rooms_users where user_id=1  -- dont use semi-colon here, it will terminate the query...
);

```


