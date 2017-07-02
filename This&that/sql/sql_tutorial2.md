# SQL 2

- INNER JOIN is the same as JOIN.
- SQL injection? use sql parameters
- be carefull not to return millions of records with your query... so use:
```sql
SELECT *
FROM Persons
LIMIT 5;
```
- use semicolons at the end of sql commands
- values are not case sensitive
- you can use spaces with operators like
```sql
SELECT DISTINCT cIty FROM Customers WHERE city = 'Berlin';
```
- numbers can have ''   or   ""  or nothing, but its better not to use quotes on numbers
```sql
SELECT DISTINCT cIty FROM Customers WHERE cityID = 1;
SELECT DISTINCT cIty FROM Customers WHERE cityID = "1";
SELECT DISTINCT cIty FROM Customers WHERE cityID = '1';
```

## operators
```
  =	Equal
  <>	Not equal. Note: In some versions of SQL this operator may be written as !=
  >	Greater than
  <	Less than
  >=	Greater than or equal
  <=	Less than or equal
  BETWEEN	Between an inclusive range
  LIKE	Search for a pattern
  IN	To specify multiple possible values for a column
```


```sql
-- The SELECT DISTINCT statement is used to return only distinct (different) values. from column?

SELECT DISTINCT Country
FROM Customers;
```


```sql
-- where
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value;
```


```sql
-- AND operator
SELECT * FROM Customers
WHERE Country='Germany'
AND City='Berlin';

-- OR operator
SELECT * FROM Customers
WHERE City='Berlin'
OR City='München';

-- combining AND and OR, using parenthesis
SELECT * FROM Customers
WHERE Country='Germany'
AND (City='Berlin' OR City='München');
```


```sql
-- sorting
SELECT * FROM Customers
ORDER BY Country DESC;
```



## Insert

```sql
-- other columns will receive `NULL` value
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
```


## Update

```sql
UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;
```


## DELETE

```sql
DELETE FROM Customers
WHERE CustomerName='Alfreds Futterkiste' AND ContactName='Maria Anders';
```




# TABLES

```sql
DROP TABLE Suppliers
```




## WHERE x LIKE y

```sql
-- the '%' is a wildcard
SELECT * FROM Customers
WHERE Country LIKE '%land%';

-- NOT LIKE
SELECT * FROM Customers
WHERE Country NOT LIKE '%land%';

```

# WHERE x IN ('y', 'z')

```sql
SELECT * FROM Customers
WHERE City IN ('Paris','London');
```




## BETWEEN

```sql
-- use numbers, text and dates
SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20;

-- NOT BETWEEN
SELECT * FROM Products
WHERE Price NOT BETWEEN 10 AND 20;

-- dates, but be carefull, its unstable, test it...
SELECT * FROM Orders
WHERE OrderDate BETWEEN #07/04/1996# AND #07/09/1996#;
```



## MIX of -> BETWEEN AND NOT x IN

```sql
SELECT * FROM Products
WHERE (Price BETWEEN 10 AND 20)
AND NOT CategoryID IN (1,2,3);

```



# Alias
```sql
-- SQL aliases are used to temporarily rename a table or a column

-- in MySql, you can concatenate multiple columns to form 1 column:
SELECT CustomerName, CONCAT(Address,', ',City,', ',PostalCode,', ',Country) AS Address
FROM Customers;
```
