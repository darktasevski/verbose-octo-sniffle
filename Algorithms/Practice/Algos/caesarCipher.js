const caesarCypher = (str, num) => {
  num = num % 26; // Backup for crazy numbers
  
  let lowcStr = str.toLowerCase();
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let cypher = '';

  for (let i = 0; i < lowcStr.length; i++) {
    let currLetter = lowcStr[i];
    if (currLetter === ' ') {
      cypher += currLetter;
      continue;
    }

    let currIndex = alphabet.indexOf(currLetter);
    let newIndex = currIndex + num;

    if (newIndex > 26) {
      newIndex -= alphabet.length;
    }

    if (newIndex < 0) {
      newIndex += alphabet.length;
    }

    if (str[i] === str[i].toUpperCase()) {
      cypher += alphabet[newIndex].toUpperCase();
    } else {
      cypher += alphabet[newIndex];
    }
  }

  return cypher;
};

caesarCypher('Javascript', -900); 
caesarCypher('Zoo Keeper', 2); // 'Bqq Mggrgt'
