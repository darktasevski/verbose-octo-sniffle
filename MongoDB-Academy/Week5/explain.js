/**
 * Explain

 Does not bring back the database query.
 Does not actually return any data, it only replicates the method. Returns an explainable object.
**/
db.example.explain();

// You can also call explain on a cursor

// Explain options:

// 1. Execution stats mode - provides stats for the winning plan
db.example.explain('executionStats');

// 2. All Plans Execution mode - does what the query optimizer does periodically. Runs all possible indexes that could be used, in parallel, then makes the decision about which one is fastest, then remembers which one is fastest and runs that index.
// Shows execution stats for ALL plans

