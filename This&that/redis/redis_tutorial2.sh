# REDIS

#------------------------- set a single key
# key names are pretty flexible, you can use special characters in the key naming

$ set `123-=~!@#$%^&*()_+[]\;',./{}|:"<>?' foo
$ get `123-=~!@#$%^&*()_+[]\;',./{}|:"<>?' # foo

$ set name brian
$ get name # brian

$ set foo.name erich
$ get foo.name # erich

#------------------------- types of keys
$ type name # "string"

#------------------------- sets
$ SADD myset "Hello"
$ SADD myset "Hello2"
$ SMEMBERS myset
# 1) "Hello2"
# 2) "Hello"

#------------------------- show all keys
$ keys *  # 'myset'
