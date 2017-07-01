/**
 * Sharding
**/

// Technique for splitting up a large collection across multiple servers

// Application talks to `mongos` (a router) which talks to multiple servers which have a `mongod` instance running

// Sharding is range-based
// 1. Insert must include the shard key
// 2. For an update, remove, or find, if mongodb is not given a shard key, it broadcasts the request to ALL shards