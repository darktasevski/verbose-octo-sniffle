Given a list dominos (you could consider a domino as two integers: left and right), and an integer K, find all pairs of dominos that their left values sum to K and their right values sum to K.

Input:

|2:4|

|4:1|

|4:4|

|3:1|

k = 5

Output:

|2:4|
|3:1|
  
|a1:a2|
|b1:b2|

|c1:c2|
|d1:d2|

// last 5 minutes for questions
  
  // k: 5
// input: [ [2, 4], [4, 1], [4, 4], [3, 1]]
// output: [[2,4], [3,1]]
  //print out the pairs
  
  result: [ [[2, 4], [3, 1]] ]
  i = 3
  j = 0
target = 5
  [3, 1]
  [2, 4]

  3 + 1 === 5 ? 
pair = [[2, 4], [3, 1]]
  //O(n ^2) approach
  
  const findPairs = (dominoes, target) => { //array
    let result = new Set();
  
    for (var i = 0; i < dominoes.length; i++ ) {
      for (var j = 0; j < dominoes.length; j++) {
        if (dominoes[i][0] + dominoes[j][0] === target && dominoes[i][1] + dominoes[j][1] === target) {
          let pair = [dominoes[i], dominoes[j]];
          result.add(pair);
        }
      }
    }
    return result;
  }
  
  
  // input: [ [2, 4], [4, 1], [4, 4], [3, 1]]
  t = [3, 1]
  hash:{
    [3, 1]: [2, 4],
    [4, 1]: [1, 4],
    [1, 1]: [4, 4],
    [2, 4]; [3, 1],
  }
  
  hash.t = [2, 4]
  [2, 4] === [2, 4]

    print: [3, 1]: [2, 4], [2, 4]; [3, 1],
      
  const findPairsUsingHashTable = (domines, target) => { //object
    //create an object to store all elements
    let hash = {};
    let result = new Set();
    
    for (var i = 0; i < dominoes.length; i++ ) {
      let t = [domino[0] - target, domino[1] - target];
      hash[t] = dominoes[i];
    }
  
    //iterate over the object
    for(let domino in hash) {
      let t = [domino[0] - target, domino[1] - target];
      if (hash.t === domino) {
        // console.log(domino, hash.t);
        result.add([domino, hash.t]);
      }
    }
    
    return result;
      //find "target" pair, but subtracting left and right from target
      //check if object has the target,
        //print out the 2 pairs

  }
  
  
  //iterate over the pairs, 
    //for each pair,
      //check against all the other pairs for the sum
      //if the sum of both pairs are k, then we can push both pairs to a result array
  
  //return result array
  
  