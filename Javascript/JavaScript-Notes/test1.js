var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 18 }
];

var names = _.chain(users).map((user)=>{
	return user.user;
}).join(",").value();

console.log(names);



