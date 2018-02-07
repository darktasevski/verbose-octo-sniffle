// mine first approach

const fizzBuzz = (num) => {

  for(let i = 1; i <= num; i++) {
    let result = '';
    if(i % 3 === 0){
      result = 'Fizz';
    }
    if(i % 5 === 0) {
      result += 'Buzz';
    }
    console.log(result || i);
  }
  
}

fizzBuzz(50);

const fizzBuzz1 = (num) => {

  for(let i = 1; i <= num; i++) {
    if( i % 15 === 0 ) console.log('FizzBuzz');
    else if( i % 3 === 0 ) console.log('Fizz');
    else if( i % 5 === 0 ) console.log('Buzz');
    else console.log(i);
  }
}