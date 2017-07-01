new Promise(executor);

let promise = new Promise((resolve, reject) => {
  AsyncRequest({
    success: resolve,
    error: reject
  });
});
