
const reverseString = (str) => str.split('').reverse().join('');

reverseString('darko');

const reverseWords = str => str.split(' ').map(word => word.split('').reverse().join('')).join(' ')

reverseWords('Compatible Web Design');