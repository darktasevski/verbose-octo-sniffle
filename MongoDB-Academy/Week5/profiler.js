/**
 * System Profiler
**/

/*
Level 0 - off

Level 1 - log slow queries 

Level 2 - log all queries (general debugging feature)
*/

db.system.profile.find();
db.system.profile.find({ns:/test.foo/}).sort({ts:1})

db.getProfilingStatus();
db.setProfilingLevel(1, 4); // Slow queries above 4 ms
db.setProfilingLevel(0); // Turns it off