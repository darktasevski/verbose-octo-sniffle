# REDIS

# start server:
$ redis-server
# Ctrl + C # to exit 

# redis console
# the server needs to be running...
$ redis-cli

# redis commands: http://redis.io/commands

# get all keys:
$ keys * 

# set key "name" to value "brian"
$ set name foo

# get a key
$ get foo # "brian"


# get type of "key"
$ type <key>

# delete all keys:
$ redis-cli KEYS "*" | xargs redis-cli DEL

# get members of a set:
$ smembers <a-set>

# help @<group> # example of groups: set, list hash, string


#————————

# hmset <name:of:set> <key> <value> <key> <value> …
$ hmset brian:1234 name brian password foobar123

redis 127.0.0.1:6379> HGETALL brian:1234
1) "name"
2) "brian"
3) "password"
4) "foobar123"


$ HSET brian:1234 password changed_password


redis 127.0.0.1:6379> HGETALL brian:1234
1) "name"
2) "brian"
3) "password"
4) "changed_password"

#—————————————————————


$ smembers <set>


$ hgetall <hash>


$ get <string>

