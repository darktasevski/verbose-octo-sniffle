// basic promises skeleton

var d = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (false) {
      resolve('hello world');
    } else {
      reject('no bueno');
    }
  }, 2000)
});


// if promise is resolved, it is followed by .then
d.then((data) => {
  console.log('success: ', data);
  return 'this is more data';
})
  .then((data) =>
    console.log('success 2: ', data))
    // if promise is rejected, it is followed by .catch
  .catch((error) => console.error('error: ', error));
