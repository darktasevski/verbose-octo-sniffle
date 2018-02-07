
// Note made from words cut from a magazine :P
// 

const harmlessRansomNote = (noteText, magazineText) => {
  let noteArr = noteText.split(' ');
  let magArr = magazineText.split(' ');
  let magObj = {};
  let notePossible = true;
  
  magArr.forEach(word => {
    if(!magObj[word]) magObj[word] = 0;
    magObj[word]++;
  });
  
  noteArr.forEach(word => {
    if(magObj[word]){
      magObj[word]--;
      
      if(magObj[word] < 0 ) notePossible = false;
      
    } else {
      notePossible = false;
    }
  })
  
  return notePossible;
};




harmlessRansomNote('Learn without any Java', 
	'Learn to use Java code alongside Kotlin without any hiccups');