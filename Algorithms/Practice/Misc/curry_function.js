const CURRY = (func, numberOfArguments) => {
  const ARGS = [];
  const FUNC = func;

  const RETURN_FUNC = argument => {
    ARGS.push(argument);

    if (ARGS.length === numberOfArguments) {
      return FUNC(...ARGS);
    } else {
      return RETURN_FUNC;
    }
  };

  return RETURN_FUNC;
};

function SUM_OF_N() {
  return Array.from(arguments).reduce((accumulator, el) => accumulator + el);
}

const CURRIED_SUM = CURRY(SUM_OF_N, 5);
CURRIED_SUM(4);  // [Function]
CURRIED_SUM(7);  // [Function]
CURRIED_SUM(2);  // [Function]
CURRIED_SUM(76); // [Function]
CURRIED_SUM(0);  // => 89
