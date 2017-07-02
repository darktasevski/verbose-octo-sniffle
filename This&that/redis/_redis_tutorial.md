### REDIS

```bash
# start server:
$ redis-server
# Ctrl + C # to exit 

# redis console
# the server needs to be running...
$ redis-cli
```

```bash
# keys
SET name "brian"
GET name # "brian"
DEL name # (nil)  # delete key and value



# hashes
HSET myhash name "brian"
HSET myhash age "28"
HMGET myhash age # "28"
HMGET myhash name # "brian"


# lists
LPUSH mylist foo
LPUSH mylist bar
LPUSH mylist baz
LRANGE mylist 0 -1 # show all items

#sets
SADD myset item1
SADD myset item2
SADD myset item3
SMEMBERS myset # show all members of set

# sorted sets
ZADD my_sorted_set 1 item1
ZADD my_sorted_set 2 item2
ZADD my_sorted_set 3 item3
ZADD my_sorted_set 4 item4
ZRANGE my_sorted_set 0 -1 WITHSCORES # show all items
```
