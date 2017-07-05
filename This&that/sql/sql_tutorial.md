# SQL TUTORIAL

#sql comments

```sql
-- this is a comment
```

##JOIN TABLES

### explanation:

- You can create a table using __ANY__ column of __ANY__ table in the DATABASE

- But, you need a column in common, so SQL can match that and return results

- They are virtual tables, they are created on the fly...



## INNER JOIN (JOIN)
- INNER JOIN is the same as JOIN.
- Returns __ALL__ rows (with selected columns)

- when there is at least one match in __BOTH__ tables

```
-  -
-  -
-  -
-  -
-  -
-  -
-  -
-  -
```

## LEFT JOIN
- Return __ALL__ rows (with selected columns) from the left table,

- and the __MATCHED__ rows from the right table

```
-  -
-  -
-
-
-  -
-
-
-
```

## RIGHT JOIN
- Return __ALL__ rows (with selected columns) from the right table,

- and the __MATCHED__ rows from the left table

```
-  -
-  -
   -
   -
-  -
   -
   -
   -
```

## FULL JOIN
- Return __ALL__ rows (with selected columns)

- when there is a match in __ONE__ of the tables

```
-  -
-
-
-
   -
   -
   -
-  -
-  -
```

## which table is the LEFT or RIGHT table?
to know wich is the left and right table, use the `JOIN` keyword as a reference,

- what is in its right, is __ALWAYS__ the __RIGHT__ table !!!

- what is in the left, is __ALWAYS__ the __LEFT__ table !!!

```sql
  -- EXAMPLE:

  -- table2 is the RIGHT table
  -- table1 is the LEFT table
  ... FROM table1 INNER JOIN table2 ON ...
  ... FROM table1 LEFT  JOIN table2 ON ...
  ... FROM table1 RIGHT JOIN table2 ON ...
  ... FROM table1 FULL JOIN table2 ON ...
```

## examples `SELECT`:

```sql
SELECT users.id, users.email FROM users;

--  id |               email
-- ----+------------------------------------
--   5 | kyle@foo.com
--  12 | michael@foo.com
--  15 | alan.haikal@foo.com
--   9 | spinos@foo.com
--  14 | xyz_processor@foo.com
--  11 | lab_doctor@foo.com
--  10 | no_lab_doctor@foo.com
--   6 | test@test.com
--  13 | sally@foo.com
--  16 | jeffrey.fiorentino@foo.com
-- (10 rows)

SELECT patients.first_name, patients.id FROM patients;


--    first_name    | id
-- -----------------+----
--  edward          | 16
--  alan            | 10
--  erich ######### |  9
--  Cristal         |  5
--  brian           | 13
--  Emilia          | 11
--  Derek           |  2
--  Freddy          |  8
--  Erika           |  7
--  helloworld      | 45
--  Delete_me       | 14
--  Brandon         |  1
--  Arnold          |  6
--  Herold          |  3
--  Julia           |  4
--  rick            | 12
--  rick            | 46
-- (17 rows)
```

##INNER JOIN EXAMPLE:
```sql
SELECT users.id, patients.id, patients.first_name, users.username FROM users INNER JOIN patients ON patients.id=users.id;
--  id | id |   first_name    |       username
-- ----+----+-----------------+-----------------------
--   5 |  5 | Cristal         | zoogle_mike
--  12 | 12 | rick            | m.smith
--   9 |  9 | erich ######### | developer
--  14 | 14 | Delete_me       | xyz_process
--  11 | 11 | Emilia          | lab_doctor
--  10 | 10 | alan            | no_lab_doctor
--   6 |  6 | Arnold          | DestinationHopeDoctor
--  13 | 13 | brian           | SallyAbu
--  16 | 16 | edward          | jfiorentino
-- (9 rows)
```

##RIGHT JOIN EXAMPLE:
```sql
SELECT users.id, patients.id, patients.first_name, users.username FROM users RIGHT JOIN patients ON patients.id=users.id;
--  id | id |   first_name    |       username
-- ----+----+-----------------+-----------------------
--  16 | 16 | edward          | jfiorentino
--  10 | 10 | alan            | no_lab_doctor
--   9 |  9 | erich ######### | developer
--   5 |  5 | Cristal         | zoogle_mike
--  13 | 13 | brian           | SallyAbu
--  11 | 11 | Emilia          | lab_doctor
--     |  2 | Derek           |
--     |  8 | Freddy          |
--     |  7 | Erika           |
--     | 45 | helloworld      |
--  14 | 14 | Delete_me       | xyz_process
--     |  1 | Brandon         |
--   6 |  6 | Arnold          | DestinationHopeDoctor
--     |  3 | Herold          |
--     |  4 | Julia           |
--  12 | 12 | rick            | m.smith
--     | 46 | rick            |
-- (17 rows)
```

##LEFT JOIN EXAMPLE:
```sql
SELECT users.id, patients.id, patients.first_name, users.username FROM users LEFT JOIN patients ON patients.id=users.id;
--  id | id |   first_name    |       username
-- ----+----+-----------------+-----------------------
--   5 |  5 | Cristal         | zoogle_mike
--  12 | 12 | rick            | m.smith
--  15 |    |                 | alan.haikal
--   9 |  9 | erich ######### | developer
--  14 | 14 | Delete_me       | xyz_process
--  11 | 11 | Emilia          | lab_doctor
--  10 | 10 | alan            | no_lab_doctor
--   6 |  6 | Arnold          | DestinationHopeDoctor
--  13 | 13 | brian           | SallyAbu
--  16 | 16 | edward          | jfiorentino
-- (10 rows)
```

##FULL JOIN EXAMPLE:
```sql
SELECT users.id, patients.id, patients.first_name, users.username FROM users FULL JOIN patients ON patients.id=users.id;
--  id | id |   first_name    |       username
-- ----+----+-----------------+-----------------------
--   5 |  5 | Cristal         | zoogle_mike
--  12 | 12 | rick            | m.smith
--  15 |    |                 | alan.haikal
--   9 |  9 | erich ######### | developer
--  14 | 14 | Delete_me       | xyz_process
--  11 | 11 | Emilia          | lab_doctor
--  10 | 10 | alan            | no_lab_doctor
--   6 |  6 | Arnold          | DestinationHopeDoctor
--  13 | 13 | brian           | SallyAbu
--  16 | 16 | edward          | jfiorentino
--     |  2 | Derek           |
--     | 46 | rick            |
--     |  8 | Freddy          |
--     |  4 | Julia           |
--     |  1 | Brandon         |
--     | 45 | helloworld      |
--     |  3 | Herold          |
--     |  7 | Erika           |
-- (18 rows)

```



## other stuff:
```sql
SELECT id, email, username FROM users WHERE id=14 LIMIT 1;
```
