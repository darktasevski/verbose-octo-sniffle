function mysteryScoping4() {
  // let x = 'out of block';
  if (true) {
    const x = 'in block';  
    console.log(x);
  }
  console.log(x);
}

mysteryScoping4();

//in block
//out of block