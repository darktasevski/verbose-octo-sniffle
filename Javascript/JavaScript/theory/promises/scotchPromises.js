// promises have 3 states:
  // Promise is pending
  // Promise is resolved
  // Promise is rejected

var isMomHappy = false;

// promises
var willIGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    var phone = {
      brand: 'Samsung',
      color: 'black'
    };
    resolve(phone);
  } else {
    var reason = new Error('mom is not happy');
    reject(reason);
  }
});

willIGetNewPhone
  .then(data => {
    console.log('yes! ', data);
  })
  .catch(error => {
    console.log('boo, ', error);
  });
