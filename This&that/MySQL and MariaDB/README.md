# MySQL &/or MariaDB notes


## Create a db

```
 CREATE DATABASE <DATABASENAME>;
```

## Create an user

```
CREATE USER '<USERNAME>'@'localhost' IDENTIFIED BY '<PASSWORD>';
```

## Grant rights to a user

* This will allow a user all rights on all tables in all databases
```
GRANT ALL PRIVILEGES ON * . * TO '<USERNAME>'@'localhost';
```

* To specify only certain rights to certain tables/databases the format is as follows:

```
GRANT [type of permission] ON [database name].[table name] TO ‘[username]’@'localhost’;
```

* To remove those rights...

```
REVOKE [type of permission] ON [database name].[table name] FROM ‘[username]’@‘localhost’;
```

* To remove the user

```
DROP USER ‘<USERNAME>’@‘localhost’;
```

* The diferent permissions are:
..* ALL PRIVILEGES - as we saw previously, this would allow a MySQL user all access to a designated database (or if no database is selected, across the system)
..* CREATE - allows them to create new tables or databases
..* DROP - allows them to them to delete tables or databases
..* DELETE - allows them to delete rows from tables
..* INSERT - allows them to insert rows into tables
..* SELECT - allows them to use the Select command to read through databases
..* UPDATE - allow them to update table rows
..* GRANT OPTION - allows them to grant or remove other users' privileges

---
##### References

```
https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
``` 




