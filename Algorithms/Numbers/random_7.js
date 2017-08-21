// Write a function that generates an inclusive random integer between 0 and 7,
// using an input function that generates a random exclusive integer between 0
// and 5, ensuring the output is uniformly distributed.

const RANDOM_7 = random5Function => {
  while (true) {
    let randomNumber = 5 * random5Function() + random5Function();
    if (randomNumber < 21) { return (randomNumber % 8); }
  }
};

const RANDOM_5 = () => {
  return Math.floor(Math.random() * 5);
};
