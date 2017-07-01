# Introduction
MongoDB installation guide.

## Environments
* Ubuntu Linux 16.04 LTS x86_64

## Install
```
$ sudo apt-get install mongodb mongodb-clients mongodb-server
```

## Configuration
```
$ mongod --version
db version v2.6.10
2017-03-07T20:32:08.098+0800 git version: nogitversion
2017-03-07T20:32:08.098+0800 OpenSSL version: OpenSSL 1.0.2g  1 Mar 2016
```

```
$  ps -ef | grep mongod
mongodb  29942     1  0 20:21 ?        00:00:01 /usr/bin/mongod --config /etc/mongodb.conf
```

```
$ mongo
MongoDB shell version: 2.6.10
connecting to: test
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
> show dbs;
admin  (empty)
local  0.078GB
> use abc;
switched to db abc
> db.createUser({"user": "user_abc", "pwd": "passwd_abc", "roles": [{role: "readWrite", db: "abc"}]})
Successfully added user: {
	"user" : "user_abc",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "abc"
		}
	]
}
> db.adbtable.insert({"cpu": 1, "mem": 1024})
WriteResult({ "nInserted" : 1 })
> db.adbtable.find();
{ "_id" : ObjectId("58bea804b2a2cd6a77e495db"), "cpu" : 1, "mem" : 1024 }
> exit
bye
```