function yodaSays(strings, ...values) {
  console.log(strings); // ['',' loves ', '!']
  console.log(values); // ['Sarah', 'sushi']
  return `${values[1]}, ${values[0]} ${strings[1]}${strings[2]}`;
}

let name = 'Sarah', food = 'sushi';
let str = yodaSays `${name} loves ${food}!`;
console.log(str) // sushi, Sarah  loves !
