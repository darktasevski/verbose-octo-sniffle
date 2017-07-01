//given a directed graph, design an algorithm to find out whether there is a route between two nodes.

const connectedBFS = (graph, start, target) => {
  let queue = [start];
  let visited = new Set();

  while (queue.length) {
    let node = queue.shift();
    
    for(let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (neighbor === target) {
          return true;
        }
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}



const connectedDFS = (graph, start, target) => {
  return DFS(graph, new Set(), start, target);
}

const DFS = (graph, visited, start, target) => {
  if (start === target) {
    return true;
  }
  visited.add(start);
  for(let neighbor of graph[start]) {
    if (!visited.has(start)) {
      if (DFS(graph, visited, neighbor, target)) {
        return true;
      }
    }
  }
  return false;
}
