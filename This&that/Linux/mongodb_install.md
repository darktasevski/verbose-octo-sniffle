# MongoDB install for debian Linux 8


**I normally do this throught as root rather than sudo for spead sake**

_echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list_

_apt-get update_

_apt-get install mongodb-org_

_service mongod start_


###Setup /etc/mongodb.conf file

_bindIp: 0.0.0.0_ - setup to access from all IPs

####Security

_db.createUser({user: "admin", pwd: "password", roles: [ { role: "userAdminAnyDatabase", db: "admin" }]} )_

_security:_
_authorization: "enabled"_  - Only add this after creating the admin user


###Assorted Commands

_use db_ - use an existing db, if it doesn't it will create it uong data entry.

_show dbs_ - show list of dbs/colections.
