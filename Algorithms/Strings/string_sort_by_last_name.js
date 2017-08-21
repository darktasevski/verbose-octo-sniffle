// Write a function that takes in an array of strings (which represent first
// and last names) and returns them in a new array, sorted by last name.

const SORT_BY_LAST_NAME = namesArray => {
  if (namesArray.length < 2) { return namesArray; }
  let midNameIndex = Math.floor(namesArray.length / 2);
  let midName = namesArray[midNameIndex];
  let midLastName = midName
    .slice(midName.lastIndexOf(' ') + 1, midName.length
  );
  let remainder = namesArray.slice(0, midNameIndex)
          .concat(namesArray.slice(midNameIndex + 1, namesArray.length)
  );
  let left = remainder.filter(name => {
    let lastName = name.slice(name.lastIndexOf(' ') + 1, name.length);
    return lastName < midLastName;
  });
  let right = remainder.filter(name => {
    let lastName = name.slice(name.lastIndexOf(' ') + 1, name.length);
    return lastName >= midLastName;
  });
  let sortedLeft = SORT_BY_LAST_NAME(left);
  let sortedRight = SORT_BY_LAST_NAME(right);
  return sortedLeft.concat([midName]).concat(sortedRight);
};

SORT_BY_LAST_NAME([
  'Darth Vader',
  'Han Solo',
  'R2 D2',
  'Leia Organa',
  'Obiwan Kenobi',
  'Luke Skywalker'
]); // => [
      //   'R2 D2',
      //   'Obiwan Kenobi',
      //   'Leia Organa',
      //   'Luke Skywalker',
      //   'Han Solo',
      //   'Darth Vader'
      //  ]
