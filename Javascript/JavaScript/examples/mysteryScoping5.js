function mysteryScoping5() {
  let x = 'out of block';
  if (true) {
    let x = 'in block';  
    console.log(x);
  }
	let x = 'out of block again';
  console.log(x);
}


mysteryScoping5();

//syntax error