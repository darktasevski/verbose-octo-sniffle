// Write a function that takes a message and an increment amount and outputs
// the same letters shifted by that amount in the alphabet (with spaces
// preserved). Inputs will be lowercase and without punctuation.

const CAESAR_CIPHER = (message, offset) => {
  let encryptedMessage = '';
  for (let i = 0; i < message.length; i++) {
    const CHAR_CODE = message[i].charCodeAt();
    if (CHAR_CODE > 96 && CHAR_CODE < 123) {
      let newChar = CHAR_CODE + offset;
      while (newChar > 122) {
        newChar -= 26;
      }
      encryptedMessage += String.fromCharCode(newChar);
    } else {
      encryptedMessage += message[i];
    }
  }

  return encryptedMessage;
};
