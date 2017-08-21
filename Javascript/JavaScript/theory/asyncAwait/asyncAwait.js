// Async and Await easier to read without the then and catch

const isMomHappy = true;

// Promise
const willIGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: 'Samsung',
      color: 'black'
    };
    resolve(phone);
  } else {
    const reason = new Error('mom is not happy');
    reject(reason);
  }
});

// second promise

async function showOff(phone) {
  return new Promise((resolve, reject) => {
    var message = 'Hey buddy, check out my new ' + phone.color + ' ' + phone.brand;
    resolve(message);
  });
};

// call our promise

async function askMom() {
  try {
    console.log('before asking Mom');
    let phone = await willIGetNewPhone;
    let message = await showOff(phone);

    console.log(message);
    console.log('after asking mom');
  }
  catch(error) {
    console.log(error.message);
  }
}

(async () => {
  await askMom;
})();
