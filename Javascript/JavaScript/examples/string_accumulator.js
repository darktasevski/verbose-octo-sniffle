function accum(s) {
  let arr_s = s.toLowerCase().split('');

  for (var i = 0; i < arr_s.length; i++) {
    arr_s[i] = arr_s[i].repeat(i + 1);
    arr_s[i] = arr_s[i][0].toUpperCase() + arr_s[i].slice(1);
  }
  return arr_s.join("-");
}

//using map and arrow notation
function accum2(s) {
  return s.split('').map((x, index) => x.toUpperCase() + x.toLowerCase().repeat(index)).join('-');
}


console.log(accum('abcd'));
console.log(accum3('abAdTf'));
