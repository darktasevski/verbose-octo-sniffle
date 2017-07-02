const sortStack = (stack) => {
  //temp stack
  let temp = [];
  //move 1 from stack to temp
  temp.push(stack.pop());

  //while stack has items,
  while (!isEmpty(stack)) {
    //pop off top of stack as current
    let current = stack.pop();
    //set a counter
    let counter = 0;

    //while temp has items, and current is less than top of temp
    while (!isEmpty(temp) && current < peek(temp)) {
      //pop off stack, push to temp
      stack.push(temp.pop());
      //increment counter
      counter++;
    }
    //push current to temp
    temp.push(current);

    //push counter numbers back from temp to stack
    for (var i = 0; i < counter; i++) {
      temp.push(stack.pop())
    }

  }
  //while temp has items
  while (!isEmpty(temp)) {
    //pop off from temp to stack
    stack.push(temp.pop());
  }

  return stack
}


const peek = (stack) => {
  return stack[stack.length - 1];
}

const isEmpty = (stack) => {
  return stack.length === 0;
}

console.log(sortStack([3,7,1,5,3,8,2]))   //[8,7,5,3,2,1]